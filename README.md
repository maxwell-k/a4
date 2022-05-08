[![REUSE status](https://api.reuse.software/badge/github.com/maxwell-k/a4)](https://api.reuse.software/info/github.com/maxwell-k/a4)

# a4

_Create a PDF using puppeteer_

## Chromium dependency

The version of puppeteer-core in `package.json` and `yarn.lock` should
correspond to installed version of Chromium.

1. Get the version number from `yarn.lock` e.g. 2.1.1
2. Check the `chromium_revision` in the corresponding `package.json` e.g.
   <https://github.com/puppeteer/puppeteer/blob/v2.1.1/package.json#L11> →
   722234
3. Using <https://omahaproxy.appspot.com/> check the Chromium version:
   <https://storage.googleapis.com/chromium-find-releases-static/index.html#r722234>
   → 80.0.3987.0

For example Alpine Linux packages Chromium as:
<https://pkgs.alpinelinux.org/package/edge/community/x86_64/chromium>

## Testing

Download a test HTML file:

    curl -O http://example.org/index.html

Render the test HTML file to an A4 PDF:

    npm install
    npm exec -- . index.html

Check the output: `index.pdf`

## Licence

[Mozilla Public License Version 2.0](https://mozilla.org/MPL/2.0/)
