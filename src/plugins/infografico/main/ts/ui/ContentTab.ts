import Settings from '../api/Settings';
import { document, HTMLInputElement } from '@ephox/dom-globals';

const registerText = function (editor) {
  const cont = editor.getBody();
  const ni = Settings.getNumberItems(editor) + 2;
  let addHtml = '';
  if (ni > 0) {
    for (let i = 2; i < ni; i++) {
      const bl = document.getElementById('bloco' + i) as HTMLInputElement;
      if (bl.value !== '') {
        const linkElm = editor.dom.createHTML('div', {
           style: 'padding: 15px;',
           id: 'contentBlock' + i,
           name: 'contentBlock' + i,
        }, bl.value );
        addHtml += linkElm;
      }
    }
    const divInfografico = editor.dom.createHTML('div', { id: 'info-main', name: 'info-main', contenteditable: 'false' }, addHtml);
    if (addHtml !== '') {
       cont.innerHTML = divInfografico;
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