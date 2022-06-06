// API: https://yesno.wtf/

const question = document.querySelector("#question");
const contenedor = document.querySelector("#contenedor");

const questions = [
  "Se trabaja hoy?",
  "Sueñan los androides con ovejas eléctricas?",
  "Sabes dónde está Wally?",
];

const answers = {
  yes: "Si",
  no: "No",
  maybe: "Tal vez",
};

fetch("https://yesno.wtf/api")
  .then((response) => response.json())
  .then(({ answer, image }) => {
    question.textContent = questions[random(0, questions.length)];
    const img = document.createElement("img");
    img.title = answer;
    img.alt = "Gif que da la respuesta " + answer;
    img.src = image;
    contenedor.appendChild(img);
  })
  .catch((error) => {
    console.error(error);
  });

//Random function
function random(min = 0, max = 100) {
  // find diff
  let difference = max - min;
  // generate random number
  let rand = Math.random();
  // multiply with difference
  rand = Math.floor(rand * difference);
  // add with min value
  rand = rand + min;
  return rand;
}
