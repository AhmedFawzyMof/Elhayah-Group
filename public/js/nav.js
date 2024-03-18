const dropbtn = document.querySelector(".menu.phone .dropbtn");
const dropbtnPc = document.querySelector(".menu.pc .dropbtn");
const jobs = document.querySelector(".menu.phone .jobs");
const jobsPc = document.querySelector(".menu.pc .jobs");

dropbtn.addEventListener("click", () => {
  jobs.classList.toggle("show");
  const icon = dropbtn.querySelector("i");
  if (jobs.classList.contains("show")) {
    icon.style.rotate = "180deg";
  }
  if (!jobs.classList.contains("show")) {
    icon.style.rotate = "0deg";
  }
});

const menuBtn = document.querySelector(".menuBtn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});

dropbtnPc.addEventListener("click", () => {
  jobsPc.classList.toggle("show");
  const icon = dropbtnPc.querySelector("i");
  if (jobsPc.classList.contains("show")) {
    icon.style.rotate = "180deg";
  }
  if (!jobsPc.classList.contains("show")) {
    icon.style.rotate = "0deg";
  }
});
