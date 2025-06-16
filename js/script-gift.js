document.addEventListener("DOMContentLoaded", () => {
    const giftLink = document.querySelector(".gift-alias");
    const thanks = document.getElementById("giftThanks");
    giftLink.addEventListener("click", () => {
      setTimeout(() => {
        thanks.classList.remove("hidden");
      }, 3000); // Simula regreso luego de pago
    });
  });