# EU cookies
Another EU cookies compliance plugin. The idea behind this module is that until the user accepts to have cookies installed, no cookie will be set, but because your code will not set any!

After the user has accepted cookies, a function will be called that will run the code you want.

## Install

`npm install euCookies --save`

## Usage

Install it and load it in your code with `euCookies.init([options])`.

When the user clicks the accept button we run all the functions declared in `options.onCookiesAccepted()`.

### Options

You can pass an object with the following options:

```(js)
/**
 * Options object with all the (optional) parameters
 * @type {Object}
 */
options: {
    /**
     * Where the banner should be displayed (top or bottom).
     * @type {String}
     */
    location: 'bottom',

    /**
     * Dark or light theme.
     * @type {String}
     */
    theme: 'dark',

    /**
     * Text to display in the banner.
     * @type {String}
     */
    pluginText: '',
    /**
     * Text on the accept button
     * @type {String}
     */
    okButtonText: 'Aceito',

    /**
     * Text on the "Know more" button. Optional.
     * @type {String}
     */
    urlButtonText: 'Saber mais',

    /**
     * Url for the cookies terms page. Optional.
     * @type {String}
     */
    cookiesUrl: siteUrl + '/tcs/cookies',

    /**
     * String with the URL to the cookie page, where you have the full text about cookies for your site.
     */
    cookiesUrl: 'https://example.com/cookie-page/'

    /**
     * Function to be called when the user accepts the cookie. Will also be called if the user has already accepted cookies in a previous visit.
     */
    onCookiesAccepted () {
    }
}
```

## Todo
- Fallback if there is no local storage in the browser
- Unit tests (complete coverage)
- Examples of usage in the wild
- I18n
