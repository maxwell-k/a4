[![REUSE status](https://api.reuse.software/badge/github.com/maxwell-k/a4)](https://api.reuse.software/info/github.com/maxwell-k/a4)

# a4

_Create an A4 PDF from a local file using puppeteer-core_

## Quick start

Command to download a test HTML file:

    curl -O http://example.org/index.html

Command to render the test HTML file to an A4 PDF called `index.pdf`:

    npm exec --yes -- github:maxwell-k/a4 index.html

## Testing

<!--
git clean -f -d -x
-->

Command to run an end to end test with NodeJS:

    npm ci \
    && curl -s -O http://example.org/index.html \
    && node . index.html >/dev/null \
    && pdfinfo index.pdf | grep "^Page size:"

Command to run an end to end test with Deno:

    deno install \
    && deno compile --allow-env --allow-read --allow-write --allow-run --allow-net a4.ts \
    && ./a4 --version \
    && curl -s -O http://example.org/index.html \
    && ./a4 index.html >/dev/null \
    && pdfinfo index.pdf | grep "^Page size:"

Expected output from either test:

    Page size:      594.96 x 841.92 pts (A4)

## Offline / Single Executable Application

First run the test above for Deno.

Command to install the `a4` binary:

    cp a4 ~/.local/bin

Rationale:

1. Running with `npm exec`, like under quick start, is less effective offline
2. Manually installing packages, like under testing, is time consuming

<!-- Bump the version number and tag a new release with:

    npm version patch

-->

## Licence

[Mozilla Public License Version 2.0](https://mozilla.org/MPL/2.0/)

<!--
SPDX-FileCopyrightText: 2019 Keith Maxwell <keith.maxwell@gmail.com>
SPDX-License-Identifier: CC0-1.0
-->

<!--
eval "$(fnm env --shell zsh)" && fnm use v22
node --version
-->

<!-- vim: set filetype=markdown.htmlCommentNoSpell  : -->
