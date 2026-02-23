import { ab2b64, b642ab } from './utils.js';

export const encryptSymmetric = async (text, key) => {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, enc.encode(text));
    return { ct: ab2b64(ciphertext), iv: ab2b64(iv) };
};

export const decryptSymmetric = async (ctB64, ivB64, key) => {
    try {
        const ct = b642ab(ctB64);
        const iv = b642ab(ivB64);
        const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, ct);
        return new TextDecoder().decode(decrypted);
    } catch (e) {
        return "[Decryption Failed - Invalid Key or Corrupted Data]";
    }
};

export const encryptFile = async (arrayBuffer, key) => {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, arrayBuffer);
    return { ctBuffer: ciphertext, ivBuffer: iv };
};

export const decryptFile = async (ctBuffer, ivBuffer, key) => {
    try {
        return await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBuffer }, key, ctBuffer);
    } catch (e) {
        return null;
    }
};