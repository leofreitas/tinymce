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
    title: 'Folhas',
    type: 'form',
    pack: 'start',
    items: [
      {
        label: 'Folha 1',
        type: 'colorbox',
        name: 'leafcolor1',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Folha 2',
        type: 'colorbox',
        name: 'leafcolor2',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Folha 3',
        type: 'colorbox',
        name: 'leafcolor3',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Folha 4',
        type: 'colorbox',
        name: 'leafcolor4',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Folha 5',
        type: 'colorbox',
        name: 'leafcolor5',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Folha 6',
        type: 'colorbox',
        name: 'leafcolor6',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
      {
        label: 'Folha 7',
        type: 'colorbox',
        name: 'leafcolor7',
        onaction: createColorPickAction(editor),
        onchange: updateObjectColor(editor)
      },
    ]
  };
};

export default {
  makeTab
};