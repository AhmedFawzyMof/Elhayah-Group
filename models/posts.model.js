const posts = {
  GetAllPosts: async (db) => {
    try {
      const [posts, _] = await db.query("SELECT * FROM `posts`");

      posts.forEach((post) => {
        post.image = post.image.replace("static", "");
      });

      return posts;
    } catch (err) {
      return [];
    }
  },
  GetBlogPost: async (db, id) => {
    try {
      const [posts, _] = await db.query("SELECT * FROM `posts` WHERE id = ?", [
        id,
      ]);
      posts.forEach((post) => {
        post.image = post.image.replace("static", "");
      });

      return posts[0];
    } catch (err) {
      return {};
    }
  },
  AddNewPosts: async (db, post) => {
    try {
      const title = post.title;
      const paragraph = post.article;
      const image = post.image;

      const [__, _] = await db.query(
        "INSERT INTO `posts`(`title`,`paragraph`,`image`) VALUES  (?,?,?)",
        [title, paragraph, image]
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  EditPost: async (db, post) => {
    try {
      const title = post.title;
      const paragraph = post.article;
      let base64String = post.image;
      let buffer;
      if (base64String !== "") {
        buffer = Buffer.from(base64String, "base64");
        const [__, _] = await db.query(
          "UPDATE `posts` SET `title=?, `paragraph`=?, `image`=? WHERE id = ?",
          [title, paragraph, buffer]
        );
      }

      const [__, _] = await db.query(
        "UPDATE `posts` SET `title=?, `paragraph`=? WHERE id = ?",
        [title, paragraph]
      );

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  DeletePost: async (db, id) => {
    try {
      const [__, _] = await db.query("DELETE FROM `posts` WHERE id = ?", [id]);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

module.exports = posts;
