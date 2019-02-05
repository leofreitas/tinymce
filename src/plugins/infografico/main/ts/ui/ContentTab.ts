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
        const line = editor.dom.create('div', {class: 'mce-container mce-abs-layout-item mce-first mce-last mce-formitem', hidefocus: 1, tabindex: -1, style: 'left: 15px; top:' +  i * 15 + 'px; width: 98%; height: 30px;'});
        const btn = editor.dom.create('input', {type: 'text', id: 'bloco-' + i, class: 'mce-textbox mce-abs-layout-item mce-form-item' });
        const lbl = editor.dom.create('label', {id: 'bloco-' + i + '-l', html: 'Bloco ' + i, class: 'mce-widget mce-label mce-abs-layout-item mce-first', for: 'bloco-' + i, style: 'line-height: 16px; left: 0px; top: 7px; width: 40%; height: 16px;'});
        const linkElm = editor.dom.create('div', {
           class: 'mce-container mce-abs-layout-item mce-last mce-formitem',
           style: 'left: 10px; top:' + i * 40 + 'px; width: 60%; height: 16px;',
           unselectable: 'on',
           contenteditable: 'false'
        }, btn);
        linkElm.appendChild(lbl);
        line.appendChild(linkElm);
        Content.appendChild(line);
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
  //    { id: 'bloco-1', type: 'textbox', label: 'Bloco 1' },
  //    { id: 'bloco-2', type: 'textbox', label: 'Bloco 2' },
  //    { id: 'bloco-3', type: 'textbox', label: 'Bloco 3' },
  //    { id: 'bloco-4', type: 'textbox', label: 'Bloco 4' },
  //    { id: 'bloco-5', type: 'textbox', label: 'Bloco 5' },
  //    { id: 'bloco-6', type: 'textbox', label: 'Bloco 6' }
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
  makeTab,
  getContentItems
};