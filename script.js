const imagens = document.querySelectorAll("img");
const zonas = document.querySelectorAll(".dropzone");
const canvas = document.getElementById("linhaCanvas");
const ctx = canvas.getContext("2d");
const feedback = document.getElementById("feedback");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

imagens.forEach(img => {
  img.addEventListener("click", () => {
    imagens.forEach(i => i.classList.remove("selecionada"));
    img.classList.add("selecionada");
  });
});

zonas.forEach(zona => {
  zona.addEventListener("click", () => {
    const imgSelecionada = document.querySelector(".selecionada");
    if (!imgSelecionada) return;

    const imgRect = imgSelecionada.getBoundingClientRect();
    const zonaRect = zona.getBoundingClientRect();

    const x1 = imgRect.right;
    const y1 = imgRect.top + imgRect.height / 2;
    const x2 = zonaRect.left;
    const y2 = zonaRect.top + zonaRect.height / 2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    if (zona.dataset.img === imgSelecionada.id) {
      ctx.strokeStyle = "#27ae60"; // verde
      feedback.textContent = "✅ Conexão correta!";
    } else {
      ctx.strokeStyle = "#e74c3c"; // vermelho
      feedback.textContent = "❌ Tente novamente.";
    }

    ctx.lineWidth = 3;
    ctx.stroke();

    imgSelecionada.classList.remove("selecionada");
  });
});
