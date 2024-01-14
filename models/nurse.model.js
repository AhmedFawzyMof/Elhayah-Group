function changeDateFormat(cdate) {
  let timestamp = Date.parse(cdate);
  let date = new Date(timestamp);
  let output = date.toISOString().slice(0, 10).replace(/-/g, "/");
  return output;
}

const nurses = {
  AddNurseJobApp: async (db, jobapp) => {
    for (let key in jobapp) {
      if (jobapp[key] === "" || jobapp[key] === undefined) {
        return false;
      }
    }

    try {
      const createdAt = new Date();

      const [__, _] = await db.query(
        "INSERT INTO `Nurse-job`(`fullname`,`job`,`birth-date`,`birth-place`,`religion`,`national-id`,`current-residence-address`,`phone`,`social-situation`,`previous-workplaces`,`patient-religion`,`patient-gender`,`preferred-worktime`,`email`, `gender`, `created-at`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [
          jobapp.fullName,
          jobapp.job,
          jobapp.birthDate,
          jobapp.birthPlace,
          jobapp.religion,
          jobapp.nationalId,
          jobapp.currentResidenceAddress,
          jobapp.phone,
          jobapp.socialSituation,
          jobapp.previousWorkplaces,
          jobapp.patientReligion,
          jobapp.patientGender,
          jobapp.workingHour,
          jobapp.email,
          jobapp.gender,
          createdAt,
        ]
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  GetAllNursesJobApp: async (db) => {
    try {
      const [jobs, _] = await db.query("SELECT * FROM `Nurse-job`");

      jobs.forEach((job) => {
        const newDate = changeDateFormat(job["birth-date"]);
        job["birth-date"] = newDate;
      });
      return jobs;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  DeleteNurseJobApp: async (db, id) => {
    try {
      const [__, _] = await db.query("DELETE FROM `Nurse-job` WHERE id = ?", [
        id,
      ]);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

module.exports = nurses;
