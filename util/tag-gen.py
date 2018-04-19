#!/usr/bin/env python

"""
tag_generator.py

Copyright 2017 Long Qian
Contact: lqian8@jhu.edu

This script creates tags for your Jekyll blog hosted by Github page.
No plugins required.
"""

import glob
import os

POST_DIR = '../_posts/{}'
TAG_DIR = '../_tag/'

FILENAMES = glob.glob(POST_DIR.format('*md'))

total_tags = []
for filename in FILENAMES:
    f = open(filename, 'r')
    crawl = False
    for line in f:
        if crawl:
            current_tags = line.strip().split()
            if current_tags[0] == 'tags:':
                total_tags.extend(current_tags[1:])
                crawl = False
                break
        if line.strip() == '---':
            if not crawl:
                crawl = True
            else:
                crawl = False
                break
    f.close()
total_tags = set(total_tags)

old_tags = glob.glob(TAG_DIR + '*.md')
for tag in old_tags:
    os.remove(tag)

for tag in total_tags:
    tag_filename = TAG_DIR + tag + '.md'
    f = open(tag_filename, 'w')
    write_str = """---\ntag: {}
feature_text: |
    <h2 class="whitetext">Tag: {}</h2>
---
""".format(tag, tag)
    f.write(write_str)
    f.close()
print("Tags generated, count", total_tags.__len__())
