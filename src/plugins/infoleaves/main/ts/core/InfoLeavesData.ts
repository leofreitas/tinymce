/**
 * InfoLeavesData.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Utils from 'tinymce/plugins/infoleaves/core/Utils';
// import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
import { Merger } from '@ephox/katamari';
import { HTMLElement, Node, document } from '@ephox/dom-globals';

// const DOM = DOMUtils.DOM;

interface InfoLeavesData {
  numberitems: string;
  leafcolor1: string;
  leafcolor2: string;
  leafcolor3: string;
  leafcolor4: string;
  leafcolor5: string;
  leafcolor6: string;
  leafcolor7: string;
  style: string;
  borderstyle: string;
  border: string;
  borderStyle: string;
}

type CssNormalizer = (css: string) => string;

const getBorder = (objLeaf: HTMLElement): string => {
  if (objLeaf.style.borderWidth) {
    return Utils.removePixelSuffix(objLeaf.style.borderWidth);
  } else {
    return '';
  }
};

const getAttrib = (objLeaf: HTMLElement, name: string): string => {
  if (objLeaf.hasAttribute(name)) {
    return objLeaf.getAttribute(name);
  } else {
    return '';
  }
};

const getStyle = (objLeaf: HTMLElement, name: string): string => {
  return objLeaf.style[name] ? objLeaf.style[name] : '';
};

const setAttrib = (objLeaf: HTMLElement, name: string, value: string) => {
  objLeaf.setAttribute(name, value);
};

const normalizeStyle = (objLeaf: HTMLElement, normalizeCss: CssNormalizer) => {
  const attrValue = objLeaf.getAttribute('style');
  const value = normalizeCss(attrValue !== null ? attrValue : '');

  if (value.length > 0) {
    objLeaf.setAttribute('style', value);
    objLeaf.setAttribute('data-mce-style', value);
  } else {
    objLeaf.removeAttribute('style');
  }
};

const setBorder = (objLeaf: HTMLElement, value: string) => {
  const pxValue = Utils.addPixelSuffix(value);
  objLeaf.style.borderWidth = pxValue;
};

const setBorderStyle = (objLeaf: HTMLElement, value: string) => {
  objLeaf.style.borderStyle = value;
};

const getBorderStyle = (objLeaf: HTMLElement) => getStyle(objLeaf, 'borderStyle');

const isFigure = (elm: Node) => elm.nodeName === 'FIGURE';
const isInfoLeaves = (elm: Node) => elm.nodeName === 'IMG';

const defaultData = (): InfoLeavesData => {
  return {
    numberitems: '',
    leafcolor1: '',
    leafcolor2: '',
    leafcolor3: '',
    leafcolor4: '',
    leafcolor5: '',
    leafcolor6: '',
    leafcolor7: '',
    style: '',
    borderstyle: '',
    border: '',
    borderStyle: ''
  };
};

const getStyleValue = (normalizeCss: CssNormalizer, data: InfoLeavesData): string => {
  const objLeaf = document.createElement('div');

  setAttrib(objLeaf, 'style', data.style);

  if (getBorder(objLeaf) || data.border !== '') {
    setBorder(objLeaf, data.border);
  }

  if (getBorderStyle(objLeaf) || data.borderStyle !== '') {
    setBorderStyle(objLeaf, data.borderStyle);
  }

  return normalizeCss(objLeaf.getAttribute('style'));
};

const create = (normalizeCss: CssNormalizer, data: InfoLeavesData): HTMLElement => {
  const objLeaf = document.createElement('div');
  write(normalizeCss, Merger.merge(data, { caption: false }), objLeaf);

  setAttrib(objLeaf, 'numberitems', data.numberitems);
  setAttrib(objLeaf, 'leafcolor1', data.leafcolor1);
  setAttrib(objLeaf, 'leafcolor2', data.leafcolor2);
  setAttrib(objLeaf, 'leafcolor3', data.leafcolor3);
  setAttrib(objLeaf, 'leafcolor4', data.leafcolor4);
  setAttrib(objLeaf, 'leafcolor5', data.leafcolor5);
  setAttrib(objLeaf, 'leafcolor6', data.leafcolor6);
  setAttrib(objLeaf, 'leafcolor7', data.leafcolor7);
  setAttrib(objLeaf, 'borderstyle', data.borderstyle);
  return objLeaf;
};

const read = (normalizeCss: CssNormalizer, objLeaf: HTMLElement): InfoLeavesData => {
  return {
    numberitems: getAttrib(objLeaf, 'numberitems'),
    leafcolor1: getAttrib(objLeaf, 'leafcolor1'),
    leafcolor2: getAttrib(objLeaf, 'leafcolor2'),
    leafcolor3: getAttrib(objLeaf, 'leafcolor3'),
    leafcolor4: getAttrib(objLeaf, 'leafcolor4'),
    leafcolor5: getAttrib(objLeaf, 'leafcolor5'),
    leafcolor6: getAttrib(objLeaf, 'leafcolor6'),
    leafcolor7: getAttrib(objLeaf, 'leafcolor7'),
    style: normalizeCss(getAttrib(objLeaf, 'style')),
    borderstyle: getAttrib(objLeaf, 'borderstyle'),
    border: getBorder(objLeaf),
    borderStyle: getStyle(objLeaf, 'borderStyle')
  };
};

const updateProp = (objLeaf: HTMLElement, oldData: InfoLeavesData, newData: InfoLeavesData, name: string, set: (objLeaf: HTMLElement, name: string, value: string) => void) => {
  if (newData[name] !== oldData[name]) {
    set(objLeaf, name, newData[name]);
  }
};

const normalized = (set: (objLeaf: HTMLElement, value: string) => void, normalizeCss: CssNormalizer) => {
  return (objLeaf: HTMLElement, name: string, value: string) => {
    set(objLeaf, value);
    normalizeStyle(objLeaf, normalizeCss);
  };
};

const write = (normalizeCss: CssNormalizer, newData: InfoLeavesData, objLeaf: HTMLElement) => {
  const oldData = read(normalizeCss, objLeaf);

  updateProp(objLeaf, oldData, newData, 'numberitems', setAttrib);
  updateProp(objLeaf, oldData, newData, 'leafcolor1', setAttrib);
  updateProp(objLeaf, oldData, newData, 'leafcolor2', setAttrib);
  updateProp(objLeaf, oldData, newData, 'leafcolor3', setAttrib);
  updateProp(objLeaf, oldData, newData, 'leafcolor4', setAttrib);
  updateProp(objLeaf, oldData, newData, 'leafcolor5', setAttrib);
  updateProp(objLeaf, oldData, newData, 'leafcolor6', setAttrib);
  updateProp(objLeaf, oldData, newData, 'leafcolor7', setAttrib);
  updateProp(objLeaf, oldData, newData, 'borderstyle', setAttrib);
  updateProp(objLeaf, oldData, newData, 'style', normalized((objLeaf, value) => setAttrib(objLeaf, 'style', value), normalizeCss));
  updateProp(objLeaf, oldData, newData, 'border', normalized(setBorder, normalizeCss));
  updateProp(objLeaf, oldData, newData, 'borderStyle', normalized(setBorderStyle, normalizeCss));
};

export {
  InfoLeavesData,
  getStyleValue,
  defaultData,
  isFigure,
  isInfoLeaves,
  create,
  read,
  write
};
