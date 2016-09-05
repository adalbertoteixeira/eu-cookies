'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var euCookies = {
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
    onCookiesAccepted: function onCookiesAccepted() {}
  }
};

euCookies.init = function (options) {
  euCookies.euCookiesOptions = Object.assign(euCookies.euCookiesOptions, options);
  var addElement = function addElement(elementOptions) {
    var cookieWarningButtonUrl = document.createElement(elementOptions.type);
    cookieWarningButtonUrl.classList.add(elementOptions.class);
    elementOptions.extraClass ? cookieWarningButtonUrl.classList.add(elementOptions.extraClass) : null;
    cookieWarningButtonUrl.innerHTML = elementOptions.text;
    /**
     * @todo remove event listener after removing object
     */
    cookieWarningButtonUrl.addEventListener('click', elementOptions.eventListener);
    euCookies.eventListenersTargets.push({ cookieWarningButtonUrl: cookieWarningButtonUrl, eventListener: elementOptions.eventListener });
    cookieWarningButtonsWrapper[0].appendChild(cookieWarningButtonUrl);
  };

  if (!navigator.cookieEnabled) {
    euCookies.cookieWarningWrapper = document.createElement('div');
    euCookies.cookieWarningWrapper.innerHTML = '\n      <div class="eu-cookie-compliance-text__wrapper">\n        <p class="eu-cookie-compliance-text">The browser does not allow cookies to be set.</p>\n      </div>\n    ';
    return false;
  }

  if (localStorage.getItem('spidertattoosCookieAcceptance')) {
    return true;
  }

  var domElementToUseCSS = '\n  .eu-cookie-compliance__wrapper {\n    position: fixed;\n    z-index: 999999;\n    top: ' + (euCookies.euCookiesOptions.location === 'bottom' ? 'initial' : 0) + ';\n    left: 0;\n    right: 0;\n    bottom: ' + (euCookies.euCookiesOptions.location === 'bottom' ? 0 : 'initial') + ';\n    background-color: ' + (euCookies.euCookiesOptions.theme === 'light' ? euCookies.black : euCookies.white) + ';\n    color: ' + (euCookies.euCookiesOptions.theme === 'light' ? euCookies.white : euCookies.black) + ';\n  }\n  .eu-cookie-compliance-text__wrapper {\n    float: left;\n    width: 100%;\n  }\n  .eu-cookie-compliance-text {\n    float: left;\n    width: calc(100% - 4rem);\n    margin: 1rem 2rem;\n  }\n  .eu-cookie-compliance-buttons__wrapper {\n    float: left;\n    width: 100%;\n    margin: 0;\n    text-align: center;\n  }\n  .eu-cookie-compliance-button {\n    width: calc(100% - 4rem);\n    margin: 0rem 2rem 1rem 2rem;\n    padding: 1rem;\n    border-radius: .5rem;\n    text-transform: uppercase;\n    font-weight: bold;\n  }\n  .eu-cookie-compliance-button--accept {\n    background-color: ' + (euCookies.euCookiesOptions.theme === 'light' ? euCookies.white : euCookies.black) + ';\n    color: ' + (euCookies.euCookiesOptions.theme === 'light' ? euCookies.black : euCookies.white) + ';\n  }\n  .eu-cookie-compliance-button--url {\n    background-color: ' + (euCookies.euCookiesOptions.theme === 'light' ? euCookies.black : euCookies.gray) + ';\n    color: ' + (euCookies.euCookiesOptions.theme === 'light' ? euCookies.white : euCookies.black) + ';\n  }\n  @media (min-width: 600px) {\n    .eu-cookie-compliance-button--accept {\n      width: calc(50% - 4rem);\n    }\n    .eu-cookie-compliance-button--url {\n      width: calc(50% - 4rem);\n    }\n  }\n  ';
  var head = document.head;
  var domElementToUseStyleTag = document.createElement('style');
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
  var content = '<div class="eu-cookie-compliance-text__wrapper">\n      <p class="eu-cookie-compliance-text">' + euCookies.euCookiesOptions.pluginText + '</p>\n    </div>\n    <div id="eu-cookie-compliance-buttons__wrapper" class="eu-cookie-compliance-buttons__wrapper">\n    </div>';
  euCookies.cookieWarningWrapper.innerHTML = content;

  var domElementToUse = void 0;
  if (euCookies.euCookiesOptions.domElement) {
    domElementToUse = document.getElementById(euCookies.euCookiesOptions.DOMElement);
  } else {
    domElementToUse = document.body;
  }

  document.body.appendChild(euCookies.cookieWarningWrapper);

  var cookieWarningButtonsWrapper = document.getElementsByClassName('eu-cookie-compliance-buttons__wrapper');
  addElement({ type: 'button', class: 'eu-cookie-compliance-button', extraClass: 'eu-cookie-compliance-button--accept', text: euCookies.euCookiesOptions.okButtonText, eventListener: euCookies.acceptCookies.bind(undefined, euCookies.euCookiesOptions) });

  if (!!euCookies.euCookiesOptions.cookiesUrl) {
    addElement({ type: 'button', class: 'eu-cookie-compliance-button', extraClass: 'eu-cookie-compliance-button--url', text: euCookies.euCookiesOptions.urlButtonText, eventListener: euCookies.goToCookiesUrl });
  }

  return false;
};

euCookies.goToCookiesUrl = function () {
  window.location.href = euCookies.euCookiesOptions.cookiesUrl;
};

euCookies.acceptCookies = function () {
  for (var i = euCookies.eventListenersTargets.length - 1; i >= 0; i--) {
    euCookies.eventListenersTargets[i].cookieWarningButtonUrl.removeEventListener('click', euCookies.eventListenersTargets[i].eventListener);
  }
  euCookies.cookieWarningWrapper.parentNode.removeChild(euCookies.cookieWarningWrapper);

  localStorage.setItem('spidertattoosCookieAcceptance', true);
  euCookies.euCookiesOptions.onCookiesAccepted();
};

exports.default = euCookies;
