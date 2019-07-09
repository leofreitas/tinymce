import Settings from '../api/Settings';
// import Utils from '../core/Utils';

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