const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function validEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Invalid email");
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getField(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, mn, mx) {
  if (input.value.length < mn) {
    showError(input, `${getField(input)} length shouble be atleast ${mn}`);
  } else if (input.value.length > mx) {
    showError(input, `${getField(input)} length should be atmax ${mx}`);
  } else {
    showSuccess(input);
  }
}

function matchPassword(input1, input2) {
  if (input1.value === input2) {
    showSuccess(input2);
  } else {
    showError(input2, "Password do not match");
  }
}

function getField(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 10);
  checkLength(password, 6, 12);
  validEmail(email);
  matchPassword(password, password2);
});
