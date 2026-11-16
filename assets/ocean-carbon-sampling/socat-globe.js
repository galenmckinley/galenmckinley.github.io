/* SOCAT observation globe.
   Adapted from Bokai He's "Ocean Carbon Sampling" site (section 2, Background):
   https://github.com/BokaiHe/ocean-carbon-sampling  (site/globes.js)
   Data: SOCAT v2025 gridded monthly surface-water fCO2, 1 degree, years 2005/2010/2014.
   Loads data from this site first; falls back to Bokai's GitHub Pages copy. */
(function () {
  'use strict';

  var LOCAL = '/assets/ocean-carbon-sampling/';
  var REMOTE = 'https://bokaihe.github.io/ocean-carbon-sampling/data/';

  function getJSON(name) {
    return fetch(LOCAL + name).then(function (r) {
      if (!r.ok) throw new Error('local');
      return r.json();
    }).catch(function () {
      return fetch(REMOTE + name).then(function (r) {
        if (!r.ok) throw new Error('remote ' + name);
        return r.json();
      });
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var RAD = Math.PI / 180;
  function unit(lon, lat) {
    return [Math.cos(lat * RAD) * Math.cos(lon * RAD), Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD)];
  }
  function fmt(n) { return n.toLocaleString('en-US'); }
  function ramp(stops, n) {
    n = n || 64;
    return d3.range(n).map(function (i) {
      var t = i / (n - 1), k = t * (stops.length - 1), j = Math.min(stops.length - 2, Math.floor(k));
      return d3.interpolateRgb(stops[j], stops[j + 1])(k - j);
    });
  }

  function createGlobe(canvas, opts) {
    var rotation = opts.rotation || [20, -15, 0];
    var ctx = canvas.getContext('2d');
    var projection = d3.geoOrthographic().clipAngle(90).precision(0.4);
    var path = d3.geoPath(projection, ctx);
    var graticule = d3.geoGraticule10();
    var state = { rotation: rotation.slice(), zoom: 1, width: 0, spin: !reduced.matches, inView: false, land: null, visible: [] };
    var frame = 0, spinFrame = 0, last = 0, pointer = null;

    function request() { if (!frame) frame = requestAnimationFrame(draw); }
    function draw() {
      frame = 0;
      var width = canvas.clientWidth; if (!width) return;
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * ratio)) { canvas.width = canvas.height = Math.round(width * ratio); }
      state.width = width;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.clearRect(0, 0, width, width);
      var r = width * 0.46 * state.zoom, c = width / 2;
      projection.translate([c, c]).scale(r).rotate(state.rotation);
      var glow = ctx.createRadialGradient(c, c, r * 0.9, c, c, r * 1.12);
      glow.addColorStop(0, 'rgba(79,214,200,.18)'); glow.addColorStop(1, 'rgba(79,214,200,0)');
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(c, c, r * 1.12, 0, Math.PI * 2); ctx.fill();
      var sea = ctx.createRadialGradient(width * 0.4, width * 0.38, r * 0.1, c, c, r);
      sea.addColorStop(0, '#12405c'); sea.addColorStop(1, '#0b2537');
      ctx.beginPath(); path({ type: 'Sphere' }); ctx.fillStyle = sea; ctx.fill();
      ctx.save(); ctx.beginPath(); path({ type: 'Sphere' }); ctx.clip();
      ctx.beginPath(); path(graticule); ctx.strokeStyle = 'rgba(170,220,245,.08)'; ctx.lineWidth = 0.6; ctx.stroke();
      var centre = projection.invert([c, c]), front = unit(centre[0], centre[1]);
      state.visible = [];
      opts.drawPoints({ ctx: ctx, projection: projection, front: front, width: width, visible: state.visible, zoom: state.zoom });
      if (state.land) {
        ctx.beginPath(); path(state.land); ctx.fillStyle = '#173247'; ctx.fill();
        ctx.strokeStyle = '#2d5672'; ctx.lineWidth = 0.8; ctx.stroke();
      }
      ctx.restore();
      ctx.beginPath(); path({ type: 'Sphere' }); ctx.strokeStyle = 'rgba(170,220,245,.35)'; ctx.lineWidth = 1; ctx.stroke();
    }
    function tick(time) {
      spinFrame = 0;
      if (!state.spin || !state.inView || document.hidden) { last = 0; return; }
      if (last) state.rotation[0] += Math.min(time - last, 60) * 0.006;
      last = time; request(); spinFrame = requestAnimationFrame(tick);
    }
    function spin() { if (state.spin && state.inView && !spinFrame) spinFrame = requestAnimationFrame(tick); }
    function stop() { state.spin = false; cancelAnimationFrame(spinFrame); spinFrame = 0; last = 0; }
    function turn(dx, dy) {
      stop(); state.rotation[0] += dx;
      state.rotation[1] = Math.max(-85, Math.min(85, state.rotation[1] + (dy || 0))); request();
    }
    function zoom(step) { stop(); state.zoom = Math.max(0.8, Math.min(3, state.zoom * step)); request(); }

    canvas.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return; stop();
      pointer = { id: e.pointerId, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!pointer || pointer.id !== e.pointerId) return;
      turn((e.clientX - pointer.x) * 0.3 / state.zoom, -(e.clientY - pointer.y) * 0.3 / state.zoom);
      pointer.x = e.clientX; pointer.y = e.clientY;
    });
    canvas.addEventListener('pointerup', function (e) {
      if (!pointer || pointer.id !== e.pointerId) return;
      var moved = Math.hypot(e.clientX - pointer.sx, e.clientY - pointer.sy) > 4; pointer = null;
      if (!moved) { var box = canvas.getBoundingClientRect(); pick(e.clientX - box.left, e.clientY - box.top); }
    });
    canvas.addEventListener('pointercancel', function () { pointer = null; });
    canvas.addEventListener('wheel', function (e) {
      if (!e.ctrlKey && !e.metaKey) return; e.preventDefault(); zoom(e.deltaY < 0 ? 1.12 : 1 / 1.12);
    }, { passive: false });
    canvas.addEventListener('keydown', function (e) {
      var keys = {
        ArrowLeft: function () { turn(-10); }, ArrowRight: function () { turn(10); },
        ArrowUp: function () { turn(0, 10); }, ArrowDown: function () { turn(0, -10); },
        '+': function () { zoom(1.2); }, '=': function () { zoom(1.2); }, '-': function () { zoom(1 / 1.2); },
        Home: function () { stop(); state.rotation = rotation.slice(); state.zoom = 1; request(); }
      };
      if (keys[e.key]) { e.preventDefault(); keys[e.key](); }
    });
    function pick(x, y) {
      var location = projection.invert([x, y]);
      if (!location || Math.hypot(x - state.width / 2, y - state.width / 2) > projection.scale()) return opts.onPick(null);
      var best = null, distance = 144;
      state.visible.forEach(function (p) {
        var d = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
        if (d < distance) { distance = d; best = p; }
      });
      opts.onPick(best ? best.item : null);
    }
    new ResizeObserver(request).observe(canvas);
    new IntersectionObserver(function (entries) { state.inView = entries[0].isIntersecting; spin(); }, { threshold: 0.1 }).observe(canvas);
    document.addEventListener('visibilitychange', spin);
    getJSON('globe-land.json').then(function (land) { state.land = land; request(); }).catch(function () {});
    return { state: state, request: request };
  }

  function observationGlobe() {
    var root = document.getElementById('observation-explorer'); if (!root) return;
    var canvas = document.getElementById('observation-globe');
    var yearBox = document.getElementById('observation-year');
    var monthBox = document.getElementById('observation-month');
    var count = document.getElementById('observation-count');
    var readout = document.getElementById('observation-readout');
    var monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var colour = ramp(['#2f5fbf', '#21a3b0', '#9fd8a0', '#ffb454', '#ff7f5c']);
    function colourOf(v) { return colour[Math.round(Math.max(0, Math.min(1, (v - 200) / 400)) * (colour.length - 1))]; }
    document.getElementById('observation-scale').style.background =
      'linear-gradient(90deg,' + colour.filter(function (_, i) { return i % 8 === 0; }).join(',') + ',' + colour[colour.length - 1] + ')';

    getJSON('observed-co2.json').then(function (data) {
      var year = data.metadata.default_year, month = 0, cells = [], selected = null;
      var globe = createGlobe(canvas, { rotation: [30, -20, 0], drawPoints: drawPoints, onPick: function (item) { selected = item; describe(); globe.request(); } });

      function drawPoints(o) {
        var size = Math.max(1.2, o.width / 330) * Math.sqrt(o.zoom), f = o.front;
        cells.forEach(function (c) {
          if (c.xyz[0] * f[0] + c.xyz[1] * f[1] + c.xyz[2] * f[2] <= 0) return;
          var p = o.projection([c.lon, c.lat]);
          o.ctx.fillStyle = c.colour; o.ctx.fillRect(p[0] - size / 2, p[1] - size / 2, size, size);
          o.visible.push({ x: p[0], y: p[1], item: c });
        });
        if (selected) {
          var s = o.projection([selected.lon, selected.lat]);
          o.ctx.beginPath(); o.ctx.arc(s[0], s[1], 7, 0, Math.PI * 2); o.ctx.strokeStyle = '#fff'; o.ctx.lineWidth = 2; o.ctx.stroke();
        }
      }
      function rebuild() {
        var agg = new Map();
        data.years[String(year)].forEach(function (row) {
          var m = row[0], lon = row[1], lat = row[2], value = row[3], n = row[4];
          if (month && m !== month) return;
          var key = lon + '|' + lat;
          if (!agg.has(key)) agg.set(key, { lon: lon, lat: lat, sum: 0, months: 0, n: 0 });
          var c = agg.get(key); c.sum += value; c.months++; c.n += n;
        });
        cells = Array.from(agg.values()).map(function (c) {
          var v = c.sum / c.months;
          return { lon: c.lon, lat: c.lat, n: c.n, months: c.months, value: v, xyz: unit(c.lon, c.lat), colour: colourOf(v) };
        });
        selected = null;
        yearBox.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.year) === year)); });
        monthBox.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.month) === month)); });
        describe(); globe.request();
      }
      function describe() {
        var n = cells.reduce(function (s, c) { return s + c.n; }, 0);
        count.textContent = fmt(cells.length) + ' grid cells · ' + fmt(n) + ' measurements';
        if (!selected) { readout.textContent = 'Tap a dot to read its value.'; return; }
        var c = selected;
        readout.textContent = c.value.toFixed(1) + ' µatm · ' + c.lat + '°, ' + c.lon + '° · ' +
          fmt(c.n) + ' measurements in ' + c.months + ' month' + (c.months > 1 ? 's' : '');
      }
      function button(text, onclick) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = text; b.onclick = onclick; return b;
      }
      data.metadata.years.forEach(function (y) {
        var b = button(y, function () { year = y; rebuild(); }); b.dataset.year = y; yearBox.appendChild(b);
      });
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(function (m) {
        var b = button(m ? monthsEn[m - 1] : 'All', function () { month = m; rebuild(); }); b.dataset.month = m; monthBox.appendChild(b);
      });
      rebuild();
    }).catch(function (err) {
      count.textContent = 'Observations could not load.'; console.warn(err);
    });
  }

  function start() { if (!window.d3) { console.warn('d3 unavailable'); return; } observationGlobe(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
