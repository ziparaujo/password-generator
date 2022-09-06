const copy = document.querySelector('.password i');
const password = document.querySelector('.password p');
const range = document.getElementById('inputLength');
const inputLength = document.querySelector('.length-options label')
const button = document.getElementById('generate');
const force = document.querySelectorAll('.force span');
const options = document.querySelectorAll('.option-item');

const checkLower = document.getElementById('checkLower');
const checkUpper = document.getElementById('checkUpper');
const checkNumbers = document.getElementById('checkNumbers');
const checkSymbols = document.getElementById('checkSymbols');

const lowercase = 'abcdefghijklmnopqrstuvxwyz';
const lowercaseArray = Array.from(lowercase);
const uppercaseArray = lowercaseArray.map((letra) => letra.toUpperCase());
const symbols = ['#', '@', '!', '$', '%', '&', '*', '-', '+'];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// add novo tamanho ao 0
range.addEventListener('change', () => {
  inputLength.innerText = range.value;
});

let senha = '';

// função para gerar um novo array
const generator = (hasLowercase, hasUppercase, hasNumbers, hasSymbols) => {
  const newArray = [
    ...(hasLowercase ? lowercaseArray : []),
    ...(hasUppercase ? uppercaseArray : []),
    ...(hasNumbers ? numbers : []),
    ...(hasSymbols ? symbols : [])
  ]

  if (newArray.length === 0) return;
  if (senha.length > 0) senha = '';

  for (let i = 0; i < range.value; i++) {
    const randomIndex = Math.floor(Math.random() * newArray.length);
    senha += newArray[randomIndex];
  }

  password.innerText = senha;
}

button.addEventListener('click', () => generator(
  checkLower.checked,
  checkUpper.checked,
  checkNumbers.checked,
  checkSymbols.checked
))
  
const copyToClipboard = () => {
  navigator.clipboard.writeText(password.innerText);
}

copy.addEventListener('click', copyToClipboard);

const teste = Array.from(options);
let checked = [];

options.forEach((item) => {
  item.addEventListener('change', () => {
    checked = teste.map((item) => {
      return item.firstChild.nextElementSibling.checked;
    })
    let isTrue = checked.filter((item) => {
      if (item) return item;
    })
    force.forEach((item, index) => {
      if (index < isTrue.length) {
        item.classList.add('ativo');
      } else item.classList.remove('ativo');
    })
  })
})