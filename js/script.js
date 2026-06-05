// =============================================
// DỮ LIỆU SẢN PHẨM (Đã Việt hóa key)
// =============================================
const danhSachSanPham = {
  "ASUS TUF Dash F15 (FX517ZC-HN079W)": {
    ten: "ASUS TUF Dash F15 (FX517ZC-HN079W)",
    loai: "gaming",
    gia: "21.990.000đ",
    giaCu: "25.990.000đ",
    giamGia: "-15%",
    hinhAnh: ["images/asus1.png", "images/asus2.jpg", "images/asus3.jpg"],
    thongSo: [
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
    ten: "MacBook Air M2 (2023)",
    loai: "office",
    gia: "24.500.000đ",
    giaCu: "27.990.000đ",
    giamGia: "-12%",
    hinhAnh: ["images/MB1.png", "images/MB2.jpeg", "images/MB3.jpeg"],
    thongSo: [
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
    ten: "Dell XPS 13 Plus (9320)",
    loai: "office",
    gia: "26.000.000đ",
    giaCu: "29.990.000đ",
    giamGia: "-13%",
    hinhAnh: ["images/dell1.webp", "images/dell2.webp", "images/dell3.webp"],
    thongSo: [
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
    ten: "Lenovo Legion 5 Gen 8 (2023)",
    loai: "gaming",
    gia: "28.490.000đ",
    giaCu: "32.000.000đ",
    giamGia: "-11%",
    hinhAnh: [
      "images/lenovo1.webp",
      "images/lenovo2.webp",
      "images/lenovo3.webp",
    ],
    thongSo: [
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
    ten: "ROG Strix SCAR 18 (2025)",
    loai: "gaming",
    gia: "89.000.000đ",
    giaCu: "99.000.000đ",
    giamGia: "-10%",
    hinhAnh: ["images/rog1.png", "images/rog2.png", "images/rog3.png"],
    thongSo: [
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
// BIẾN TOÀN CỤC & HÀM TIỆN ÍCH
// =============================================
let idSanPhamHienTai = 0;

function capNhatHuyHieuGioHang() {
  const gioHang = layDuLieuGioHang();
  const tongSoLuong = gioHang.reduce(
    (tong, monHang) => tong + monHang.soLuong,
    0,
  );
  const huyHieu = document.getElementById("cartBadge");
  if (huyHieu) {
    huyHieu.textContent = tongSoLuong;
  }
}

function layIdSanPhamTuURL() {
  // Sử dụng URLSearchParams để lấy giá trị của tham số "id" từ URL, giúp xác định sản phẩm nào cần hiển thị chi tiết trên trang chitietsanpham.html
  const thamSo = new URLSearchParams(window.location.search);
  // Giá trị của "id" sẽ được dùng làm key để tra cứu trong object danhSachSanPham, từ đó lấy ra thông tin chi tiết của sản phẩm cần hiển thị.
  return thamSo.get("id");
}

function chuyenGiaThanhSo(chuoiGia) {
  return parseInt(chuoiGia.replace(/\D/g, ""));
}

function dinhDangGiaTien(soTien) {
  return soTien.toLocaleString("vi-VN") + "đ";
}

// =============================================
// CẬP NHẬT NAVBAR THEO TRẠNG THÁI ĐĂNG NHẬP
// =============================================
function capNhatNavbar() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const userName = localStorage.getItem("userName") || "Tài khoản";
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const khungDangNhap = document.getElementById("navAuthArea");
  // Nếu không tìm thấy phần tử khungDangNhap, dừng hàm để tránh lỗi khi cố gắng truy cập innerHTML của null.
  if (!khungDangNhap) return;

  if (isLoggedIn) {
    // Admin: tên có thể nhấp vào để vào trang admin
    const tenHienThi = isAdmin
      ? `<a href="admin.html" class="text-success fw-semibold small text-decoration-none" title="Vào trang quản trị">
           <i class="fa fa-user-shield me-1"></i>Xin chào, ${userName}
           <i class="fa fa-arrow-up-right-from-square ms-1" style="font-size:0.7rem;"></i>
         </a>`
         // User thường: tên chỉ hiển thị không có link
      : `<span class="text-success fw-semibold small">
           <i class="fa fa-circle-user me-1"></i>Xin chào, ${userName}
         </span>`;

    // Hiện tên người dùng và nút đăng xuất nếu đã đăng nhập, đồng thời phân biệt admin và user thường bằng cách hiển thị icon và link khác nhau.
    khungDangNhap.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        ${tenHienThi}
        <button class="btn btn-outline-danger btn-sm" onclick="dangXuat()">
          <i class="fa fa-right-from-bracket me-1"></i>Đăng xuất
        </button>
      </div>
    `;
  } else {
    // Hiện nút đăng nhập
    // Nếu chưa đăng nhập, hiển thị nút "Đăng nhập" dẫn đến trang dangnhap.html để người dùng có thể đăng nhập vào hệ thống.
    khungDangNhap.innerHTML = `
      <a href="dangnhap.html" class="btn btn-outline-secondary"> 
        <i class="fa fa-right-to-bracket me-1"></i>Đăng nhập
      </a>
    `;
  }
}

// =============================================
function dangXuat() {
  // Xóa trạng thái đăng nhập khỏi localStorage để người dùng được coi là đã đăng xuất.
  localStorage.removeItem("loggedIn");
   // Xóa tên người dùng khỏi localStorage vì khi đăng xuất sẽ không còn thông tin người dùng nào được lưu trữ. 
  localStorage.removeItem("userName");
  localStorage.removeItem("isAdmin"); // Xóa thông tin phân quyền admin khỏi localStorage để đảm bảo rằng sau khi đăng xuất, người dùng sẽ không còn quyền admin nào được lưu trữ.
  window.location.href = "index.html";
}

// =============================================
// QUẢN LÝ GIỎ HÀNG
// =============================================
function layDuLieuGioHang() {
  // Lấy dữ liệu giỏ hàng từ localStorage, nếu chưa có thì trả về mảng rỗng. 
  // Dữ liệu giỏ hàng được lưu dưới dạng JSON string, nên cần parse lại thành object JavaScript để sử dụng.
  return JSON.parse(localStorage.getItem("gioHangCuaToi")) || [];
}

function luuDuLieuGioHang(gioHang) {
  // Lưu dữ liệu giỏ hàng vào localStorage dưới dạng JSON string.
  localStorage.setItem("gioHangCuaToi", JSON.stringify(gioHang));
  capNhatHuyHieuGioHang();
}

function themVaoGioHang(idSanPham) {
  if (!idSanPham) return;
  const gioHang = layDuLieuGioHang();

  const monHangDaCo = gioHang.find((monHang) => monHang.id === idSanPham);
  if (monHangDaCo) {
    monHangDaCo.soLuong += 1; // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên 1
  } else {
    gioHang.push({ id: idSanPham, soLuong: 1 }); // Nếu sản phẩm chưa có trong giỏ, thêm mới với số lượng 1
  }

  luuDuLieuGioHang(gioHang);
  hienThiThongBao("✅ Đã thêm vào giỏ hàng!");
}


function capNhatSoLuongSanPham(viTri, thayDoi) {
  const gioHang = layDuLieuGioHang();
  if (gioHang[viTri]) {
    gioHang[viTri].soLuong += thayDoi;
    if (gioHang[viTri].soLuong <= 0) {
      gioHang.splice(viTri, 1);
    }
    luuDuLieuGioHang(gioHang);
    taiTrangGioHang();
  }
}

function xoaSanPhamKhoiGio(viTri) {
  // Xóa sản phẩm khỏi giỏ hàng dựa trên vị trí (index) của sản phẩm trong mảng giỏ hàng.
  const gioHang = layDuLieuGioHang();
  // Sử dụng splice để xóa phần tử tại vị trí viTri, với số lượng phần tử cần xóa là 1.
  gioHang.splice(viTri, 1);
  // Sau khi xóa, lưu lại dữ liệu giỏ hàng mới vào localStorage và tải lại trang giỏ hàng để cập nhật giao diện.
  luuDuLieuGioHang(gioHang);
  taiTrangGioHang();
}

function xuLyMuaNgay(idSanPham) {
  if (!idSanPham) {
    idSanPham = idSanPhamHienTai;
  }
    // Khi người dùng nhấn "Mua ngay", sản phẩm sẽ được thêm vào giỏ hàng (nếu chưa có) hoặc tăng số lượng (nếu đã có), 
  // sau đó chuyển thẳng đến trang giỏ hàng cart.html để người dùng tiến hành thanh toán.
  themVaoGioHang(idSanPham);
  window.location.href = "cart.html";
}

function xuLyTuVan() {
  hienThiThongBao("💬 Nhân viên sẽ liên hệ tư vấn cho bạn!");
}

function hienThiThongBao(noiDung) {
  const phanTuNoiDung = document.getElementById("toastMsg");
  const phanTuThongBao = document.getElementById("cartToast");

  if (phanTuNoiDung && phanTuThongBao) {
    phanTuNoiDung.textContent = noiDung;
    const thongBao = new bootstrap.Toast(phanTuThongBao, { delay: 2500 });
    thongBao.show();
  }
}

// =============================================
// RENDER CÁC TRANG
// =============================================
function taiTrangGioHang() {
  const thanBang = document.getElementById("cartTableBody");
  const phanTuTamTinh = document.getElementById("cartSubtotal");
  const phanTuTongTien = document.getElementById("cartTotal");
  if (!thanBang) return;

  const gioHang = layDuLieuGioHang();
  thanBang.innerHTML = "";
  let tongTien = 0;

  if (gioHang.length === 0) {
    thanBang.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Giỏ hàng của bạn đang trống!</td></tr>`;
    phanTuTamTinh.textContent = "0đ";
    phanTuTongTien.textContent = "0đ";
    return;
  }

  gioHang.forEach((monHang, viTri) => {
    const sanPham = danhSachSanPham[monHang.id];
    if (sanPham) {
      const giaTien = chuyenGiaThanhSo(sanPham.gia);
      const tienTungMon = giaTien * monHang.soLuong;
      tongTien += tienTungMon;

      thanBang.innerHTML += `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-3">
              <img src="${sanPham.hinhAnh[0]}" class="cart-item-img">
              <div>
                <a href="chitietsanpham.html?id=${encodeURIComponent(monHang.id)}" class="text-dark fw-bold text-decoration-none">${sanPham.ten}</a>
                <p class="text-muted small mb-0">${sanPham.thongSo[0][1]}</p>
              </div>
            </div>
          </td>
          <td class="fw-semibold">${sanPham.gia}</td>
          <td>
            <div class="input-group input-group-sm w-75">
              <button class="btn btn-outline-secondary" onclick="capNhatSoLuongSanPham(${viTri}, -1)">-</button>
              <input type="text" class="form-control qty-input" value="${monHang.soLuong}" readonly>
              <button class="btn btn-outline-secondary" onclick="capNhatSoLuongSanPham(${viTri}, 1)">+</button>
            </div>
          </td>
          <td class="fw-bold text-danger">${dinhDangGiaTien(tienTungMon)}</td>
          <td>
            <button class="btn btn-sm btn-outline-danger" onclick="xoaSanPhamKhoiGio(${viTri})"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      `;
    }
  });

  phanTuTamTinh.textContent = dinhDangGiaTien(tongTien);
  phanTuTongTien.textContent = dinhDangGiaTien(tongTien);
}

function taiTrangThanhToan() {
  const vungDanhSach = document.getElementById("checkoutItemList");
  const phanTuTamTinh = document.getElementById("checkoutSubtotal");
  const phanTuTongTien = document.getElementById("checkoutTotal");
  const phanTuTieuDe = document.getElementById("checkoutTitle");
  if (!vungDanhSach) return;

  const gioHang = layDuLieuGioHang();
  vungDanhSach.innerHTML = "";
  let tongTien = 0;
  let tongSoLuong = 0;

  gioHang.forEach((monHang) => {
    const sanPham = danhSachSanPham[monHang.id];
    if (sanPham) {
      const giaTien = chuyenGiaThanhSo(sanPham.gia);
      const tienTungMon = giaTien * monHang.soLuong;
      tongTien += tienTungMon;
      tongSoLuong += monHang.soLuong;

      vungDanhSach.innerHTML += `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center gap-3">
            <img src="${sanPham.hinhAnh[0]}" class="product-mini-img">
            <div>
              <h6 class="mb-0 fw-semibold text-truncate" style="max-width: 180px;">${sanPham.ten}</h6>
              <small class="text-muted">SL: ${monHang.soLuong}</small>
            </div>
          </div>
          <span class="fw-semibold small">${dinhDangGiaTien(tienTungMon)}</span>
        </div>
      `;
    }
  });

  phanTuTieuDe.textContent = `Đơn hàng của bạn (${tongSoLuong} sản phẩm)`;
  phanTuTamTinh.textContent = dinhDangGiaTien(tongTien);
  phanTuTongTien.textContent = dinhDangGiaTien(tongTien);
}

function taiChiTietSanPham(idSanPham) {
  
  idSanPhamHienTai = idSanPham;    // Lưu idSanPham vào biến toàn cục để có thể sử dụng lại khi người dùng nhấn "Mua ngay" mà không cần phải lấy lại từ URL
  // Tra cứu thông tin sản phẩm trong object danhSachSanPham bằng idSanPham lấy từ URL để hiển thị chi tiết sản phẩm trên trang chitietsanpham.html
  const sanPham = danhSachSanPham[idSanPham]; 
  if (!sanPham) return; // Nếu không tìm thấy sản phẩm nào khớp với idSanPham, dừng hàm để tránh lỗi khi truy cập thuộc tính của undefined

  // Gán thông tin văn bản
  document.getElementById("breadcrumbProduct").textContent = sanPham.ten;
  document.getElementById("productName").textContent = sanPham.ten;
  document.getElementById("productPrice").textContent = sanPham.gia;
  document.getElementById("productOldPrice").textContent = sanPham.giaCu;
  document.getElementById("productDiscount").textContent = sanPham.giamGia;
  // Gán hình ảnh chính
  document.getElementById("mainImg").src = sanPham.hinhAnh[0];

  // Render danh sách ảnh thu nhỏ và thêm sự kiện click để thay đổi ảnh chính khi người dùng nhấn vào ảnh thu nhỏ
  const danhSachAnhThuNho = document.getElementById("thumbList");
  danhSachAnhThuNho.innerHTML = "";
  sanPham.hinhAnh.forEach((duongDan, viTri) => {
    const anh = document.createElement("img");
    anh.src = duongDan;
    anh.alt = "Ảnh " + (viTri + 1);
    if (viTri === 0) anh.classList.add("active"); // Mặc định ảnh đầu tiên được active
    anh.addEventListener("click", () => {
      document.getElementById("mainImg").src = duongDan; // Cập nhật ảnh chính khi click vào ảnh thu nhỏ
      document
        .querySelectorAll(".thumb-list img")
        .forEach((t) => t.classList.remove("active"));
      anh.classList.add("active"); // Highlight thumbbnail đang được chọn
    });
    danhSachAnhThuNho.appendChild(anh);
  });
  // Render bảng thông số kỹ thuật của sản phẩm, sử dụng hàm tiện ích để tạo các hàng trong bảng dựa trên mảng thongSo của sản phẩm
  hienThiThongSo("specsTable", sanPham.thongSo);
  hienThiThongSo("fullSpecsTable", sanPham.thongSo);
  window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn về đầu trang khi tải chi tiết sản phẩm để người dùng có thể thấy ngay thông tin sản phẩm mà không cần phải cuộn tay
}

// Hàm tiện ích để hiển thị thông số kỹ thuật của sản phẩm trong bảng HTML, nhận vào id của bảng và mảng thông số (thông số là mảng các cặp [tên thông số, giá trị thông số])
function hienThiThongSo(idBang, thongSo) {
  const bang = document.getElementById(idBang);
  bang.innerHTML = thongSo
    .map(([ten, giaTri]) => `<tr><td>${ten}</td><td>${giaTri}</td></tr>`)
    .join("");
    //Giải thích: thongSo là mảng 2 chiều dạng [["CPU", "i7-12650H"], ["RAM", "16GB"], ...]. 
    // Dùng .map() để chuyển mỗi phần tử thành một hàng <tr> trong bảng HTML, rồi .join("") để ghép lại thành chuỗi và gán vào innerHTML.
}

function taiKetQuaTimKiem() {
  const thamSo = new URLSearchParams(window.location.search);
  const tuKhoa = thamSo.get("q");

  if (!tuKhoa) return;

  const phanTuHienThiTuKhoa = document.getElementById("searchKeywordDisplay");
  if (phanTuHienThiTuKhoa) {
    phanTuHienThiTuKhoa.textContent = `"${tuKhoa}"`;
  }

  const tuKhoaChuThuong = tuKhoa.toLowerCase();
  const ketQuaTimKiem = [];

  for (const maSanPham in danhSachSanPham) {
    const sanPham = danhSachSanPham[maSanPham];
    if (sanPham.ten.toLowerCase().includes(tuKhoaChuThuong)) {
      ketQuaTimKiem.push({
        id: maSanPham,
        ...sanPham,
      });
    }
  }

  const vungKetQua = document.getElementById("searchResultsContainer");
  const vungKhongCoKetQua = document.getElementById("noResultBlock");
  const phanTuDemSoLuong = document.getElementById("resultCount");

  if (vungKetQua) {
    vungKetQua.innerHTML = "";

    if (ketQuaTimKiem.length > 0) {
      if (vungKhongCoKetQua) vungKhongCoKetQua.classList.add("d-none");
      if (phanTuDemSoLuong)
        phanTuDemSoLuong.textContent = `(Tìm thấy ${ketQuaTimKiem.length} sản phẩm)`;

      ketQuaTimKiem.forEach((sp) => {
        const theSanPham = `
          <div class="col-12 col-md-6 col-lg-3">
            <article class="card h-100 shadow-sm border-0 position-relative search-card bg-white">
              <a href="chitietsanpham.html?id=${sp.id}" style="text-decoration: none; color: inherit;">
                <img src="${sp.hinhAnh[0]}" alt="${sp.ten}" class="card-img-top border-bottom p-3" style="height: 180px; object-fit: contain;" />
              </a>
              <div class="card-body d-flex flex-column">
                <h4 class="card-title fs-6 fw-bold text-dark">
                  <a href="chitietsanpham.html?id=${sp.id}" class="text-decoration-none text-dark">
                    ${sp.ten}
                  </a>
                </h4>
                <p class="card-text text-muted small mb-3">
                  ${sp.thongSo[0][1]} </p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <span class="text-danger fw-bold">${sp.gia}</span>
                  <button class="btn btn-success btn-sm fw-bold" onclick="xuLyMuaNgay('${sp.id}')">Mua ngay</button>
                </div>
              </div>
            </article>
          </div>
        `;
        vungKetQua.innerHTML += theSanPham;
      });
    } else {
      if (vungKhongCoKetQua) vungKhongCoKetQua.classList.remove("d-none");
      if (phanTuDemSoLuong)
        phanTuDemSoLuong.textContent = `(Không tìm thấy sản phẩm nào)`;
    }
  }
}

function taiKetQuaDanhMuc() {
  const thamSo = new URLSearchParams(window.location.search);
  const loaiSanPham = thamSo.get("type") || "gaming";

  const phanTuTieuDe = document.getElementById("categoryTitle");
  if (phanTuTieuDe) {
    phanTuTieuDe.textContent =
      loaiSanPham === "office" ? "Laptop Văn phòng" : "Laptop Gaming";
  }
  const phanTuBreadcrumb = document.getElementById("breadcrumbCategory");
  if (phanTuBreadcrumb) {
    phanTuBreadcrumb.textContent =
      loaiSanPham === "office" ? "Laptop Văn phòng" : "Laptop Gaming";
  }
  const vungChua = document.getElementById("categoryList");
  if (!vungChua) return;

  vungChua.innerHTML = "";
  let demSoLuong = 0;

  for (const maSanPham in danhSachSanPham) {
    const sanPham = danhSachSanPham[maSanPham];

    if (sanPham.loai === loaiSanPham) {
      demSoLuong++;
      const theSanPham = `
        <div class="col-12 col-md-6 col-lg-4">
          <article class="product-item-card card h-100 bg-white shadow-sm border-0 position-relative">
            <a href="chitietsanpham.html?id=${encodeURIComponent(maSanPham)}" style="text-decoration: none; color: inherit;">
              <img src="${sanPham.hinhAnh[0]}" alt="${sanPham.ten}" class="card-img-top p-3 border-bottom" style="height: 180px; object-fit: contain;"/>
            </a>
            <div class="card-body d-flex flex-column">
              <h4 class="card-title fs-6 fw-bold text-dark">
                <a href="chitietsanpham.html?id=${encodeURIComponent(maSanPham)}" class="text-decoration-none text-dark">
                  ${sanPham.ten}
                </a>
              </h4>
              <p class="card-text text-muted small mb-3">
                 ${sanPham.thongSo[0][1]} 
              </p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="text-danger fw-bold">${sanPham.gia}</span>
                <button class="btn btn-success btn-sm fw-bold" onclick="xuLyMuaNgay('${maSanPham}')">Mua ngay</button>
              </div>
            </div>
          </article>
        </div>
      `;
      vungChua.innerHTML += theSanPham;
    }
  }

  if (phanTuTieuDe && demSoLuong > 0) {
    phanTuTieuDe.textContent += ` (Hiển thị ${demSoLuong} sản phẩm)`;
  }
}

// =============================================
// HIỆU ỨNG GIAO DIỆN
// =============================================
function khoiTaoThanhTruotSanPham() {
  const thanhTruot = document.getElementById("productSlider");
  const nutTrai = document.getElementById("btnScrollLeft");
  const nutPhai = document.getElementById("btnScrollRight");

  if (thanhTruot && nutTrai && nutPhai) {
    const khoangCachCuon = 400;

    nutTrai.addEventListener("click", function () {
      thanhTruot.scrollBy({ left: -khoangCachCuon, behavior: "smooth" });
    });

    nutPhai.addEventListener("click", function () {
      thanhTruot.scrollBy({ left: khoangCachCuon, behavior: "smooth" });
    });
  }
}

function doiMauMenuHoatDong() {
  const duongDanHienTai = window.location.href;
  const cacLienKetMenu = document.querySelectorAll(".navbar-nav .nav-link");

  cacLienKetMenu.forEach((lienKet) => {
    lienKet.classList.remove("text-success", "active");
  });

  if (duongDanHienTai.includes("type=gaming")) {
    const nutGaming = document.querySelector('a[href*="type=gaming"]');
    if (nutGaming) nutGaming.classList.add("text-success", "active");
  } else if (duongDanHienTai.includes("type=office")) {
    const nutVanPhong = document.querySelector('a[href*="type=office"]');
    if (nutVanPhong) nutVanPhong.classList.add("text-success", "active");
  } else if (
    !duongDanHienTai.includes("category.html") &&
    !duongDanHienTai.includes("cart.html") &&
    !duongDanHienTai.includes("chitietsanpham.html") &&
    !duongDanHienTai.includes("search.html")
  ) {
    if (cacLienKetMenu[0])
      cacLienKetMenu[0].classList.add("text-success", "active");
  }
}

// =============================================
// KHỞI CHẠY HỆ THỐNG
// =============================================
// Khi nội dung trang đã được tải xong, hàm này sẽ được gọi để khởi tạo các thành phần giao diện như cập nhật huy hiệu giỏ hàng, 
// cập nhật navbar theo trạng thái đăng nhập, thiết lập hiệu ứng menu hoạt động, khởi tạo thanh trượt sản phẩm, 
// và kiểm tra xem đang ở trang nào để tải dữ liệu tương ứng (chi tiết sản phẩm, giỏ hàng, thanh toán, kết quả tìm kiếm, danh mục).
document.addEventListener("DOMContentLoaded", () => {
  capNhatHuyHieuGioHang();
  capNhatNavbar();
  doiMauMenuHoatDong();
  khoiTaoThanhTruotSanPham();
  // Kiểm tra nếu đang ở trang chi tiết sản phẩm (dựa trên sự tồn tại của phần tử có id "productName"), 
  // nếu có thì lấy id sản phẩm từ URL và tải thông tin chi tiết sản phẩm đó để hiển thị trên trang.
  if (document.getElementById("productName")) {
    const id = layIdSanPhamTuURL();
    taiChiTietSanPham(id);
  }
  if (document.getElementById("cartTableBody")) {
    taiTrangGioHang();
  }
  if (document.getElementById("checkoutItemList")) {
    taiTrangThanhToan();
  }
  if (
    window.location.pathname.includes("search.html") ||
    document.getElementById("searchResultsContainer")
  ) {
    taiKetQuaTimKiem();
  }
  if (
    window.location.pathname.includes("category.html") ||
    document.getElementById("categoryList")
  ) {
    taiKetQuaDanhMuc();
  }
});

$(document).ready(function () {
  $("#searchForm").on("submit", function (suKien) {
    suKien.preventDefault();
    var tuKhoa = $("#searchInput").val().trim();

    if (tuKhoa !== "") {
      var tuKhoaDaMaHoa = encodeURIComponent(tuKhoa);
      window.location.href = "search.html?q=" + tuKhoaDaMaHoa;
    } else {
      alert("Vui lòng nhập tên laptop bạn muốn tìm!");
      $("#searchInput").focus();
    }
  });
});

function handleBuyNow(idSanPham) {
  xuLyMuaNgay(idSanPham);
}

function handleConsult() {
  xuLyTuVan();
}