"use strict";document.addEventListener("click",function(e){e.target.closest(".scrollTo")&&!e.target.parentNode.classList.contains("active")&&(e=e.target,window.scrollBy({top:document.querySelector(".".concat(e.dataset.section)).getBoundingClientRect().top,behavior:"smooth"}),e.closest(".points")&&(e.closest(".points").querySelector(".active").classList.remove("active"),e.parentNode.classList.add("active")))}),feedbackForm.onsubmit=function(e){e.preventDefault();function t(e){var t=document.querySelector(".modal");t.classList.add("active"),t.querySelector("p").innerHTML=e,t.onclick=function(e){e.target!==t&&!e.target.closest(".close")||t.classList.remove("active")}}fetch("/submit",{method:"POST",body:new FormData(feedbackForm)}).then(function(e){console.log(e),e.ok?t("Мы с вами свяжемся в ближайшее время!"):t("Сейчас невозможно отправить Ваши данные, попробуйте позже!")}).catch(console.error()),feedbackForm.reset()};