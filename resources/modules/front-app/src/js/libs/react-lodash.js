import ReactDom from 'react-dom';
import React, {Component} from 'react';
import {Provider} from 'react-redux'
import cloneDeep from 'lodash.cloneDeep';
import get from 'lodash.get';
import set from 'lodash.set';
import has from 'lodash.has';
import unset from 'lodash.unset';
import isEmpty from 'lodash.isempty';
import isString from 'lodash.isstring';
import find from 'lodash.find';
import isArray from 'lodash.isarray';
import isObject from 'lodash.isobject';
import clone from 'lodash.clone';
import isEqual from 'lodash.isequal';
import isFunction from 'lodash.isfunction';
import isNumber from 'lodash.isnumber';
import debounce from 'lodash.debounce';
import assign from 'lodash.assign';
import each from 'lodash.foreach';
import toPairs from 'lodash.topairs';
import keys from 'lodash.keys';
import toArray from 'lodash.toarray';
import uniqBy  from 'lodash.uniqby';
import map  from 'lodash.map';
window._ = {
  cloneDeep,
  get,
  set,
  has,
  unset,
  isEmpty,
  isString,
  find,
  isArray,
  toArray,
  isObject,
  isEqual,
  clone,
  each,
  keys,
  toPairs,
  assign,
  debounce,
  isNumber,
  isFunction,
  uniqBy,
  map,
  forEach: each,
};
window.ReactDOM = ReactDom;
window.React = React;
window.Component = Component;
window.Provider = Provider;
