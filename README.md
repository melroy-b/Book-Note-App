# Book Note App

## Overview
The Book Note App is a web application that allows users to keep track of their favorite books and make notes about them (and rate them too). Users can add, edit, and delete book entries, providing a way to organize thoughts and insights about each book read.

## Features
- **Add Book**: Users can input date read, rating and a note about the book.
- **Edit Book**: Users can update details of existing book entries.
- **Delete Book**: Unwanted book entries can be removed easily.
- **Browse Books**: Users can view all their books in a list format.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (React.js)
- **Backend**: Node.js, Express, Axios
- **Database**: PostgreSQL

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

## Project Images 
<img width="1747" height="842" alt="BookNoteApp_Home" src="https://github.com/user-attachments/assets/43f46eaf-9ccb-452a-984a-f21716572622" />
<img width="847" height="797" alt="BookNoteApp_DropDown" src="https://github.com/user-attachments/assets/27a3e394-6293-40e2-a97c-26c3495e1f6d" />
<img width="1637" height="837" alt="BookNoteApp_BookDetail" src="https://github.com/user-attachments/assets/c84c0c04-4795-42f3-8a5c-94eeafb8d436" />
<img width="1532" height="852" alt="BookNoteApp_Edit_Modal" src="https://github.com/user-attachments/assets/a138d2f1-80c3-476b-ab1b-41af345dcbb6" />
<img width="1557" height="851" alt="BookNoteApp_Login-SignUp" src="https://github.com/user-attachments/assets/b928717c-8364-4534-bf25-862c050d4efb" />
<img width="1562" height="842" alt="BookNoteApp_UserBooks" src="https://github.com/user-attachments/assets/81612639-3543-433e-a788-b2b35113ef3f" />

