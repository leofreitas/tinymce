import Settings from '../api/Settings';
import { document, HTMLInputElement } from '@ephox/dom-globals';

const registerText = function (editor) {
  const cont = editor.getBody();
  const textSel = editor.selection.dom.get('info-timeline-upright');
  const ni = Settings.getNumberItems(editor) + 2;
  let addHtml = '<span class="cntl-bar cntl-center"> <span class="cntl-bar-fill"></span> </span>';
  if (ni > 0) {
    for (let i = 2; i < ni; i++) {
      const txt = document.getElementById('texto' + i) as HTMLInputElement;
      const y = document.getElementById('year' + i) as HTMLInputElement;

      if (txt.value !== '' || y.value !== '') {
        const txtElm = editor.dom.createHTML('div', {
           id: 'contentBlock' + i,
           name: 'contentBlock' + i,
           class:  'cntl-content'
        }, txt.value );
        const yearElm = editor.dom.createHTML('div', {
           id: 'contentYear' + i,
           name: 'contentYear' + i,
           class: 'cntl-icon cntl-center'
        }, y.value );
        const nodeTimeline = editor.dom.createHTML('div', {class: 'cntl-state cntl-animate'},  txtElm + yearElm);
        addHtml += nodeTimeline;
      }
    }
    if (!textSel) {
        const divInfoTimeline = editor.dom.createHTML('div', { id: 'info-timeline-upright', name: 'info-timeline-upright', class: 'cntl info-timeline-upright', contenteditable: 'false' }, addHtml);
        if (addHtml !== '') {
           cont.innerHTML = divInfoTimeline;
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
      let textoValue = '';
      let yearValue = '';
      // let indice = 0;
      for (let i = 2; i < ni; i++) {
        // indice = i - 1;
        if (editor.dom.get('contentBlock' + i)) {
           textoValue = editor.dom.get('contentBlock' + i).innerHTML;
        } else {
          textoValue = '';
        }
        if (editor.dom.get('contentYear' + i)) {
           yearValue = editor.dom.get('contentYear' + i).innerHTML;
        } else {
          yearValue = '';
        }
        generalContentItems.push( { type: 'label', text: 'Ano - Texto' } );
        generalContentItems.push( { name: 'year' + i , id: 'year' + i, type: 'textbox', value:  yearValue, maxLength: 4, size: 4 } );
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