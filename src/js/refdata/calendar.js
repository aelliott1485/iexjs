/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import { _get, _strOrDate } from "../common";
import { Client } from "../client";

/**
 * This call allows you to fetch a number of trade dates or holidays from a given date. For example, if you want the next trading day, you would call /ref-data/us/dates/trade/next/1.
 *
 * https://iexcloud.io/docs/api/#u-s-exchanges
 *
 * @param {string} type "holiday" or "trade"
 * @param {string} direction "next" or "last"
 * @param {number} last number to move in direction
 * @param {string} startDate start date for next or last, YYYYMMDD
 * @param {string} token Access token
 * @param {string} version API version
 * @param {string} filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} format output format
 */
export const calendar = (
  type = "holiday",
  direction = "next",
  last = 1,
  startDate = null,
  token = "",
  version = "",
  filter = "",
  format = "json",
) => {
  if (startDate) {
    return _get({
      url: `ref-data/us/dates/${type}/${direction}/${last}/${_strOrDate(
        startDate,
      )}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `ref-data/us/dates/${type}/${direction}/${last.toString()}`,
    token,
    version,
    filter,
    format,
  });
};

export const holidays = calendar;

Client.prototype.calendar = function (
  type,
  direction,
  last,
  startDate,
  filter,
  format,
) {
  return calendar(
    type,
    direction,
    last,
    startDate,
    this._token,
    this._version,
    filter,
    format,
  );
};

Client.prototype.holidays = function (
  type,
  direction,
  last,
  startDate,
  filter,
  format,
) {
  return calendar(
    type,
    direction,
    last,
    startDate,
    this._token,
    this._version,
    filter,
    format,
  );
};
