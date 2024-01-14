function changeDateFormat(cdate) {
  let timestamp = Date.parse(cdate);
  let date = new Date(timestamp);
  let output = date.toISOString().slice(0, 10).replace(/-/g, "/");
  return output;
}

const booking = {
  AddBooking: async (db, book) => {
    for (let key in book) {
      if (book[key] === "" || book[key] === undefined) {
        return false;
      }
    }
    try {
      const createdAt = new Date();

      const [booking, _] = await db.query(
        "INSERT INTO booking (name, email, phone, gender, religion, service, date, `created-at`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
        [
          book.name,
          book.email,
          book.phone,
          book.gender,
          book.religion,
          book.service,
          book.date,
          createdAt,
        ]
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  GetAllBooking: async (db) => {
    try {
      const [booking, _] = await db.query(`SELECT * FROM booking`);

      booking.forEach((book) => {
        const newDate = changeDateFormat(book.date);
        book.date = newDate;
      });
      return booking;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  DeleteBooking: async (db, id) => {
    try {
      const [__, _] = await db.query("DELETE FROM `booking` WHERE id = ?", [
        id,
      ]);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

module.exports = booking;
