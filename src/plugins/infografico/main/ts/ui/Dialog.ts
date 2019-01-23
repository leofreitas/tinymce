/**
 * Dialog.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Settings from '../api/Settings';
import Utils from '../core/Utils';
import MarcadorTab from './MarcadorTab';
import BoxTab from './BoxTab';
import ContentTab from './ContentTab';
import MainTab from './MainTab';
import SizeManager from './SizeManager';
import UploadTab from './UploadTab';
import { Fun, Merger } from '@ephox/katamari';
import { Editor } from 'tinymce/core/api/Editor';
import { insertOrUpdateInfografico, readInfograficoDataFromSelection } from 'tinymce/plugins/infografico/core/InfograficoSelection';

const submitForm = (editor: Editor, evt) => {
  const win = evt.control.getRoot();

  SizeManager.updateSize(win);

  editor.undoManager.transact(() => {
    const data = Merger.merge(readInfograficoDataFromSelection(editor), win.toJSON());
    insertOrUpdateInfografico(editor, data);
  });

  editor.editorUpload.uploadImagesAuto();
};

export default function (editor) {
  function showDialog(imageList) {
    const data = readInfograficoDataFromSelection(editor);
    let win, imageListCtrl;

    if (imageList) {
      imageListCtrl = {
        type: 'listbox',
        label: 'Infografico list',
        name: 'image-list',
        values: Utils.buildListItems(
          imageList,
          function (item) {
            item.value = editor.convertURL(item.value || item.url, 'src');
          },
          [{ text: 'None', value: '' }]
        ),
        value: data.src && editor.convertURL(data.src, 'src'),
        onselect (e) {
          const altCtrl = win.find('#alt');

          if (!altCtrl.value() || (e.lastControl && altCtrl.value() === e.lastControl.text())) {
            altCtrl.value(e.control.text());
          }

          win.find('#src').value(e.control.value()).fire('change');
        },
        onPostRender () {
          /*eslint consistent-this: 0*/
          imageListCtrl = this;
        }
      };
    }

    if (!Settings.hasUploadUrl(editor) || Settings.hasUploadHandler(editor)) {
      const body = [
        MainTab.makeTab(editor, imageListCtrl)
      ];

      body.push(MarcadorTab.makeTab(editor));
      body.push(BoxTab.makeTab(editor));
      body.push(ContentTab.makeTab(editor));

      if (Settings.hasUploadUrl(editor) || Settings.hasUploadHandler(editor)) {
        body.push(UploadTab.makeTab(editor));
      }

      // Advanced dialog shows general+advanced tabs
      win = editor.windowManager.open({
        title: 'Inserir/editar infográfico',
        data,
        bodyType: 'tabpanel',
        body,
        onSubmit: Fun.curry(submitForm, editor)
      });
    } else {
      // Simple default dialog
      win = editor.windowManager.open({
        title: 'Inserir/editar infográfico',
        data,
        body: MainTab.getGeneralItems(editor, imageListCtrl),
        onSubmit: Fun.curry(submitForm, editor)
      });
    }

    SizeManager.syncSize(win);
  }

  function open() {
    Utils.createInfograficoList(editor, showDialog);
  }

  return {
    open
  };
}