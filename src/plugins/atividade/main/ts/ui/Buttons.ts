/**
 * Buttons.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Atividades from '../core/Atividades';
import Dialog from './Dialog';

const showDialog = function (editor) {
  return function (atividades) {
    Dialog.open(editor, atividades);
  };
};

const register = function (editor) {
  editor.addButton('template', {
    title: 'Insere atividade',
    onclick: Atividades.createAtividadeList(editor.settings, showDialog(editor))
  });

  editor.addMenuItem('atividade', {
    text: 'Atividade',
    onclick: Atividades.createAtividadeList(editor.settings, showDialog(editor)),
    icon: 'plus',
    context: 'insert'
  });
};

export default {
  register
};