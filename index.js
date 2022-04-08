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

/**
 * Create a KeyPair from exported private key.
 *
 * @param {string} key - a private key, as encoded by `exportPrivateKey`
 * @returns {Promise<KeyPair>} a Promise that resolves to the loaded KeyPair object
 */
export function fromExportedKey(key) {
    const privateKey = base64Pad.decode(key)
    return ed.getPublicKey(privateKey)
        .then(pubKey => {
            return {
                privateKey,
                publicKey: pubKey
            }
        })
}

