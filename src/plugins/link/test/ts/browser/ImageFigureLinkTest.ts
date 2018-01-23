import { Pipeline } from '@ephox/agar';
import { Assertions } from '@ephox/agar';
import { Step } from '@ephox/agar';
import { TinyApis } from '@ephox/mcagar';
import { TinyLoader } from '@ephox/mcagar';
import { TinyDom } from '@ephox/mcagar';
import LinkPlugin from 'tinymce/plugins/link/Plugin';
import LinkPluginUtils from 'tinymce/plugins/link/core/Utils';
import ModernTheme from 'tinymce/themes/modern/Theme';
import { UnitTest } from '@ephox/bedrock';

UnitTest.asynctest('browser.tinymce.plugins.link.ImageFigureLinkTest', function () {
  const success = arguments[arguments.length - 2];
  const failure = arguments[arguments.length - 1];

  ModernTheme();
  LinkPlugin();

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    const api = TinyApis(editor);

    const sLinkTheSelection = function () {
      const insertLink = LinkPluginUtils.link(editor, {});
      return Step.sync(function () {
        insertLink({
          href: 'http://google.com'
        });
      });
    };

    const sUnlinkSelection = function () {
      const removeLink = LinkPluginUtils.unlink(editor);
      return Step.sync(function () {
        removeLink();
      });
    };

    const sAssertPresense = function (selector) {
      return Assertions.sAssertPresence('Detect presense of the element', selector, TinyDom.fromDom(editor.getBody()));
    };

    Pipeline.async({}, [
      api.sSetContent(
        '<figure class="image">' +
          '<img src="http://moxiecode.cachefly.net/tinymce/v9/images/logo.png" />' +
          '<figcaption>TinyMCE</figcaption>' +
        '</figure>'
      ),
      api.sSetSelection([0], 0, [0], 0),
      sLinkTheSelection(),
      sAssertPresense({ 'figure.image > a[href="http://google.com"] > img': 1 }),

      api.sSetSelection([0], 0, [0], 0),
      sUnlinkSelection(),
      sAssertPresense({ 'figure.image > img': 1 })
    ], onSuccess, onFailure);
  }, {
    plugins: 'link',
    toolbar: 'link',
    skin_url: '/project/js/tinymce/skins/lightgray'
  }, success, failure);
});