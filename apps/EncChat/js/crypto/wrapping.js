import { ab2b64, b642ab } from './utils.js';
import { deriveMasterKey } from './keys.js';

export const wrapKeyWithRSA = async (contextKey, publicKey) => {
    const raw = await crypto.subtle.exportKey("raw", contextKey);
    const encrypted = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, raw);
    return ab2b64(encrypted);
};

export const unwrapKeyWithRSA = async (wrappedB64, privateKey) => {
    try {
        const raw = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, b642ab(wrappedB64));
        return await crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, true, ["encrypt", "decrypt"]);
    } catch (e) { return null; }
};

export const wrapKeyWithPassword = async (contextKey, password) => {
    const passKey = await deriveMasterKey(password, "invite_salt");
    const raw = await crypto.subtle.exportKey("raw", contextKey);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, passKey, raw);
    return { ct: ab2b64(encrypted), iv: ab2b64(iv) };
};

export const unwrapKeyWithPassword = async (ctB64, ivB64, password) => {
    try {
        const passKey = await deriveMasterKey(password, "invite_salt");
        const raw = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b642ab(ivB64) }, passKey, b642ab(ctB64));
        return await crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, true, ["encrypt", "decrypt"]);
    } catch(e) { return null; }
};