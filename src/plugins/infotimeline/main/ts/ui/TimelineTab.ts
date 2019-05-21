import Settings from '../api/Settings';

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
    title: 'TimeLine',
    type: 'form',
    pack: 'start',
    items: [
           {
        name: 'timeline',
        type: 'listbox',
        label: 'Linha central',
        values: [
              { text: 'Selecione...', value: '' },
              { text: 'Estreita', value: 'estreita' },
              { text: 'Larga', value: 'larga' }
        ],
      },
     {
        label: 'Cor da borda',
        type: 'colorbox',
        name: 'bordercolortimeline',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Cor do Fundo',
        type: 'colorbox',
        name: 'backgroundcolortimeline',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Cor do Texto',
        type: 'colorbox',
        name: 'textcolortimeline',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
    ]
  };
};

export default {
  makeTab
};