'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;
      const locales = ['american-to-british', 'british-to-american'];
      let translation;

      if (text == '') {
        return res.json({ error: 'No text to translate' });
      }

      if (!text || !locale) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (locale !== '' && locales.includes(locale) == false) {
        return res.json({ error: 'Invalid value for locale field' });
      }

      if (locale === 'american-to-british') {
        translation = translator.americanToBritish(text);
      } else {
        translation = translator.britishToAmerican(text);
      }

      if (!translation.includes('<span class="highlight">')) {
        return res.json({ text: text, translation: 'Everything looks good to me!' });
      }

      return res.json({ text: text, translation: translation })
    });
};
