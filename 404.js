const languageButton = document.getElementById('not-found-language');

languageButton.addEventListener('click', () => {
  const english = document.documentElement.lang !== 'en';
  document.documentElement.lang = english ? 'en' : 'ar';
  document.documentElement.dir = english ? 'ltr' : 'rtl';
  document.title = english ? 'Page not found | PowerCore Solutions' : 'الصفحة غير موجودة | PowerCore Solutions';
  document.querySelectorAll('[data-ar][data-en]').forEach((node) => {
    node.textContent = english ? node.dataset.en : node.dataset.ar;
  });
  languageButton.textContent = english ? 'العربية' : 'English';
  languageButton.setAttribute('aria-label', english ? 'Switch language to Arabic' : 'Switch language to English');
});
