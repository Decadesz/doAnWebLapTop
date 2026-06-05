// ===== TÀI KHOẢN ADMIN =====
const ADMIN_ACCOUNTS = [
  { username: "svstore_admin", password: "Admin@2026", name: "Super Admin" }
];

// ===== DỮ LIỆU MẪU =====
const products = [
  { id:"SP001", name:"ASUS TUF Dash F15", type:"Gaming", price:"21.990.000đ", oldPrice:"25.990.000đ", discount:"-15%", img:"images/asus1.png" },
  { id:"SP002", name:"MacBook Air M2 (2023)", type:"Văn phòng", price:"24.500.000đ", oldPrice:"27.990.000đ", discount:"-12%", img:"images/MB1.png" },
  { id:"SP003", name:"Dell XPS 13 Plus", type:"Văn phòng", price:"26.000.000đ", oldPrice:"29.990.000đ", discount:"-13%", img:"images/dell1.webp" },
  { id:"SP004", name:"Lenovo Legion 5 Gen 8", type:"Gaming", price:"28.490.000đ", oldPrice:"32.000.000đ", discount:"-11%", img:"images/lenovo1.webp" },
  { id:"SP005", name:"ROG Strix SCAR 18 (2025)", type:"Gaming", price:"89.000.000đ", oldPrice:"99.000.000đ", discount:"-10%", img:"images/rog1.png" },
];

const orders = [
  { id:"#DH001", customer:"Nguyễn Văn A", phone:"0901234567", product:"ASUS TUF Dash F15", total:"21.990.000đ", date:"01/06/2026", status:"Hoàn thành" },
  { id:"#DH002", customer:"Trần Thị B", phone:"0912345678", product:"MacBook Air M2", total:"24.500.000đ", date:"02/06/2026", status:"Đang giao" },
  { id:"#DH003", customer:"Lê Văn C", phone:"0923456789", product:"Dell XPS 13 Plus", total:"26.000.000đ", date:"03/06/2026", status:"Chờ xử lý" },
  { id:"#DH004", customer:"Phạm Thị D", phone:"0934567890", product:"Lenovo Legion 5", total:"28.490.000đ", date:"03/06/2026", status:"Đã hủy" },
  { id:"#DH005", customer:"Hoàng Văn E", phone:"0945678901", product:"ROG Strix SCAR 18", total:"89.000.000đ", date:"04/06/2026", status:"Chờ xử lý" },
  { id:"#DH006", customer:"Ngô Thị F", phone:"0956789012", product:"MacBook Air M2", total:"24.500.000đ", date:"04/06/2026", status:"Đang giao" },
  { id:"#DH007", customer:"Bùi Văn G", phone:"0967890123", product:"ASUS TUF Dash F15", total:"21.990.000đ", date:"05/06/2026", status:"Hoàn thành" },
  { id:"#DH008", customer:"Đinh Thị H", phone:"0978901234", product:"Dell XPS 13 Plus", total:"26.000.000đ", date:"05/06/2026", status:"Hoàn thành" },
];

const statusClass = { "Hoàn thành":"badge-success", "Đang giao":"badge-warning", "Chờ xử lý":"badge-info", "Đã hủy":"badge-danger" };

// ===== LOGIN =====
function toggleAdminPw() {
  const inp = document.getElementById("adminPw");
  const ico = document.getElementById("toggleAdminPw");
  inp.type = inp.type === "password" ? "text" : "password";
  ico.classList.toggle("fa-eye");
  ico.classList.toggle("fa-eye-slash");
}

