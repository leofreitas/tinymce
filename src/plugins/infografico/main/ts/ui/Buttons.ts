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
  editor.addButton('infografico', {
    icon: false,
    text: 'Info box sequencial',
    tooltip: 'Inserir/editar infográfico',
    onclick: Dialog(editor).open
  });

  editor.addMenuItem('infografico', {
    icon: false,
    text: 'Info box sequencial',
    onclick: Dialog(editor).open,
    context: 'insert',
    prependToContext: true
  });
};

export default {
  register
};