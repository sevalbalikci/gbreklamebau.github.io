// Load header dynamically
document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Set active menu item based on current page
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";
      const menuItems = document.querySelectorAll(".navbar-nav .nav-item");

      menuItems.forEach((item) => {
        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === currentPage) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    })
    .catch((error) => console.error("Error loading header:", error));
});
