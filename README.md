🛠️ LocalServicePro - Professional Service Booking Marketplace
LocalServicePro is a high-performance, full-stack (MERN) web application designed to bridge the gap between skilled local service providers (plumbers, electricians, painters, etc.) and customers. The platform features real-time appointment scheduling, secure payments, and a robust availability management system.

🌟 Key Features
👤 User Capabilities
Secure Authentication: Signup/Login with Email OTP verification.

Forgot Password: Secure token-based password reset via email (10-minute expiry).

Search & Filter: Functional search bar and category-based filtering (Electrician, Plumber, etc.) to find services instantly.

Interactive Booking: Modern booking modal to select available dates and specific time slots.

Integrated Payments: Secure online transactions powered by Razorpay.

Real-time Availability: Slots automatically disappear once booked to prevent double-booking.

Review System: Users can rate and review services only after the booking status is marked as "Completed."

Profile Management: Edit profile details and upload profile pictures using Firebase Storage.

💼 Provider Capabilities
Business Dashboard: Comprehensive view of active services and incoming bookings.

Service Management: Full CRUD (Create, Read, Update, Delete) for services with multiple image uploads.

Advanced Availability Manager: * Add specific dates of availability.

Create multiple custom time slots for each date.

Delete individual slots or entire dates (restricted if slots are already booked).

Booking Management: Update booking statuses (Pending, Confirmed, Completed, Cancelled).

Profile Customization: Manage business details like name, specialization, and experience.

🚀 Tech Stack
Frontend:

React.js (Vite): Fast, modern UI development.

Tailwind CSS: Responsive and clean styling.

React Context API: Global state management for authentication.

React Router: SPA (Single Page Application) navigation.

React Hot Toast: Elegant user notifications.

Backend:

Node.js & Express: Scalable server-side logic.

MongoDB & Mongoose: NoSQL database for flexible data modeling.

JWT (JSON Web Tokens): Secure session-based authentication.

Nodemailer: Automated email delivery for OTPs and Contact forms.

Third-Party Services:

Razorpay: Secure payment gateway integration.

Firebase Storage: High-speed cloud storage for profile and service images.

📂 Project Structure
Plaintext
├── local-service-backend
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic (Auth, Booking, Service, etc.)
│   ├── middleware/      # Auth protection & role-based access
│   ├── models/          # Mongoose Schemas (User, Service, Booking, Review)
│   ├── routes/          # API Endpoints
│   ├── utils/           # Helper functions (Email)
│   └── server.js        # Main entry point
│
└── local-service-frontend
    ├── src/
    │   ├── api.js       # Centralized Axios instance
    │   ├── components/  # Reusable UI parts (Common, Home, Dashboard)
    │   ├── context/     # Auth State management
    │   ├── pages/       # Main Page views
    │   └── App.jsx      # Routes and Layout
⚙️ Installation & Setup
1. Clone the repository
Bash
git clone https://github.com/YOUR_USERNAME/local-service-pro.git
2. Backend Setup
Bash
cd local-service-backend
npm install
Create a .env file in the backend root:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
FRONTEND_URL=http://localhost:5173
Start server: npm run dev

3. Frontend Setup
Bash
cd local-service-frontend
npm install
Create a .env file in the frontend root:

Code snippet
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
Start app: npm run dev

🛡️ Security Features
Password Hashing: Using bcryptjs for encryption.

Atomic Transactions: MongoDB Sessions used during booking to ensure the slot is locked only if payment is verified.

Protected Routes: Backend middleware and Frontend wrappers to prevent unauthorized access to dashboards.

Environment Variables: Sensitive keys are never hard-coded in the project files.

Developed with ❤️ by Vishal.