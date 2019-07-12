/**
 * Buttons.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Dialog from './Dialog';

const register = function (editor) {
  editor.addButton('infotimeline', {
    icon: false,
    text: 'Linha do Tempo',
    tooltip: 'Inserir/editar Infotimeline',
    onclick: Dialog(editor).open
  });

  editor.addMenuItem('infotimeline', {
    icon: false,
    text: 'Linha do tempo',
    onclick: Dialog(editor).open,
    context: 'insert',
    prependToContext: true
  });
};

export default {
  register
};