// import * as ed from '@noble/ed25519'
// import base64Pad from '@nichoth/base64pad'
// import { fromString } from 'uint8arrays/from-string'
import { webcrypto } from "one-webcrypto"
import * as utils from 'keystore-idb/lib/utils.js'

export function create () {
    const uses = ['sign', 'verify']

    return webcrypto.subtle.generateKey({
        name:   'ECDSA',
        namedCurve: 'P-256'
    }, true, uses)
        .then(keys => {
            return exportKeys(keys)
        })
}

function exportKeys (keypair) {
    return Promise.all([
        webcrypto.subtle.exportKey('raw', keypair.publicKey),
        webcrypto.subtle.exportKey('pkcs8', keypair.privateKey)
    ])
        .then(([pub, priv]) => {
            return {
                publicKey: utils.arrBufToBase64(pub),
                privateKey: utils.arrBufToBase64(priv)
            }
        })
}

export function importKeys (keypair) {
    return Promise.all([
        webcrypto.subtle.importKey(
            'raw',
            utils.base64ToArrBuf(keypair.publicKey),
            { name: 'ECDSA', namedCurve:  'P-256' },
            true,
            ['verify']
        ),

        webcrypto.subtle.importKey(
            'pkcs8',
            utils.base64ToArrBuf(keypair.privateKey),
            // buf,
            { name: 'ECDSA', namedCurve: 'P-256' },
            true,
            ['sign']
        )
    ])
        .then(([pub, priv]) => {
            return { publicKey: pub, privateKey: priv }
        })
}

// // export function create () {
// //     const privateKeyRaw = ed.utils.randomPrivateKey()

// //     return ed.getPublicKey(privateKeyRaw).then(pubKey => {
// //         return {
// //             privateKey: privateKeyRaw,
// //             publicKey: pubKey
// //         }
// //     })
// // }

// export function exportPrivateKey (kp) {
//     return base64Pad.encode(kp.privateKey)
// }

// /**
//    * Create a signature of `msg` using the private signing key.
//    *
//    * @param {String} msg - a message to sign
//    * @returns {Promise<base64 string>} a Promise that resolves to the signature
//    * (as a base64 string)
//  */
// export function sign (msg, privateKey) {
//     return ed.sign(fromString(msg), privateKey)
//         .then(sig => {
//             // sig here is a uint8array
//             return base64Pad.encode(sig)
//         })
// }

// // sig -- base64 string
// // msg -- string
// // pubKey -- uint8array
// export function verify (sig, msg, pubKey) {
//     const _sig = base64Pad.decode(sig)
//     return ed.verify(_sig, fromString(msg), pubKey)
// }

// // /**
// //  * Create a KeyPair from exported private key.
// //  *
// //  * @param {string} key - a private key, as encoded by `exportPrivateKey`
// //  * @returns {Promise<KeyPair>} a Promise that resolves to the loaded KeyPair object
// //  */
// // export function fromExportedKey (key) {
// //     const privateKey = base64Pad.decode(key)
// //     return ed.getPublicKey(privateKey)
// //         .then(publicKey => {
// //             return { privateKey, publicKey }
// //         })
// // }
