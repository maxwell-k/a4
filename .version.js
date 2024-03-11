import { readFileSync, writeFileSync } from "node:fs";
import metadata from "./package.json" with { type: "json" };

const path = "a4.js";
const content = readFileSync(path, "utf8");
const pattern = /^( +[.]version\(")[^"]+("\))$/m;
writeFileSync(path, content.replace(pattern, `$1${metadata.version}$2`));

// .version.js
//
// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0
// SPDX-FileCopyrightText: 2024 Keith Maxwell <keith.maxwell@gmail.com>
//
// vim: set filetype=typescript :
