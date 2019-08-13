/**
 * Dialog.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Utils from '../core/Utils';
import ContentTab from './ContentTab';
import LeavesTab from './LeavesTab';
import BackgroundTab from './BackgroundTab';
import { Fun, Merger } from '@ephox/katamari';
import { Editor } from 'tinymce/core/api/Editor';
import { insertOrUpdateInfoLeaves, readInfoLeavesDataFromSelection } from 'tinymce/plugins/infoleaves/core/InfoLeavesSelection';

const submitForm = (editor: Editor, evt) => {
  const win = evt.control.getRoot();

  editor.undoManager.transact(() => {
    const data = Merger.merge(readInfoLeavesDataFromSelection(editor), win.toJSON());
    insertOrUpdateInfoLeaves(editor, data);
  });
  ContentTab.registerText(editor);

};

export default function (editor) {
  function showDialog() {
    const data = readInfoLeavesDataFromSelection(editor);
    // let win;

    const body = [];

    body.push(ContentTab.makeTab(editor));
    body.push(LeavesTab.makeTab(editor));
    body.push(BackgroundTab.makeTab(editor));

    // Advanced dialog shows general+advanced tabs
    editor.windowManager.open({
      title: 'Inserir/editar infoleaves',
      data,
      bodyType: 'tabpanel',
      body,
      onSubmit: Fun.curry(submitForm, editor)
    });
  }

  function open() {
    Utils.createInfoLeavesList(editor, showDialog);
  }

  return {
    open
  };
}