let pontos = 0;
const conexoesFeitas = new Set();

document.querySelectorAll(".icone").forEach(img => {
  img.addEventListener("dragstart", ev => {
    ev.dataTransfer.setData("text", ev.target.id);
  });
});

document.querySelectorAll(".dropzone").forEach(zona => {
  zona.addEventListener("dragover", ev => ev.preventDefault());

  zona.addEventListener("drop", ev => {
    ev.preventDefault();

    const data = ev.dataTransfer.getData("text");
    const img = document.getElementById(data);
    const esperado = zona.getAttribute("data-img");

    if (data === esperado && !img.classList.contains("usado")) {
      zona.classList.add("correta");
      conexoesFeitas.add(data);

      if (!zona.contains(img)) {
        zona.innerHTML = ""; // limpa texto
        zona.appendChild(img);
        img.classList.add("usado");
      }

      pontos = conexoesFeitas.size;
      document.getElementById("pontuacao").textContent = `Pontos: ${pontos} de 10`;

      setTimeout(() => zona.classList.remove("correta"), 600);

      if (pontos === 10) {
        document.getElementById("final").textContent = "🎉 Parabéns! Você conectou todas!";
      }
    } else {
      zona.classList.add("incorreta");
      setTimeout(() => zona.classList.remove("incorreta"), 600);
    }
  });
});

document.getElementById("btnReiniciar").addEventListener("click", () => {
  pontos = 0;
  conexoesFeitas.clear();
  document.getElementById("pontuacao").textContent = "Pontos: 0 de 10";
  document.getElementById("final").textContent = "";

  document.querySelectorAll(".icone.usado").forEach(img => {
    img.classList.remove("usado");
    document.querySelector(".linha-pareada").insertBefore(img, document.querySelector(".linha-pareada").firstChild);
  });

  document.querySelectorAll(".dropzone").forEach(zona => {
    zona.innerHTML = zona.getAttribute("data-img").replace("img", "Texto ");
  });
});
