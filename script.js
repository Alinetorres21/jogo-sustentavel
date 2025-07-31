const imagens = document.querySelectorAll("img");
const zonas = document.querySelectorAll(".dropzone");
const canvas = document.getElementById("linhaCanvas");
const ctx = canvas.getContext("2d");
const feedback = document.getElementById("feedback");

let conexoesFeitas = new Set();
let imgSelecionada = null;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Seleciona a imagem
imagens.forEach(img => {
  img.addEventListener("click", () => {
    if (conexoesFeitas.has(img.id)) {
      feedback.textContent = "🔒 Esta imagem já foi conectada.";
      return;
    }
    imgSelecionada = img;
    imagens.forEach(i => i.classList.remove("selecionada"));
    img.classList.add("selecionada");
    feedback.textContent = "👉 Agora clique no texto correspondente.";
  });
});

// Clica na zona de texto
zonas.forEach(zona => {
  zona.addEventListener("click", () => {
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

    const correta = zona.dataset.img === imgSelecionada.id;

    ctx.strokeStyle = correta ? "#27ae60" : "#e74c3c";
    ctx.lineWidth = 4;
    ctx.stroke();

    if (correta) {
      feedback.textContent = "🎉 Conexão correta!";
      conexoesFeitas.add(imgSelecionada.id);
    } else {
      feedback.innerHTML = `❌ Conexão incorreta. <button id="btnTentar">Tentar novamente</button>`;
      document.getElementById("btnTentar").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgSelecionada.classList.remove("selecionada");
        imgSelecionada = null;
        feedback.textContent = "🔁 Tente novamente!";
      });
    }

    imgSelecionada.classList.remove("selecionada");
    imgSelecionada = null;
  });
});
