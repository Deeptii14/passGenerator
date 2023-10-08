const createdPassword = document.querySelector("[password-bngya]");
const passwordlengthvalue = document.querySelector("[passwordlengthvalue]");
const sliderContainer = document.querySelector(".myRange");
const Uppercase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const Numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const copyIcon = document.querySelector("[copyIcon]");
const copied = document.querySelector("[copydone]");
const indicator = document.querySelector(".indicator");
const symbolsarray = "~@#$%&8)(^{:;?/.,|*_-}]";
let passwordlength = 10;
let pasword = "";

handleslider();
setIndicator("#ccc");

// handle slider
function handleslider() {
  sliderContainer.value = passwordlength;
  passwordlengthvalue.innerHTML = passwordlength;
  const min = sliderContainer.min;
  const max = sliderContainer.max;
  sliderContainer.style.backgroundSize =
    ((passwordlength - min) * 100) / (max - min) + "% 100%";
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

sliderContainer.addEventListener("input", (e) => {
  passwordlength = e.target.value;
  handleslider();
});

//strentgh
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (Uppercase.checked) hasUpper = true;
  if (lowerCase.checked) hasLower = true;
  if (Numbers.checked) hasNum = true;
  if (symbols.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordlength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

//Shuffle password
function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

// copy icon
copyIcon.addEventListener("click", () => {
  navigator.clipboard.writeText(createdPassword.value);
  copied.innerHTML = "copied";
  copied.classList.add("active");
  setTimeout(() => {
    copied.innerHTML = "";
    copied.classList.remove("active");
  }, 2000);
});

//calculating strength

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (Uppercase.checked) hasUpper = true;
  if (lowerCase.checked) hasLower = true;
  if (Numbers.checked) hasNum = true;
  if (symbols.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordlength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

function getrndNumber(min, max) {
  return Math.floor(Math.random() * [max - min]) + min;
}

function UppercaseDigit() {
  return String.fromCharCode(getrndNumber(65, 90));
}
function LowerCaseDigit() {
  return String.fromCharCode(getrndNumber(97, 122));
}
function SymbolDigit() {
  return symbolsarray[getrndNumber(0, symbolsarray.length)];
}
function DigitCase() {
  return getrndNumber(0, 9);
}

//generate password
function generatePassword() {
  let password = "";
  let checkCount = 0;
  if (passwordlength == 0) {
    return;
  }
  let checkedField = [];
  if (Uppercase.checked) {
    checkedField.push(UppercaseDigit);
    checkCount++;
  }
  if (lowerCase.checked) {
    checkedField.push(LowerCaseDigit);
    checkCount++;
  }
  if (Numbers.checked) {
    checkedField.push(DigitCase);
    checkCount++;
  }
  if (symbols.checked) {
    checkedField.push(SymbolDigit);
    checkCount++;
  }
  if (passwordlength < checkCount) {
    passwordlength = checkCount;
  }
  // compulsory case
  for (let i = 0; i < checkedField.length; i++) {
    password += checkedField[i]();
  }
  for (let i = 0; i < passwordlength - checkedField.length; i++) {
    password += checkedField[getrndNumber(0, checkedField.length)]();
  }
  password = shufflePassword(Array.from(password));
  createdPassword.value = password;
  calcStrength();
}
