#! /usr/bin/env python

import urllib, urllib2, argparse, os
from bs4 import BeautifulSoup

src = os.path.abspath(os.path.dirname(__file__) + '/src')

def compress(js):
    print "=======> Compressing"
    data = urllib.urlencode({'js_in': js})
    page = urllib.urlopen('http://jscompress.com/', data).read()
    soup = BeautifulSoup(page)
    result = soup.find('textarea', id='js_out')
    print "=======> Done compressing"
    return result.string

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--no-minify', dest='nomin', nargs='?', const=True, default=False)
    args = parser.parse_args()
    text = open(src + '/autoexpand.js').read();
    js = text if args.nomin else compress(text)
    header = open(src + '/comment.js').read()
    out = open('autoexpand.js', 'w')
    print "=======> Saving autoexpand.js"
    out.write(header)
    out.write(text)
    out.close()
    out.close()
    out = open('autoexpand.min.js', 'w')
    print "=======> Saving autoexpand.min.js"
    out.write(header)
    out.write(js)
    out.close()
