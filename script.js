
const password = document.getElementById("password");
const toggle = document.getElementById("toggle");
const bar = document.getElementById("bar");
const strength = document.getElementById("strength");
const message = document.getElementById("message");

toggle.addEventListener("change", () => {
  password.type = toggle.checked ? "text" : "password";
});

password.addEventListener("input", () => {
  const p = password.value;

  const checks = {
    length: p.length >= 12,
    upper: /[A-Z]/.test(p) && /[a-z]/.test(p),
    number: /[0-9]/.test(p),
    special: /[^A-Za-z0-9]/.test(p)
  };

  Object.entries(checks).forEach(([id, passed]) => {
    document.getElementById(id).textContent =
      `${passed ? "✓" : "✗"} ` +
      ({
        length: "At least 12 characters",
        upper: "Uppercase and lowercase letters",
        number: "At least one number",
        special: "At least one special character"
      }[id]);
  });

  const score = Object.values(checks).filter(Boolean).length;

  if (!p) {
    strength.textContent = "Strength: Not checked";
    message.textContent = "Your password feedback will appear here.";
    bar.style.width = "0";
    bar.style.background = "#d9534f";
    return;
  }

  const level = score <= 1 ? "Weak" :
                score <= 3 ? "Medium" : "Strong";

  strength.textContent = `Strength: ${level}`;
  message.textContent =
    level === "Weak" ? "Add more security features." :
    level === "Medium" ? "Good start. Improve the remaining checks." :
    "All four checks passed!";

  bar.style.width = `${score * 25}%`;
  bar.style.background =
    score <= 1 ? "#d9534f" :
    score <= 3 ? "#e6a23c" : "#28a66a";
});
