import { GeneralSteps, Logger, Pipeline, Step } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader, TinyUi } from '@ephox/mcagar';

import AtividadePlugin from 'tinymce/plugins/template/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';

UnitTest.asynctest('browser.tinymce.plugins.template.DatesTest', function () {
  const success = arguments[arguments.length - 2];
  const failure = arguments[arguments.length - 1];

  ModernTheme();
  AtividadePlugin();

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    const tinyUi = TinyUi(editor);
    const tinyApis = TinyApis(editor);

    const sDeleteSetting = function (key) {
      return Step.sync(function () {
        delete editor.settings[key];
      });
    };

    Pipeline.async({}, [
      Logger.t('test cdate in snippet with default class', GeneralSteps.sequence([
        tinyApis.sSetSetting('templates', [{ title: 'a', description: 'b', content: '<p class="cdate">x</p>' }]),
        tinyApis.sSetSetting('atividade_cdate_format', 'fake date'),
        tinyUi.sClickOnToolbar('click on template button', 'div[aria-label="Insere Atividade"] > button'),
        tinyUi.sWaitForPopup('wait for popup', 'div[role="dialog"][aria-label="Insere Atividade"]'),
        tinyUi.sClickOnUi('click on ok button', 'div.mce-primary button'),
        tinyApis.sAssertContent('<p class="cdate">fake date</p>'),
        tinyApis.sSetContent('')
      ])),

      Logger.t('test cdate in snippet with custom class', GeneralSteps.sequence([
        tinyApis.sSetSetting('atividade_cdate_classes', 'customCdateClass'),
        tinyApis.sSetSetting('templates', [{ title: 'a', description: 'b', content: '<p class="customCdateClass">x</p>' }]),
        tinyApis.sSetSetting('atividade_cdate_format', 'fake date'),
        tinyUi.sClickOnToolbar('click on template button', 'div[aria-label="Insere Atividade"] > button'),
        tinyUi.sWaitForPopup('wait for popup', 'div[role="dialog"][aria-label="Insere Atividade"]'),
        tinyUi.sClickOnUi('click on ok button', 'div.mce-primary button'),
        tinyApis.sAssertContent('<p class="customCdateClass">fake date</p>'),
        sDeleteSetting('atividade_cdate_classes'),
        sDeleteSetting('templates'),
        sDeleteSetting('atividade_cdate_format'),
        tinyApis.sSetContent('')
      ])),

      Logger.t('test mdate updates with each serialization', GeneralSteps.sequence([
        tinyApis.sSetSetting(
          'templates',
          [{ title: 'a', description: 'b', content: '<div class="mceTmpl"><p class="mdate"></p><p class="cdate"></p></div>' }]
        ),
        tinyApis.sSetSetting('atividade_mdate_format', 'fake modified date'),
        tinyApis.sSetSetting('atividade_cdate_format', 'fake created date'),
        tinyUi.sClickOnToolbar('click on template button', 'div[aria-label="Insere Atividade"] > button'),
        tinyUi.sWaitForPopup('wait for popup', 'div[role="dialog"][aria-label="Insere Atividade"]'),
        tinyUi.sClickOnUi('click on ok button', 'div.mce-primary button'),
        tinyApis.sAssertContent('<div class="mceTmpl"><p class="mdate">fake modified date</p><p class="cdate">fake created date</p></div>'),
        tinyApis.sSetSetting('atividade_mdate_format', 'changed modified date'),
        tinyApis.sAssertContent('<div class="mceTmpl"><p class="mdate">changed modified date</p><p class="cdate">fake created date</p></div>'),
        sDeleteSetting('templates'),
        sDeleteSetting('atividade_mdate_format'),
        sDeleteSetting('atividade_cdate_template'),
        tinyApis.sSetContent('')
      ])),

      Logger.t('test mdate updates with each serialization with custom class', GeneralSteps.sequence([
        tinyApis.sSetSetting('atividade_mdate_classes', 'modified'),
        tinyApis.sSetSetting(
          'templates',
          [{ title: 'a', description: 'b', content: '<div class="mceTmpl"><p class="modified"></p><p class="cdate"></p></div>' }]
        ),
        tinyApis.sSetSetting('atividade_mdate_format', 'fake modified date'),
        tinyApis.sSetSetting('atividade_cdate_format', 'fake created date'),
        tinyUi.sClickOnToolbar('click on atividade button', 'div[aria-label="Insere Atividade"] > button'),
        tinyUi.sWaitForPopup('wait for popup', 'div[role="dialog"][aria-label="Insere Atividade"]'),
        tinyUi.sClickOnUi('click on ok button', 'div.mce-primary button'),
        tinyApis.sAssertContent('<div class="mceTmpl"><p class="modified">fake modified date</p><p class="cdate">fake created date</p></div>'),
        tinyApis.sSetSetting('atividade_mdate_format', 'changed modified date'),
        tinyApis.sAssertContent('<div class="mceTmpl"><p class="modified">changed modified date</p><p class="cdate">fake created date</p></div>'),
        sDeleteSetting('atividade_mdate_classes'),
        sDeleteSetting('templates'),
        sDeleteSetting('atividade_mdate_format'),
        sDeleteSetting('atividade_cdate_template')
      ]))
    ], onSuccess, onFailure);
  }, {
    plugins: 'atividade',
    toolbar: 'atividade',
    indent: false,
    skin_url: '/project/js/tinymce/skins/lightgray'
  }, success, failure);
});
