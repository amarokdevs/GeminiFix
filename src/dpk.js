const dpk = {
  locale: 'en-US',
  translations: {},

  async init() {
    await this.loadTranslations(this.locale);
  },

  async loadTranslations(locale) {
    const res = await fetch(`./dpk/${locale}.json?_=${Date.now()}`);
    this.translations = await res.json();
  },

  t(key) {
    return this.translations[key] || key;
  }
};

export default dpk;
