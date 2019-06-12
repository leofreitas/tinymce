import { Assertions, Chain, GeneralSteps, Logger, Pipeline, Step } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { Arr } from '@ephox/katamari';
import { TinyApis, TinyLoader, TinyUi } from '@ephox/mcagar';

import Conversions from 'tinymce/core/file/Conversions';
import Plugin from 'tinymce/plugins/infoleaves/Plugin';
import Theme from 'tinymce/themes/modern/Theme';

UnitTest.asynctest('browser.tinymce.plugins.infografico.InfoLeavesPluginTest', function () {
  const success = arguments[arguments.length - 2];
  const failure = arguments[arguments.length - 1];

  const src = 'http://moxiecode.cachefly.net/tinymce/v9/images/logo.png';
  const b64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

  Theme();
  Plugin();

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    const api = TinyApis(editor);
    const ui = TinyUi(editor);

    const cPopupToDialog = function (selector) {
      return Chain.fromChains([
        ui.cWaitForPopup('Locate popup', selector),
        Chain.async(function (container, next, die) {
          return Arr.find(editor.windowManager.getWindows(), function (win) {
            return container.dom().id === win._id;
          }).fold(() => die('Could not find popup window'), function (win) {
            next(win);
          });
        })
      ]);
    };

    const sAssertInfoLeavesTab = function (title, isPresent) {
      return GeneralSteps.sequence([
        ui.sClickOnToolbar('Trigger InfoLeaves dialog', 'div[aria-label="Inserir/editar infoleaves"]'),
        Chain.asStep({}, [
          ui.cWaitForPopup('Wait for InfoLeaves dialog', 'div[role="dialog"][aria-label="Inserir/editar infoleaves"]'),
          Chain.op(function (container) {
            const expected = {};
            expected['.mce-tab:contains("' + title + '")'] = isPresent ? 1 : 0;
            Assertions.assertPresence('Asserting presence', expected, container);
          })
        ]),
        ui.sClickOnUi('Close dialog', 'button:contains("Cancel")')
      ]);
    };

    const sTriggerUpload = Step.async(function (next, die) {
      Conversions.uriToBlob(b64).then(function (blob) {
        Pipeline.async({}, [
          Chain.asStep({}, [
            cPopupToDialog('div[role="dialog"][aria-label="Inserir/editar infoleaves"]'),
            Chain.op(function (win) {
              const browseBtn = win.find('browsebutton')[0];
              browseBtn.value = function () {
                return blob;
              };
              browseBtn.fire('change');
            })
          ])
        ], next, die);
      });
    });

    const sAssertTextValue = function (fieldName, value) {
      return Chain.asStep({}, [
        cPopupToDialog('div[role="dialog"][aria-label="Inserir/editar infoleaves"]'),
        Chain.op(function (win) {
          Assertions.assertEq('Assert field ' + src + ' value ', value, win.find('#' + fieldName).value());
        })
      ]);
    };

    Pipeline.async({}, [
      Logger.t('Upload tab should not be present without infograficos_upload_url or infograficos_upload_handler', GeneralSteps.sequence([
        api.sSetContent('<p><img src="' + src + '" /></p>'),
        api.sSelect('img', []),
        sAssertInfoLeavesTab('Upload', false)
      ])),

      Logger.t('Upload tab should be present when infograficos_upload_url is set to some truthy value', GeneralSteps.sequence([
        api.sSetContent('<p><img src="' + src + '" /></p>'),
        api.sSelect('img', []),
        api.sSetSetting('infografico_advtab', false), // make sure that Advanced tab appears separately
        api.sSetSetting('infograficos_upload_url', 'postAcceptor.php'),
        sAssertInfoLeavesTab('Upload', true),
        sAssertInfoLeavesTab('Advanced', false),
        api.sSetSetting('infografico_advtab', true),
        api.sDeleteSetting('infograficos_upload_url'),
        sAssertInfoLeavesTab('Upload', false),
        sAssertInfoLeavesTab('Advanced', true)
      ])),

      Logger.t('Upload tab should be present when infograficos_upload_handler is set to some truthy value', GeneralSteps.sequence([
        api.sSetContent('<p><img src="' + src + '" /></p>'),
        api.sSelect('img', []),
        api.sSetSetting('infografico_advtab', false), // make sure that Advanced tab appears separately
        api.sSetSetting('infograficos_upload_handler', function (blobInfo, success) {
          return success('file.jpg');
        }),
        sAssertInfoLeavesTab('Upload', true),
        sAssertInfoLeavesTab('Advanced', false),
        api.sSetSetting('infografico_advtab', true),
        api.sDeleteSetting('infograficos_upload_handler'),
        sAssertInfoLeavesTab('Upload', false),
        sAssertInfoLeavesTab('Advanced', true)
      ])),

      Logger.t('InfoLeaves uploader test with custom route', GeneralSteps.sequence([
        api.sSetContent(''),
        api.sSetSetting('infograficos_upload_url', '/custom/imageUpload'),
        ui.sClickOnToolbar('Trigger InfoLeaves dialog', 'div[aria-label="Inserir/editar infoleaves"]'),
        ui.sWaitForPopup('Wait for InfoLeaves dialog', 'div[role="dialog"][aria-label="Inserir/editar infoleaves"]'),
        ui.sClickOnUi('Switch to Upload tab', '.mce-tab:contains("Upload")'),
        sTriggerUpload,
        ui.sWaitForUi('Wait for General tab to activate', '.mce-tab.mce-active:contains("General")'),
        sAssertTextValue('src', 'uploaded_image.jpg'),
        api.sDeleteSetting('infograficos_upload_url'),
        ui.sClickOnUi('Close dialog', 'button:contains("Cancel")')
      ])),

      Logger.t('InfoLeaves uploader test with infograficos_upload_handler', GeneralSteps.sequence([
        api.sSetContent(''),
        api.sSetSetting('infograficos_upload_handler', function (blobInfo, success) {
          return success('file.jpg');
        }),
        ui.sClickOnToolbar('Trigger InfoLeaves dialog', 'div[aria-label="Inserir/editar infoleaves"]'),
        ui.sWaitForPopup('Wait for InfoLeaves dialog', 'div[role="dialog"][aria-label="Inserir/editar infoleaves"]'),
        ui.sClickOnUi('Switch to Upload tab', '.mce-tab:contains("Upload")'),
        sTriggerUpload,
        ui.sWaitForUi('Wait for General tab to activate', '.mce-tab.mce-active:contains("General")'),
        sAssertTextValue('src', 'file.jpg'),
        ui.sClickOnUi('Close dialog', 'button:contains("Cancel")')
      ])),

      Logger.t('Test that we get full base64 string in infograficos_upload_handler', GeneralSteps.sequence([
        api.sSetContent(''),
        api.sSetSetting('infograficos_upload_handler', function (blobInfo, success) {
          return success(blobInfo.base64());
        }),
        ui.sClickOnToolbar('Trigger InfoLeaves dialog', 'div[aria-label="Inserir/editar infoleaves"]'),
        ui.sWaitForPopup('Wait for InfoLeaves dialog', 'div[role="dialog"][aria-label="Inserir/editar infoleaves"]'),
        ui.sClickOnUi('Switch to Upload tab', '.mce-tab:contains("Upload")'),
        sTriggerUpload,
        ui.sWaitForUi('Wait for General tab to activate', '.mce-tab.mce-active:contains("General")'),
        sAssertTextValue('src', b64.split(',')[1]),
        ui.sClickOnUi('Close dialog', 'button:contains("Cancel")')
      ]))
    ], onSuccess, onFailure);
  }, {
    plugins: 'image',
    indent: false,
    skin_url: '/project/js/tinymce/skins/lightgray'
  }, success, failure);
});
