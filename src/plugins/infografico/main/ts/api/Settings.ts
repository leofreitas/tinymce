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
  return editor.settings.infograficos_dimensions === false ? false : true;
};

const getPrependUrl = function (editor) {
  return editor.getParam('infografico_prepend_url', '');
};

const getClassList = function (editor) {
  return editor.getParam('infografico_class_list');
};

const getNumberItems = function (editor) {
  return editor.settings.infografico_number_items;
};

const hasDescription = function (editor) {
  return editor.settings.infograficos_description === false ? false : true;
};

const hasInfograficoTitle = function (editor) {
  return editor.settings.infograficos_title === true ? true : false;
};

const hasInfograficoCaption = function (editor) {
  return editor.settings.infograficos_caption === true ? true : false;
};

const getInfograficoList = function (editor) {
  return editor.getParam('infografico_list', false);
};

const hasUploadUrl = function (editor) {
  return editor.getParam('infograficos_upload_url', false);
};

const hasUploadHandler = function (editor) {
  return editor.getParam('infograficos_upload_handler', false);
};

const getUploadUrl = function (editor) {
  return editor.getParam('infograficos_upload_url');
};

const getUploadHandler = function (editor) {
  return editor.getParam('infograficos_upload_handler');
};

const getUploadBasePath = function (editor) {
  return editor.getParam('infograficos_upload_base_path');
};

const getUploadCredentials = function (editor) {
  return editor.getParam('infograficos_upload_credentials');
};

export default {
  hasDimensions,
  getPrependUrl,
  getClassList,
  getNumberItems,
  hasDescription,
  hasInfograficoTitle,
  hasInfograficoCaption,
  getInfograficoList,
  hasUploadUrl,
  hasUploadHandler,
  getUploadUrl,
  getUploadHandler,
  getUploadBasePath,
  getUploadCredentials,
  getColorPickerCallback
};