/**
 * InfoLeavesSelection.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import { Editor } from 'tinymce/core/api/Editor';
import { defaultData, read, InfoLeavesData, create, isFigure, write } from 'tinymce/plugins/infoleaves/core/InfoLeavesData';
import Utils from 'tinymce/plugins/infoleaves/core/Utils';
import { HTMLElement } from '@ephox/dom-globals';

const normalizeCss = (editor: Editor, cssText: string): string => {
  const css = editor.dom.styles.parse(cssText);
  const mergedCss = Utils.mergeMargins(css);
  const compressed = editor.dom.styles.parse(editor.dom.styles.serialize(mergedCss));
  return editor.dom.styles.serialize(compressed);
};

const getSelectedInfoLeaves = (editor: Editor): HTMLElement => {
  // const imgElm = editor.selection.getNode() as HTMLElement;
  const textSel = editor.dom.get('info03-main');

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

const readInfoLeavesDataFromSelection = (editor: Editor): InfoLeavesData => {
  const componentHTML = getSelectedInfoLeaves(editor);
  return componentHTML ? read((css) => normalizeCss(editor, css), componentHTML) : defaultData();
};

const insertInfoLeavesAtCaret = (editor: Editor, data: InfoLeavesData) => {
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
const deleteInfoLeaves = (editor: Editor, componentHTML: HTMLElement) => {
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

const writeInfoLeavesDataToSelection = (editor: Editor, data: InfoLeavesData) => {
  const componentHTML = getSelectedInfoLeaves(editor);

  write((css) => normalizeCss(editor, css), data, componentHTML);

  if (isFigure(componentHTML.parentNode)) {
    const figure = componentHTML.parentNode as HTMLElement;
    splitTextBlock(editor, figure);
    editor.selection.select(componentHTML.parentNode);
  } else {
    editor.selection.select(componentHTML);
    Utils.waitLoadInfoLeaves(editor, data, componentHTML);
  }
};

const insertOrUpdateInfoLeaves = (editor: Editor, data: InfoLeavesData) => {
  const componentHTML = getSelectedInfoLeaves(editor);
  if (componentHTML) {
    // if (data.src) {
      writeInfoLeavesDataToSelection(editor, data);
    // } else {
    //   deleteInfoLeaves(editor, componentHTML);
    // }
  // } else if (data.src) {
  } else {
    insertInfoLeavesAtCaret(editor, data);
  }
};

export {
  normalizeCss,
  readInfoLeavesDataFromSelection,
  insertOrUpdateInfoLeaves
};
