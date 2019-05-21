/**
 * InfoTimelineData.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Utils from 'tinymce/plugins/infotimeline/core/Utils';
// import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
import { Merger } from '@ephox/katamari';
import { HTMLElement, Node, document } from '@ephox/dom-globals';

// const DOM = DOMUtils.DOM;

interface InfoTimelineData {
  timeline: string;
  numberitems: string;
  backgroundcolorbox: string;
  bordercolorbox: string;
  textcolorbox: string;
  backgroundcolortimeline: string;
  bordercolortimeline: string;
  textcolortimeline: string;
  style: string;
  borderstyle: string;
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
/*
const wrapInFigure = (image: HTMLElement) => {
  const figureElm = DOM.create('figure', { class: 'image' });
  DOM.insertAfter(figureElm, image);

  figureElm.appendChild(image);
  figureElm.appendChild(DOM.create('figcaption', { contentEditable: true }, 'Caption'));
  figureElm.contentEditable = 'false';
};

const removeFigure = (image: HTMLElement) => {
  const figureElm = image.parentNode;
  DOM.insertAfter(image, figureElm);
  DOM.remove(figureElm);
};
const getSize = (image: HTMLElement, name: string): string => {
  if (image.style[name]) {
    return Utils.removePixelSuffix(image.style[name]);
  } else {
    return getAttrib(image, name);
  }
};
*/
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
const isInfoTimeline = (elm: Node) => elm.nodeName === 'IMG';

const defaultData = (): InfoTimelineData => {
  return {
    timeline: '',
    numberitems: '',
    backgroundcolorbox: '',
    bordercolorbox: '',
    textcolorbox: '',
    backgroundcolortimeline: '',
    bordercolortimeline: '',
    textcolortimeline: '',
    style: '',
    borderstyle: '',
    border: '',
    borderStyle: ''
  };
};

const getStyleValue = (normalizeCss: CssNormalizer, data: InfoTimelineData): string => {
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

const create = (normalizeCss: CssNormalizer, data: InfoTimelineData): HTMLElement => {
  const image = document.createElement('div');
  write(normalizeCss, Merger.merge(data, { caption: false }), image);

  setAttrib(image, 'timeline', data.timeline);
  setAttrib(image, 'numberitems', data.numberitems);
  setAttrib(image, 'backgroundcolorbox', data.backgroundcolorbox);
  setAttrib(image, 'bordercolorbox', data.bordercolorbox);
  setAttrib(image, 'textcolorbox', data.textcolorbox);
  setAttrib(image, 'backgroundcolortimeline', data.backgroundcolortimeline);
  setAttrib(image, 'bordercolortimeline', data.bordercolortimeline);
  setAttrib(image, 'textcolortimeline', data.textcolortimeline);
  setAttrib(image, 'borderstyle', data.borderstyle);
  return image;
};

const read = (normalizeCss: CssNormalizer, image: HTMLElement): InfoTimelineData => {
  return {
    timeline: getAttrib(image, 'timeline'),
    numberitems: getAttrib(image, 'numberitems'),
    backgroundcolorbox: getAttrib(image, 'backgroundcolorbox'),
    bordercolorbox: getAttrib(image, 'bordercolorbox'),
    textcolorbox: getAttrib(image, 'textcolorbox'),
    backgroundcolortimeline: getAttrib(image, 'backgroundcolortimeline'),
    bordercolortimeline: getAttrib(image, 'bordercolortimeline'),
    textcolortimeline: getAttrib(image, 'textcolortimeline'),
    style: normalizeCss(getAttrib(image, 'style')),
    borderstyle: getAttrib(image, 'borderstyle'),
    border: getBorder(image),
    borderStyle: getStyle(image, 'borderStyle')
  };
};

const updateProp = (image: HTMLElement, oldData: InfoTimelineData, newData: InfoTimelineData, name: string, set: (image: HTMLElement, name: string, value: string) => void) => {
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

const write = (normalizeCss: CssNormalizer, newData: InfoTimelineData, image: HTMLElement) => {
  const oldData = read(normalizeCss, image);

  updateProp(image, oldData, newData, 'timeline', setAttrib);
  updateProp(image, oldData, newData, 'numberitems', setAttrib);
  updateProp(image, oldData, newData, 'backgroundcolorbox', setAttrib);
  updateProp(image, oldData, newData, 'bordercolorbox', setAttrib);
  updateProp(image, oldData, newData, 'textcolorbox', setAttrib);
  updateProp(image, oldData, newData, 'backgroundcolortimeline', setAttrib);
  updateProp(image, oldData, newData, 'bordercolortimeline', setAttrib);
  updateProp(image, oldData, newData, 'textcolortimeline', setAttrib);
  updateProp(image, oldData, newData, 'borderstyle', setAttrib);
  updateProp(image, oldData, newData, 'style', normalized((image, value) => setAttrib(image, 'style', value), normalizeCss));
  updateProp(image, oldData, newData, 'border', normalized(setBorder, normalizeCss));
  updateProp(image, oldData, newData, 'borderStyle', normalized(setBorderStyle, normalizeCss));
};

export {
  InfoTimelineData,
  getStyleValue,
  defaultData,
  isFigure,
  isInfoTimeline,
  create,
  read,
  write
};
