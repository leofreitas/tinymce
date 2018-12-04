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

const getDialogWidth = function (editor) {
  return editor.getParam('atividade_popup_width', 600);
};

const getDialogHeight = function (editor) {
  return Math.min(DOMUtils.DOM.getViewPort().h, editor.getParam('atividade_popup_height', 500));
};

export default {
  getSelectedContentClasses,
  getPreviewReplaceValues,
  getAtividadeReplaceValues,
  getAtividades,
  getDialogWidth,
  getDialogHeight
};