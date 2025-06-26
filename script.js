 function mostrarInfo(numero) {
  const contenedor = document.getElementById("contenedor-info");
  const info1 = document.getElementById("info1");
  const info2 = document.getElementById("info2");

  // Oculta ambos
  info1.classList.remove("activa");
  info2.classList.remove("activa");

  // Alterna la visibilidad general
  if (numero === 1) {
    if (info1.classList.contains("activa")) {
      contenedor.classList.remove("contenedor-visible");
    } else {
      info1.classList.add("activa");
      contenedor.classList.add("contenedor-visible");
    }
  } else if (numero === 2) {
    if (info2.classList.contains("activa")) {
      contenedor.classList.remove("contenedor-visible");
    } else {
      info2.classList.add("activa");
      contenedor.classList.add("contenedor-visible");
    }
  }
}

//Cambiar modo oscuro / claro//
document.querySelectorAll(".modoprincipal, .modoconocenos").forEach(boton => {
  boton.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
    document.body.classList.toggle("claro");
  });
});
//Lectura de texto en voz
function leerTexto() {
  const texto = document.body.innerText;
  const voz = new SpeechSynthesisUtterance(texto);
  speechSynthesis.speak(voz);
}
/*Video*/
document.getElementById("video").addEventListener("click", function () {
  window.open("VisionNovaGame/juego.html", "_blank");
});
 



