const characterLimits = require("../constants/messages");

exports.canCreateCharacter = (user) => {
    const today = new Date();

    if (!user.characterResetDate || today > user.characterResetDate) {
        user.createdCharactersThisMonth = 0;
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        user.characterResetDate = nextMonth;
    }

    const limit = characterLimits[user.plan];
    if (limit === Infinity) return true;

    return user.createdCharactersThisMonth < limit;
};