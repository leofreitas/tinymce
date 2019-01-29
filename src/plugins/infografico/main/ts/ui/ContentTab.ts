// import Settings from '../api/Settings';
// import Utils from '../core/Utils';
// import { Editor } from 'tinymce/core/api/Editor';
// import { normalizeCss } from 'tinymce/plugins/infografico/core/InfograficoSelection';
// import { defaultData, getStyleValue } from 'tinymce/plugins/infografico/core/InfograficoData';
// import { Merger } from '@ephox/katamari';
// import { document, HTMLTextAreaElement, HTMLInputElement } from '@ephox/dom-globals';
import { document } from '@ephox/dom-globals';

const createTextBox = function (editor) {
  return function (evt) {
    const rootControl = evt.control.rootControl;
    const data = rootControl.toJSON();
    rootControl.find('#numberitems').value(data.numberitems);
    const Content = document.getElementById('ContenTab-body');
    // console.log(Content);
    for (let i = 1; i <= data.numberitems; i++) {
        // const elem = document.getElementById('bloco-' + i);
        // console.log(elem);
        // elem.parentNode.parentNode.remove();
        const btn = editor.dom.create('input' , {type: 'text', value : i , class : 'mce-textbox mce-abs-layout-item' });
        const linkElm = editor.dom.create('div', {
           class: 'mce-container',
           style: 'left: 15px; top:' + i * 50 + 'px; width: 424px; height: 16px;',
           unselectable: 'on',
           contenteditable: 'false'
        }, btn);
        Content.appendChild(linkElm);
    }
 };
};

const getContentItems = function (editor) {
    const generalContentItems = [
      {
        name: 'numberitems',
        type: 'listbox',
        label: 'Quantidade de blocos',
        values: [
              { text: 'Selecione...', value: '' },
              { text: '1', value: '1' },
              { text: '2', value: '2' },
              { text: '3', value: '3' },
              { text: '4', value: '4' },
              { text: '5', value: '5' },
              { text: '6', value: '6' }
        ],
        onselect: createTextBox(editor)
      },
      { id: 'bloco-1', type: 'textbox', label: 'Bloco 1', style: 'display: none' },
      { id: 'bloco-2', type: 'textbox', label: 'Bloco 2', style: 'display: none' },
      { id: 'bloco-3', type: 'textbox', label: 'Bloco 3', style: 'display: none' },
      { id: 'bloco-4', type: 'textbox', label: 'Bloco 4', style: 'display: none' },
      { id: 'bloco-5', type: 'textbox', label: 'Bloco 5', style: 'display: none' },
      { id: 'bloco-6', type: 'textbox', label: 'Bloco 6', style: 'display: none' }
    ];
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
  makeTab
};