// =============================================
// DỮ LIỆU SẢN PHẨM (giả lập database bằng JS)
// =============================================

const products = {
  0: {
    name: "ASUS TUF Dash F15 (FX517ZC-HN079W)",
    price: "21.990.000đ",
    oldPrice: "25.990.000đ",
    discount: "-15%",
    images: ["images/asus1.png", "images/asus2.jpg", "images/asus3.jpg"],
    specs: [
      ["CPU", "Intel Core i7-12650H (12 nhân / 16 luồng, Max 4.7GHz)"],
      ["RAM", "16GB DDR5 4800MHz (2 khe, tối đa 32GB)"],
      ["Card đồ họa", "NVIDIA GeForce RTX 3050Ti 4GB GDDR6"],
      ["Màn hình", "15.6 inch FHD (1920x1080), IPS, 144Hz, 100% sRGB"],
      ["Ổ cứng", "512GB NVMe PCIe 4.0 SSD"],
      ["Hệ điều hành", "Windows 11 Home"],
      ["Pin", "76WHrs, hỗ trợ sạc nhanh"],
      ["Trọng lượng", "2.0 kg"],
    ],
  },
  1: {
    name: "MacBook Air M2 (2023)",
    price: "24.500.000đ",
    oldPrice: "27.990.000đ",
    discount: "-12%",
    images: ["images/MB1.png", "images/MB2.jpeg", "images/MB3.jpeg"],
    specs: [
      ["CPU", "Apple M2 (8 nhân CPU, 8 nhân GPU)"],
      ["RAM", "8GB Unified Memory"],
      ["Màn hình", "13.6 inch Liquid Retina, 2560x1664, 500 nits"],
      ["Ổ cứng", "256GB SSD"],
      ["Pin", "52.6WHrs, lên đến 18 giờ sử dụng"],
      ["Hệ điều hành", "macOS Ventura"],
      ["Trọng lượng", "1.24 kg"],
    ],
  },
  2: {
    name: "Dell XPS 13 Plus (9320)",
    price: "26.000.000đ",
    oldPrice: "29.990.000đ",
    discount: "-13%",
    images: ["images/dell1.webp", "images/dell2.webp", "images/dell3.webp"],
    specs: [
      ["CPU", "Intel Core i5-1240P (12 nhân, Max 4.4GHz)"],
      ["RAM", "16GB LPDDR5 5200MHz"],
      ["Màn hình", "13.4 inch OLED FHD+ (1920x1200), 400 nits"],
      ["Ổ cứng", "512GB NVMe SSD"],
      ["Pin", "55WHrs, lên đến 12 giờ"],
      ["Hệ điều hành", "Windows 11 Home"],
      ["Trọng lượng", "1.24 kg"],
    ],
  },
  3: {
    name: "Lenovo Legion 5 Gen 8 (2023)",
    price: "28.490.000đ",
    oldPrice: "32.000.000đ",
    discount: "-11%",
    images: [
      "images/lenovo1.webp",
      "images/lenovo2.webp",
      "images/lenovo3.webp",
    ],
    specs: [
      ["CPU", "AMD Ryzen 7 7745HX (8 nhân / 16 luồng, Max 5.1GHz)"],
      ["RAM", "16GB DDR5 4800MHz"],
      ["Card đồ họa", "NVIDIA GeForce RTX 4060 8GB GDDR6"],
      ["Màn hình", "15.6 inch FHD (1920x1080), IPS, 165Hz"],
      ["Ổ cứng", "512GB NVMe PCIe 4.0 SSD"],
      ["Pin", "80WHrs"],
      ["Hệ điều hành", "Windows 11 Home"],
      ["Trọng lượng", "2.4 kg"],
    ],
  },
  4: {
    name: "ROG Strix SCAR 18 (2025)",
    price: "89.000.000đ",
    oldPrice: "99.000.000đ",
    discount: "-10%",
    images: ["images/rog1.png", "images/rog2.png", "images/rog3.png"],
    specs: [
      ["CPU", "Intel Core Ultra 9 275HX (24 nhân, Max 5.4GHz)"],
      ["RAM", "64GB DDR5 SO-DIMM"],
      ["Card đồ họa", "NVIDIA GeForce RTX 5080 16GB GDDR7"],
      ["Màn hình", "18 inch 2.5K Mini LED, 240Hz, 100% DCI-P3"],
      ["Ổ cứng", "4TB M.2 NVMe PCIe 4.0"],
      ["Pin", "90WHrs, sạc nhanh 330W"],
      ["Hệ điều hành", "Windows 11 Home"],
      ["Trọng lượng", "3.1 kg"],
    ],
  },
};

