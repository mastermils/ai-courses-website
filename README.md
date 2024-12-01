# AI Courses Website

## Project Overview
This project is a web application designed to provide and manage Artificial Intelligence courses. It consists of a frontend for user interaction and a backend for managing data and authentication.

### Features
- **Course Management**: Add, edit, delete, and view courses.
- **Authentication**: OAuth 2.0-based login and session management.
- **Dynamic Content**: Enroll in courses and view details dynamically.
- **User-Friendly Design**: Responsive and easy-to-navigate UI.

### Tech Stack
- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: OpenID Connect via Keycloak

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-courses-website.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ai-courses-website
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Start the backend server:
   ```bash
   node index.js
   ```

5. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

6. Access the application in your browser at `http://localhost:5173`.

### Environment Variables
Create a `.env` file in the `backend` directory with the following contents:
```
SESSION_SECRET=your-secret-key
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
```

### Contributing
Contributions are welcome! Please fork this repository and submit a pull request with your changes.

### License
This project is open-source and available under the [MIT License](LICENSE).