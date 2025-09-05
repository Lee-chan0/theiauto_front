import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

export default function GoogleTranslateLoader() {
  useEffect(() => {
    return () => {
      document.querySelectorAll(
        '.goog-te-banner-frame, .goog-te-menu-frame, #goog-gt-tt, .goog-te-spinner-pos'
      ).forEach((el) => el.remove?.());
      document.body.style.top = '';
      document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
    };
  }, []);

  return (
    <Helmet>
      <script>{`
        function googleTranslateElementInit() {
          new google.translate.TranslateElement(
            {
              pageLanguage: 'ko',
              includedLanguages: 'en,ko,ja,zh-CN,zh-TW',
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      `}</script>
      <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
    </Helmet>
  );
}