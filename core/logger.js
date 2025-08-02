const { formatTimestamp } = require('../common/helpers/time');
exports.logger = (level = "INFO", message = '' , UserEmail) => {
    const timestamp = formatTimestamp();
    const formattedLevel = level.toUpperCase();
    const logMessage = `[${timestamp}] [${formattedLevel}] ${message} from ${UserEmail ? UserEmail : 'unknown user'}`;
    return logMessage;
}

exports.generateLogId = (functionName , UserId) => {
    const upper = Array.from({ length: 2 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
    const lower = Array.from({ length: 2 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    const numbers = Array.from({ length: 2 }, () => Math.floor(Math.random() * 10)).join('');
    const randomCode = upper + lower + numbers;
    return `logger-${functionName}-${UserId}-${randomCode}`;
}