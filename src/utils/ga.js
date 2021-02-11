const { TARGET_ENV } = process.env;

const SCRIPT_ID = 'google-analyics';
const SCRIPT_SRC = 'https://www.googletagmanager.com/gtag/js?id=UA-162143638-1';
const shouldLoadScript = TARGET_ENV === 'production';

const initGa = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(...args);
  }
  gtag('js', new Date());

  gtag('config', 'UA-162143638-1');
};

export const loadGa = () => {
  const existingElem = document.getElementById(SCRIPT_ID);
  const isScriptLoaded = !!existingElem;

  if (!isScriptLoaded && shouldLoadScript) {
    const scriptTag = document.createElement('script');
    scriptTag.src = SCRIPT_SRC;
    scriptTag.id = SCRIPT_ID;
    scriptTag.async = true;
    scriptTag.addEventListener('load', () => {
      initGa();
    });
    document.body.appendChild(scriptTag);
  }
};
