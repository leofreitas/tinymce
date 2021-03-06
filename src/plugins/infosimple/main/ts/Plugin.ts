/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import PluginManager from 'tinymce/core/api/PluginManager';
import Commands from './api/Commands';
import FilterContent from './core/FilterContent';
import Buttons from './ui/Buttons';
import DialogColor from './ui/DialogColor';

PluginManager.add('infosimple', function (editor) {
  FilterContent.setup(editor);
  Buttons.register(editor);
  Commands.register(editor);
  if (!editor.settings.color_picker_callback) {
    editor.settings.color_picker_callback = function (callback, value) {
      DialogColor.open(editor, callback, value);
    };
  }
});

export default function () { }