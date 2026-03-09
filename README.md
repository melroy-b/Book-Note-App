# Book Note App

## Overview
The Book Note App is a web application that allows users to keep track of their favorite books and make notes about them. Users can add, edit, and delete book entries, providing a way to organize thoughts and insights about each book read.

## Features
- **Add Book**: Users can input the title, author, genre, and a note about the book.
- **Edit Book**: Users can update details of existing book entries.
- **Delete Book**: Unwanted book entries can be removed easily.
- **Browse Books**: Users can view all their books in a list format.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (for server setup)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

#### 1. Clone the repository:
```bash
git clone https://github.com/melroy-b/Book-Note-App.git
```
Navigate into the project directory: cd "Project-Folder"

#### 2. Install client dependencies
```bash
cd client
npm install
```
Create a .env file in the client directory (refer .env.example)

#### 3. Install server dependencies
```bash
cd ../server
npm install
```
Create a .env file in the server directory
Add necessary configurations (database connection, API port, etc.)

#### 4. Start both servers (in separate terminals)
##### Terminal 1: Client
```bash
cd client
npm run dev
```

##### Terminal 2: Server
```bash
cd server
npm start
```

## Contributing
If you would like to contribute to the project, feel free to submit a pull request or open an issue to discuss your ideas.
