/**
 * Atividades.js
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

const createAtividadeList = function (editorSettings, callback) {
  return function () {
    const atividadeList = Settings.getAtividades(editorSettings);

    if (typeof atividadeList === 'function') {
      atividadeList(callback);
      return;
    }

    if (typeof atividadeList === 'string') {
      XHR.send({
        url: atividadeList,
        success (text) {
          callback(JSON.parse(text));
        }
      });
    } else {
      callback(atividadeList);
    }
  };
};

const replaceAtividadeValues = function (editor, html, atividadeValues) {
  Tools.each(atividadeValues, function (v, k) {
    if (typeof v === 'function') {
      v = v(k);
    }

    html = html.replace(new RegExp('\\{\\$' + k + '\\}', 'g'), v);
  });

  return html;
};

const replaceVals = function (editor, e) {
  const dom = editor.dom, vl = Settings.getAtividadeReplaceValues(editor);

  Tools.each(dom.select('*', e), function (e) {
    Tools.each(vl, function (v, k) {
    if (dom.hasClass(e, k)) {
        if (typeof vl[k] === 'function') {
          vl[k](e);
        }
      }
    });
  });
};

// const hasClass = function (n, c) {
//  return new RegExp('\\b' + c + '\\b', 'g').test(n.className);
// };

const InsertAtividade = function (editor, ui, html) {
  let el;
//  let n;
  const dom = editor.dom;
//  const sel = editor.selection.getContent();

  html = replaceAtividadeValues(editor, html, Settings.getAtividadeReplaceValues(editor));
  el = dom.create('div', null, html);
  editor.insertContent('<div contentEditable="false">' + el.innerHTML + '</div>');

};

export default {
  createAtividadeList,
  replaceAtividadeValues,
  replaceVals,
  InsertAtividade
};