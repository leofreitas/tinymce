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
    title: 'Configurações de Fundo',
    type: 'form',
    pack: 'start',
    items: [
     {
        label: 'Cor de fundo',
        type: 'colorbox',
        name: 'colorbackground',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Imagem de fundo',
        type: 'textbox',
        name: 'urlimagebackground',
      },
    ]
  };
};

export default {
  makeTab
};