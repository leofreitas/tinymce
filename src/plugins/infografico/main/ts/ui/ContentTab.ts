import Settings from '../api/Settings';
// import Utils from '../core/Utils';
// import { Editor } from 'tinymce/core/api/Editor';
// import { normalizeCss } from 'tinymce/plugins/infografico/core/InfograficoSelection';
// import { defaultData, getStyleValue } from 'tinymce/plugins/infografico/core/InfograficoData';
// import { Merger } from '@ephox/katamari';
// import { document, HTMLTextAreaElement, HTMLInputElement } from '@ephox/dom-globals';
import { document } from '@ephox/dom-globals';

const createTextBox = function (editor, ct) {
  return function (evt) {

    const rootControl = evt.control.rootControl;
    const data = rootControl.toJSON();
    rootControl.find('#numberitems').value(data.numberitems);
    const Content = document.getElementById('ContenTab-body');
    //console.log(Content);
    if (Content.hasChildNodes()) {
            //offset = Math.min(offset, container.childNodes.length - 1);
        console.log(Content);
    }

    for (let i = 1; i <= 6; i++) {
        const elem = document.getElementById('bloco-' + i);
        elem.value = "";
        elem.parentNode.style.display = 'block';
        if( i > data.numberitems){
            elem.parentNode.style.display = 'none';
        }
    }

    for (let i = 1; i <= data.numberitems; i++) {
        const elem = document.getElementById('bloco-' + i);
        // console.log(elem);
        // elem.parentNode.style.display = 'none';
        // console.log(getContentItems);
    }

 };
};

const getContentItems = function (editor) {
    const generalContentItems = [];
const ni = Settings.hasNumberItems(editor);

if (ni > 0) {
     for (let i = 1; i <= ni; i++) {
    generalContentItems.push( { id: 'bloco-' + i, type: 'textbox', label: 'Bloco ' + i } );
    }
console.log(generalContentItems.numberitems);
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
  getContentItems
};