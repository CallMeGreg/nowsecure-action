/*
 * Copyright © 2022 NowSecure Inc.
 *
 * SPDX-License-Identifier: MIT
 */

import { promises } from "fs";
import { convertToSnapshot } from "../nowsecure-snapshot";
import type { Deputy } from "../types/deputy";
import path from "path";

const { readFile } = promises;

jest.useFakeTimers().setSystemTime(new Date("2000-01-01"));

describe("Snapshot conversion", () => {
  const context = {
    sha: "",
    ref: "",
    job: "",
    runId: 0,
    repo: {
      owner: "",
      repo: "",
    },
  };

  test("can perform conversion", async () => {
    const data = await readFile(
      path.join(__dirname, "resources", "deputy.json"),
      "utf8"
    );
    const parsed = JSON.parse(data);
    const snapshot = convertToSnapshot(parsed as Deputy, "", context);
    expect(snapshot).toMatchSnapshot({
      detector: {
        version: expect.any(String),
      },
    });
  });
});