// =============================================
// BIẾN TOÀN CỤC
// =============================================
// Biến này sẽ lưu ID của sản phẩm đang được hiển thị trên trang chi tiết. Mặc định là 0 (sản phẩm đầu tiên) để tránh lỗi nếu người dùng vào trang mà không có ?id=...

let currentProductId = 0;

// Lấy số lượng giỏ hàng từ localStorage (nếu không có thì mặc định là 0)
let cartCount = parseInt(localStorage.getItem("myCartCount")) || 0;

// Hàm hỗ trợ: Cập nhật con số lên huy hiệu (badge) giỏ hàng
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) {
    badge.textContent = cartCount;
  }
}

// =============================================
// LẤY ID SẢN PHẨM TỪ URL (VD: ?id=1)
// =============================================
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  return isNaN(id) ? 0 : id;
}

// =============================================
// RENDER TRANG CHI TIẾT
// =============================================
function loadProduct(id) {
  currentProductId = id;
  const p = products[id];
  if (!p) return;

  // Cập nhật breadcrumb
  document.getElementById("breadcrumbProduct").textContent = p.name;

  // Cập nhật tên, giá
  document.getElementById("productName").textContent = p.name;
  document.getElementById("productPrice").textContent = p.price;
  document.getElementById("productOldPrice").textContent = p.oldPrice;
  document.getElementById("productDiscount").textContent = p.discount;

  // Cập nhật ảnh chính
  document.getElementById("mainImg").src = p.images[0];

  // Render thumbnail
  const thumbList = document.getElementById("thumbList");
  thumbList.innerHTML = "";
  p.images.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Ảnh " + (i + 1);
    if (i === 0) img.classList.add("active");
    img.addEventListener("click", () => {
      document.getElementById("mainImg").src = src;
      document
        .querySelectorAll(".thumb-list img")
        .forEach((t) => t.classList.remove("active"));
      img.classList.add("active");
    });
    thumbList.appendChild(img);
  });

  // Render bảng specs ngắn
  renderSpecs("specsTable", p.specs);

  // Render bảng specs đầy đủ
  renderSpecs("fullSpecsTable", p.specs);

  // Cuộn lên đầu
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderSpecs(tableId, specs) {
  const table = document.getElementById(tableId);
  table.innerHTML = specs
    .map(([key, val]) => `<tr><td>${key}</td><td>${val}</td></tr>`)
    .join("");
}

// =============================================
// GIỎ HÀNG
// =============================================
function addToCart() {
  cartCount++;
  localStorage.setItem("myCartCount", cartCount); // Lưu số mới vào bộ nhớ
  updateCartBadge(); // Cập nhật lại con số trên màn hình
  showToast("✅ Đã thêm vào giỏ hàng!");
}

function handleBuyNow() {
  cartCount++;
  localStorage.setItem("myCartCount", cartCount); // Lưu số mới vào bộ nhớ
  updateCartBadge(); // Cập nhật lại con số trên màn hình
  showToast("🛒 Đang chuyển đến thanh toán...");
}

function handleConsult() {
  showToast("💬 Nhân viên sẽ liên hệ tư vấn cho bạn!");
}

function showToast(msg) {
  const toastMsgEl = document.getElementById("toastMsg");
  const toastEl = document.getElementById("cartToast");

  if (toastMsgEl && toastEl) {
    toastMsgEl.textContent = msg;
    const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
    toast.show();
  }
}

// =============================================
// =============================================
// KHỞI CHẠY
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  // Luôn luôn cập nhật số giỏ hàng trên MỌI TRANG ngay khi vừa load xong
  updateCartBadge();

  // Chỉ chạy loadProduct nếu đang ở trang chitietsanpham.html
  if (document.getElementById("productName")) {
    const id = getProductIdFromURL();
    loadProduct(id);
  }
});
