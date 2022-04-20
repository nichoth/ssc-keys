# ssc keys

Key operations for web browsers

## install

```
npm i ssc-keys
```

## example

```js
import { create, exportPrivateKey, fromExportedKey, sign,
    verify } from 'ssc-keys'

create().then(keypair => {
    console.log('**kp**', keypair)
    // => { privateKey: Uint8Array(32), publicKey: Uint8Array(32) }


    const exported = exportPrivateKey(keypair)
    console.log('*exported private key*', exported)
    // => 7JQCfiWJwXIl/C7ScI/sfYDIIdkbV7EMuU10SzN5lzM=


    fromExportedKey(exported)
        .then(keypair => {
            console.log('got a keypair', keypair)
            // => { privateKey: Uint8Array(32), publicKey: Uint8Array(32) }

            sign('a test message', keypair.privateKey)
                .then(sig => {
                    console.log('*the sig*', sig)
                    // => *the sig* Y42/20g10a7li1tCqkAqFT55Tr/3THuCVrVn1RzJ7OvdYBq8RvbdGlvbNaYq9xkAQjVndRKFeGv/HaYPQtJeAg==

                    verify(sig, msg, keypair.publicKey).then(isValid => {
                        console.log('*is valid*', isValid)
                        // => *is valid* true
                    })
                })
        })
})
```