function handleAdminLogin() {
  // Lấy giá trị username từ input và loại bỏ khoảng trắng ở đầu và cuối để đảm bảo rằng người dùng không nhập chỉ khoảng trắng.
  const u = document.getElementById("adminUser").value.trim(); 
  // Mặc định mật khẩu có thể chứa khoảng trắng nên không trim() để tránh làm mất ký tự hợp lệ trong mật khẩu.
  const p = document.getElementById("adminPw").value; 
  let ok = true; 

  document.getElementById("errUser").classList.remove("show"); // Ẩn thông báo lỗi tài khoản nếu có
  document.getElementById("errPw").classList.remove("show"); 

  if (!u) { document.getElementById("errUser").classList.add("show"); ok = false; } // Nếu username trống → báo lỗi "Vui lòng nhập tài khoản"
  if (!p) { document.getElementById("errPw").classList.add("show"); ok = false; } // Nếu password trống → báo lỗi "Vui lòng nhập mật khẩu"
  if (!ok) return;
  // Tìm tài khoản admin khớp với username và password đã nhập. Nếu không tìm thấy, acc sẽ là undefined.
  const acc = ADMIN_ACCOUNTS.find(a => a.username === u && a.password === p); 
  if (!acc) {
    document.getElementById("errUser").textContent = "Tài khoản hoặc mật khẩu không đúng!";
    document.getElementById("errUser").classList.add("show");
    document.getElementById("adminUser").style.borderColor = "#dc3545";
    document.getElementById("adminPw").style.borderColor = "#dc3545";
    return;
  }

  localStorage.setItem("adminLoggedIn", "true"); // Lưu trạng thái đăng nhập của admin vào localStorage để có thể kiểm tra ở các trang khác nếu cần.
  localStorage.setItem("adminName", acc.name);
  showAdminPanel(acc.name);
}
// Hiển thị bảng điều khiển admin sau khi đăng nhập thành công, đồng thời hiển thị tên admin ở góc trên bên phải.
function showAdminPanel(name) {
  document.getElementById("loginPage").style.display = "none"; // Ẩn trang đăng nhập
  document.getElementById("adminPage").style.display = "flex"; // Hiển thị trang admin
  document.getElementById("adminNameDisplay").textContent = name;
  document.getElementById("topbarUser").textContent = name;
  document.getElementById("adminAvatar").textContent = name.charAt(0).toUpperCase();
  renderProducts(products); // Hiển thị danh sách sản phẩm mẫu trên bảng điều khiển admin.
  renderOrders(orders); // Hiển thị danh sách đơn hàng mẫu trên bảng điều khiển admin.
  startClock();// Bắt đầu đồng hồ hiển thị thời gian thực ở góc trên bên phải của bảng điều khiển admin.
}

function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("adminName");
  document.getElementById("adminPage").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";
  document.getElementById("adminUser").value = "";
  document.getElementById("adminPw").value = "";
}

// ===== NAVIGATION =====
function showPage(name, el) {
  // Ẩn tất cả các trang con (dashboard, products, orders) bằng cách xóa class "active" khỏi tất cả phần tử có class "page".
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active")); 
  // Xóa class "active" khỏi tất cả các liên kết trong sidebar để đảm bảo rằng chỉ có liên kết của trang hiện tại được đánh dấu là active.
  document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active")); 
  document.getElementById("page-" + name).classList.add("active"); // Thêm class "active" vào phần tử của trang được chọn để hiển thị nó.
  el.classList.add("active"); // Thêm class "active" vào liên kết sidebar được nhấp để đánh dấu nó là trang hiện tại.
  const titles = { dashboard:"Dashboard", products:"Quản lý sản phẩm", orders:"Quản lý đơn hàng" };
  // Cập nhật tiêu đề trên thanh topbar dựa trên trang hiện tại để người dùng biết họ đang ở đâu trong bảng điều khiển admin.
  document.getElementById("topbarTitle").textContent = titles[name] || name; 
}

