/*
TAREA 1: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

document.querySelector("#generate-members").onclick = (event) => {
  const $membersAmount = document.querySelector("#members-amount");
  const membersAmount = Number($membersAmount.value);

  const error = validateMemberAmount(membersAmount);

  if (!error) {
    deletePreviousMembers();
    removePreviousErrors("get-members");
    hideElement("#results");
    createMembers(membersAmount);
  } else {
    handleErrors(error, "get-members");
  }

  event.preventDefault();
};

document.querySelector("#calculate").onclick = (event) => {
  const ages = getMembersAges();

  const error = validateMembersAges(ages);

  const oldestId = "oldest";
  const youngestId = "youngest";
  const averageId = "average";

  if (!error) {
    removePreviousErrors("members");
    showAge(oldestId, getOldest(ages));
    showAge(youngestId, getYoungest(ages));
    showAge(averageId, getAverage(ages));

    showElement("#results");
  } else {
    handleErrors(error, "members");
  }
};

document.querySelector("#reset").onclick = reset;

function deletePreviousMembers() {
  const $toDelete = document.querySelectorAll(".member");
  for (let entry of $toDelete) {
    entry.remove();
  }
}

function createMembers(amount) {
  if (amount) {
    for (let i = 0; i < amount; i++) {
      createMember(i);
    }
    showElement("#buttons");
  } else {
    reset();
  }
}

function createMember(index) {
  const $div = document.createElement("div");
  $div.className = "d-flex justify-content-around member";

  const $label = document.createElement("label");
  $label.textContent = `Family member #${index + 1} age`;
  $label.className = "align-self-center";

  const $input = document.createElement("input");
  $input.className = "w-25 form-control member-age";
  $input.type = "number";

  $div.appendChild($label);
  $div.appendChild($input);

  document.querySelector("#members").appendChild($div);
}

function getMembersAges() {
  const $membersAge = document.querySelectorAll(".member-age");
  const membersAge = [];
  for (let i = 0; i < $membersAge.length; i++) {
    membersAge.push(Number($membersAge[i].value));
  }
  return membersAge;
}

function showAge(id, value) {
  document.querySelector(`#${id}-age`).textContent = value;
}

function getOldest(ages) {
  return Math.max(...ages);
}

function getYoungest(ages) {
  return Math.min(...ages);
}

function getAverage(ages) {
  const sum = ages.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
  return sum / ages.length;
}

function showElement(id) {
  document.querySelector(`${id}`).classList.remove("hidden");
}

function hideElement(id) {
  document.querySelector(`${id}`).classList.add("hidden");
}

function reset() {
  hideElement("#results");
  hideElement("#buttons");
  deletePreviousMembers();
  removePreviousErrors();
}

function validateMemberAmount(number) {
  if (!Number.isInteger(number)) {
    return "El numero de integrantes no puede ser un numero decimal";
  }
  if (!/^[0-9]+$/.test(number)) {
    return "Ingrese un numero positivo";
  }
}

function validateMembersAges(ages) {
  if (
    ages.some((currentValue) => {
      return !Number.isInteger(currentValue) || !/^[0-9]+$/.test(currentValue);
    })
  ) {
    return "Las edades no pueden ser numeros decimales ni negativos";
  }
}

function handleErrors(error, id) {
  removePreviousErrors(id);
  hideElement("#results");

  const $node = document.querySelector(`#${id}`);
  $node.querySelectorAll("input").forEach((input) => {
    input.classList.add("error");
    input.classList.remove("form-control");
  });

  const $errors = document.querySelector("#errors");

  const $alert = document.createElement("div");
  $alert.id = "error";
  $alert.textContent = error;
  $alert.className = "alert alert-danger";

  $errors.appendChild($alert);
}

function removePreviousErrors(id = "") {
  if (id) {
    const $node = document.querySelector(`#${id}`);
    $node.querySelectorAll("input").forEach((input) => {
      input.classList.remove("error");
      input.classList.add("form-control");
    });
  }

  const $errors = document.querySelectorAll("#error");

  for (const error of $errors) {
    error.remove();
  }
}
