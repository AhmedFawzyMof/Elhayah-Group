const contacts = {
  GetAllContacts: async (db) => {
    try {
      const [contacts, _] = await db.query(`SELECT * FROM contacts`);

      return contacts;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  DeleteContacts: async (db, id) => {
    try {
      const [__, _] = await db.query("DELETE FROM `contacts` WHERE id = ?", [
        id,
      ]);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  AddContacts: async (db, contact) => {
    for (let key in contact) {
      if (contact[key] === "" || contact[key] === undefined) {
        return false;
      }
    }
    try {
      const createdAt = new Date();

      const [add, _] = await db.query(
        "INSERT INTO `contacts` (`name`,`email`,`phone`,`comment`, `created-at`) VALUES(?,?,?,?,?)",
        [contact.name, contact.email, contact.phone, contact.message, createdAt]
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

module.exports = contacts;
