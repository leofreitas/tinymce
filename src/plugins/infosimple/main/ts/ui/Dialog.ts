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
import BackgroundTab from './BackgroundTab';
import ContentTab from './ContentTab';
import { Fun, Merger } from '@ephox/katamari';
import { Editor } from 'tinymce/core/api/Editor';
import { insertOrUpdateInfosimple, readInfosimpleDataFromSelection } from 'tinymce/plugins/infosimple/core/InfosimpleSelection';

const submitForm = (editor: Editor, evt) => {
  const win = evt.control.getRoot();

  editor.undoManager.transact(() => {
    const data = Merger.merge(readInfosimpleDataFromSelection(editor), win.toJSON());
    insertOrUpdateInfosimple(editor, data);
  });
  ContentTab.registerText(editor);

};

export default function (editor) {
  function showDialog() {
    const data = readInfosimpleDataFromSelection(editor);
    // let win;

    const body = [];

    body.push(ContentTab.makeTab(editor));
    body.push(BackgroundTab.makeTab(editor));

    // Advanced dialog shows general+advanced tabs
    editor.windowManager.open({
      title: 'Inserir/editar infográfico',
      data,
      bodyType: 'tabpanel',
      body,
      onSubmit: Fun.curry(submitForm, editor)
    });
  }

  function open() {
    Utils.createInfosimpleList(editor, showDialog);
  }

  return {
    open
  };
}