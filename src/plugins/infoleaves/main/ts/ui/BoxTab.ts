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
    title: 'Box/Texto',
    type: 'form',
    pack: 'start',
    items: [
      {
        name: 'borderstyle',
        type: 'listbox',
        label: 'Estilo da Borda',
        values: [
              { text: 'Selecione...', value: '' },
              { text: 'Padrão', value: 'default' },
              { text: 'Top', value: 'top' },
              { text: 'Bottom', value: 'bottom' },
              { text: 'Left', value: 'left' },
              { text: 'Right', value: 'right' }
        ],
        function (item) {
            if (item.value) {
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
    ]
  };
};

export default {
  makeTab
};