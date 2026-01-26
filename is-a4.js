#!/usr/bin/env node
/**
 * Check that all of the pages in a PDF are A4
 */
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import process from "node:process";
import { Command } from "commander";

const mmToPoints = 72 / 25.4;
// https://en.wikipedia.org/wiki/A4
const expectedWidth = 210 * mmToPoints;
const expectedHeight = 297 * mmToPoints;

function exitOneIfOutsideTolerance(
  measurement: number,
  expected: number,
  tolerance: number,
) {
  if (Math.abs(measurement - expected) / expected > tolerance) {
    console.log(
      `${measurement} is not within ${tolerance * 100}% of ${expected}`,
    );
    process.exit(1);
  }
}

const program = new Command();

program
  .argument(`<pdf>`)
  // pdfinfo.cc uses a 0.3% tolerance
  .option(
    "--tolerance <tolerance>",
    "as a percentage",
    (value) => parseFloat(value),
    0.3,
  )
  .parse();

const options = program.opts();
const tolerance = options.tolerance / 100;
(async () => {
  const doc = await getDocument(program.args[0]).promise;
  for (let page = 1; page <= doc.numPages; page++) {
    doc.getPage(page).then(function (page) {
      const viewport = page.getViewport({ scale: 1.0 });
      exitOneIfOutsideTolerance(viewport.width, expectedWidth, tolerance);
      exitOneIfOutsideTolerance(viewport.height, expectedHeight, tolerance);
    });
  }
})();

// is-a4.js
//
// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0
// SPDX-FileCopyrightText: 2025 Keith Maxwell <keith.maxwell@gmail.com>
//
// vim: set filetype=typescript :
