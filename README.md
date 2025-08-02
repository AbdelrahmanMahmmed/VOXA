# AI Chat Characters App with Stripe Payments

## 🧠 Project Overview

This Node.js application allows users to:
- Create AI Chat Characters (with monthly limits for Free users).
- Send messages to the AI Characters (via GROQ API).
- Subscribe to premium plans via Stripe to unlock more features.

The system supports:
- Free users (with character creation limits).
- Level 1 & Level 2 plans.
- Premium users with unlimited access.

---

## 🚀 Technologies Used and Why

| Technology | Why It's Used |
|------------|---------------|
| *Node.js* | Backend runtime for scalability and performance. |
| *Express.js* | Routing and middleware management. |
| *MongoDB* + *Mongoose* | Flexible NoSQL DB to store users, characters, plans. |
| *Stripe* | Payment processing and plan management. |
| *dotenv* | Load environment variables securely. |
| *axios* | To make HTTP requests to external APIs (GROQ). |
| *express-validator* | Validate user inputs in routes. |
| *body-parser* | Parse incoming JSON requests. |
| *bcrypt* | Password hashing for user authentication. |
| *jsonwebtoken* | For securing endpoints with JWTs. |

---

## 📁 Project Structure

. ├── controllers/ │   ├── payment.controller.js       # Handles payment logic via Stripe │   ├── character.controller.js     # Manages character creation/messages │   └── user.controller.js          # Auth and user data │ ├── routes/ │   ├── payment.routes.js           # Routes for payment plans │   ├── character.routes.js         # Character-related routes │   └── user.routes.js              # Login/Register/Profile │ ├── services/ │   ├── payment.service.js          # Stripe integration logic │   └── character.service.js        # Character logic, GROQ integration │ ├── models/ │   ├── User.js                     # User schema │   ├── Character.js                # Character schema │   └── Payment.js                  # Payment history schema │ ├── repositories/ │   └── user.repo.js                # Interactions with the User model │ ├── utils/ │   └── stripe.js                   # Stripe initialization and config │ ├── webhooks/ │   └── stripe.webhook.js          # Stripe webhook for success/failure │ ├── .env                            # Environment variables ├── app.js                          # Entry point └── README.md

---

## 💳 Stripe Payment Flow

### 🔐 .env File

```env
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXX

> These are obtained from Stripe dashboard (see below for how to get them).




---

✅ Plans

Plan	Price	Result

Level1	1000 EGP	user.plan = 'Level1'
Level2	1500 EGP	user.plan = 'Level2'
Premium	3000 EGP	user.plan = 'Premium'



---

🔁 Stripe Integration Logic

1. Creating a Checkout Session

In payment.controller.js, when the user chooses a plan, the backend:

Creates a Stripe Checkout Session with the selected amount.

Sets metadata (like userId and plan).

Redirects the user to the Stripe payment page.


const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [ { price_data: { ... }, quantity: 1 } ],
  mode: 'payment',
  success_url: 'https://yourapp.com/success',
  cancel_url: 'https://yourapp.com/cancel',
  metadata: {
    userId: user._id.toString(),
    selectedPlan: 'Level2'
  }
});


---

2. Listening to Stripe Events (Webhooks)

In stripe.webhook.js, we:

Verify incoming webhook signatures.

On checkout.session.completed, update the user’s plan in the DB using metadata from the session.


if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  const userId = session.metadata.userId;
  const selectedPlan = session.metadata.selectedPlan;

  await User.findByIdAndUpdate(userId, { plan: selectedPlan });
}

3. Setting Up Webhook (Destination)

Go to your Stripe Dashboard → Developers → Webhooks → Add Endpoint.

Use this endpoint: https://your-backend.com/webhook/stripe

Select event: checkout.session.completed



---

✨ Free vs Paid Limits

Feature	Free	Level1	Level2	Premium

Characters per month	2	Unlimited	Unlimited	Unlimited
AI Messages	Limited	Extended	Extended	Unlimited
Access to Premium Features	❌	Partial	Full	✅


Logic is handled in middleware to prevent free users from exceeding limits.


---

🛡 Security

All sensitive keys stored in .env.

Webhooks are verified with STRIPE_WEBHOOK_SECRET.

Authenticated routes are protected by JWT middleware.

GROQ requests are wrapped in try-catch with error logging.



---

🧪 Testing Stripe Locally

Install Stripe CLI:

brew install stripe/stripe-cli/stripe

Login:

stripe login

Listen to webhooks:

stripe listen --forward-to localhost:3000/webhook/stripe

You’ll get a whsec_xxx secret to use in .env.


---

📌 Final Notes

The app is modular, scalable, and separated by concern (controller, service, repo).

Stripe is integrated securely with metadata to link sessions to user plans.

Webhooks are used to ensure user data is updated after successful payments.

Future additions can include: refund system, subscription renewals, invoice tracking.


---

لو عايز أضيف عليه صور توضيحية أو سكريبتات تشغيل أو شرح بالعربي كمان، قولي.
