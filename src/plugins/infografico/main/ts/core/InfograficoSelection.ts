/**
 * InfograficoSelection.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import { Editor } from 'tinymce/core/api/Editor';
import { defaultData, read, InfograficoData, create, isFigure, write } from 'tinymce/plugins/infografico/core/InfograficoData';
import Utils from 'tinymce/plugins/infografico/core/Utils';
import { HTMLElement } from '@ephox/dom-globals';

const normalizeCss = (editor: Editor, cssText: string): string => {
  const css = editor.dom.styles.parse(cssText);
  const mergedCss = Utils.mergeMargins(css);
  const compressed = editor.dom.styles.parse(editor.dom.styles.serialize(mergedCss));
  return editor.dom.styles.serialize(compressed);
};

const getSelectedInfografico = (editor: Editor): HTMLElement => {
  const textSel = editor.dom.get('info-box-flat');
  return textSel;
};

const splitTextBlock = (editor: Editor, componentHTML: HTMLElement) => {
  const dom = editor.dom;

  const textBlock = dom.getParent(componentHTML.parentNode, function (node) {
    return editor.schema.getTextBlockElements()[node.nodeName];
  }, editor.getBody());

  if (textBlock) {
    return dom.split(textBlock, componentHTML);
  } else {
    return componentHTML;
  }
};

const readInfograficoDataFromSelection = (editor: Editor): InfograficoData => {
  const componentHTML = getSelectedInfografico(editor);
  return componentHTML ? read((css) => normalizeCss(editor, css), componentHTML) : defaultData();
};

const insertInfograficoAtCaret = (editor: Editor, data: InfograficoData) => {
  const elm = create((css) => normalizeCss(editor, css), data);

  editor.dom.setAttrib(elm, 'data-mce-id', '__mcenew');
  editor.focus();
  editor.selection.setContent(elm.outerHTML);

  const insertedElm = editor.dom.select('*[data-mce-id="__mcenew"]')[0];
  editor.dom.setAttrib(insertedElm, 'data-mce-id', null);

  if (isFigure(insertedElm)) {
    const figure = splitTextBlock(editor, insertedElm);
    editor.selection.select(figure);
  } else {
    editor.selection.select(insertedElm);
  }
};

const writeInfograficoDataToSelection = (editor: Editor, data: InfograficoData) => {
  const componentHTML = getSelectedInfografico(editor);

  write((css) => normalizeCss(editor, css), data, componentHTML);

  if (isFigure(componentHTML.parentNode)) {
    const figure = componentHTML.parentNode as HTMLElement;
    splitTextBlock(editor, figure);
    editor.selection.select(componentHTML.parentNode);
  } else {
    editor.selection.select(componentHTML);
    Utils.waitLoadInfografico(editor, data, componentHTML);
  }
};

const insertOrUpdateInfografico = (editor: Editor, data: InfograficoData) => {
  const componentHTML = getSelectedInfografico(editor);
  if (componentHTML) {
      writeInfograficoDataToSelection(editor, data);
  } else {
    insertInfograficoAtCaret(editor, data);
  }
};

export {
  normalizeCss,
  readInfograficoDataFromSelection,
  insertOrUpdateInfografico
};
