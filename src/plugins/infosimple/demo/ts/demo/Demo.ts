/**
 * Demo.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

declare let tinymce: any;

tinymce.init({
  selector: 'textarea.tinymce',
  extended_valid_elements: 'div[id|class|style|numberitems|backgroundcolorbox|bordercolorbox|textcolorbox|contenteditable]',
  theme: 'modern',
  skin_url: '../../../../../js/tinymce/skins/lightgray',
  plugins: 'infosimple code',
  toolbar: 'undo redo | image code',
  infosimples_dimensions: false,
  infosimple_advtab: true,
  infosimple_title: true,
  infosimple_number_items: 6,
  height: 600
});

export {};