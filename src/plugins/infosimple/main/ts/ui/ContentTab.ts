import Settings from '../api/Settings';
import { document, HTMLInputElement } from '@ephox/dom-globals';

const registerText = function (editor) {
  const cont = editor.getBody();
  const textSel = editor.selection.dom.get('info-simple');
  const ni = Settings.getNumberItems(editor) + 2;
  let addHtml = '';
  if (ni > 0) {
    for (let i = 2; i < ni; i++) {
      const bl = document.getElementById('bloco' + i) as HTMLInputElement;
      if (bl.value !== '') {
        const linkElm = editor.dom.createHTML('div', {
           id: 'contentBlock' + i,
           name: 'contentBlock' + i,
           class: 'item'
        }, bl.value );
        addHtml += linkElm;
      }
    }
    if (!textSel) {
        const objectList = editor.dom.createHTML('div', {class: 'items-list'}, addHtml);
        const divInfosimple = editor.dom.createHTML('div', { id: 'info-simple', class: 'info-simple', name: 'info-simple', contenteditable: 'false' }, objectList);
        if (addHtml !== '') {
           cont.innerHTML = divInfosimple;
        }
    } else {
      const objectList = editor.dom.createHTML('div', {class: 'items-list'}, addHtml);
      textSel.innerHTML = objectList;
    }
  }
};

const getContentItems = function (editor) {
    const generalContentItems = [];
    const ni = Settings.getNumberItems(editor) + 2;

    if (ni > 0) {
      let blocoValue = '';
      let indice = 0;
      for (let i = 2; i < ni; i++) {
        indice = i - 1;
        if (editor.dom.get('contentBlock' + i)) {
           blocoValue = editor.dom.get('contentBlock' + i).innerHTML;
        } else {
          blocoValue = '';
        }
        generalContentItems.push( { name: 'bloco' + i , id: 'bloco' + i, type: 'textbox', label: 'Bloco ' + indice, value:  blocoValue } );
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