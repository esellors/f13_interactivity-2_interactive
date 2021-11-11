console.log('connected')

const charContainer = document.querySelector('section')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')

const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')



const baseURL = 'http://localhost:4000';

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function getAllChars() {
  axios
    .get(baseURL + '/characters')
    .then(res => {
      clearCharacters();

      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })
    .catch(err => console.log(err));
}

function getOneChar(evt) {
  console.log(evt.target.id)

  axios
    .get(baseURL + `/character/${evt.target.id}`)
    .then(res => {
      clearCharacters();

      createCharacterCard(res.data)
    })
    .catch(err => console.log(err));

}

for (let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener('click', getOneChar);
}

function createChar() {
  // get all necessary info
  // package the info into an object
  // send the object off on our request to be handled by the server
  // hand the server response

  const newFirstName = newFirstInput.value;
  const newLastName = newLastInput.value;
  const newAge = parseInt(newAgeInput.value);
  const newGender = newGenderDropDown.value;
  const newLikesArr = newLikesText.value.split(',')

  const theBody = {
    firstName: newFirstName,
    lastName: newLastName,
    age: newAge,
    gender: newGender,
    likes: newLikesArr
  }

  axios
    .post(baseURL + '/character', theBody)
    .then(res => {
      clearCharacters();

      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })
    .catch(err => console.log(err));
}

createForm.addEventListener('submit', createChar);
getAllBtn.addEventListener("click", getAllChars);

getAllChars();