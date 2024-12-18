let calc;
let modal;
const body = document.querySelector("body");

const createCalc = () => {
  calc = document.createElement("div");
  calc.classList.add("calc");
  calc.addEventListener("click", (e) => {
    calc.remove();
  });
};

const creatModal = (question) => {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <p>${question}</p>
`;
  const cancel = document.createElement("button");
  cancel.innerText = "Annuler";
  cancel.classList.add("btn", "btn-secondary");
  const confirm = document.createElement("button");
  confirm.innerText = "Confirmer";
  confirm.classList.add("btn", "btn-primary");

  modal.append(cancel, confirm);
};

export function openModal(question) {
  createCalc();
  creatModal(question);
  calc.append(modal);
  body.append(calc);
}
