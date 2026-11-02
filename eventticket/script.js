const form = document.querySelector("#ticket-form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const type = document.querySelector("#type");
const eventDate = document.querySelector("#event-date");

const extraField = document.querySelector("#extra-field");
const extraLabel = document.querySelector("#extra-label");
const extraInput = document.querySelector("#extra-input");

const errors = document.querySelector("#errors");
const ticket = document.querySelector("#ticket");

// Format a date using the user's local calendar date.
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// The earliest allowed event date is tomorrow.
function updateMinimumDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  eventDate.min = formatDate(tomorrow);
}

updateMinimumDate();

// Refresh the minimum if the page stays open overnight.
eventDate.addEventListener("focus", updateMinimumDate);

type.addEventListener("change", function () {
  const isStudent = type.value === "student";
  const hasType = isStudent || type.value === "guest";

  extraField.hidden = !hasType;
  extraInput.disabled = !hasType;
  extraInput.required = hasType;
  extraInput.value = "";

  ticket.hidden = true;
  errors.hidden = true;
  errors.replaceChildren();

  if (isStudent) {
    extraLabel.textContent = "Student I#";
    extraInput.placeholder = "Enter 9 digits";
    extraInput.inputMode = "numeric";
    extraInput.maxLength = 9;
  } else if (type.value === "guest") {
    extraLabel.textContent = "Access Code";
    extraInput.placeholder = "Enter the event access code";
    extraInput.inputMode = "text";
    extraInput.removeAttribute("maxlength");
  }
});

// Hide old ticket information when the form changes.
form.addEventListener("input", function () {
  ticket.hidden = true;
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const messages = [];

  errors.replaceChildren();
  errors.hidden = true;
  ticket.replaceChildren();
  ticket.hidden = true;

  const first = firstName.value.trim();
  const last = lastName.value.trim();

  email.value = email.value.trim();

  if (first === "") {
    messages.push("Please enter your first name.");
  }

  if (last === "") {
    messages.push("Please enter your last name.");
  }

  if (email.value === "" || !email.validity.valid) {
    messages.push("Please enter a valid email address.");
  }

  if (type.value !== "student" && type.value !== "guest") {
    messages.push("Please select Student or Guest.");
  }

  const today = formatDate(new Date());

  if (eventDate.value === "") {
    messages.push("Please select an event date.");
  } else if (eventDate.value <= today) {
    messages.push("The event date must be later than today.");
  }

  if (type.value === "student") {
    const studentNumber = extraInput.value.trim();

    if (!/^\d{9}$/.test(studentNumber)) {
      messages.push("Your Student I# must contain exactly 9 digits.");
    }
  }

  if (type.value === "guest") {
    if (extraInput.value.trim() !== "EVENT131") {
      messages.push("The access code must be EVENT131.");
    }
  }

  if (messages.length > 0) {
    const list = document.createElement("ul");

    messages.forEach(function (message) {
      const item = document.createElement("li");
      item.textContent = message;
      list.appendChild(item);
    });

    errors.appendChild(list);
    errors.hidden = false;
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = "Your ticket is ready!";
  ticket.appendChild(heading);

  // Construct the date in local time to avoid timezone shifts.
  const parts = eventDate.value.split("-").map(Number);
  const selectedDate = new Date(parts[0], parts[1] - 1, parts[2]);

  const readableDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const ticketDetails = [
    ["Name", `${first} ${last}`],
    ["Email", email.value],
    ["Type", type.value === "student" ? "Student" : "Guest"],
    ["Event Date", readableDate]
  ];

  ticketDetails.forEach(function (detail) {
    const paragraph = document.createElement("p");
    const label = document.createElement("strong");

    label.textContent = `${detail[0]}: `;
    paragraph.appendChild(label);
    paragraph.appendChild(document.createTextNode(detail[1]));

    ticket.appendChild(paragraph);
  });

  ticket.hidden = false;
});