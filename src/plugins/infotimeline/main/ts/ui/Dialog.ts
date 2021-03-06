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
import BoxTab from './BoxTab';
import BackgroundTab from './BackgroundTab';
import ContentTab from './ContentTab';
import TimelineTab from './TimelineTab';
import { Fun, Merger } from '@ephox/katamari';
import { Editor } from 'tinymce/core/api/Editor';
import { insertOrUpdateInfoTimeline, readInfoTimelineDataFromSelection } from 'tinymce/plugins/infotimeline/core/InfoTimelineSelection';

const submitForm = (editor: Editor, evt) => {
  const win = evt.control.getRoot();

  editor.undoManager.transact(() => {
    const data = Merger.merge(readInfoTimelineDataFromSelection(editor), win.toJSON());
    insertOrUpdateInfoTimeline(editor, data);
  });
  ContentTab.registerText(editor);

};

export default function (editor) {
  function showDialog() {
    const data = readInfoTimelineDataFromSelection(editor);
    // let win;

    const body = [];

    body.push(ContentTab.makeTab(editor));
    body.push(TimelineTab.makeTab(editor));
    body.push(BoxTab.makeTab(editor));
    body.push(BackgroundTab.makeTab(editor));

    // Advanced dialog shows general+advanced tabs
    editor.windowManager.open({
      title: 'Inserir/editar infotimeline',
      data,
      bodyType: 'tabpanel',
      body,
      onSubmit: Fun.curry(submitForm, editor)
    });
  }

  function open() {
    Utils.createInfoTimelineList(editor, showDialog);
  }

  return {
    open
  };
}