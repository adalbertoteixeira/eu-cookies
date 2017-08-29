const euCookies = {
  black: 'rgba(0, 0, 0, .9);',
  white: 'rgba(255, 255, 255, .9);',
  gray: 'rgba(128, 128, 128, .5);',
  eventListenersTargets: [],
  cookieWarningWrapper: null,
  euCookiesOptions: {
    location: 'top',
    theme: 'light',
    okButtonText: 'Ok, I accept',
    urlButtonText: 'Learn more',
    pluginText: 'This site uses cookies from Google to deliver its services, to personalize ads and to analyze traffic. Information about your use of this site is shared with Google. By using this site, you agree to its use of cookies',
    onCookiesAccepted(){},
  },
};

euCookies.init = (options) => {
  euCookies.euCookiesOptions = Object.assign(euCookies.euCookiesOptions, options);
  const addElement = (elementOptions) => {
    const cookieWarningButtonUrl = document.createElement(elementOptions.type);
    cookieWarningButtonUrl.classList.add(elementOptions.class);
    elementOptions.extraClass ? cookieWarningButtonUrl.classList.add(elementOptions.extraClass) : null;
    cookieWarningButtonUrl.innerHTML = elementOptions.text;
    /**
     * @todo remove event listener after removing object
     */
    cookieWarningButtonUrl.addEventListener('click', elementOptions.eventListener);
    euCookies.eventListenersTargets.push({cookieWarningButtonUrl: cookieWarningButtonUrl, eventListener: elementOptions.eventListener});
    cookieWarningButtonsWrapper[0].appendChild(cookieWarningButtonUrl);
  };

  if (!navigator.cookieEnabled) {
    euCookies.cookieWarningWrapper = document.createElement('div');
    euCookies.cookieWarningWrapper.innerHTML = `
      <div class="eu-cookie-compliance-text__wrapper">
        <p class="eu-cookie-compliance-text">The browser does not allow cookies to be set.</p>
      </div>
    `;
    return false;
  }

  if (localStorage.getItem('spidertattoosCookieAcceptance')) {
    return euCookies.euCookiesOptions.onCookiesAccepted();
  }

  const domElementToUseCSS = `
  .eu-cookie-compliance__wrapper {
    position: fixed;
    z-index: 999999;
    top: ${euCookies.euCookiesOptions.location === 'bottom' ? 'initial' : 0};
    left: 0;
    right: 0;
    bottom: ${euCookies.euCookiesOptions.location === 'bottom' ? 0 : 'initial'};
    background-color: ${euCookies.euCookiesOptions.theme === 'light' ? euCookies.black : euCookies.white};
    color: ${euCookies.euCookiesOptions.theme === 'light' ? euCookies.white : euCookies.black};
  }
  .eu-cookie-compliance-text__wrapper {
    float: left;
    width: 100%;
  }
  .eu-cookie-compliance-text {
    float: left;
    width: calc(100% - 4rem);
    margin: 1rem 2rem;
  }
  .eu-cookie-compliance-buttons__wrapper {
    float: left;
    width: 100%;
    margin: 0;
    text-align: center;
  }
  .eu-cookie-compliance-button {
    width: calc(100% - 4rem);
    margin: 0rem 2rem 1rem 2rem;
    padding: 1rem;
    border-radius: .5rem;
    text-transform: uppercase;
    font-weight: bold;
  }
  .eu-cookie-compliance-button--accept {
    background-color: ${euCookies.euCookiesOptions.theme === 'light' ? euCookies.white : euCookies.black};
    color: ${euCookies.euCookiesOptions.theme === 'light' ? euCookies.black : euCookies.white};
    cursor: pointer;
  }
  .eu-cookie-compliance-button--url {
    background-color: ${euCookies.euCookiesOptions.theme === 'light' ? euCookies.black : euCookies.gray};
    color: ${euCookies.euCookiesOptions.theme === 'light' ? euCookies.white : euCookies.black};
    cursor: pointer;
  }
  @media (min-width: 600px) {
    .eu-cookie-compliance-button--accept {
      width: calc(50% - 4rem);
    }
    .eu-cookie-compliance-button--url {
      width: calc(50% - 4rem);
    }
  }
  `;
  const head = document.head;
  const domElementToUseStyleTag = document.createElement('style');
  domElementToUseStyleTag.type = 'text/css';
  if (domElementToUseStyleTag.styleSheet) {
    domElementToUseStyleTag.styleSheet.cssText = domElementToUseCSS;
  } else {
    domElementToUseStyleTag.appendChild(document.createTextNode(domElementToUseCSS));
  }

  head.appendChild(domElementToUseStyleTag);

  euCookies.cookieWarningWrapper = document.createElement('div');
  euCookies.cookieWarningWrapper.classList.add('eu-cookie-compliance__wrapper');
  /**
   * @todo optional link param
   */
  const content = `<div class="eu-cookie-compliance-text__wrapper">
      <p class="eu-cookie-compliance-text">${euCookies.euCookiesOptions.pluginText}</p>
    </div>
    <div id="eu-cookie-compliance-buttons__wrapper" class="eu-cookie-compliance-buttons__wrapper">
    </div>`;
  euCookies.cookieWarningWrapper.innerHTML = content;

  let domElementToUse;
  if (euCookies.euCookiesOptions.domElement) {
    domElementToUse = document.getElementById(euCookies.euCookiesOptions.DOMElement);
  } else {
    domElementToUse = document.body;
  }

  document.body.appendChild(euCookies.cookieWarningWrapper);

  const cookieWarningButtonsWrapper = document.getElementsByClassName('eu-cookie-compliance-buttons__wrapper');
  addElement({type: 'button', class: 'eu-cookie-compliance-button', extraClass: 'eu-cookie-compliance-button--accept', text: euCookies.euCookiesOptions.okButtonText, eventListener: euCookies.acceptCookies.bind(this, euCookies.euCookiesOptions)});

  if (!!euCookies.euCookiesOptions.cookiesUrl) {
    addElement({type: 'button', class: 'eu-cookie-compliance-button', extraClass: 'eu-cookie-compliance-button--url', text: euCookies.euCookiesOptions.urlButtonText, eventListener: euCookies.goToCookiesUrl});
  }
  

  
  
  return false;
};

euCookies.goToCookiesUrl = () => {
  window.location.href = euCookies.euCookiesOptions.cookiesUrl;
};

euCookies.acceptCookies = () => {
  for (var i = euCookies.eventListenersTargets.length - 1; i >= 0; i--) {
    euCookies.eventListenersTargets[i].cookieWarningButtonUrl.removeEventListener('click', euCookies.eventListenersTargets[i].eventListener);
  }
  euCookies.cookieWarningWrapper.parentNode.removeChild(euCookies.cookieWarningWrapper);

  localStorage.setItem('spidertattoosCookieAcceptance', true);
  euCookies.euCookiesOptions.onCookiesAccepted();
};

export { euCookies as default };
