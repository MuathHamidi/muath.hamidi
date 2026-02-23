export const ab2b64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

export const b642ab = (b64) => Uint8Array.from(atob(b64), c => c.charCodeAt(0)).buffer;