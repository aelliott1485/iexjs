/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import { _get, _raiseIfNotStr } from "../common";
import { Client } from "../client";

/**
 * Returns an array of U.S. exchanges.
 *
 * https://iexcloud.io/docs/api/#u-s-exchanges
 *
 * @param {string} token Access token
 * @param {string} version API version
 * @param {string} filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} format output format
 */
export const figi = (
  figi_,
  token = "",
  version = "",
  filter = "",
  format = "json",
) => {
  _raiseIfNotStr(figi_);
  return _get({
    url: `ref-data/figi?figi=${figi_}`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.figi = function (figi_, filter, format) {
  return figi(figi_, this._token, this._version, filter, format);
};
