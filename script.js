const imagens = document.querySelectorAll("img");
const zonas = document.querySelectorAll(".dropzone");
const feedback = document.getElementById("feedback");

imagens.forEach(img => {
  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
});

zonas.forEach(zona => {
  zona.addEventListener("dragover", e => e.preventDefault());

  zona.addEventListener("drop", e => {
    const idImagem = e.dataTransfer.getData("text/plain");
    if (zona.dataset.img === idImagem) {
      zona.style.backgroundColor = "#a9dfbf";
      feedback.textContent = "Conexão correta! ?";
    } else {
      zona.style.backgroundColor = "#f5b7b1";
      feedback.textContent = "Ops! Tente novamente. ?";
    }
  });
});
