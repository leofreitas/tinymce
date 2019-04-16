import Settings from '../api/Settings';
import Utils from '../core/Utils';
import { Editor } from 'tinymce/core/api/Editor';
import { normalizeCss } from 'tinymce/plugins/infografico/core/InfograficoSelection';
import { defaultData, getStyleValue } from 'tinymce/plugins/infografico/core/InfograficoData';
import { Merger } from '@ephox/katamari';

const updateVSpaceHSpaceBorder = function (editor) {
  return function (evt) {
    const dom = editor.dom;
    const rootControl = evt.control.rootControl;

    const data = rootControl.toJSON();
    let css = dom.parseStyle(data.style);

    rootControl.find('#vspace').value('');
    rootControl.find('#hspace').value('');

    css = Utils.mergeMargins(css);

    // Move opposite equal margins to vspace/hspace field
    if ((css['margin-top'] && css['margin-bottom']) || (css['margin-right'] && css['margin-left'])) {
      if (css['margin-top'] === css['margin-bottom']) {
        rootControl.find('#vspace').value(Utils.removePixelSuffix(css['margin-top']));
      } else {
        rootControl.find('#vspace').value('');
      }
      if (css['margin-right'] === css['margin-left']) {
        rootControl.find('#hspace').value(Utils.removePixelSuffix(css['margin-right']));
      } else {
        rootControl.find('#hspace').value('');
      }
    }

    // Move border-width
    if (css['border-width']) {
      rootControl.find('#border').value(Utils.removePixelSuffix(css['border-width']));
    } else {
      rootControl.find('#border').value('');
    }

    // Move border-style
    if (css['border-style']) {
      rootControl.find('#borderStyle').value(css['border-style']);
    } else {
      rootControl.find('#borderStyle').value('');
    }
    // console.log("Gre "+css);
    rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
  };
};

const updateStyle = (editor: Editor, win) => {
  win.find('#style').each((ctrl) => {
    const value = getStyleValue((css) => normalizeCss(editor, css), Merger.merge(defaultData(), win.toJSON()));
    ctrl.value(value);
  });
};

const createColorPickAction = function (editor) {
  const colorPickerCallback = Settings.getColorPickerCallback(editor);
  if (colorPickerCallback) {
    return function (evt) {
      return colorPickerCallback.call(
        editor,
        function (value) {
          evt.control.value(value).fire('change');
        },
        evt.control.value()
      );
    };
  }
};

const updateObjectColor = function (editor) {
  return function (evt) {
    const rootControl = evt.control.rootControl;
    const data = rootControl.toJSON();
    rootControl.find('#' + evt.control._name).value(data.value);
   };
};

const makeTab = function (editor) {
  return {
    title: 'Propriedades Box/Texto',
    type: 'form',
    pack: 'start',
    items: [
           {
        name: 'typemarcador',
        type: 'listbox',
        label: 'Índice do marcador',
        values: Utils.buildListItems(
          Settings.getClassList(editor),
          function (item) {
            if (item.value) {
              item.textStyle = function () {
                // return editor.formatter.getCssText({ inline: 'div', classes: [item.value] });
              };
            }
          }
        )
      },
      {
        name: 'shapeitems',
        type: 'listbox',
        label: 'Forma do marcador',
        values: [
              { text: 'Selecione...', value: '' },
              { text: 'Círculo', value: 'circulo' },
              { text: 'Quadrado', value: 'quadrado' },
              { text: 'Triângulo', value: 'triangulo' }
        ],
        function (item) {
            if (item.value) {
              item.textStyle = function () {
                // return editor.formatter.getCssText({ inline: 'div', classes: [item.value] });
              };
            }
          }
      },
     {
        label: 'Cor da borda',
        type: 'colorbox',
        name: 'bordercolorbox',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Cor do Fundo',
        type: 'colorbox',
        name: 'backgroundcolorbox',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Cor do Texto',
        type: 'colorbox',
        name: 'textcolorbox',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'CSS adic.',
        name: 'style',
        type: 'textbox',
        onchange: updateVSpaceHSpaceBorder(editor)
      },
      {
        label: 'Largura da borda',
        type: 'textbox',
        name: 'border',
        onchange (evt) {
          updateStyle(editor, evt.control.rootControl);
        }
      },
      {
        label: 'Estilo da borda',
        type: 'listbox',
        name: 'borderStyle',
        onselect (evt) {
        updateStyle(editor, evt.control.rootControl);
      },
      values: [
        { text: 'Selecione...', value: '' },
        { text: 'Solid', value: 'solid' },
        { text: 'Dotted', value: 'dotted' },
        { text: 'Dashed', value: 'dashed' },
        { text: 'Double', value: 'double' },
        { text: 'Groove', value: 'groove' },
        { text: 'Ridge', value: 'ridge' },
        { text: 'Inset', value: 'inset' },
        { text: 'Outset', value: 'outset' },
        { text: 'None', value: 'none' },
        { text: 'Hidden', value: 'hidden' }
      ]
     },
    ]
  };
};

export default {
  makeTab
};