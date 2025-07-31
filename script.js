let conexoesFeitas = new Set(); // Para evitar reconexões

zonas.forEach(zona => {
  zona.addEventListener("click", () => {
    const imgSelecionada = document.querySelector(".selecionada");
    if (!imgSelecionada) return;

    if (conexoesFeitas.has(imgSelecionada.id)) {
      feedback.textContent = "🔒 Imagem já conectada.";
      return;
    }

    // ... (cálculo das posições continua igual)

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    if (zona.dataset.img === imgSelecionada.id) {
      ctx.strokeStyle = "#27ae60"; // verde
      feedback.textContent = "✅ Conexão correta!";
      conexoesFeitas.add(imgSelecionada.id); // marca como conectada
    } else {
      ctx.strokeStyle = "#e74c3c"; // vermelho
      feedback.innerHTML = `❌ Tente novamente. <button id="btnTentar">🔄</button>`;

      document.getElementById("btnTentar").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgSelecionada.classList.remove("selecionada");
        feedback.textContent = "🔁 Vamos tentar de novo!";
      });
    }

    ctx.lineWidth = 3;
    ctx.stroke();

    imgSelecionada.classList.remove("selecionada");
  });
});
