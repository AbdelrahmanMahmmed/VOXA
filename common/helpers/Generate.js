const axios = require("axios");
const crypto = require("crypto");
const { createCanvas } = require("canvas");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "config.env" });

async function GenerateaCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function GenerateMessageWithCharacterAI(model, prompt, messageUser) {
  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: messageUser },
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const choices = response?.data?.choices;
    if (!choices || !choices.length) {
      return "No response received.";
    }

    const content = choices[0]?.message?.content;
    return content?.trim() || "Empty response.";
  } catch (err) {
    console.error("AI ERROR:", err.response?.data || err.message);
    throw new Error("An error occurred while generating the response.");
  }
}

function createId(type = "USR", includeDash = false, gender = "male") {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";

  while (random.length < 8) {
    const byte = crypto.randomBytes(1)[0];
    random += chars[byte % chars.length];
  }

  const g = gender.toLowerCase() === "female" ? "FL" : "ML";

  return includeDash
    ? `${type}-${year}-${random}-${g}`
    : `${type}${year}${random}${g}`;
}

async function generateLetterImage(letter) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  const bgColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2);

  const buffer = canvas.toBuffer("image/png");

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "default_avatars" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(buffer);
  });

  return result.secure_url;
}

function generateDeviceId(req) {
  const userAgent = req.headers["user-agent"] || "";
  const ip = req.ip || req.connection.remoteAddress;
  return crypto
    .createHash("sha256")
    .update(userAgent + ip)
    .digest("hex");
}

module.exports = {
  GenerateaCode,
  GenerateMessageWithCharacterAI,
  generateDeviceId,
  createId,
  generateLetterImage,
};
