# 🚀 VOXA - AI Chat Characters Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Enterprise-grade AI Chat Characters platform with advanced subscription management, multi-language support, and GROQ AI integration.**

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

VOXA is a sophisticated Node.js-based platform that enables users to create, customize, and interact with AI-powered chat characters. Built with enterprise-grade architecture, it features advanced subscription management, multi-language support, and seamless GROQ AI integration.

### 🎯 Key Capabilities

- **AI Character Creation**: Build custom AI personalities with specialized knowledge
- **Multi-Language Support**: Full Arabic and English language support
- **Subscription Tiers**: Flexible pricing plans with character limits
- **Real-time Chat**: Interactive conversations with AI characters
- **Advanced Analytics**: Comprehensive logging and monitoring
- **Scalable Architecture**: Clean architecture pattern for enterprise use

## ✨ Features

### 🔐 Authentication & Security

- **JWT-based Authentication**: Secure token-based authentication system
- **Role-based Access Control**: User and admin role management
- **Password Security**: Bcrypt encryption with secure reset functionality
- **Input Validation**: Comprehensive request validation and sanitization
- **Rate Limiting**: Protection against abuse and DDoS attacks

### 🤖 AI Character Management

- **Custom Personalities**: Create characters with unique traits and specialties
- **Specialized Knowledge**: Domain-specific AI characters (medical, technical, creative)
- **Avatar Generation**: Automatic avatar creation using Cloudinary
- **Multi-language AI**: Characters that communicate in Arabic or English
- **Character Limits**: Subscription-based character creation quotas

### 💬 Chat System

- **Real-time Messaging**: Instant AI responses using GROQ API
- **Conversation History**: Persistent chat logs and message management
- **Shareable Links**: Public and private chat sharing capabilities
- **Message Management**: Edit, delete, and organize conversations
- **Chat Analytics**: Track engagement and usage patterns

### 📊 Subscription Management

- **Tiered Plans**: Free, Level 1, Level 2, and Premium subscriptions
- **Character Limits**:
  - Free: 3 characters/month
  - Level 1: 10 characters/month
  - Level 2: 25 characters/month
  - Premium: Unlimited characters
- **Usage Tracking**: Monthly character creation monitoring
- **Plan Upgrades**: Seamless subscription management

### 🌍 Internationalization

- **Arabic Support**: Full RTL language support with Arabic-specific features
- **English Support**: Comprehensive English language capabilities
- **Language Enforcement**: AI characters maintain language consistency
- **Cultural Adaptation**: Region-specific character behaviors

### 📱 User Experience

- **Profile Management**: Comprehensive user profile customization
- **Avatar Upload**: Cloudinary-powered image management
- **Feedback System**: Bug reports, suggestions, and rating system
- **Responsive Design**: Mobile and desktop optimized interfaces

## 🏗️ Architecture

### Clean Architecture Pattern

```
VOXA/
├── 📁 app.js                    # Application entry point
├── 📁 server.js                 # HTTP server configuration
├── 📁 config.env                # Environment configuration
├── 📁 common/helpers/           # Shared utility functions
│   ├── Generate.js             # AI integration & ID generation
│   ├── hash.js                 # Password & data encryption
│   ├── jwt.js                  # JWT token management
│   ├── massage.js              # Multi-language message templates
│   ├── response.js             # Response formatting utilities
│   ├── time.js                 # Timestamp formatting
│   └── tempCodeRunnerFile.js   # Development utilities
├── 📁 core/                     # Core business logic
│   └── logger.js               # Centralized logging system
├── 📁 domains/                  # Domain models and repositories
│   ├── auth/                   # Authentication domain
│   ├── user/                   # User management domain
│   ├── Character/              # AI character domain
│   ├── chat/                   # Chat management domain
│   ├── message/                # Message handling domain
│   └── feedback/               # User feedback domain
├── 📁 features/                 # Extended application features
│   └── chatLink/               # Shareable chat links
├── 📁 infrastructure/           # External service integrations
│   ├── database/               # MongoDB connection management
│   └── cloudinary/             # Image storage configuration
├── 📁 interfaces/               # HTTP interface layer
│   └── http/                   # Express.js routes and middleware
├── 📁 modules/                  # Application modules
│   ├── auth/                   # Authentication module
│   ├── user/                   # User management module
│   ├── Character/              # Character management module
│   ├── chat/                   # Chat functionality module
│   ├── message/                # Message handling module
│   └── feedback/               # Feedback management module
├── 📁 shared/                   # Shared components and utilities
│   ├── constants/              # Application constants
│   ├── middlewares/            # Express.js middleware
│   └── utils/                  # Utility functions
└── 📁 log/                      # Logging and monitoring
```

### Data Flow Architecture

```
Client Request → Express Router → Middleware → Controller → Service → Repository → Database
                                    ↓
                              Response ← Controller ← Service ← Repository ← Database
```

## 🛠️ Technology Stack

