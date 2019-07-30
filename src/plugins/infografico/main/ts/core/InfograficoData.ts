/**
 * InfograficoData.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Utils from 'tinymce/plugins/infografico/core/Utils';
// import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
import { Merger } from '@ephox/katamari';
import { HTMLElement, Node, document } from '@ephox/dom-globals';

// const DOM = DOMUtils.DOM;

interface InfograficoData {
  typemarcador: string;
  numberitems: string;
  backgroundcolorbox: string;
  bordercolorbox: string;
  textcolorbox: string;
  style: string;
  shapeitems: string;
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
const isInfografico = (elm: Node) => elm.nodeName === 'IMG';

const defaultData = (): InfograficoData => {
  return {
    typemarcador: '',
    numberitems: '',
    backgroundcolorbox: '',
    bordercolorbox: '',
    textcolorbox: '',
    style: '',
    shapeitems: '',
    border: '',
    borderStyle: ''
  };
};

const getStyleValue = (normalizeCss: CssNormalizer, data: InfograficoData): string => {
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

const create = (normalizeCss: CssNormalizer, data: InfograficoData): HTMLElement => {
  const image = document.createElement('div');
  write(normalizeCss, Merger.merge(data, { caption: false }), image);

  setAttrib(image, 'typemarcador', data.typemarcador);
  setAttrib(image, 'numberitems', data.numberitems);
  setAttrib(image, 'backgroundcolorbox', data.backgroundcolorbox);
  setAttrib(image, 'bordercolorbox', data.bordercolorbox);
  setAttrib(image, 'textcolorbox', data.textcolorbox);
  setAttrib(image, 'shapeitems', data.shapeitems);
  return image;
};

const read = (normalizeCss: CssNormalizer, image: HTMLElement): InfograficoData => {
  return {
    typemarcador: getAttrib(image, 'typemarcador'),
    numberitems: getAttrib(image, 'numberitems'),
    backgroundcolorbox: getAttrib(image, 'backgroundcolorbox'),
    bordercolorbox: getAttrib(image, 'bordercolorbox'),
    textcolorbox: getAttrib(image, 'textcolorbox'),
    style: normalizeCss(getAttrib(image, 'style')),
    shapeitems: getAttrib(image, 'shapeitems'),
    border: getBorder(image),
    borderStyle: getStyle(image, 'borderStyle')
  };
};

const updateProp = (image: HTMLElement, oldData: InfograficoData, newData: InfograficoData, name: string, set: (image: HTMLElement, name: string, value: string) => void) => {
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

const write = (normalizeCss: CssNormalizer, newData: InfograficoData, image: HTMLElement) => {
  const oldData = read(normalizeCss, image);

  updateProp(image, oldData, newData, 'typemarcador', setAttrib);
  updateProp(image, oldData, newData, 'numberitems', setAttrib);
  updateProp(image, oldData, newData, 'backgroundcolorbox', setAttrib);
  updateProp(image, oldData, newData, 'bordercolorbox', setAttrib);
  updateProp(image, oldData, newData, 'textcolorbox', setAttrib);
  updateProp(image, oldData, newData, 'shapeitems', setAttrib);
  updateProp(image, oldData, newData, 'style', normalized((image, value) => setAttrib(image, 'style', value), normalizeCss));
  updateProp(image, oldData, newData, 'border', normalized(setBorder, normalizeCss));
  updateProp(image, oldData, newData, 'borderStyle', normalized(setBorderStyle, normalizeCss));
};

export {
  InfograficoData,
  getStyleValue,
  defaultData,
  isFigure,
  isInfografico,
  create,
  read,
  write
};
