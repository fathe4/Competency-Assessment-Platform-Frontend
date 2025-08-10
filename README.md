# Test School Assessment Platform - Frontend

A modern, responsive React application for the Test School competency assessment platform. This frontend provides an intuitive interface for students, supervisors, and administrators to interact with the assessment system.

## 🎯 Overview

The Test School Assessment Platform is a comprehensive digital competency evaluation system that implements a progressive 3-step testing methodology:

- **Step 1**: A1-A2 Levels (44 questions)
- **Step 2**: B1-B2 Levels (44 questions)
- **Step 3**: C1-C2 Levels (44 questions)

### Key Features

- **Progressive Assessment System**: Users advance through levels based on performance (≥75% to proceed)
- **Role-Based Access Control**: Different interfaces for Students, Supervisors, and Administrators
- **Secure Testing Environment**: Safe Exam Browser compatibility
- **Digital Certification**: Automatic certificate generation based on achieved levels
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Build Tool**: Vite
- **HTTP Client**: Axios (via RTK Query)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/fathe4/Competency-Assessment-Platform-Frontend.git
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the frontend root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1

# Environment
VITE_NODE_ENV=development

# Application Settings
VITE_APP_NAME=Test School Assessment Platform
VITE_APP_VERSION=1.0.0
```

### 4. Start the Development Server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   └── shared/        # Shared components (Navigation, etc.)
│   ├── features/          # Feature-based modules
│   │   ├── auth/          # Authentication features
│   │   ├── dashboard/     # Dashboard components
│   │   └── assessment/    # Assessment-related features
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── store/             # Redux store configuration
│   │   ├── slices/       # Redux slices
│   │   └── api/          # RTK Query API endpoints
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Application entry point
├── .env                   # Environment variables
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🎭 User Roles & Features

### Student Role

- **Assessments**: Take progressive 3-step evaluations
- **Certificates**: Access and download earned certificates

### Administrator Role

- **User Management**: Create, edit, and manage user accounts
- **Question Bank**: Manage assessment questions and competency mappings
- **System Analytics**: Access comprehensive platform statistics
- **Platform Configuration**: Manage system settings and parameters

## 🔧 Available Scripts

### Development

```bash
yarn run dev          # Start development server
yarn run build        # Build for production
yarn run start      # Preview production build locally
```

### Component Standards

- All components use TypeScript interfaces for props
- Mobile-first responsive design approach
- Consistent spacing using Tailwind's spacing scale
- Accessibility-compliant components (WCAG 2.1 AA)

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email verification
2. **Login**: JWT-based authentication with refresh tokens
3. **OTP Verification**: Additional security for sensitive operations
4. **Role Assignment**: Automatic role-based routing and permissions
5. **Session Management**: Persistent login with secure token storage

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_NODE_ENV=production
```

## 🐛 Troubleshooting

### Common Issues

#### Development Server Won't Start

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Environment Issues

- Ensure Node.js version compatibility (16+)
- Verify all environment variables are set correctly
- Check network connectivity for API calls

## 📞 Support & Contributing

### Getting Help

- Check the troubleshooting section above
- Review the project documentation
- Contact the development team

### Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Write comprehensive tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

**Test School Assessment Platform** - Empowering competency evaluation through modern technology.
