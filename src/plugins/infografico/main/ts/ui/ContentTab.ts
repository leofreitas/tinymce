import Settings from '../api/Settings';
// import Utils from '../core/Utils';
// import { Editor } from 'tinymce/core/api/Editor';
// import { normalizeCss } from 'tinymce/plugins/infografico/core/InfograficoSelection';
// import { defaultData, getStyleValue } from 'tinymce/plugins/infografico/core/InfograficoData';
// import { Merger } from '@ephox/katamari';
// import { document, HTMLTextAreaElement, HTMLInputElement } from '@ephox/dom-globals';
// import { document } from '@ephox/dom-globals';

const getContentItems = function (editor) {
    const generalContentItems = [];
    const ni = Settings.getNumberItems(editor);

    if (ni > 0) {
        for (let i = 1; i <= ni; i++) {
            generalContentItems.push( { id: 'bloco-' + i, type: 'textbox', label: 'Bloco ' + i } );
        }
    }
/*generalContentItems.push( { label: 'Border color', type: 'colorbox',  name: 'borderColor', onaction: createColorPickAction(editor) } ),
          generalContentItems.push( {
            label: 'Background color',
            type: 'colorbox',
            name: 'backgroundColor',
            onaction: createColorPickAction(editor)
          });*/

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