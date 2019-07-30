/**
 * InfosimpleSelection.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import { Editor } from 'tinymce/core/api/Editor';
import { defaultData, read, InfosimpleData, create, isFigure, write } from 'tinymce/plugins/infosimple/core/InfosimpleData';
import Utils from 'tinymce/plugins/infosimple/core/Utils';
import { HTMLElement } from '@ephox/dom-globals';

const normalizeCss = (editor: Editor, cssText: string): string => {
  const css = editor.dom.styles.parse(cssText);
  const mergedCss = Utils.mergeMargins(css);
  const compressed = editor.dom.styles.parse(editor.dom.styles.serialize(mergedCss));
  return editor.dom.styles.serialize(compressed);
};

const getSelectedInfosimple = (editor: Editor): HTMLElement => {
  // const imgElm = editor.selection.getNode() as HTMLElement;
  const textSel = editor.dom.get('info-box-upright');

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

const readInfosimpleDataFromSelection = (editor: Editor): InfosimpleData => {
  const componentHTML = getSelectedInfosimple(editor);
  return componentHTML ? read((css) => normalizeCss(editor, css), componentHTML) : defaultData();
};

const insertInfosimpleAtCaret = (editor: Editor, data: InfosimpleData) => {
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
/*
const deleteInfosimple = (editor: Editor, componentHTML: HTMLElement) => {
  if (componentHTML) {
    const elm = editor.dom.is(componentHTML.parentNode, 'figure.image') ? componentHTML.parentNode : componentHTML;

    editor.dom.remove(elm);
    editor.focus();
    editor.nodeChanged();

    if (editor.dom.isEmpty(editor.getBody())) {
      editor.setContent('');
      editor.selection.setCursorLocation();
    }
  }
};
*/

const writeInfosimpleDataToSelection = (editor: Editor, data: InfosimpleData) => {
  const componentHTML = getSelectedInfosimple(editor);

  write((css) => normalizeCss(editor, css), data, componentHTML);

  if (isFigure(componentHTML.parentNode)) {
    const figure = componentHTML.parentNode as HTMLElement;
    splitTextBlock(editor, figure);
    editor.selection.select(componentHTML.parentNode);
  } else {
    editor.selection.select(componentHTML);
    Utils.waitLoadInfosimple(editor, data, componentHTML);
  }
};

const insertOrUpdateInfosimple = (editor: Editor, data: InfosimpleData) => {
  const componentHTML = getSelectedInfosimple(editor);
  if (componentHTML) {
    // if (data.src) {
      writeInfosimpleDataToSelection(editor, data);
    // } else {
    //   deleteInfosimple(editor, componentHTML);
    // }
  // } else if (data.src) {
  } else {
    insertInfosimpleAtCaret(editor, data);
  }
};

export {
  normalizeCss,
  readInfosimpleDataFromSelection,
  insertOrUpdateInfosimple
};
