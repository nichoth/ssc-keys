import * as ed from '@noble/ed25519'
import base64Pad from '@nichoth/base64pad'
import { fromString } from 'uint8arrays/from-string'

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
   * Create a signature of `msg` using the private signing key.
   *
   * @param {Uint8Array} msg - a message to sign
   * @returns {Promise<Uint8Array>} a Promise that resolves to the signature
   * (as a Uint8Array)
 */
export function sign (msg, privateKey) {
    return ed.sign(fromString(msg), privateKey)
        .then(sig => {
            return base64Pad.encode(sig)
        })
}

/**
 * Create a KeyPair from exported private key.
 *
 * @param {string} key - a private key, as encoded by `exportPrivateKey`
 * @returns {Promise<KeyPair>} a Promise that resolves to the loaded KeyPair object
 */
export function fromExportedKey (key) {
    const privateKey = base64Pad.decode(key)
    return ed.getPublicKey(privateKey)
        .then(publicKey => {
            return { privateKey, publicKey }
        })
}

