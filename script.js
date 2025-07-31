const imagens = document.querySelectorAll("img");
const zonas = document.querySelectorAll(".dropzone");
const canvas = document.getElementById("linhaCanvas");
const ctx = canvas.getContext("2d");
const feedback = document.getElementById("feedback");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pontuacao = 0;

// Embaralhar elementos ao iniciar
function embaralharElementos() {
  const containerImgs = document.getElementById("container-imgs");
  const containerZonas = document.getElementById("container-zonas");

  const imagensArray = Array.from(containerImgs.children);
  const zonasArray = Array.from(containerZonas.children);

  imagensArray.sort(() => Math.random() - 0.5);
  zonasArray.sort(() => Math.random() - 0.5);

  imagensArray.forEach(img => containerImgs.appendChild(img));
  zonasArray.forEach(zona => containerZonas.appendChild(zona));
}

embaralharElementos();

// Função de confetes
function lançarConfetes() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}

// Seleção de imagem
imagens.forEach(img => {
  img.addEventListener("click", () => {
    imagens.forEach(i => i.classList.remove("selecionada"));
    img.classList.add("selecionada");
  });
});

// Verificação e conexão
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
      pontuacao++;
      feedback.textContent = `✅ Conexão correta! Pontuação: ${pontuacao}/10`;

      if (pontuacao === 10) {
        feedback.textContent = "🎊 Você dominou as Regras que Salvam Vidas! 🛡️ Pontuação final: 10/10";
        lançarConfetes();

        setTimeout(() => {
          pontuacao = 0;
          embaralharElementos();
          feedback.textContent = "🔁 Jogo reiniciado! Tente novamente!";
        }, 5000);
      }

    } else {
      ctx.strokeStyle = "#e74c3c"; // vermelho
      feedback.textContent = `❌ Tente novamente. Pontuação: ${pontuacao}/10`;
    }

    ctx.lineWidth = 3;
    ctx.stroke();
    imgSelecionada.classList.remove("selecionada");
  });
});
