let modal = <HTMLDivElement>document.querySelector(".modal"),
form = <HTMLFormElement>document.getElementById("feedbackForm");
document.addEventListener("click", (e: any) => {
  if (
    e.target.dataset.section &&
    !e.target.parentNode.classList.contains("active")
  ) {
    let target = e.target;
    window.scrollBy({
      top: document
        .querySelector(`.${target.dataset.section}`)
        .getBoundingClientRect().top,
      behavior: "smooth",
    });
    if (target.closest(".points")) {
      target
        .closest(".points")
        .querySelector(".active")
        .classList.remove("active");
      target.parentNode.classList.add("active");
    }
  } else if (e.target === modal || e.target.closest(".close"))
    modal.classList.remove("active");
});

form.onsubmit = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  const showMessage = (message: string, color: string) => {
    modal.classList.add("active");
    modal.querySelector("p").style.color = color;
    modal.querySelector("p").innerHTML = message;
  };
  fetch("/submit", {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      if (response.ok) {
        showMessage("Мы с вами свяжемся в ближайшее время!", "#333333");
      } else {
        showMessage(
          "Сейчас невозможно отправить Ваши данные, попробуйте позже!",
          "#FF645F"
        );
      }
    })
    .catch(error=> console.log(error));
  form.reset();
};


