const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;
document.querySelector("#side-nav").style.display = "none";
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    document.querySelector("#side-nav").style.display = "block";
    menuBtn.classList.add("open");
    menuOpen = true;
  } else {
    document.querySelector("#side-nav").style.display = "none";
    menuBtn.classList.remove("open"); 
    menuOpen = false;
  }
});