### Backend Framework

- **Node.js 18+**: High-performance JavaScript runtime
- **Express.js 5.1.0**: Fast, unopinionated web framework
- **MongoDB 6.0+**: NoSQL database for scalability
- **Mongoose 8.16.4**: MongoDB object modeling tool

### Authentication & Security

- **JSON Web Tokens (JWT)**: Stateless authentication
- **bcryptjs**: Password hashing and verification
- **express-validator**: Request validation middleware
- **CORS**: Cross-origin resource sharing

### AI Integration

- **GROQ API**: High-performance AI inference
- **Model**: moonshotai/kimi-k2-instruct
- **Custom Prompts**: Specialized character instructions
- **Multi-language AI**: Arabic and English support

### Cloud Services

- **Cloudinary**: Image and media management
- **Nodemailer**: Email service integration
- **SMTP**: Secure email transmission

### Development Tools

- **Swagger**: API documentation and testing
- **Morgan**: HTTP request logging
- **dotenv**: Environment variable management
- **ESLint**: Code quality and consistency

### Monitoring & Logging

- **Custom Logger**: Centralized logging system
- **Error Tracking**: Comprehensive error handling
- **Performance Monitoring**: Request/response timing
- **Audit Trail**: User action logging

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **MongoDB**: Version 6.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: Version control system

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/voxa.git
   cd voxa
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   cp config.env.example config.env
   ```

   Update `config.env` with your configuration:

   ```env
   # Database Configuration
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/voxa

   # AI Service Configuration
   GROQ_API_KEY=your_groq_api_key
   NAME_MODEL=moonshotai/kimi-k2-instruct

   # Cloud Services
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Email Configuration
   AUTH_USER_SEND_EMAIL=your_email@gmail.com
   AUTH_PASSWORD_SEND_EMAIL=your_app_password
   AUTH_HOST_SEND_EMAIL=smtp.gmail.com
   AUTH_PORT_SEND_EMAIL=465

   # Security
   JWT_SECRET_KEY=your_jwt_secret
   JWT_EXPIRES_TIME=90d
   COOKIE_EXPIRES_TIME=7776000

   # Application
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:3000
   ```

4. **Database Setup**

   ```bash
   # Ensure MongoDB is running
   mongod

   # Or connect to MongoDB Atlas
   # Update MONGO_URI in config.env
   ```

5. **Start the Application**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

6. **Access the Application**
   - **API**: http://localhost:3000
   - **Documentation**: http://localhost:3000/docs
   - **Health Check**: http://localhost:3000/health

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Generate API documentation
npm run swagger

# Database migrations
npm run migrate
```

## 📚 API Documentation

### Authentication Endpoints

#### User Registration

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "fName": "John",
  "lName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "gender": "male"
}
```

#### User Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

#### Password Reset

```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "john.doe@example.com"
}
```

### Character Management

#### Create Character

```http
POST /api/v1/character
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Dr. Sarah",
  "description": "Expert medical consultant",
  "Specialist": "medicine",
  "language": "en",
  "personality": ["professional", "caring"],
  "promot": "Provide medical advice and health information"
}
```

#### Get Characters

```http
GET /api/v1/character
Authorization: Bearer <jwt_token>
```

### Chat & Messaging

#### Send Message

```http
POST /api/v1/message/:characterId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "content": "What are the symptoms of diabetes?"
}
```

#### Get Chat History

```http
GET /api/v1/message/:characterId
Authorization: Bearer <jwt_token>
```

### User Management

#### Update Profile

```http
PUT /api/v1/user/me
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "fName": "John",
  "lName": "Smith"
}
```

#### Upload Avatar

```http
PUT /api/v1/user/update-avatar
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

avatar: [image_file]
```

### Feedback System

#### Submit Feedback

```http
POST /api/v1/feedback
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "Great platform! Very intuitive.",
  "rating": 5,
  "type": "suggestion"
}
```

## 🔧 Configuration

### Environment Variables

| Variable                   | Description               | Required | Default       |
| -------------------------- | ------------------------- | -------- | ------------- |
| `MONGO_URI`                | MongoDB connection string | Yes      | -             |
| `GROQ_API_KEY`             | GROQ AI API key           | Yes      | -             |
| `JWT_SECRET_KEY`           | JWT signing secret        | Yes      | -             |
| `CLOUDINARY_CLOUD_NAME`    | Cloudinary cloud name     | Yes      | -             |
| `CLOUDINARY_API_KEY`       | Cloudinary API key        | Yes      | -             |
| `CLOUDINARY_API_SECRET`    | Cloudinary API secret     | Yes      | -             |
| `AUTH_USER_SEND_EMAIL`     | Email service username    | Yes      | -             |
| `AUTH_PASSWORD_SEND_EMAIL` | Email service password    | Yes      | -             |
| `NODE_ENV`                 | Application environment   | No       | `development` |
| `PORT`                     | Server port               | No       | `3000`        |

### Database Configuration

```javascript
// MongoDB Connection Options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0,
};
```

### AI Configuration

```javascript
// GROQ AI Settings
const aiConfig = {
  model: "moonshotai/kimi-k2-instruct",
  maxTokens: 2048,
  temperature: 0.7,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
};
```

## 🚀 Deployment

### Production Deployment

1. **Environment Setup**

   ```bash
   export NODE_ENV=production
   export PORT=3000
   ```

2. **Process Management**

   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start ecosystem.config.js

   # Using Docker
   docker build -t voxa .
   docker run -p 3000:3000 voxa
   ```

