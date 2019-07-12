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
  extended_valid_elements: 'div[id|class|style|borderstyle|numberitems|leafcolor1|leafcolor2|leafcolor3|leafcolor4|leafcolor5|leafcolor6|leafcolor7|contenteditable],span[id|class], ul[class]',
  theme: 'modern',
  skin_url: '../../../../../js/tinymce/skins/lightgray',
  plugins: 'infoleaves code',
  toolbar: 'undo redo | infoleaves code',
  infograficos_dimensions: false,
  infografico_advtab: true,
  infografico_title: true,
  infografico_class_list: [
    { title: 'Nenhum', value: '' },
    { title: 'Estreita', value: 'estreita' },
    { title: 'Larga', value: 'larga' }
  ],
  infografico_number_items: 7,
  height: 600
});

export {};