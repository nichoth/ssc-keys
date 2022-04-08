# ssc keys

Key operations for web browsers

## install

```
npm i ssc-keys
```

## example

```js
import { create, exportPrivateKey } from 'ssc-keys'

create().then(keypair => {
    console.log('**kp**', keypair)
    // => { privateKey: Uint8Array(32), publicKey: Uint8Array(32) }

    const exported = exportPrivateKey(keypair)
    console.log('*exported private key*', exported)
    // => 7JQCfiWJwXIl/C7ScI/sfYDIIdkbV7EMuU10SzN5lzM=
})
```

