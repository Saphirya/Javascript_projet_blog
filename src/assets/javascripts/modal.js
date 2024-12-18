let calc;
let modal;
let cancel;
let confirm;
const body = document.querySelector("body");

const createCalc = () => {
  calc = document.createElement("div");
  calc.classList.add("calc");
};

const creatModal = (question) => {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <p>${question}</p>
`;
  cancel = document.createElement("button");
  cancel.innerText = "Annuler";
  cancel.classList.add("btn", "btn-secondary");
  confirm = document.createElement("button");
  confirm.innerText = "Confirmer";
  confirm.classList.add("btn", "btn-primary");
  modal.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  modal.append(cancel, confirm);
};

export function openModal(question) {
  createCalc();
  creatModal(question);
  calc.append(modal);
  body.append(calc);
  return new Promise((resolve, reject) => {
    calc.addEventListener("click", (e) => {
      resolve(false);
      calc.remove();
    });

    cancel.addEventListener("click", (e) => {
      resolve(false);
      calc.remove();
    });

    confirm.addEventListener("click", (e) => {
      resolve(true);
      calc.remove();
    });
  });
}
