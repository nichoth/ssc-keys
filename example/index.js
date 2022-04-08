import { create, exportPrivateKey, fromExportedKey } from '../'

create().then(kp => {
    console.log('**kp**', kp)

    const exported = exportPrivateKey(kp)
    console.log('*exported private key*', exported)

    fromExportedKey(exported)
        .then(keypair => {
            console.log('got a keypair', keypair)
        })
})

