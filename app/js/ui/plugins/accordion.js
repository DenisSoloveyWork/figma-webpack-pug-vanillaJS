export default function accordion(options) {
  let accordions = document.querySelectorAll(options.query);
  for (let acc of accordions) {
    acc.addEventListener("click", function() {
      this.classList.toggle("active");
  
      let panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}