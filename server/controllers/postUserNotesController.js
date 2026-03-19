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

  try {
    //Check if the username exists, if yes get the user.id (Currently only single user)

    //Fetch book.id if book exists with bookOLID, if not create a new entry
    const bookResp = await db.query("SELECT id FROM books WHERE ol_id = $1;", [
      bookOLID,
    ]);
    let dbBookID =
      bookResp.rows.length >= 1
        ? bookResp.rows[0]
        : await db.query(
            "INSERT INTO books (title, ol_id, author_name, author_key) VALUES ($1,$2,$3,$4) RETURNING id;",
            [bookTitle, bookOLID, authorName, authorID]
          );

    console.log(typeof dbBookID.id);
    //Create a new unique note with foreign key book.id and user.id
    await db.query(
      "INSERT INTO notes (user_id, book_id, content, date_read) VALUES ($1, $2, $3, $4);",
      [1, dbBookID.id, noteContent, date_read]
    );

    console.log("server object: ", req.body);
    res.status(200).json("ok");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error posting data into database", error: error.code });
  }
};
