const languageButton = document.getElementById('service-language');

languageButton.addEventListener('click', () => {
  const english = document.documentElement.lang !== 'en';
  document.documentElement.lang = english ? 'en' : 'ar';
  document.documentElement.dir = english ? 'ltr' : 'rtl';
  document.querySelectorAll('[data-ar][data-en]').forEach((node) => {
    node.textContent = english ? node.dataset.en : node.dataset.ar;
  });
  document.title = english ? languageButton.dataset.titleEn : languageButton.dataset.titleAr;
  languageButton.textContent = english ? 'العربية' : 'English';
});
