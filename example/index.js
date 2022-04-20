import { create, exportPrivateKey, fromExportedKey, sign } from '../'



// ------------------------- trying new things -----------------

import { webcrypto } from "one-webcrypto"

// webcrypto.subtle.generateKey()
webcrypto.subtle.generateKey({
    name: 'ECDSA',
    namedCurve: 'P-256'
}, false /* extactable */, ['sign', 'verify'])
    .then(keypair => {
        console.log('*got things*', keypair)
    })


// --------------------------- /trying new things -----------------




create().then(kp => {
    console.log('**kp**', kp)

    const exported = exportPrivateKey(kp)
    console.log('*exported private key*', exported)

    fromExportedKey(exported)
        .then(keypair => {
            sign('a test message', keypair.privateKey)
                .then(sig => {
                    console.log('*the sig*', sig)
                })
        })
})
