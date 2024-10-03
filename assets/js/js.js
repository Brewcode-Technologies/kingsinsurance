window.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-menu li a");
  const currentPath = window.location.pathname;

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
});
