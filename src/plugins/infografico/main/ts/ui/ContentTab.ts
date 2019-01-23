import Settings from '../api/Settings';
import Utils from '../core/Utils';
import { Editor } from 'tinymce/core/api/Editor';
import { normalizeCss } from 'tinymce/plugins/infografico/core/InfograficoSelection';
import { defaultData, getStyleValue } from 'tinymce/plugins/infografico/core/InfograficoData';
import { Merger } from '@ephox/katamari';


const makeTab = function (editor) {
  return {
    title: 'Conteúdos',
    type: 'form',
    pack: 'start',
    items: [
      {
        label: 'Texto',
        name: 'style',
        type: 'textbox'
      }
    ]
  };
};

export default {
  makeTab
};