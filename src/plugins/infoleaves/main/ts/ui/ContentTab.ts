import Settings from '../api/Settings';
import { document, HTMLInputElement } from '@ephox/dom-globals';

const registerText = function (editor) {
  const cont = editor.getBody();
  const textSel = editor.selection.dom.get('info03-main');
  const ni = Settings.getNumberItems(editor) + 2;
  let addHtml = '';
  if (ni > 0) {
    let indice = 0;
    for (let i = 2; i < ni; i++) {
      indice = i - 1;
      const txt = document.getElementById('texto' + i) as HTMLInputElement;
      const y = document.getElementById('leaf' + i) as HTMLInputElement;

      if (txt.value !== '' || y.value !== '') {
        const txtElm = editor.dom.createHTML('span', {
           id: 'contentBlock' + i,
           name: 'contentBlock' + i
        }, txt.value );
        const leafElm = editor.dom.createHTML('div', {
           id: 'contentLeaf' + i,
           name: 'contentLeaf' + i,
           class: 'leaf leafcolor' + indice + ''
        }, y.value );
        const leafLine = editor.dom.createHTML('div', {
           class: 'line-leaf'
        }, '');
        const nodeLeaf = editor.dom.createHTML('li', {class: 'fact'},  leafElm + leafLine + txtElm);
        addHtml += nodeLeaf;
      }
    }
    const line = editor.dom.createHTML('div', {
        class: 'line'
    }, '');
    if (!textSel) {
        const nodeLeaves = editor.dom.createHTML('ul', {class: 'facts-list'}, addHtml);
        const divInfoLeaves = editor.dom.createHTML('div', { id: 'info03-main', class: 'infoleaves', name: 'info03-main', contenteditable: 'false' }, line + nodeLeaves);
        if (addHtml !== '') {
           cont.innerHTML = divInfoLeaves;
        }
    } else {
      const nodeLeaves = editor.dom.createHTML('ul', {class: 'facts-list'}, addHtml);
      textSel.innerHTML = nodeLeaves;
    }
  }
};

const getContentItems = function (editor) {
    const generalContentItems = [];
    const ni = Settings.getNumberItems(editor) + 2;

    if (ni > 0) {
      let textoValue = '';
      let leafValue = '';
      let indice = 0;
      for (let i = 2; i < ni; i++) {
        indice = i - 1;
        if (editor.dom.get('contentBlock' + i)) {
           textoValue = editor.dom.get('contentBlock' + i).innerHTML;
        } else {
          textoValue = '';
        }
        if (editor.dom.get('contentLeaf' + i)) {
           leafValue = editor.dom.get('contentLeaf' + i).innerHTML;
        } else {
          leafValue = '';
        }
        generalContentItems.push( { type: 'label', text: 'Folha ' + indice + ' - Texto' } );
        generalContentItems.push( { name: 'leaf' + i , id: 'leaf' + i, type: 'textbox', value:  leafValue, maxLength: 1, size: 1 } );
        generalContentItems.push( { type: 'label', text: '-' } );
        generalContentItems.push( { name: 'texto' + i , id: 'texto' + i, type: 'textbox', value:  textoValue } );
      }
    }

    return generalContentItems;
};

const makeTab = function (editor) {
  return {
    title: 'Textos',
    type: 'form',
        layout: 'grid',
        columns: 4,
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