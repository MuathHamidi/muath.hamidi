import { ab2b64, b642ab } from './utils.js';
import { deriveMasterKey, deriveVaultKey, generateKeyPair, generateContextKey, exportKey, importKey } from './keys.js';
import { encryptSymmetric, decryptSymmetric, encryptFile, decryptFile } from './symmetric.js';
import { wrapKeyWithRSA, unwrapKeyWithRSA, wrapKeyWithPassword, unwrapKeyWithPassword } from './wrapping.js';

const SecureCrypto = {
    ab2b64,
    b642ab,
    deriveMasterKey,
    deriveVaultKey,
    generateKeyPair,
    generateContextKey,
    encryptSymmetric,
    decryptSymmetric,
    encryptFile,
    decryptFile,
    exportKey,
    importKey,
    wrapKeyWithRSA,
    unwrapKeyWithRSA,
    wrapKeyWithPassword,
    unwrapKeyWithPassword
};

export default SecureCrypto;