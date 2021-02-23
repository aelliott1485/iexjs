/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

/* eslint-disable import/no-mutable-exports */

// import fetch from "cross-fetch";
// import EventSource from "eventsource";

import { IEXJSException } from "./exception";

export const _URL_PREFIX = () => "https://api.iextrading.com/1.0/";
export let _URL_PREFIX2 = (version) => `https://cloud.iexapis.com/${version}/`;
export const _URL_PREFIX2_SANDBOX = () => `https://sandbox.iexapis.com/stable/`;

export const _SIO_URL_PREFIX = "https://ws-api.iextrading.com";
export const _SIO_PORT = 443;

export const _SSE_URL_PREFIX = (version, channel, symbols, token) =>
  `https://cloud-sse.iexapis.com/${version}/${channel}?symbols=${symbols}&token=${token}`;
export const _SSE_URL_PREFIX_ALL = (version, channel, token) =>
  `https://cloud-sse.iexapis.com/${version}/${channel}?token=${token}`;
export const _SSE_DEEP_URL_PREFIX = (version, symbols, channels, token) =>
  `https://cloud-sse.iexapis.com/${version}/deep?symbols=${symbols}&channels=${channels}&token=${token}`;
export const _SSE_URL_PREFIX_SANDBOX = (version, channel, symbols, token) =>
  `https://sandbox-sse.iexapis.com/stable/${channel}?symbols=${symbols}&token=${token}`;
export const _SSE_URL_PREFIX_ALL_SANDBOX = (channel, token) =>
  `https://sandbox-sse.iexapis.com/stable/${channel}?token=${token}`;
export const _SSE_DEEP_URL_PREFIX_SANDBOX = (symbols, channels, token) =>
  `https://sandbox-sse.iexapis.com/stable/deep?symbols=${symbols}&channels=${channels}&token=${token}`;

/**
 *
 * @param {string} url
 */
const _getOrig = () => {
  throw IEXJSException(
    "Old IEX API is deprecated. For a free API token, sign up at https://iexcloud.io",
  );
};

/**
 * for IEX Cloud
 * @param {object} options
 */
const _getIEXCloudBase = async (options) => {
  const {
    base_url,
    url,
    token = "",
    version = "stable",
    filter = "",
    format = "json",
  } = options;

  const endpoint = new URL(`${base_url(version)}${url}`);
  endpoint.searchParams.append("token", token);
  if (filter) endpoint.searchParams.append("filter", filter);
  return fetch(endpoint.href, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.ok) {
      if (format === "json") {
        return res.json();
      }
      return res.text();
    }
    throw IEXJSException(`Response ${res.status} - ${await res.text()}`);
  });
};

/**
 *
 * @param {object} options
 */
const _getIEXCloud = (options) =>
  _getIEXCloudBase({ base_url: _URL_PREFIX2, ...options });

/**
 *
 * @param {object} options
 */
const _getIEXCloudSandbox = (options) =>
  _getIEXCloudBase({ base_url: _URL_PREFIX2_SANDBOX, ...options });

/**
 *
 * @param {object} options
 */
const _postIEXCloudBase = async (options) => {
  const {
    base_url,
    url,
    data = {},
    token = "",
    version = "stable",
    token_in_params = true,
    format = "json",
  } = options;

  const endpoint = new URL(`${base_url(version)}${url}`);

  if (token_in_params) {
    endpoint.searchParams.append("token", token);
  }

  return fetch(endpoint, {
    method: "POST",
    body: token_in_params ? { token, ...data } : {},
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.ok) {
      if (format === "json") {
        return res.json();
      }
      return res.text();
    }
    throw IEXJSException(`Response ${res.status} - ${await res.text()}`);
  });
};

/**
 *
 * @param {object} options
 */
const _postIEXCloud = (options) =>
  _postIEXCloudBase({ base_url: _URL_PREFIX2, ...options });

/**
 *
 * @param {object} options
 */
const _postIEXCloudSandbox = (options) =>
  _postIEXCloudBase({ base_url: _URL_PREFIX2_SANDBOX, ...options });

/**
 *
 * @param {object} options
 */
const _deleteIEXCloudBase = async (options) => {
  const {
    base_url,
    url,
    token = "",
    version = "stable",
    format = "json",
  } = options;

  const endpoint = new URL(`${base_url(version)}${url}`);
  endpoint.searchParams.append("token", token);

  return fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.ok) {
      if (format === "json") {
        return res.json();
      }
      return res.text();
    }
    throw IEXJSException(`Response ${res.status} - ${await res.text()}`);
  });
};

const _deleteIEXCloud = (options) =>
  _deleteIEXCloudBase({ base_url: _URL_PREFIX2, ...options });

const _deleteIEXCloudSandbox = (options) =>
  _deleteIEXCloudBase({ base_url: _URL_PREFIX2_SANDBOX, ...options });

export const _streamSSE = (url, on_data, accrue = false) => {
  const messages = new EventSource(url);

  // eslint-disable-next-line no-console
  const callback = on_data || console.log;

  messages.accrued = [];

  messages.onmessage = async (event) => {
    // TODO stop
    const datum = JSON.parse(event.data);
    await callback(datum);
    if (accrue) {
      messages.accrued.push(datum);
    }
  };

  return messages;
};

export const overrideUrl = (url) => {
  _URL_PREFIX2 = () => url;
};

/**
 * for backwards compat, accepting token and version but ignoring
 * @param {object} options
 */
export const _get = async (options) => {
  const { url, token = "", version = "" } = options;
  if (token) {
    if (version === "sandbox") {
      return _getIEXCloudSandbox(options);
    }
    return _getIEXCloud(options);
  }
  return _getOrig(url);
};

/**
 *
 * @param {object} options
 */
export const _post = async (options) => {
  const { version = "" } = options;

  if (version === "sandbox") {
    return _postIEXCloudSandbox(options);
  }
  return _postIEXCloud(options);
};

/**
 *
 * @param {object} options
 */
export const _delete = (options) => {
  const { version = "" } = options;
  if (version === "sandbox") {
    return _deleteIEXCloudSandbox(options);
  }
  return _deleteIEXCloud(options);
};
