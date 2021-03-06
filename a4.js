#!/usr/bin/env node
/**
 * Create a PDF using puppeteer
 */

const { existsSync } = require("fs");
const { dirname, resolve } = require("path");

const program = require("commander");
const puppeteer = require("puppeteer-core");
const extensions = "html|png|jpg|svg";

const numbering = {
  displayHeaderFooter: true,
  headerTemplate: `<div />`,
  footerTemplate: `<div style="
      font-size: 10px;
      width: 1000px;
      text-align: center;
    ">
      Page <span class="pageNumber"></span> of <span class="totalPages"></span>
    </div>`
};
var input;
var pdf;

program
  .version("0.0.1", "--version")
  .arguments(`<source.(${extensions})> [destination.pdf]`)
  .action((source, destination) => {
    input = source;
    if (destination) pdf = destination;
    else pdf = source.replace(RegExp(`[.](${extensions})$`), ".pdf");
  })
  .option("-f --format <format>", "Page size", /^(a[0-6]|letter)$/i, "a4")
  .option("-l --landscape", "Landscape orientation")
  .option("-n --number", "Number pages")
  .parse(process.argv);
/*
 * Options listed at:
 * https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
 */

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(1);
}
var flagged = false;
let exit = message => {
  console.error(message);
  flagged = true;
};
var http = RegExp(`^http`).test(input);
if (!http) {
  if (!RegExp(`.(?:${extensions})$`).test(input))
    exit(`${input} doesn't end with ${extensions}`);
  if (!existsSync(input)) exit(`${input} doesn't exist`);
}
if (!/\.pdf$/.test(pdf)) exit(`${pdf} doesn't end with .pdf`);
if (!existsSync(dirname(pdf))) exit(`Directory for ${pdf} doesn't exist`);
if (flagged) {
  program.outputHelp();
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser"
  });
  const page = await browser.newPage();
  const url = http ? `${input}` : `file:///${resolve(input)}`;
  await page.goto(url, { waitUntil: "networkidle2" });
  console.log(pdf);
  await page.pdf({
    ...{
      path: pdf,
      format: program.format,
      landscape: program.landscape || false,
      /* margins set to 25mm to match Microsoft Word Online defaults */
      margin: { top: "25mm", right: "25mm", bottom: "25mm", left: "25mm" }
    },
    ...(program.number ? numbering : {})
  });

  await browser.close();
})();

// index.js
//
// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0
// SPDX-FileCopyrightText: 2019 Keith Maxwell <keith.maxwell@gmail.com>
