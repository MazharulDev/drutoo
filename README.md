# Drutoo Banking System

A comprehensive full-stack mobile banking application built with modern web technologies. Drutoo provides a secure and efficient platform for digital financial transactions including money transfers, cash-in, cash-out, and transaction management.

## 🌟 Overview

Drutoo is a feature-rich banking system that enables users to perform various financial operations through a web-based platform. The system implements role-based access control with three distinct user types: Admin, Agent, and User, each with specific functionalities and permissions.

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **UI Library**: Ant Design (antd)
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Validation**: Zod
- **File Upload**: Multer with Cloudinary integration
- **Email Service**: Nodemailer
- **Logging**: Winston

## 👥 User Roles & Features

### 1. Admin
**Capabilities:**
- User management (view, activate, block users)
- Agent management (view, approve, suspend agents)
- System monitoring and oversight
- Transaction monitoring
- User status control (active/inactive/block)

**Dashboard Access:**
- Manage Users
- Manage Agents
- System Analytics

### 2. Agent
**Capabilities:**
- Cash-in services (deposit money to user accounts)
- Transaction history
- Balance management
- User verification

**Dashboard Access:**
- Cash-in operations
- Transaction history
- Account balance

### 3. User
**Capabilities:**
- Send money to other users
- Cash-out through agents
- View transaction history
- Check account balance
- Profile management

**Dashboard Access:**
- Send Money
- Cash-out
- Transaction History
- Profile Settings

## 🔐 Test Credentials

### Admin Account
- **Mobile**: `01911396142`
- **PIN**: `3762`
- **Role**: Administrator

### Agent Account
- **Mobile**: `01518684785`
- **PIN**: `1234`
- **Role**: Agent

### User Account
- **Mobile**: `01981719082`
- **PIN**: `1234`
- **Role**: User

## 🚀 Key Features

### Security Features
- JWT-based authentication
- PIN-based transaction authorization
- Password/PIN encryption with bcrypt
- Role-based access control (RBAC)
- Secure API endpoints
- PIN reset functionality
- OTP verification system

### Transaction Features
- **Send Money**: Transfer funds between users with minimal fees
- **Cash-in**: Agents can deposit money to user accounts
- **Cash-out**: Users can withdraw money through agents
- **Transaction History**: Complete audit trail of all transactions
- **Real-time Balance Updates**: Instant balance reflection after transactions

### User Management
- User registration and profile creation
- Profile picture upload (Cloudinary integration)
- Status management (active, inactive, block)
- Address data management (division, district, upazila, union)
- User search and filtering capabilities

### Additional Features
- Email notifications
- Transaction receipts
- Responsive design for mobile and desktop
- Offline detection
- Loading states and error handling
- Form validation with real-time feedback

## 📁 Project Structure

```
drutoo/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/       # Authentication pages
│   │   │   │   ├── login/
│   │   │   │   ├── create-account/
│   │   │   │   ├── forgot-password/
│   │   │   │   └── change-pin/
│   │   │   ├── (dashboard)/  # Dashboard pages
│   │   │   │   ├── admin/    # Admin pages
│   │   │   │   ├── agent/    # Agent pages
│   │   │   │   └── user/     # User pages
│   │   │   └── api/          # API routes
│   │   ├── components/        # Reusable components
│   │   ├── redux/            # State management
│   │   ├── services/         # API services
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript types
│   │   └── schema/           # Validation schemas
│   └── package.json
│
└── server/                    # Backend application
    ├── src/
    │   ├── app/
    │   │   ├── modules/
    │   │   │   ├── auth/      # Authentication module
    │   │   │   ├── users/     # User management
    │   │   │   ├── sendMoney/ # Money transfer
    │   │   │   ├── cashIn/    # Cash-in operations
    │   │   │   ├── cashOut/   # Cash-out operations
    │   │   │   ├── transactions/ # Transaction history
    │   │   │   ├── otp/       # OTP verification
    │   │   │   ├── system/    # System operations
    │   │   │   └── AddressData/ # Address data
    │   │   ├── middlewares/   # Express middlewares
    │   │   └── routes/        # API routes
    │   ├── config/            # Configuration
    │   ├── DB/                # Database seeding
    │   ├── enums/             # Enums and constants
    │   ├── errors/            # Error handlers
    │   ├── helpers/           # Helper functions
    │   └── utils/             # Utility functions
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the server directory:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=200d
ADMIN_ID=01911396142
ADMIN_PIN=3762
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:5000`

