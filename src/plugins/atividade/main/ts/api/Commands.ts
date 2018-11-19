/**
 * Commands.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import { Fun } from '@ephox/katamari';
import Atividades from '../core/Atividades';

const register = function (editor) {
  editor.addCommand('mceInsertAtividade', Fun.curry(Atividades.InsertAtividade, editor));
};

export default {
  register
};