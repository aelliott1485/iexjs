/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import { _get, _raiseIfNotStr, _strOrDate, _strToList } from "../common";
import { Client } from "../client";

/**
 * TOPS provides IEX’s aggregated best quoted bid and offer position in near real time for all securities on IEX’s displayed limit order book.
 * TOPS is ideal for developers needing both quote and trade data.
 * https://iexcloud.io/docs/api/#tops
 * @param {string} symbols
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexTops = (symbols, token, version, filter, format) => {
  if (symbols) {
    return _get({
      url: `tops?symbols=${_strToList(symbols).join(",")}%2b`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `tops`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexTops = function (symbols, filter, format) {
  return iexTops(symbols, this._token, this._version, filter, format);
};

/**
 * Last provides trade data for executions on IEX. It is a near real time, intraday API that provides IEX last sale price, size and time.
 * Last is ideal for developers that need a lightweight stock quote.
 * https://iexcloud.io/docs/api/#last
 * @param {string} symbols
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexLast = (symbols, token, version, filter, format) => {
  if (symbols) {
    return _get({
      url: `last?symbols=${_strToList(symbols).join(",")}%2b`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `last`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexLast = function (symbols, filter, format) {
  return iexLast(symbols, this._token, this._version, filter, format);
};

/**
 * DEEP is used to receive real-time depth of book quotations direct from IEX.
 * The depth of book quotations received via DEEP provide an aggregated size of resting displayed orders at a price and side,
 * and do not indicate the size or number of individual orders at any price level.
 * Non-displayed orders and non-displayed portions of reserve orders are not represented in DEEP.
 *
 * DEEP also provides last trade price and size information. Trades resulting from either displayed or non-displayed orders matching on IEX will be reported. Routed executions will not be reported.
 *
 * https://iexcloud.io/docs/api/#deep
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexDeep = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexDeep = function (symbol, filter, format) {
  return iexDeep(symbol, this._token, this._version, filter, format);
};

/**
 * DEEP broadcasts an Auction Information Message every one second between the Lock-in Time and the auction match for Opening and Closing Auctions,
 * and during the Display Only Period for IPO, Halt, and Volatility Auctions. Only IEX listed securities are eligible for IEX Auctions.
 * https://iexcloud.io/docs/api/#deep-auction
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexAuction = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/auction?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep/auction`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexAuction = function (symbol, filter, format) {
  return iexAuction(symbol, this._token, this._version, filter, format);
};

/**
 * Book shows IEX’s bids and asks for given symbols.
 * https://iexcloud.io/docs/api/#deep-book
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexBook = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/book?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep/book`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexBook = function (symbol, filter, format) {
  return iexBook(symbol, this._token, this._version, filter, format);
};

/**
 * The Exchange may suspend trading of one or more securities on IEX for operational reasons and indicates such operational halt using the Operational halt status message.
 *
 * IEX disseminates a full pre-market spin of Operational halt status messages indicating the operational halt status of all securities.
 * In the spin, IEX will send out an Operational Halt Message with “N” (Not operationally halted on IEX) for all securities that are eligible for trading at the start of the Pre-Market Session.
 * If a security is absent from the dissemination, firms should assume that the security is being treated as operationally halted in the IEX Trading System at the start of the Pre-Market Session.
 *
 * After the pre-market spin, IEX will use the Operational halt status message to relay changes in operational halt status for an individual security.
 *
 * https://iexcloud.io/docs/api/#deep-operational-halt-status
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexOpHaltStatus = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/op-halt-status?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep/op-halt-status`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexOpHaltStatus = function (symbol, filter, format) {
  return iexOpHaltStatus(symbol, this._token, this._version, filter, format);
};

/**
 * The Official Price message is used to disseminate the IEX Official Opening and Closing Prices.
 *
 * These messages will be provided only for IEX Listed Securities.
 *
 * https://iexcloud.io/docs/api/#deep-official-price
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexOfficialPrice = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/official-price?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep/official-price`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexOfficialPrice = function (symbol, filter, format) {
  return iexOfficialPrice(symbol, this._token, this._version, filter, format);
};

/**
 * The Security event message is used to indicate events that apply to a security. A Security event message will be sent whenever such event occurs
 * https://iexcloud.io/docs/api/#deep-security-event
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexSecurityEvent = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/security-event?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep/security-event`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexSecurityEvent = function (symbol, filter, format) {
  return iexSecurityEvent(symbol, this._token, this._version, filter, format);
};

/**
 * In association with Rule 201 of Regulation SHO, the Short Sale Price Test Message is used to indicate when a short sale price test restriction is in effect for a security.
 *
 * IEX disseminates a full pre-market spin of Short sale price test status messages indicating the Rule 201 status of all securities.
 * After the pre-market spin, IEX will use the Short sale price test status message in the event of an intraday status change.
 *
 * The IEX Trading System will process orders based on the latest short sale price test restriction status.
 *
 * https://iexcloud.io/docs/api/#deep-short-sale-price-test-status
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexSsrStatus = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/ssr-status?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep/ssr-status`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexSsrStatus = function (symbol, filter, format) {
  return iexSsrStatus(symbol, this._token, this._version, filter, format);
};

/**
 * The System event message is used to indicate events that apply to the market or the data feed.
 *
 * There will be a single message disseminated per channel for each System Event type within a given trading session.
 *
 * https://iexcloud.io/docs/api/#deep-system-event
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexSystemEvent = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/system-event?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get(
    {
      url: `deep/system-event`,
    },
    token,
    version,
    filter,
    format,
  );
};

Client.prototype.iexSystemEvent = function (symbol, filter, format) {
  return iexSystemEvent(symbol, this._token, this._version, filter, format);
};

/**
 * Trade report messages are sent when an order on the IEX Order Book is executed in whole or in part. DEEP sends a Trade report message for every individual fill.
 * https://iexcloud.io/docs/api/#deep-trades
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexTrades = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/trades?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep/trades`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexTrades = function (symbol, filter, format) {
  return iexTrades(symbol, this._token, this._version, filter, format);
};

/**
 * Trade break messages are sent when an execution on IEX is broken on that same trading day. Trade breaks are rare and only affect applications that rely upon IEX execution based data.
 * https://iexcloud.io/docs/api/#deep-trade-break
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexTradeBreak = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/trade-breaks?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep/trade-breaks`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexTradeBreak = function (symbol, filter, format) {
  return iexTradeBreak(symbol, this._token, this._version, filter, format);
};

/**
 * The Trading status message is used to indicate the current trading status of a security.
 * For IEX-listed securities, IEX acts as the primary market and has the authority to institute a trading halt or trading pause in a security due to news dissemination or regulatory reasons.
 * For non-IEX-listed securities, IEX abides by any regulatory trading halts and trading pauses instituted by the primary or listing market, as applicable.
 *
 * IEX disseminates a full pre-market spin of Trading status messages indicating the trading status of all securities.
 * In the spin, IEX will send out a Trading status message with “T” (Trading) for all securities that are eligible for trading at the start of the Pre-Market Session.
 * If a security is absent from the dissemination, firms should assume that the security is being treated as operationally halted in the IEX Trading System.
 *
 *
 * After the pre-market spin, IEX will use the Trading status message to relay changes in trading status for an individual security. Messages will be sent when a security is:
 *
 * Halted
 * Paused*
 * Released into an Order Acceptance Period*
 * Released for trading
 * *The paused and released into an Order Acceptance Period status will be disseminated for IEX-listed securities only. Trading pauses on non-IEX-listed securities will be treated simply as a halt.
 * https://iexcloud.io/docs/api/#deep-trading-status
 * @param {string} symbol
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexTradingStatus = (symbol, token, version, filter, format) => {
  _raiseIfNotStr(symbol);
  if (symbol) {
    return _get({
      url: `deep/trading-status?symbols=${symbol}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `deep/trading-status`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexTradingStatus = function (symbol, filter, format) {
  return iexTradingStatus(symbol, this._token, this._version, filter, format);
};

/**
 * @param {string} date
 * @param {string} token
 * @param {string} version
 * @param {string} filter
 */
export const iexHist = (date, token, version, filter, format) => {
  if (date) {
    return _get({
      url: `hist?date=${_strOrDate(date)}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `hist`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.iexHist = function (date, filter, format) {
  return iexHist(date, this._token, this._version, filter, format);
};