3. **Reverse Proxy (Nginx)**

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  voxa:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - mongodb

  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

### Cloud Deployment

#### AWS Deployment

```bash
# Deploy to AWS Elastic Beanstalk
eb init voxa
eb create voxa-production
eb deploy
```

#### Heroku Deployment

```bash
# Deploy to Heroku
heroku create voxa-app
git push heroku main
```

## 📊 Monitoring & Analytics

### Logging System

```javascript
// Log Levels
const logLevels = {
  ERROR: 'ERROR',    // System errors
  WARN: 'WARN',      // Warning messages
  INFO: 'INFO',      // General information
  DEBUG: 'DEBUG'     // Debug information
};

// Log Format
[2024-01-15 14:30:25] [INFO] User registered successfully from john.doe@example.com
```

### Health Checks

```http
GET /health
Response: {
  "status": "healthy",
  "timestamp": "2024-01-15T14:30:25.000Z",
  "uptime": "2h 15m 30s",
  "database": "connected",
  "ai_service": "operational"
}
```

### Performance Metrics

- **Response Time**: Average API response time
- **Throughput**: Requests per second
- **Error Rate**: Percentage of failed requests
- **Resource Usage**: CPU, memory, and database usage

## 🔒 Security Features

### Authentication Security

- **JWT Token Expiration**: Configurable token lifetime
- **Password Complexity**: Minimum 6 characters required
- **Account Lockout**: Protection against brute force attacks
- **Session Management**: Secure cookie handling

### Data Protection

- **Input Sanitization**: XSS and injection protection
- **Data Encryption**: Sensitive data encryption at rest
- **Access Control**: Role-based permissions
- **Audit Logging**: Complete action tracking

### API Security

- **Rate Limiting**: Request throttling
- **CORS Configuration**: Cross-origin protection
- **Request Validation**: Comprehensive input validation
- **Error Handling**: Secure error responses

## 🧪 Testing

### Test Structure

```
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
├── e2e/              # End-to-end tests
└── fixtures/          # Test data
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Test Examples

```javascript
describe("Character Creation", () => {
  it("should create a character with valid data", async () => {
    const characterData = {
      name: "Test Character",
      description: "Test Description",
      Specialist: "test",
      language: "en",
    };

    const result = await createCharacter(characterData);
    expect(result.name).toBe(characterData.name);
  });
});
```

## 📈 Performance Optimization

### Database Optimization

- **Indexing**: Strategic database indexing
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Optimized MongoDB queries
- **Caching**: Redis integration for frequently accessed data

### API Optimization

- **Response Compression**: Gzip compression
- **Pagination**: Efficient data pagination
- **Field Selection**: Selective field retrieval
- **Caching Headers**: HTTP caching optimization

### AI Response Optimization

- **Request Batching**: Batch AI requests
- **Response Caching**: Cache common AI responses
- **Async Processing**: Non-blocking AI operations
- **Fallback Responses**: Graceful degradation

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: echo "Deploying to production"
```

## 🤝 Contributing

### Development Workflow

1. **Fork the Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make Changes**
4. **Run Tests**
   ```bash
   npm test
   ```
5. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create Pull Request**

### Code Standards

- **ESLint Configuration**: Consistent code style
- **Prettier**: Code formatting
- **Conventional Commits**: Standard commit messages
- **Code Review**: Required for all changes

### Contribution Guidelines

- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass
- Provide clear commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GROQ AI**: For providing high-performance AI inference
- **MongoDB**: For the robust NoSQL database
- **Express.js**: For the excellent web framework
- **Open Source Community**: For the amazing tools and libraries

## 📞 Support

### Documentation

- **API Docs**: `/docs` endpoint
- **Swagger UI**: Interactive API documentation
- **Code Comments**: Comprehensive inline documentation

### Contact Information

- **Email**: support@voxa.com
- **Issues**: [GitHub Issues](https://github.com/your-username/voxa/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/voxa/discussions)

### Community

- **Discord**: [Join our community](https://discord.gg/voxa)
- **Twitter**: [@VOXA_AI](https://twitter.com/VOXA_AI)
- **Blog**: [Technical articles and updates](https://blog.voxa.com)

---

<div align="center">
  <p>Made with ❤️ by the VOXA Team</p>
  <p>Building the future of AI-powered conversations</p>
</div>