5. Build for production:
```bash
npm run build
npm start
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the client directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will start on `http://localhost:3000`

5. Build for production:
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/change-pin` - Change user PIN
- `POST /api/v1/auth/forgot-password` - Forgot password

### User Management
- `POST /api/v1/user/create-user` - Create new user/agent
- `GET /api/v1/user/agents?role=agent` - Get all agents
- `GET /api/v1/user/:id` - Get user by ID
- `PATCH /api/v1/user/update/:id` - Update user
- `GET /api/v1/user/profile` - Get user profile

### Transactions
- `POST /api/v1/money/send-money` - Send money to another user
- `POST /api/v1/cashout` - Cash-out through agent
- `POST /api/v1/cashin` - Cash-in by agent
- `GET /api/v1/transactions` - Get transaction history
- `GET /api/v1/transactions/:id` - Get transaction details

### System
- `GET /api/v1/system/stats` - Get system statistics
- `GET /api/v1/address-data` - Get address data

### OTP
- `POST /api/v1/otp/send` - Send OTP
- `POST /api/v1/otp/verify` - Verify OTP

## 💳 Transaction Flow

### Send Money (User to User)
1. User logs in with mobile and PIN
2. User enters recipient's mobile number and amount
3. System validates sender's balance and recipient's existence
4. System applies transaction fee (if applicable)
5. Amount is debited from sender and credited to receiver
6. Transaction record is created
7. Both parties receive confirmation

### Cash-Out (User to Agent)
1. User selects cash-out option
2. User enters agent's mobile number and amount
3. User confirms with PIN
4. System applies cash-out charge
5. Amount is debited from user and credited to agent
6. Transaction is recorded
7. Confirmation sent to both parties

### Cash-In (Agent to User)
1. Agent selects cash-in option
2. Agent enters user's mobile number and amount
3. Agent confirms with PIN
4. Amount is debited from agent and credited to user
5. Transaction is recorded
6. Confirmation sent to both parties

## 🔒 Security Best Practices

- All passwords and PINs are hashed using bcrypt
- JWT tokens are used for authentication
- Role-based middleware protects sensitive routes
- Input validation on both client and server
- CORS enabled for specified origins
- Environment variables for sensitive data
- PIN required for all financial transactions
- Account status verification before transactions

## 🎨 UI/UX Features

- Clean and intuitive interface
- Responsive design for all devices
- Loading states for better user feedback
- Error handling with user-friendly messages
- Form validation with real-time feedback
- Transaction receipts and confirmations
- Dashboard with analytics and charts
- Profile picture upload with image cropping

## 📊 Database Schema

### User Schema
- Name (first and last)
- Mobile (unique identifier)
- Email
- PIN (hashed)
- Role (admin/agent/user)
- Status (active/inactive/block)
- NID (National ID)
- Date of Birth
- Address (division, district, upazila, union)
- Blood Group
- Gender
- Balance
- Profile Picture
- Transactions

### Transaction Schema
- Sender ID
- Receiver ID
- Amount
- Transaction Type (send-money/cash-in/cash-out)
- Fee/Charge
- Status
- Timestamp

## 🚀 Deployment

### Backend (Vercel)
The server is configured for Vercel deployment with `vercel.json` configuration.

**Live Server**: https://drutoo.vercel.app

### Frontend (Vercel/Netlify)
The Next.js application can be deployed to Vercel or Netlify with automatic builds.

## 👨‍💻 Developer

**Md Mazharul Islam**
- Email: mdmazharulislam.dev@gmail.com

## 📝 License

ISC

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

For support, email mdmazharulislam.dev@gmail.com or create an issue in the repository.

---

**Note**: This is a demonstration banking system. For production use, additional security measures, compliance with banking regulations, and thorough testing are required.
