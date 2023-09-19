# Celikstagram Social Media App

Welcome to the Celikstagram! This is a web application that allows users to share posts, follow other users, and interact through comments and likes.

## Features

- User registration and authentication.
- Posting and sharing updates.
- Following and being followed by other users.
- Liking posts.
- Commenting on posts.
- Profile customization.

## Technologies Used

- React.js
- Node.js
- Express.js
- Sequelize (ORM)
- MYSQL (Database)
- HTML/CSS
- Redux (State Management)
- Axios (HTTP Requests)

## Installation

1. Clone the repository:
- git clone [https://github.com/ArdaCelikk/celikstagram-react.git](https://github.com/ArdaCelikk/celikstagram-react.git)
- cd celikstagram-react

2. Install dependencies for the frontend and backend:
- create a database named 'celikstagram' in MySQL.
- npm install 
- cd src
- cd server
- npx sequelize-cli db:migrate
- set up a proxy in the package.json file.
- create a .env file.
- configure PROXY_PORT, JWT_PASSWORD, CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET settings in the .env file.

3. Configure the database connection in `/src/server/config/config.json`.

4. Run the development server:
- npm run start
- npm run server

5. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Register a new account or log in with an existing one.
- Create and share posts.
- Follow other users and view their posts on your feed.
- Delete, Like and comment on posts.
- Customize your profile information and profile picture.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


