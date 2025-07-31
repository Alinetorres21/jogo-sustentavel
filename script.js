const imagens = document.querySelectorAll("img");
const zonas = document.querySelectorAll(".dropzone");
const container = document.querySelector(".container");
const canvas = document.getElementById("linhaCanvas");
const ctx = canvas.getContext("2d");
const feedback = document.getElementById("feedback");
const pontuacao = document.getElementById("pontuacao");
const final = document.getElementById("final");

let conexoesFeitas = new Set();
let imgSelecionada = null;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🔀 Embaralhar os pares no início
function embaralharLinhas() {
  const linhas = Array.from(container.querySelectorAll(".linha-pareada"));
  for (let i = linhas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [linhas[i], linhas[j]] = [linhas[j], linhas[i]];
  }
  linhas.forEach(linha => container.appendChild(linha));
}
window.addEventListener("DOMContentLoaded", embaralharLinhas);

// 👈 Clique na imagem para selecionar
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

// 👉 Clique na zona de texto para conectar
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

    zona.classList.remove("correta", "incorreta");
    zona.classList.add(correta ? "correta" : "incorreta");

    if (correta) {
      feedback.textContent = "🎉 Conexão correta!";
      conexoesFeitas.add(imgSelecionada.id);
      pontuacao.textContent = `Pontos: ${conexoesFeitas.size} de 10`;

      if (conexoesFeitas.size === 10) {
        final.innerHTML = `🏁 Parabéns! Você conectou todas as regras com sucesso!<br><button id="btnReiniciar">🔄 Jogar novamente</button>`;
        document.getElementById("btnReiniciar").addEventListener("click", reiniciarJogo);
      }
    } else {
      feedback.innerHTML = `❌ Conexão incorreta. <button id="btnTentar">Tentar novamente</button>`;
      document.getElementById("btnTentar").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgSelecionada.classList.remove("selecionada");
        imgSelecionada = null;
        feedback.textContent = "🔁 Tente novamente!";
        zona.classList.remove("incorreta");
      });
    }

    imgSelecionada.classList.remove("selecionada");
    imgSelecionada = null;
  });
});

// 🔄 Reiniciar jogo
function reiniciarJogo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  conexoesFeitas.clear();
  imgSelecionada = null;
  feedback.textContent = "🔁 Novo jogo iniciado!";
  pontuacao.textContent = "Pontos: 0 de 10";
  final.innerHTML = "";

  const linhas = Array.from(container.querySelectorAll(".linha-pareada"));
  linhas.forEach(linha => container.appendChild(linha)); // Reorganiza na ordem atual
  embaralharLinhas(); // embaralha novamente

  imagens.forEach(img => {
    img.classList.remove("selecionada", "usado");
    const linha = img.closest(".linha-pareada");
    if (linha) linha.insertBefore(img, linha.firstChild); // devolve img à esquerda
  });

  zonas.forEach(zona => zona.classList.remove("correta", "incorreta"));
}
