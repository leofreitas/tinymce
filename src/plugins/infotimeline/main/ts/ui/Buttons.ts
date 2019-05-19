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
  editor.addButton('image', {
    icon: 'image',
    tooltip: 'Inserir/editar infotimeline',
    onclick: Dialog(editor).open,
    stateSelector: 'img:not([data-mce-object],[data-mce-placeholder]),figure.image'
  });

  editor.addMenuItem('image', {
    icon: 'image',
    text: 'InfoTimeline',
    onclick: Dialog(editor).open,
    context: 'insert',
    prependToContext: true
  });
};

export default {
  register
};