
const CryptoJS = require("crypto-js");

function encryptMessage(message) {
    if (!message) return null;

    try {
        return CryptoJS.AES.encrypt(message, process.env.SECRET_KEY).toString();
    } catch (err) {
        throw new Error("Encryption failed");
    }
}

function decryptMessages(messages, secretKey) {
    return messages.map(msg => {
        const encrypted = msg.message || msg.content;

        const decryptedContent = CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);

        return {
            sender: msg.sender?.name || msg.sender,
            content: decryptedContent,
            timestamp: msg.timestamp || msg.createdAt
        };
    });
}

module.exports = {
    encryptMessage,
    decryptMessages
};