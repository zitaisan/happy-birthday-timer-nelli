function printText(){
    const titleElement = document.querySelector(".title-h");
    const text = "ma cherie, Nelli"
    
    let i = 0;
    const speed = 50; // Скорость печати (мс)
    function typeText() {
        if (i < text.length) {
          titleElement.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeText, speed);
        }
      }
      window.onload = typeText;
}

printText();