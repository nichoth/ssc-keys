import * as ed from '@noble/ed25519'
import base64Pad from '@nichoth/base64pad'

export function create () {
    const privateKeyRaw = ed.utils.randomPrivateKey()

    return ed.getPublicKey(privateKeyRaw).then(pubKey => {
        return {
            privateKey: privateKeyRaw,
            publicKey: pubKey
        }
    })
}

export function exportPrivateKey (kp) {
    return base64Pad.encode(kp.privateKey)
}


