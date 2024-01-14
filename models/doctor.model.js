function changeDateFormat(cdate) {
  let timestamp = Date.parse(cdate);
  let date = new Date(timestamp);
  let output = date.toISOString().slice(0, 10).replace(/-/g, "/");
  return output;
}

const doctors = {
  AddDoctorJobApp: async (db, jobapp) => {
    for (let key in jobapp) {
      if (jobapp[key] === "" || jobapp[key] === undefined) {
        return false;
      }
    }
    try {
      const createdAt = new Date();

      const [add, _] = await db.query(
        "INSERT INTO `Doctor-job`(`fullname`,`birth-date`,`national-id`,`birth-place`,`current-residence-address`,`specialization`,`qualification`,`other-studies`,`graduation-year`,`university`,`previous-workplaces`,`email`,`phone`,`gender`,`religion`,`patient-religion`,`patient-gender`,`preferred-worktime`, `created-at`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [
          jobapp.fullName,
          jobapp.birthDate,
          jobapp.nationalId,
          jobapp.birthPlace,
          jobapp.currentResidenceAddress,
          jobapp.specialization,
          jobapp.qualification,
          jobapp.otherStudies,
          jobapp.graduationYear,
          jobapp.university,
          jobapp.previousWorkplaces,
          jobapp.email,
          jobapp.phone,
          jobapp.gender,
          jobapp.religion,
          jobapp.patientReligion,
          jobapp.patientGender,
          jobapp.workingHour,
          createdAt,
        ]
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  GetAllDoctorsJobApp: async (db) => {
    try {
      const [jobs, _] = await db.query("SELECT * FROM `Doctor-job`");

      jobs.forEach((job) => {
        const newDate = changeDateFormat(job["birth-date"]);
        job["birth-date"] = newDate;
        const newDate2 = changeDateFormat(job["graduation-year"]);
        job["graduation-year"] = newDate2;
      });
      return jobs;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  DeleteDoctorsJobApp: async (db, id) => {
    try {
      const [__, _] = await db.query("DELETE FROM `Doctor-job` WHERE id = ?", [
        id,
      ]);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

module.exports = doctors;
