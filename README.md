[![REUSE status](https://api.reuse.software/badge/github.com/maxwell-k/a4)](https://api.reuse.software/info/github.com/maxwell-k/a4)

# a4

_Create an A4 PDF from a local file using puppeteer-core_

## Quick start

Download a test HTML file:

    curl -O http://example.org/index.html

Render the test HTML file to an A4 PDF called `index.pdf`:

    npm exec --yes -- github:maxwell-k/a4 index.html

## Testing

End to end test:

    npm ci \
    && curl -s -O http://example.org/index.html \
    && node . index.html >/dev/null \
    && pdfinfo index.pdf | grep "^Page size:"

Expected output:

    Page size:      594.96 x 841.92 pts (A4)

## Licence

[Mozilla Public License Version 2.0](https://mozilla.org/MPL/2.0/)
