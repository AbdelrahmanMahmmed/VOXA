try {
  const ImageUrl = await generateLetterImage("A");
  console.log("✅ URL:", ImageUrl);
} catch (err) {
  console.error("❌ Error:", err.message);
}
