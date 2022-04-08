import { create, exportPrivateKey } from '../'

create().then(kp => {
    console.log('**kp**', kp)

    const exported = exportPrivateKey(kp)
    console.log('*exported private key*', exported)
})

