// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'vitest/config';
import GasReporter from './gas-reporter'
import { DefaultReporter } from 'vitest/reporters';

let reporters = [];

let isGasReport: boolean = false;
if (process.env.GAS_REPORT) {
	isGasReport = true;
}

export default defineConfig({
	test: {
		reporters: [new GasReporter({ isGasReport })],
		// reporters: [new TapReporter()]
		// reporters: [['default', { summary: false }]]
	},
});
