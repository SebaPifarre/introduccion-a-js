/*
TAREA 2:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/
document.querySelector("#add-member").onclick = (event) => {
  addMember();
  event.preventDefault();
};

let idCounter = 0;

function addMember() {
  const $div = document.createElement("div");
  const newId = idCounter;
  idCounter += 1;

  $div.className = `member${newId}`;
  $div.classList.add("d-flex", "gap-3", "m-2");

  const $label = document.createElement("label");
  $label.textContent = "Member salary";
  $label.className = "align-self-center p-2 me-auto";

  const $input = document.createElement("input");
  $input.type = "number";
  $input.className = "p-2";

  const $button = document.createElement("button");
  $button.type = "button";
  $button.textContent = "X";
  $button.className = "btn btn-outline-danger p-2";
  $button.onclick = () => removeMember(newId);

  $div.appendChild($label);
  $div.appendChild($input);
  $div.appendChild($button);

  document.querySelector("#members").appendChild($div);
  showElement("#calculate");
}

function removeMember(id) {
  const $toDelete = document.querySelector(`.member${id}`);
  $toDelete.remove();
  hideElement("#results");
  if (document.querySelector("#members").childElementCount === 0) {
    hideElement("#calculate");
    removePreviousErrors();
  }
}

document.querySelector("#calculate").onclick = () => {
  const salaries = getSalaries();

  const error = validateSalaries(salaries);

  const highestId = "highest";
  const lowestId = "lowest";
  const averageAnualId = "average-anual";
  const averageMonthlyId = "average-monthly";

  if (!error) {
    removePreviousErrors('members');

    showSalary(highestId, getHighest(salaries));
    showSalary(lowestId, getLowest(salaries));
    showSalary(averageAnualId, getAverageAnual(salaries));
    showSalary(averageMonthlyId, getAverageMonthly(salaries));

    showElement("#results");
  } else {
    handleErrors(error, 'members');
  }
};

function getSalaries() {
  const $numbers = document.querySelectorAll("#members input");
  const numbers = [];

  for (let i = 0; i < $numbers.length; i++) {
    numbers.push(Number($numbers[i].value));
  }

  return numbers;
}

function showSalary(id, value) {
  document.querySelector(`#${id}-salary`).textContent = value;
}

function getHighest(numbers) {
  return Math.max(...numbers);
}

function getLowest(numbers) {
  return Math.min(...numbers);
}

function getAverageAnual(numbers) {
  const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
  return sum / numbers.length;
}
function getAverageMonthly(numbers) {
  const months = 12;
  return getAverageAnual(numbers) / months;
}

function showElement(id) {
  document.querySelector(`${id}`).classList.remove("hidden");
}

function hideElement(id) {
  document.querySelector(`${id}`).classList.add("hidden");
}

function validateSalaries(salaries) {
  if (salaries.some((currentValue) => {return currentValue <= 0})) {
    return "Ingrese salarios positivos y distinto de 0";
  } 
}

function handleErrors(error, id) {
  removePreviousErrors();
  hideElement("#results");

  const $errors = document.querySelector("#errors");

  const $div = document.createElement("div");
  $div.id = "error";
  $div.textContent = error;
  $div.className = "alert alert-danger";

  $errors.appendChild($div);

  const $membersNode = document.querySelector(`#${id}`);
  $membersNode.querySelectorAll("input").forEach((input) => {
    input.classList.add("error");
  });
}

function removePreviousErrors(id = "") {
  if (id) {
    const $membersNode = document.querySelector(`#${id}`);
    $membersNode.querySelectorAll("input").forEach((input) => {
      input.classList.remove("error");
    });
  }

  const $errors = document.querySelectorAll("#error");
  $errors.forEach((error) => {
    error.remove();
  });
}
