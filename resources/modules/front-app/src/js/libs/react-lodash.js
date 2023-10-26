import ReactDom from 'react-dom';
import React, {Component, Suspense, Fragment,} from 'react';
import * as reactRedux  from 'react-redux'
import styled, {createGlobalStyle, css} from 'styled-components'
import  * as st  from 'styled-components'
import cloneDeep from 'lodash.clonedeep';
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
import sortBy  from 'lodash.sortby';
import map  from 'lodash.map';
import reverse  from 'lodash.reverse';

window._ = {
  cloneDeep,
  get,
  set,
  sortBy,
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
  forEach: each,
  keys,
  toPairs,
  assign,
  debounce,
  isNumber,
  isFunction,
  uniqBy,
  map,
  reverse,
};
window.ReactDOM = ReactDom;
window.React = React;
window.Component = Component;
window.Suspense = Suspense;
window.Fragment = Fragment;
window.Provider = reactRedux.Provider;
window.reactRedux = reactRedux;
window.styled = styled;
window.createGlobalStyle = createGlobalStyle;
window.css = css;
if(window.SSR){
  global.ReactDOM = ReactDom;
  global.React = React;
  global.Component = Component;
  global.Suspense = Suspense;
  global.Fragment = Fragment;
  global.Provider = reactRedux.Provider;
  global.reactRedux = reactRedux;
  global.styled = styled;
  global.createGlobalStyle = createGlobalStyle;
}
