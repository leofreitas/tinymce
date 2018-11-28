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
  plugins: 'atividade code',
  toolbar: 'plus code',
  skin_url: '../../../../../js/tinymce/skins/lightgray',
  height: 600,
  atividades: [
    { title: 'Atividade 1', description: 'Descrição da atividade 1', content: '<div id="id">Conteúdo da atividade 1</div>' },
    { title: 'Atividade 2', description: 'Descrição da atividade 2', content: 'Conteúdo da atividade 2' }
  ]
});

export {};