/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Editor } from 'tinymce/core/api/Editor';

type ColorPickerCallback = (editor: Editor, pickValue: (value: string) => void, value: string) => void;

const getColorPickerCallback = (editor: Editor): ColorPickerCallback => editor.getParam('color_picker_callback');

const hasDimensions = function (editor) {
  return editor.settings.infosimples_dimensions === false ? false : true;
};

const getNumberItems = function (editor) {
  return editor.settings.infosimple_number_items;
};

const hasDescription = function (editor) {
  return editor.settings.infosimples_description === false ? false : true;
};

const hasInfosimpleTitle = function (editor) {
  return editor.settings.infosimples_title === true ? true : false;
};

const hasInfosimpleCaption = function (editor) {
  return editor.settings.infosimples_caption === true ? true : false;
};

const getInfosimpleList = function (editor) {
  return editor.getParam('infosimple_list', false);
};


export default {
  hasDimensions,
  getNumberItems,
  hasDescription,
  hasInfosimpleTitle,
  hasInfosimpleCaption,
  getInfosimpleList,
  getColorPickerCallback
};