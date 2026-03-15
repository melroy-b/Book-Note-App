import db from "../db/index.js";

export const postUserNotes = async (req, res) => {
  const {
    bookTitle,
    noteContent,
    authorName,
    authorID,
    bookOLID,
    date_read,
    userName,
  } = req.body;

  //Check if the username exists, if yes get the user.id (Currently only single user)
  //Fetch book.id if book exists with bookOLID, if not create a new entry
  //Create a new unique note with foreign key book.id and user.id 


  console.log("server object: ", req.body);
};
