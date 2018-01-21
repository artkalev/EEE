import os
import sys

f = open("build/E2.js")

for line in f:
    if "//#" in line:
        if"//#method" in line:
            # todo start a method block
            pass
        pass

f.close()