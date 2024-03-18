const services = {
  AddService: async (db, service) => {
    const slug = service.name.replace(" ", "-");
    try {
      service.slug = slug;
      const [_, __] = await db.query(
        "INSERT INTO services(name, slug, nameAr, thumbnail, description, descriptionAr) VALUES(?, ?, ?, ?, ?, ?)",
        [
          service.name,
          service.slug,
          service.nameAr,
          service.thumbnail,
          service.description,
          service.descriptionAr,
        ]
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  GetAllServices: async (db) => {
    const [services, _] = await db.query("SELECT * FROM services");
    services.forEach((service) => {
      service.thumbnail = service.thumbnail.replace("static", "");
    });
    return services;
  },
  GetServiceBySlug: async (db, slug) => {
    try {
      const [service, _] = await db.query(
        "SELECT * FROM `services` where slug = ?;",
        slug
      );
      service.forEach((service) => {
        service.thumbnail = service.thumbnail.replace("static", "");
      });
      return service[0];
    } catch (err) {
      console.error(err);
      return {};
    }
  },
  DeleteService: async (db, id) => {
    try {
      const [__, _] = await db.query("DELETE FROM `services` WHERE id = ?", [
        id,
      ]);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

module.exports = services;
