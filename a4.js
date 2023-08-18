#!/usr/bin/env node
/**
 * Create a PDF using puppeteer
 */
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { Command } from "commander";
import puppeteer from "puppeteer-core";

const program = new Command();
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
    </div>`,
};
const paths = ["/usr/bin/chromium-browser", "/opt/google/chrome/chrome"];
let input;
let pdf;

program
  .version("0.0.2") // also update package.json
  .arguments(`<source.(${extensions})> [destination.pdf]`)
  .action((source, destination) => {
    input = source;
    if (destination) pdf = destination;
    else pdf = source.replace(RegExp(`[.](${extensions})$`), ".pdf");
  })
  .option("-f, --format <format>", "Page size", /^(a[0-6]|letter)$/i, "a4")
  .option("-l, --landscape", "Landscape orientation")
  .option("-n, --number", "Number pages")
  .parse();
/*
 * Options listed at:
 * https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
 */

let flagged = false;
const exit = (message) => {
  console.error(message);
  flagged = true;
};
const http = RegExp(`^http`).test(input);
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
  const options = program.opts();
  const browser = await puppeteer.launch({
    executablePath: paths.filter(existsSync)[0],
  });
  const page = await browser.newPage();
  const url = http ? `${input}` : `file:///${resolve(input)}`;
  await page.goto(url, { waitUntil: "networkidle2" });
  console.log(pdf);
  await page.pdf({
    ...{
      path: pdf,
      format: options.format,
      landscape: options.landscape || false,
      /* margins set to 25mm to match Microsoft Word Online defaults */
      margin: { top: "25mm", right: "25mm", bottom: "25mm", left: "25mm" },
    },
    ...(options.number ? numbering : {}),
  });

  await browser.close();
})();

// a4.js
//
// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0
// SPDX-FileCopyrightText: 2019 Keith Maxwell <keith.maxwell@gmail.com>
