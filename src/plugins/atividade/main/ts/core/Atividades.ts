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
import DateTimeHelper from './DateTimeHelper';

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

const hasClass = function (n, c) {
  return new RegExp('\\b' + c + '\\b', 'g').test(n.className);
};

const InsertAtividade = function (editor, ui, html) {
  let el;
  let n;
  const dom = editor.dom;
  const sel = editor.selection.getContent();

  html = replaceAtividadeValues(editor, html, Settings.getAtividadeReplaceValues(editor));
  el = dom.create('div', null, html);

    // Find template element within div
  n = dom.select('.mceTmpl', el);
  if (n && n.length > 0) {
    el = dom.create('div', null);
    el.appendChild(n[0].cloneNode(true));
  }

  Tools.each(dom.select('*', el), function (n) {
    // Replace cdate
    if (hasClass(n, Settings.getCreationDateClasses(editor).replace(/\s+/g, '|'))) {
      n.innerHTML = DateTimeHelper.getDateTime(editor, Settings.getCdateFormat(editor));
    }

    // Replace mdate
    if (hasClass(n, Settings.getModificationDateClasses(editor).replace(/\s+/g, '|'))) {
      n.innerHTML = DateTimeHelper.getDateTime(editor, Settings.getMdateFormat(editor));
    }

    // Replace selection
    if (hasClass(n, Settings.getSelectedContentClasses(editor).replace(/\s+/g, '|'))) {
      n.innerHTML = sel;
    }
  });

  replaceVals(editor, el);

  editor.execCommand('mceInsertContent', false, el.innerHTML);
  editor.addVisual();
};

export default {
  createAtividadeList,
  replaceAtividadeValues,
  replaceVals,
  InsertAtividade
};