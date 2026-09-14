document.getElementById("year").textContent = new Date().getFullYear();

// Close the mobile menu after a link is tapped. The menu itself (open/close)
// is plain CSS via the checkbox above, so this is a nice-to-have, not a requirement.
const navCheck = document.getElementById("navCheck");
document.getElementById("navLinks").querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => { navCheck.checked = false; });
});

// The contact form submits itself directly to FormSubmit.co (see the form's
// `action` attribute in index.html) — no JavaScript required for it to work.
// This file doesn't need to do anything else for the form to function.
