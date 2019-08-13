/**
 * InfosimpleData.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Utils from 'tinymce/plugins/infosimple/core/Utils';
// import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
import { Merger } from '@ephox/katamari';
import { HTMLElement, Node, document } from '@ephox/dom-globals';

// const DOM = DOMUtils.DOM;

interface InfosimpleData {
  numberitems: string;
  colorN2: string;
  colorbackground: string;
  urlimagebackground: string;
  style: string;
  border: string;
  borderStyle: string;
}

type CssNormalizer = (css: string) => string;

const getBorder = (image: HTMLElement): string => {
  if (image.style.borderWidth) {
    return Utils.removePixelSuffix(image.style.borderWidth);
  } else {
    return '';
  }
};

const getAttrib = (image: HTMLElement, name: string): string => {
  if (image.hasAttribute(name)) {
    return image.getAttribute(name);
  } else {
    return '';
  }
};

const getStyle = (image: HTMLElement, name: string): string => {
  return image.style[name] ? image.style[name] : '';
};

const setAttrib = (image: HTMLElement, name: string, value: string) => {
  image.setAttribute(name, value);
};

const normalizeStyle = (image: HTMLElement, normalizeCss: CssNormalizer) => {
  const attrValue = image.getAttribute('style');
  const value = normalizeCss(attrValue !== null ? attrValue : '');

  if (value.length > 0) {
    image.setAttribute('style', value);
    image.setAttribute('data-mce-style', value);
  } else {
    image.removeAttribute('style');
  }
};

const setBorder = (image: HTMLElement, value: string) => {
  const pxValue = Utils.addPixelSuffix(value);
  image.style.borderWidth = pxValue;
};

const setBorderStyle = (image: HTMLElement, value: string) => {
  image.style.borderStyle = value;
};

const getBorderStyle = (image: HTMLElement) => getStyle(image, 'borderStyle');

const isFigure = (elm: Node) => elm.nodeName === 'FIGURE';
const isInfosimple = (elm: Node) => elm.nodeName === 'IMG';

const defaultData = (): InfosimpleData => {
  return {
    numberitems: '',
    colorN2: '',
    colorbackground: '',
    urlimagebackground: '',
    style: '',
    border: '',
    borderStyle: ''
  };
};

const getStyleValue = (normalizeCss: CssNormalizer, data: InfosimpleData): string => {
  const image = document.createElement('div');

  setAttrib(image, 'style', data.style);

  if (getBorder(image) || data.border !== '') {
    setBorder(image, data.border);
  }

  if (getBorderStyle(image) || data.borderStyle !== '') {
    setBorderStyle(image, data.borderStyle);
  }

  return normalizeCss(image.getAttribute('style'));
};

const create = (normalizeCss: CssNormalizer, data: InfosimpleData): HTMLElement => {
  const image = document.createElement('div');
  write(normalizeCss, Merger.merge(data, { caption: false }), image);

  setAttrib(image, 'numberitems', data.numberitems);
  setAttrib(image, 'colorN2', data.colorN2);
  setAttrib(image, 'colorbackground', data.colorbackground);
  setAttrib(image, 'urlimagebackground', data.urlimagebackground);
  return image;
};

const read = (normalizeCss: CssNormalizer, image: HTMLElement): InfosimpleData => {
  return {
    numberitems: getAttrib(image, 'numberitems'),
    colorN2: getAttrib(image, 'colorN2'),
    colorbackground: getAttrib(image, 'colorbackground'),
    urlimagebackground: getAttrib(image, 'urlimagebackground'),
    style: normalizeCss(getAttrib(image, 'style')),
    border: getBorder(image),
    borderStyle: getStyle(image, 'borderStyle')
  };
};

const updateProp = (image: HTMLElement, oldData: InfosimpleData, newData: InfosimpleData, name: string, set: (image: HTMLElement, name: string, value: string) => void) => {
  if (newData[name] !== oldData[name]) {
    set(image, name, newData[name]);
  }
};

const normalized = (set: (image: HTMLElement, value: string) => void, normalizeCss: CssNormalizer) => {
  return (image: HTMLElement, name: string, value: string) => {
    set(image, value);
    normalizeStyle(image, normalizeCss);
  };
};

const write = (normalizeCss: CssNormalizer, newData: InfosimpleData, image: HTMLElement) => {
  const oldData = read(normalizeCss, image);

  updateProp(image, oldData, newData, 'numberitems', setAttrib);
  updateProp(image, oldData, newData, 'colorN2', setAttrib);
  updateProp(image, oldData, newData, 'colorbackground', setAttrib);
  updateProp(image, oldData, newData, 'urlimagebackground', setAttrib);
  updateProp(image, oldData, newData, 'style', normalized((image, value) => setAttrib(image, 'style', value), normalizeCss));
  updateProp(image, oldData, newData, 'border', normalized(setBorder, normalizeCss));
  updateProp(image, oldData, newData, 'borderStyle', normalized(setBorderStyle, normalizeCss));
};

export {
  InfosimpleData,
  getStyleValue,
  defaultData,
  isFigure,
  isInfosimple,
  create,
  read,
  write
};
