import Tools from 'tinymce/core/api/util/Tools';
import Settings from '../api/Settings';
import Utils from '../core/Utils';
import SizeManager from './SizeManager';

const createTextBox = function (editor) {
  return function (evt) {
    // const dom = editor.dom;
    const rootControl = evt.control.rootControl;
    const data = rootControl.toJSON();
    // console.log(data);
    rootControl.find('#numberitems').value(data.numberitems);
   };
};

const onSrcChange = function (evt, editor) {
  let srcURL, prependURL, absoluteURLPattern;
  const meta = evt.meta || {};
  const control = evt.control;
  const rootControl = control.rootControl;
  const imageListCtrl = rootControl.find('#image-list')[0];

  if (imageListCtrl) {
    imageListCtrl.value(editor.convertURL(control.value(), 'src'));
  }

  Tools.each(meta, function (value, key) {
    rootControl.find('#' + key).value(value);
  });

  if (!meta.width && !meta.height) {
    srcURL = editor.convertURL(control.value(), 'src');

    // Pattern test the src url and make sure we haven't already prepended the url
    prependURL = Settings.getPrependUrl(editor);
    absoluteURLPattern = new RegExp('^(?:[a-z]+:)?//', 'i');
    if (prependURL && !absoluteURLPattern.test(srcURL) && srcURL.substring(0, prependURL.length) !== prependURL) {
      srcURL = prependURL + srcURL;
    }

    control.value(srcURL);

    Utils.getInfograficoSize(editor.documentBaseURI.toAbsolute(control.value()), function (data) {
      if (data.width && data.height && Settings.hasDimensions(editor)) {
        rootControl.find('#width').value(data.width);
        rootControl.find('#height').value(data.height);
        SizeManager.syncSize(rootControl);
      }
    });
  }
};

const onBeforeCall = function (evt) {
  evt.meta = evt.control.rootControl.toJSON();
};

const getGeneralItems = function (editor, imageListCtrl) {
  const generalFormItems = [
    {
      name: 'src',
      type: 'filepicker',
      filetype: 'image',
      label: 'Source',
      autofocus: true,
      onchange (evt) {
        onSrcChange(evt, editor);
      },
      onbeforecall: onBeforeCall
    },
    imageListCtrl
  ];

  if (Settings.hasDescription(editor)) {
    generalFormItems.push({ name: 'alt', type: 'textbox', label: 'Descrição do Infográfico' });
  }

  if (Settings.hasInfograficoTitle(editor)) {
    generalFormItems.push({ name: 'title', type: 'textbox', label: 'Título do Infográfico' });
  }

  if (Settings.hasDimensions(editor)) {
    generalFormItems.push(
      SizeManager.createUi()
    );
  }

  if (Settings.hasNumberItems(editor)) {
    generalFormItems.push({
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
    });
  }

  if (Settings.hasInfograficoCaption(editor)) {
    generalFormItems.push({ name: 'caption', type: 'checkbox', label: 'Caption' });
  }

  return generalFormItems;
};

const makeTab = function (editor, imageListCtrl) {
  return {
    title: 'Geral',
    type: 'form',
    items: getGeneralItems(editor, imageListCtrl)
  };
};

export default {
  makeTab,
  getGeneralItems
};