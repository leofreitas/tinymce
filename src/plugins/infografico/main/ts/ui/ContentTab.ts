import Settings from '../api/Settings';
import { document, HTMLInputElement } from '@ephox/dom-globals';

const registerText = function (editor) {
  const cont = editor.getBody();
  const textSel = editor.selection.dom.get('info-box-flat');
  const ni = Settings.getNumberItems(editor) + 2;
  let addHtml = '';
  const arrow = '<div class="arrow-box-flat"></div>';
  if (ni > 0) {
    for (let i = 2; i < ni; i++) {
      const bl = document.getElementById('bloco' + i) as HTMLInputElement;
      if (bl.value !== '') {
        const linkElm = editor.dom.createHTML('div', {
           id: 'contentBlock' + i,
           name: 'contentBlock' + i,
        }, arrow + bl.value );
        addHtml += linkElm;
      }
    }
    if (!textSel) {
        const divInfografico = editor.dom.createHTML('div', { id: 'info-box-flat', name: 'info-box-flat', class: 'info-box-flat', contenteditable: 'false' }, addHtml);
        if (addHtml !== '') {
           cont.innerHTML = divInfografico;
        }
    } else {
      textSel.innerHTML = addHtml;
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