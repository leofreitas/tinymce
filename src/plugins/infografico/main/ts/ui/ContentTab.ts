import Settings from '../api/Settings';
// import Utils from '../core/Utils';
// import { Editor } from 'tinymce/core/api/Editor';
// import { normalizeCss } from 'tinymce/plugins/infografico/core/InfograficoSelection';
// import { defaultData, getStyleValue } from 'tinymce/plugins/infografico/core/InfograficoData';
// import { Merger } from '@ephox/katamari';
import { document, HTMLInputElement } from '@ephox/dom-globals';
// import { document } from '@ephox/dom-globals';

const registerText = function (editor) {
  // const cont = editor.getBody();
  // console.log(editor.get('blk1'));

  const ni = Settings.getNumberItems(editor);
  let addHtml = '';
  if (ni > 0) {
    for (let i = 1; i <= ni; i++) {
      const bl = document.getElementById('bloco-' + i) as HTMLInputElement;
      if (bl.value !== '') {
        const linkElm = editor.dom.createHTML('div', {
           style: 'padding: 15px;  width: 80%; ',
           id: 'blk' + i,
            contenteditable: 'false'
        }, bl.value );
        addHtml += linkElm;
      }
    }
    const divMaster = editor.dom.createHTML('div', { id: 'divmaster', contenteditable: 'false' }, addHtml);
    // console.log(divMaster);
    if (addHtml !== '') {
      editor.execCommand('mceInsertContent', false, divMaster);
    }
  }
};

const getContentItems = function (editor) {
    const generalContentItems = [];
    const ni = Settings.getNumberItems(editor);

    if (ni > 0) {
        for (let i = 1; i <= ni; i++) {
            generalContentItems.push( { id: 'bloco-' + i, type: 'textbox', label: 'Bloco ' + i } );
           // editor.execCommand('mceInsertContent', true, '<div>Texto 1</div>');
           // editor.insertContent('<div id=div' + i + ' contentEditable="false">Texto bloco ' + i + '</div>');
        }
    }

    return generalContentItems;
};

const makeTab = function (editor) {
  return {
    title: 'Conteúdos',
    type: 'form',
    id: 'ContenTab',
    pack: 'start',
    items: getContentItems(editor)
  };
};

export default {
  makeTab,
  getContentItems,
  registerText
};