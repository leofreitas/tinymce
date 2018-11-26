/**
 * Dialog.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Tools from 'tinymce/core/api/util/Tools';
import XHR from 'tinymce/core/api/util/XHR';
import Settings from '../api/Settings';
import Atividades from '../core/Atividades';

const insertIframeHtml = function (editor, win, html) {
  if (html.indexOf('<html>') === -1) {
    let contentCssLinks = '';

    Tools.each(editor.contentCSS, function (url) {
      contentCssLinks += '<link type="text/css" rel="stylesheet" href="' +
              editor.documentBaseURI.toAbsolute(url) +
              '">';
    });

    let bodyClass = editor.settings.body_class || '';
    if (bodyClass.indexOf('=') !== -1) {
      bodyClass = editor.getParam('body_class', '', 'hash');
      bodyClass = bodyClass[editor.id] || '';
    }

    html = (
            '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            contentCssLinks +
            '</head>' +
            '<body class="' + bodyClass + '">' +
            html +
            '</body>' +
            '</html>'
          );
  }

  html = Atividades.replaceAtividadeValues(editor, html, Settings.getPreviewReplaceValues(editor));

  const doc = win.find('iframe')[0].getEl().contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
};

const open = function (editor, atividadeList) {
  let win;
  const values = [];
  let atividadeHTML;

  if (!atividadeList || atividadeList.length === 0) {
    const message = editor.translate('Nenhuma atividade selecionada.');
    editor.notificationManager.open({ text: message, type: 'info' });
    return;
  }

  Tools.each(atividadeList, function (atividade) {
    values.push({
      selected: !values.length,
      text: atividade.title,
      value: {
        url: atividade.url,
        content: atividade.content,
        description: atividade.description
      }
    });
  });

  const onSelectAtividade = function (e) {
    const value = e.control.value();

    if (value.url) {
      XHR.send({
        url: value.url,
        success (html) {
          atividadeHTML = html;
          insertIframeHtml(editor, win, atividadeHTML);
        }
      });
    } else {
      atividadeHTML = value.content;
      insertIframeHtml(editor, win, atividadeHTML);
    }

    win.find('#description')[0].text(e.control.value().description);
  };

  win = editor.windowManager.open({
    title: 'Insere Atividade',
    layout: 'flex',
    direction: 'column',
    align: 'stretch',
    padding: 15,
    spacing: 10,
    items: [
      {
        type: 'form',
        flex: 0,
        padding: 0,
        items: [
          {
            type: 'container',
            label: 'Atividades',
            items: {
              type: 'listbox',
              label: 'Atividades',
              name: 'atividade',
              values,
              onselect: onSelectAtividade
            }
          }
        ]
      },
      {
        type: 'label',
        name: 'description',
        label: 'Description',
        text: '\u00a0'
      },
      {
        type: 'iframe',
        flex: 1,
        border: 1
      }
    ],

    onsubmit () {
      Atividades.InsertAtividade(editor, false, atividadeHTML);
    },

    minWidth: Settings.getDialogWidth(editor),
    minHeight: Settings.getDialogHeight(editor)
  });

  win.find('listbox')[0].fire('select');
};

export default {
  open
};