import Settings from '../api/Settings';
import { document, HTMLInputElement } from '@ephox/dom-globals';

const registerText = function (editor) {
  const cont = editor.getBody();
  const textSel = editor.selection.dom.get('info-box-upright');
  const ni = Settings.getNumberItems(editor) + 2;
  let addHtml = '';
  if (ni > 0) {
    for (let i = 2; i < ni; i++) {

      const textContent = document.getElementById('bloco' + i) as HTMLInputElement;
      if (textContent.value !== '') {
        const indexBlock = editor.dom.createHTML('div', { class: 'circle-number'} , '<span>' + (i - 1) + '</span>' );
        const textBlock = editor.dom.createHTML('div', {
           id: 'contentBlock' + i,
           name: 'contentBlock' + i,
           class: 'text'
        }, textContent.value );
        const objectList = editor.dom.createHTML('div', {class: 'block-list'}, indexBlock + textBlock);
        addHtml += objectList;
      }
    }
    if (!textSel) {
        const divInfosimple = editor.dom.createHTML('div', { id: 'info-box-upright', class: 'info-box-upright', name: 'info-box-upright', contenteditable: 'false' }, addHtml);
        if (addHtml !== '') {
           cont.innerHTML = divInfosimple;
        }
    } else {
      const objectList = addHtml;
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