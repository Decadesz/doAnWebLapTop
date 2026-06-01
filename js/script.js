// =============================================
// DỮ LIỆU SẢN PHẨM (giả lập database bằng JS)
// =============================================

const products = {
  "ASUS TUF Dash F15 (FX517ZC-HN079W)": {
    name: "ASUS TUF Dash F15 (FX517ZC-HN079W)",
    type: "gaming",
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
  "MacBook Air M2 (2023)": {
    name: "MacBook Air M2 (2023)",
    type: "office",
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
  "Dell XPS 13 Plus (9320)": {
    name: "Dell XPS 13 Plus (9320)",
    type: "office",
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
  "Lenovo Legion 5 Gen 8 (2023)": {
    name: "Lenovo Legion 5 Gen 8 (2023)",
    type: "gaming",
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
  "ROG Strix SCAR 18 (2025)": {
    name: "ROG Strix SCAR 18 (2025)",
    type: "gaming",
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
  const id = params.get("id");
  return id; // Trả về nguyên bản chuỗi chữ, không dùng parseInt nữa
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
// XỬ LÝ SLIDER SẢN PHẨM TRANG CHỦ
// =============================================
function initProductSlider() {
  const slider = document.getElementById("productSlider");
  const btnLeft = document.getElementById("btnScrollLeft");
  const btnRight = document.getElementById("btnScrollRight");

  // Rất quan trọng: Chỉ gắn sự kiện click nếu 3 phần tử này tồn tại trên trang
  if (slider && btnLeft && btnRight) {
    const scrollAmount = 400; // Chiều dài cuộn

    btnLeft.addEventListener("click", function () {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    btnRight.addEventListener("click", function () {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
}
// =============================================
// =============================================
// KHỞI CHẠY
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  // Luôn luôn cập nhật số giỏ hàng trên MỌI TRANG ngay khi vừa load xong
  updateCartBadge();
  // 2. Chạy slider trang chủ (nếu có)
  initProductSlider();
  // Chỉ chạy loadProduct nếu đang ở trang chitietsanpham.html
  if (document.getElementById("productName")) {
    const id = getProductIdFromURL();
    loadProduct(id);
  }
  // Kiểm tra nếu đang ở trang search.html thì chạy hàm lọc kết quả
  if (
    window.location.pathname.includes("search.html") ||
    document.getElementById("searchResultsContainer")
  ) {
    loadSearchResults();
  }
});
$(document).ready(function () {
  // Bắt sự kiện khi người dùng nhấn nút "Tìm kiếm" hoặc gõ Enter
  $("#searchForm").on("submit", function (e) {
    e.preventDefault(); // Ngăn form tải lại trang theo mặc định

    // Lấy giá trị người dùng nhập và xóa khoảng trắng ở hai đầu
    var keyword = $("#searchInput").val().trim();

    // Kiểm tra tính hợp lệ của dữ liệu (Testing point)
    if (keyword !== "") {
      // Mã hóa từ khóa để URL không bị lỗi nếu có ký tự đặc biệt hoặc tiếng Việt có dấu
      var encodedKeyword = encodeURIComponent(keyword);

      // Chuyển hướng sang trang search.html với biến 'q'
      window.location.href = "search.html?q=" + encodedKeyword;
    } else {
      // Xử lý khi người dùng để trống
      alert("Vui lòng nhập tên laptop bạn muốn tìm!");
      $("#searchInput").focus(); // Đưa con trỏ chuột quay lại ô nhập liệu
    }
  });
});
// =============================================
// XỬ LÝ TRANG TÌM KIẾM (search.html)
// =============================================
function loadSearchResults() {
  // 1. Lấy từ khóa 'q' từ URL
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  if (!query) return; // Nếu không có từ khóa thì bỏ qua

  // In từ khóa ra thẻ <span> để người dùng biết họ đang tìm gì
  const keywordDisplay = document.getElementById("searchKeywordDisplay");
  if (keywordDisplay) {
    keywordDisplay.textContent = `"${query}"`;
  }

  // 2. Lọc sản phẩm trong object products
  const keywordLower = query.toLowerCase();
  const searchResults = [];

  // Duyệt qua các key (0, 1, 2, 3, 4) trong object products
  for (const key in products) {
    const product = products[key];
    // Kiểm tra xem tên sản phẩm có chứa từ khóa không (không phân biệt hoa thường)
    if (product.name.toLowerCase().includes(keywordLower)) {
      searchResults.push({
        id: key,
        ...product,
      });
    }
  }

  // 3. Hiển thị kết quả ra HTML
  const resultsContainer = document.getElementById("searchResultsContainer");
  const noResultBlock = document.getElementById("noResultBlock");
  const resultCount = document.getElementById("resultCount");

  if (resultsContainer) {
    resultsContainer.innerHTML = ""; // Xóa dữ liệu cũ (nếu có)

    if (searchResults.length > 0) {
      // Có sản phẩm -> Ẩn block báo lỗi, hiện danh sách
      if (noResultBlock) noResultBlock.classList.add("d-none");
      if (resultCount)
        resultCount.textContent = `(Tìm thấy ${searchResults.length} sản phẩm)`;

      // Tạo các thẻ HTML cho từng sản phẩm tìm được
      searchResults.forEach((p) => {
        const productHTML = `
          <div class="col-12 col-md-6 col-lg-3">
            <article class="card h-100 shadow-sm border-0 position-relative search-card bg-white">
              <a href="chitietsanpham.html?id=${p.id}" style="text-decoration: none; color: inherit;">
                <img src="${p.images[0]}" alt="${p.name}" class="card-img-top border-bottom p-3" style="height: 180px; object-fit: contain;" />
              </a>
              <div class="card-body d-flex flex-column">
                <h4 class="card-title fs-6 fw-bold text-dark">
                  <a href="chitietsanpham.html?id=${p.id}" class="text-decoration-none text-dark">
                    ${p.name}
                  </a>
                </h4>
                <p class="card-text text-muted small mb-3">
                  ${p.specs[0][1]} </p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <span class="text-danger fw-bold">${p.price}</span>
                  <button class="btn btn-success btn-sm fw-bold" onclick="handleBuyNow()">Mua ngay</button>
                </div>
              </div>
            </article>
          </div>
        `;
        resultsContainer.innerHTML += productHTML;
      });
    } else {
      // Không có sản phẩm -> Hiện block báo lỗi, cập nhật số lượng
      if (noResultBlock) noResultBlock.classList.remove("d-none");
      if (resultCount)
        resultCount.textContent = `(Không tìm thấy sản phẩm nào)`;
    }
  }
}
// =============================================
// XỬ LÝ TRANG DANH MỤC (category.html)
// =============================================
function loadCategoryResults() {
  // 1. Lấy tham số 'type' từ URL (nếu không có thì mặc định là gaming)
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "gaming";

  // 2. Đổi tiêu đề trang cho phù hợp
  const titleEl = document.getElementById("categoryTitle");
  if (titleEl) {
    titleEl.textContent =
      type === "office" ? "Laptop Văn phòng" : "Laptop Gaming";
  }

  // 3. Lọc và render dữ liệu
  const container = document.getElementById("categoryList");
  if (!container) return;

  container.innerHTML = ""; // Xóa rỗng trước khi bơm dữ liệu mới
  let count = 0;

  for (const key in products) {
    const product = products[key];

    // Nếu type của sản phẩm khớp với type trên URL thì mới hiển thị
    if (product.type === type) {
      count++;
      const productHTML = `
        <div class="col-12 col-md-6 col-lg-4">
          <article class="product-item-card card h-100 bg-white shadow-sm border-0 position-relative">
            <a href="chitietsanpham.html?id=${encodeURIComponent(key)}" style="text-decoration: none; color: inherit;">
              <img src="${product.images[0]}" alt="${product.name}" class="card-img-top p-3 border-bottom" style="height: 180px; object-fit: contain;"/>
            </a>
            <div class="card-body d-flex flex-column">
              <h4 class="card-title fs-6 fw-bold text-dark">
                <a href="chitietsanpham.html?id=${encodeURIComponent(key)}" class="text-decoration-none text-dark">
                  ${product.name}
                </a>
              </h4>
              <p class="card-text text-muted small mb-3">
                 ${product.specs[0][1]} 
              </p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="text-danger fw-bold">${product.price}</span>
                <button class="btn btn-success btn-sm fw-bold" onclick="handleBuyNow()">Mua ngay</button>
              </div>
            </div>
          </article>
        </div>
      `;
      container.innerHTML += productHTML;
    }
  }

  // Cập nhật số lượng đếm vào tiêu đề
  if (titleEl && count > 0) {
    titleEl.textContent += ` (Hiển thị ${count} sản phẩm)`;
  }
}
// Kiểm tra nếu đang ở trang category.html thì chạy hàm lọc danh mục
if (
  window.location.pathname.includes("category.html") ||
  document.getElementById("categoryList")
) {
  loadCategoryResults();
}
