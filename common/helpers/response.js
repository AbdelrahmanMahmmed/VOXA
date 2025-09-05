exports.generatePromot = async (
  language,
  name,
  description,
  promot,
  personality,
  currentPromot,
) => {
  if (!language) return currentPromot;

  if (language === "ar") {
    return `الاسم: ${name} | الوصف: ${description} | الهدف: ${promot} | السمات الشخصية: ${personality.join(" - ")}`;
  } else if (language === "en") {
    return `Name: ${name} | Description: ${description} | Purpose: ${promot} | Personality Traits: ${personality.join(" - ")}`;
  } else {
    return currentPromot;
  }
};
