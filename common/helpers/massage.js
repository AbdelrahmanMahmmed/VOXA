const sendtoEmail = require("../../shared/utils/sendEmail");

async function Message(user, GenerateaCode) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset</title>
  </head>
  <body style="margin:0; padding:0; background:#f0f2f5; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    
    <!-- Wrapper -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5; padding:30px 0;">
      <tr>
        <td align="center">
          
          <!-- Logo / Title -->
          <h1 style="color:#007bff; margin-bottom:25px; font-size:28px;">Voxa Team</h1>
          
          <!-- Card -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#007bff; color:#fff; text-align:center; padding:20px;">
                <h2 style="margin:0; font-size:22px;">Password Reset Request</h2>
              </td>
            </tr>
            
            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333; font-size:15px; line-height:1.6;">
                <p>Hi <strong>${user.fName} ${user.lName}</strong>,</p>
                <p>You requested to reset your password. Please use the code below:</p>
                
                <!-- Reset Code -->
                <div style="text-align:center; margin:35px 0;">
                  <div style="display:inline-block; background:#007bff; color:#fff; padding:18px 40px; font-size:22px; font-weight:bold; border-radius:8px; letter-spacing:3px;">
                    ${GenerateaCode}
                  </div>
                </div>

                <p>This code will expire in <strong>5 minutes</strong>.</p>
                <p>If you did not make this request, you can safely ignore this email.</p>
                
                <p style="margin-top:40px;">Thanks,<br><strong>Voxa Team</strong></p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background:#f9f9f9; text-align:center; padding:20px; font-size:12px; color:#888; border-top:1px solid #eee;">
                Need help? <a href="mailto:abdelrahmanmahmmed29@gmail.com" style="color:#007bff; text-decoration:none;">Contact Support</a><br><br>
                © ${new Date().getFullYear()} Voxa Team. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
    
  </body>
  </html>
  `;
}

async function VerifyDeviceMessage(user, link, appName = "Hotel Team") {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Device Verification</title>
  </head>
  <body style="margin:0; padding:0; background:#f0f2f5; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    
    <!-- Wrapper -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5; padding:30px 0;">
      <tr>
        <td align="center">
          
          <!-- Logo / Title -->
          <h1 style="color:#007bff; margin-bottom:25px; font-size:28px;">${appName}</h1>
          
          <!-- Card -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#ff9800; color:#fff; text-align:center; padding:20px;">
                <h2 style="margin:0; font-size:22px;">Verify New Device</h2>
              </td>
            </tr>
            
            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333; font-size:15px; line-height:1.6;">
                <p>Hi <strong>${user.fName} ${user.lName}</strong>,</p>
                <p>We noticed a login attempt to your <strong>${appName}</strong> account from a new device.</p>
                <p>If this was you, please verify your device by clicking the button below:</p>
                
                <!-- Verify Button -->
                <div style="text-align:center; margin:35px 0;">
                  <a href="${link}" target="_blank" 
                    style="background:#ff9800; color:#fff; text-decoration:none; padding:15px 35px; font-size:18px; font-weight:bold; border-radius:6px; display:inline-block;">
                    Verify Device
                  </a>
                </div>

                <p>If you did not attempt to log in, we recommend changing your password immediately and contacting our support team.</p>
                
                <p style="margin-top:40px;">Stay secure,<br><strong>${appName}</strong></p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background:#f9f9f9; text-align:center; padding:20px; font-size:12px; color:#888; border-top:1px solid #eee;">
                Need help? <a href="mailto:support@${appName.toLowerCase().replace(/\s+/g, "")}.com" style="color:#ff9800; text-decoration:none;">Contact Support</a><br><br>
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
    
  </body>
  </html>
  `;
}

const allowedPersonalities = [
  "friendly",
  "professional",
  "funny",
  "serious",
  "emotional",
  "robotic",
];

function getSpecialistMessage(specialty, language = "en") {
  if (language === "ar") {
    return `إذا سأل المستخدم عن أي شيء غير متعلق بـ ${specialty} (مثل الطبخ أو التاريخ أو العلوم)، يجب أن تكون إجابتك كالتالي تمامًا:  "أنا متخصص في ${specialty} فقط. من فضلك اسألني عن مواضيع متعلقة بـ ${specialty} فقط."  لا تكسر هذه القاعدة أبدًا.`;
  }
  return `If the user asks about anything not related to ${specialty}, your reply MUST be exactly:  "I'm specialized in ${specialty} only. Please ask me about ${specialty}-related topics."  Do NOT break this rule.`;
}

function getLanguageEnforcementMessage(language) {
  if (language === "ar") {
    return `لو الشخص حاول يكتب بلغة غير معدومة في الشات غير العربية اطبع الجملة "هذا الشات مدعوم فقط باللغة العربية"`;
  } else if (language === "en") {
    return `If User Write text Not Supports print "This chat must be in English only."`;
  } else {
    return `This chat must be in ${language} only.`;
  }
}

async function VerifyEmailMessage(user, verifyLink, appName = "Hotel Team") {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background:#f0f2f5; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    
    <!-- Wrapper -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5; padding:30px 0;">
      <tr>
        <td align="center">
          
          <!-- Logo / Title -->
          <h1 style="color:#007bff; margin-bottom:25px; font-size:28px;">${appName}</h1>
          
          <!-- Card -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#28a745; color:#fff; text-align:center; padding:20px;">
                <h2 style="margin:0; font-size:22px;">Verify Your Email</h2>
              </td>
            </tr>
            
            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333; font-size:15px; line-height:1.6;">
                <p>Hi <strong>${user.fName} ${user.lName}</strong>,</p>
                <p>Thanks for signing up! Please confirm your email address by clicking the button below:</p>
                
                <!-- Verify Button -->
                <div style="text-align:center; margin:35px 0;">
                  <a href="${verifyLink}" target="_blank" 
                    style="background:#28a745; color:#fff; text-decoration:none; padding:15px 35px; font-size:18px; font-weight:bold; border-radius:6px; display:inline-block;">
                    Verify Email
                  </a>
                </div>

                <p>If you didn’t create an account, you can safely ignore this email.</p>
                
                <p style="margin-top:40px;">Cheers,<br><strong>${appName}</strong></p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background:#f9f9f9; text-align:center; padding:20px; font-size:12px; color:#888; border-top:1px solid #eee;">
                Need help? <a href="mailto:support@${appName.toLowerCase().replace(/\s+/g, "")}.com" style="color:#28a745; text-decoration:none;">Contact Support</a><br><br>
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
    
  </body>
  </html>
  `;
}

async function sendVerificationEmail(email, token, user) {
  const link = `https://voxa-ruby.vercel.app/api/v1/auth/verify-device?token=${token}`;

  await sendtoEmail({
    to: email,
    subject: "Verify new device",
    html: await VerifyDeviceMessage(user, link, "Voxa Team"),
  });
}

module.exports = {
  Message,
  VerifyEmailMessage,
  sendVerificationEmail,
  getLanguageEnforcementMessage,
  getSpecialistMessage,
  allowedPersonalities,
};
