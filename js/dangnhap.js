// Tài khoản hợp lệ (giả lập)
const validAccounts = [
  { email: "admin@svstore.vn", password: "123456", name: "Admin", isAdmin: true },
  { email: "sinhvien@gmail.com", password: "abc123", name: "Sinh Viên", isAdmin: false },
];

// Hiện / ẩn mật khẩu
function togglePassword() {
  const input = document.getElementById("inputPassword");
  const icon = document.getElementById("togglePw");
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("fa-eye", !isHidden);
  icon.classList.toggle("fa-eye-slash", isHidden);
}

// Hiện thông báo lỗi dưới input
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");

  let feedback = input.nextElementSibling;
  if (!feedback || !feedback.classList.contains("invalid-feedback")) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    input.parentNode.insertBefore(feedback, input.nextSibling);
  }
  feedback.textContent = message;
}

// Xóa thông báo lỗi
function clearError(inputId) {
  const input = document.getElementById(inputId);
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

// Xử lý đăng nhập
function handleLogin() {
  const email = document.getElementById("inputEmail").value.trim();
  const password = document.getElementById("inputPassword").value;
  let valid = true;

  // Kiểm tra email
  if (!email) {
    showError("inputEmail", "Vui lòng nhập email");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("inputEmail", "Email không đúng định dạng");
    valid = false;
  } else {
    clearError("inputEmail");
  }

  // Kiểm tra mật khẩu
  if (!password) {
    showError("inputPassword", "Vui lòng nhập mật khẩu");
    valid = false;
  } else if (password.length < 6) {
    showError("inputPassword", "Mật khẩu phải có ít nhất 6 ký tự");
    valid = false;
  } else {
    clearError("inputPassword");
  }

  if (!valid) return;

  // Kiểm tra tài khoản
  const account = validAccounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (account) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userName", account.name);
    localStorage.setItem("isAdmin", account.isAdmin ? "true" : "false");

    // Hiện màn hình thành công
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("successScreen").style.display = "block";
    setTimeout(() => { document.getElementById("progressBar").style.width = "100%"; }, 100);

    // Nếu là admin → vào admin.html, còn lại → về index.html
    setTimeout(() => {
      window.location.href = account.isAdmin ? "admin.html" : "index.html";
    }, 3200);

  } else {
    alert("❌ Email hoặc mật khẩu không đúng!");
  }
}

// Khởi chạy
document.addEventListener("DOMContentLoaded", () => {
  const cartBadge = document.getElementById("cartBadge");
  if (cartBadge) cartBadge.textContent = localStorage.getItem("myCartCount") || 0;
});

// Nhấn Enter để đăng nhập
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleLogin();
});