import {
    Assertions, Chain, GeneralSteps, Guard, Logger, Mouse, Pipeline, UiControls, UiFinder
} from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyLoader, TinyUi } from '@ephox/mcagar';

import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
import InfoLeavesPlugin from 'tinymce/plugins/infoleaves/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';
import { Element } from '@ephox/sugar';

UnitTest.asynctest('browser.tinymce.plugins.infografico.InfoLeavesResizeTest', function () {
  const success = arguments[arguments.length - 2];
  const failure = arguments[arguments.length - 1];

  ModernTheme();
  InfoLeavesPlugin();

  const cFakeEvent = function (name) {
    return Chain.op(function (elm: Element) {
      DOMUtils.DOM.fire(elm.dom(), name);
    });
  };

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    const tinyUi = TinyUi(editor);

    Pipeline.async({}, [
      Logger.t('image proportion constrains should work directly', GeneralSteps.sequence([
        tinyUi.sClickOnToolbar('click image button', 'div[aria-label="Inserir/editar infoleaves"] button'),
        Chain.asStep({}, [
          Chain.fromParent(tinyUi.cWaitForPopup('Wait for dialog', 'div[role="dialog"]'),
            [
              Chain.fromChains([
                UiFinder.cFindIn('i.mce-i-browse'),
                Mouse.cClick
              ]),
              Chain.fromChains([
                Chain.control(
                  Chain.fromChains([
                    UiFinder.cFindIn('input[aria-label="Width"]'),
                    UiControls.cGetValue,
                    Assertions.cAssertEq('should be 1', '1')
                  ]),
                  Guard.tryUntil('did not find input with value 1', 10, 3000)
                )
              ]),
              Chain.fromChains([
                UiFinder.cFindIn('input[aria-label="Height"]'),
                UiControls.cSetValue('5'),
                cFakeEvent('change')
              ]),
              Chain.fromChains([
                UiFinder.cFindIn('input[aria-label="Width"]'),
                UiControls.cGetValue,
                Assertions.cAssertEq('should have changed to 5', '5')
              ]),
              Chain.fromChains([
                UiFinder.cFindIn('div.mce-primary button'),
                Mouse.cClick
              ])
            ]
          )
        ])
      ]))

    ], onSuccess, onFailure);
  }, {
    plugins: 'image',
    toolbar: 'image',
    skin_url: '/project/js/tinymce/skins/lightgray',
  }, success, failure);
});