// ===== RENDER PRODUCTS =====
function renderProducts(data) {
  const tbody = document.getElementById("productBody");
  // Sử dụng phương thức map để tạo ra một chuỗi HTML cho mỗi sản phẩm trong mảng data, 
  // sau đó gán chuỗi này vào innerHTML của tbody để hiển thị danh sách sản phẩm trên trang admin.
  tbody.innerHTML = data.map(p => `
    <tr>
      <td><img src="${p.img}" class="product-img-sm" onerror="this.style.display='none'"/></td>
      <td><strong>${p.name}</strong></td>
      <td><span class="badge-status ${p.type==='Gaming'?'badge-danger':'badge-info'}">${p.type}</span></td>
      <td style="color:#e84118;font-weight:600;">${p.price}</td>
      <td style="color:#aaa;text-decoration:line-through;font-size:0.82rem;">${p.oldPrice}</td>
      <td><span class="badge-status badge-success">${p.discount}</span></td>
      <td>
        <button class="btn-action btn-edit me-1"><i class="fa fa-pen"></i></button>
        <button class="btn-action btn-delete"><i class="fa fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// Lọc sản phẩm theo tên khi người dùng nhập từ khóa vào ô tìm kiếm. 
// Hàm này sẽ được gọi mỗi khi người dùng nhập vào ô tìm kiếm để cập nhật danh sách sản phẩm hiển thị dựa trên từ khóa đã nhập.
function filterProducts() {
  const kw = document.getElementById("searchProduct").value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(kw))); // Lọc sản phẩm dựa trên tên sản phẩm có chứa từ khóa đã nhập (không phân biệt chữ hoa chữ thường).
}

// ===== RENDER ORDERS =====
function renderOrders(data) {
  const tbody = document.getElementById("orderBody");
  tbody.innerHTML = data.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer}</td>
      <td>${o.phone}</td>
      <td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${o.product}</td>
      <td style="color:#e84118;font-weight:600;">${o.total}</td>
      <td style="color:#888;">${o.date}</td>
      <td><span class="badge-status ${statusClass[o.status]}">${o.status}</span></td>
      <td><button class="btn-action btn-view"><i class="fa fa-eye me-1"></i>Xem</button></td>
    </tr>
  `).join("");
}

// Lọc đơn hàng theo ID hoặc tên khách hàng khi người dùng nhập từ khóa vào ô tìm kiếm.
// Hàm này sẽ được gọi mỗi khi người dùng nhập vào ô tìm kiếm để cập nhật danh sách đơn hàng hiển thị dựa trên từ khóa đã nhập.
function filterOrders() {
  const kw = document.getElementById("searchOrder").value.toLowerCase();
  const st = document.getElementById("filterStatus").value;
  renderOrders(orders.filter(o =>
    (o.id.toLowerCase().includes(kw) || o.customer.toLowerCase().includes(kw)) &&
    (st === "" || o.status === st)
  ));
}

// ===== CLOCK =====
function startClock() {
  function tick() {
    const now = new Date();
    // Cập nhật thời gian hiển thị ở góc trên bên phải của bảng điều khiển admin theo định dạng giờ:phút:giây.
    document.getElementById("topbarTime").textContent =
      now.toLocaleTimeString("vi-VN", { hour:"2-digit", minute:"2-digit", second:"2-digit" }); 
  }
  tick(); setInterval(tick, 1000); // Gọi hàm tick ngay lập tức để hiển thị thời gian ngay khi trang được tải, sau đó tiếp tục cập nhật thời gian mỗi giây.
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra nếu admin đã đăng nhập trước đó bằng cách kiểm tra giá trị "adminLoggedIn" trong localStorage. 
  // Nếu giá trị này là "true", có nghĩa là admin đã đăng nhập và chúng ta sẽ hiển thị bảng điều khiển admin thay vì trang đăng nhập.
  if (localStorage.getItem("adminLoggedIn") === "true") { 
    const name = localStorage.getItem("adminName") || "Admin";
    showAdminPanel(name);
  }
  document.addEventListener("keydown", e => { // Thêm sự kiện lắng nghe phím để cho phép admin nhấn Enter để đăng nhập nhanh chóng khi đang ở trang đăng nhập.
    if (e.key === "Enter" && document.getElementById("loginPage").style.display !== "none") { // Chỉ xử lý khi đang ở trang đăng nhập (loginPage đang hiển thị).
      handleAdminLogin();
    }
  });
});