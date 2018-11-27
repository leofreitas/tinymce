/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import DOMUtils from 'tinymce/core/api/dom/DOMUtils';

const getCreationDateClasses = function (editor) {
  return editor.getParam('atividade_cdate_classes', 'cdate');
};

const getModificationDateClasses = function (editor) {
  return editor.getParam('atividade_mdate_classes', 'mdate');
};

const getSelectedContentClasses = function (editor) {
  return editor.getParam('atividade_selected_content_classes', 'selcontent');
};

const getPreviewReplaceValues = function (editor) {
  return editor.getParam('atividade_preview_replace_values');
};

const getAtividadeReplaceValues = function (editor) {
  return editor.getParam('atividade_replace_values');
};

const getAtividades = function (editorSettings) {
  return editorSettings.atividades;
};

const getCdateFormat = function (editor) {
  return editor.getParam('atividade_cdate_format', editor.getLang('atividade.cdate_format'));
};

const getMdateFormat = function (editor) {
  return editor.getParam('atividade_mdate_format', editor.getLang('atividade.mdate_format'));
};

const getDialogWidth = function (editor) {
  return editor.getParam('atividade_popup_width', 600);
};

const getDialogHeight = function (editor) {
  return Math.min(DOMUtils.DOM.getViewPort().h, editor.getParam('atividade_popup_height', 500));
};

export default {
  getCreationDateClasses,
  getModificationDateClasses,
  getSelectedContentClasses,
  getPreviewReplaceValues,
  getAtividadeReplaceValues,
  getAtividades,
  getCdateFormat,
  getMdateFormat,
  getDialogWidth,
  getDialogHeight
};