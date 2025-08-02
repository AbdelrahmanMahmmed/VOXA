exports.Massage = async (user, GenerateaCode) => {
    return `
Hello ${user.fName} ${user.lName},
    
You have requested to reset your password. Please use the following code to complete the process:
    
Reset Code: ${GenerateaCode}
    
If you did not request this, please ignore this email or contact our support team for assistance.
    
Thank you,
Hotel Team
    `;
};

const allowedPersonalities = [
    "friendly",
    "professional",
    "funny",
    "serious",
    "emotional",
    "robotic"
];

function getSpecialistMessage(specialty, language = 'en') {
    if (language === 'ar') {
        return `إذا سأل المستخدم عن أي شيء غير متعلق بـ ${specialty} (مثل الطبخ أو التاريخ أو العلوم)، يجب أن تكون إجابتك كالتالي تمامًا:  "أنا متخصص في ${specialty} فقط. من فضلك اسألني عن مواضيع متعلقة بـ ${specialty} فقط."  لا تكسر هذه القاعدة أبدًا.`;
    }
    return `If the user asks about anything not related to ${specialty}, your reply MUST be exactly:  "I'm specialized in ${specialty} only. Please ask me about ${specialty}-related topics."  Do NOT break this rule.`;
}

function getLanguageEnforcementMessage(language) {
    if (language === 'ar') {
        return `لو الشخص حاول يكتب بلغة غير معدومة في الشات غير العربية اطبع الجملة "هذا الشات مدعوم فقط باللغة العربية"`;
    } else if (language === 'en') {
        return `If User Write text Not Supports print "This chat must be in English only."`;
    } else {
        return `This chat must be in ${language} only.`;
    }
}

module.exports = { getLanguageEnforcementMessage ,getSpecialistMessage, allowedPersonalities };