const booking = document.getElementById("Booking");
booking.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const bookingBody = booking.querySelector(".panel-body");
  console.log(bookingBody);
  const name = bookingBody.querySelector("#name").value;
  const phone = bookingBody.querySelector("#phone").value;
  const email = bookingBody.querySelector("#email").value;
  const date = bookingBody.querySelector("#date").value;
  const religion = bookingBody.querySelector("#religion").value;
  const gender = bookingBody.querySelector("#gender").value;
  const service = bookingBody.querySelector("#service").value;
  const form = {
    name: name,
    phone: phone,
    email: email,
    date: date,
    religion: religion,
    gender: gender,
    service: service,
  };

  fetch("/service/book", {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Booking successful!");
      } else {
        alert("Booking failed. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
});
