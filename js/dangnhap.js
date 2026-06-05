// Tài khoản hợp lệ (giả lập)
const validAccounts = [
  // Tài khoản admin để test chức năng quản lý (admin.html)
  { email: "admin@svstore.vn", password: "123456", name: "Admin", isAdmin: true },
  // Tài khoản sinh viên để test chức năng bình thường (không phải admin)
  { email: "sinhvien@gmail.com", password: "abc123", name: "Sinh Viên", isAdmin: false },
];

// Hiện / ẩn mật khẩu
function togglePassword() {
  // Lấy phần tử input mật khẩu và biểu tượng mắt dựa trên id.
  const input = document.getElementById("inputPassword");
  // Lấy phần tử biểu tượng mắt để thay đổi icon khi ẩn/hiện mật khẩu.
  const icon = document.getElementById("togglePw");
  // Kiểm tra nếu input đang ở dạng password (ẩn), thì chuyển sang text (hiện), ngược lại thì chuyển về password (ẩn).
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password"; // Đổi qua text để hiện mật khẩu, hoặc password để ẩn mật khẩu.
  icon.classList.toggle("fa-eye", !isHidden); // đổi Icon mắt mở khi mật khẩu đang hiển thị
  icon.classList.toggle("fa-eye-slash", isHidden);
}

// Hiện thông báo lỗi dưới input
function showError(inputId, message) {
  const input = document.getElementById(inputId); // Lấy phần tử input dựa trên id
  input.classList.add("is-invalid"); // Thêm class is-invalid để hiển thị viền đỏ và biểu tượng lỗi
  input.classList.remove("is-valid"); // Loại bỏ class is-valid nếu có, để tránh hiển thị dấu check xanh khi có lỗi

  let feedback = input.nextElementSibling; // Kiểm tra phần tử ngay sau input có phải là div.invalid-feedback hay không
  // Nếu không phải, tạo mới div.invalid-feedback và chèn vào sau input
  if (!feedback || !feedback.classList.contains("invalid-feedback")) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    // Chèn phần tử feedback ngay sau input
    input.parentNode.insertBefore(feedback, input.nextSibling);
  }
  // Cập nhật nội dung thông báo lỗi
  feedback.textContent = message;
}

// Xóa thông báo lỗi
function clearError(inputId) {
  const input = document.getElementById(inputId);
  input.classList.remove("is-invalid");
  input.classList.add("is-valid"); // Bootstrap sẽ hiển thị dấu check xanh khi có class is-valid
}

// Xử lý đăng nhập
function handleLogin() {
  const email = document.getElementById("inputEmail").value.trim();
  const password = document.getElementById("inputPassword").value;
  let valid = true;

  // Kiểm tra email
  // Nếu email trống → báo lỗi "Vui lòng nhập email"
  if (!email) {
    showError("inputEmail", "Vui lòng nhập email");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Kiểm tra định dạng email đơn giản
    showError("inputEmail", "Email không đúng định dạng");
    valid = false;
  } else {
    clearError("inputEmail"); // Nếu email hợp lệ, xóa lỗi và hiển thị dấu check xanh
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

  if (!valid) return; // Nếu có lỗi, dừng xử lý đăng nhập

  // Kiểm tra tài khoản
  // Tìm trong mảng validAccounts xem có tài khoản nào khớp với email và mật khẩu đã nhập hay không.
  const account = validAccounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (account) {
    // Nếu tìm thấy tài khoản hợp lệ, lưu trạng thái đăng nhập và thông tin người dùng vào localStorage để sử dụng trên các trang khác.
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userName", account.name);
    // Lưu thông tin admin để phân quyền trên các trang khác (admin.html sẽ kiểm tra giá trị này để hiển thị hoặc ẩn các chức năng quản lý).
    localStorage.setItem("isAdmin", account.isAdmin ? "true" : "false");

    // Hiện màn hình thành công
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("successScreen").style.display = "block";
    // Bắt đầu thanh trượt tiến trình
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
  // Khi trang đăng nhập được tải, cập nhật số lượng sản phẩm trong giỏ hàng trên huy hiệu (badge) của biểu tượng giỏ hàng.
  if (cartBadge) cartBadge.textContent = localStorage.getItem("myCartCount") || 0;
});

// Nhấn Enter để đăng nhập
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleLogin();
});