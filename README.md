# ssc keys

Key operations for web browsers.

This uses the [one-webcrypto](https://github.com/fission-suite/one-webcrypto) API, so the [WebCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) in a browser.

This is used to create keys that are visible as strings in a web browser, for use with [ssc-server](https://github.com/nichoth/ssc-server)


## install

```
npm i ssc-keys
```

## example

```js
import { create } from 'ssc-keys'

create().then(kp => {
    console.log('*kp*', kp)
    // =>
    // *kp* 
    // {
    //     "publicKey": "BPVcET2JN9HP3M3BaXGAtcZHDmKSrRjbSUXUFPjY+bS4wHesYEqKHIhKCx4mSQb4aZaA5eeRrK73SPWvIxqfXwY=",
    //     "privateKey": "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgjBVEyaAeWR63att0e9guTZpPI9ptabkz+TUpntepf+qhRANCAAT1XBE9iTfRz9zNwWlxgLXGRw5ikq0Y20lF1BT42Pm0uMB3rGBKihyISgseJkkG+GmWgOXnkayu90j1ryMan18G"
    // }
})
```

Keys are created with this algorithm

```js
// (algorithm, extractable, uses)
webcrypto.subtle.generateKey({
    name:   'ECDSA',
    namedCurve: 'P-256'
}, true, ['sign', 'verify'])
```
