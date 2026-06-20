# CLAUDE.md — Landing page เครื่องทำนมถั่ว OSTMARS (Thai)

Landing page bán **Máy làm sữa hạt OSTMARS** (model PBJ-003) — thị trường **Thái Lan**.
Clone từ template `Landing page D1 Thai`, **giữ nguyên hệ màu đỏ TikTok-Shop** của D1.

## Thông tin dự án

- **Sản phẩm gốc:** `daiancompany.com/maysuahat` — OSTMARS PBJ-003, 600W, 800–1000ml, 23.000 RPM, lưỡi inox 304 8 cạnh, 7 chế độ tự động.
- **GitHub:** `github.com/xuanbaobacgiang-bit/daianostmars` (private) — tài khoản `xuanbaobacgiang-bit`.
- **Vercel:** connect repo → auto-deploy khi push `main`.
- **Ngôn ngữ trang:** Tiếng Thái.

## Chạy local

```bash
python3 -m http.server 8323 --directory "/Users/lexuanbao/Documents/Landing Pages/daianostmars-landing-page"
# Mở: http://localhost:8323
```

## Kiến trúc

Single file: `index.html` (~1.150 dòng)
- **CSS:** inline `<style>` — design tokens TikTok Shop, prefix class giống D1, mobile-first 480px, hệ màu đỏ `--red:#E8001C`.
- **JS:** inline `<script>` — hero gallery (6 slide auto-rotate), tab scrollspy, countdown, buy popup (3 combo), lightbox.
- **Ảnh:** `./assets/images/01.jpg … 20.jpg` — commit vào git → Vercel serve. **Không dùng URL ảnh local tuyệt đối.**

## 20 ảnh — nguồn & cách dựng

- Nguồn gốc: `~/Downloads/Khách hàng/Đại an/máy làm sữa hạt/ảnh cho landing page/ảnh 01–20.png`.
- Đã nén bằng `sips` (PNG→JPEG, resize 1080px, q80): 34MB → ~4.5MB. Lệnh tái tạo:
  ```bash
  for i in $(seq 1 20); do n=$(printf "%02d" $i); \
    sips -s format jpeg -s formatOptions 80 -Z 1080 "$SRC/ảnh $n.png" --out "assets/images/$n.jpg"; done
  ```
- Vị trí từng ảnh xem comment trong `index.html` (theo guide 20 ảnh của khách).

## Các giá trị quan trọng

| Mục | Giá trị |
|---|---|
| Facebook Pixel | `1602655537448756` (dùng chung với D1) |
| Sự kiện chuyển đổi | `CompleteRegistration` · content_ids `OSTMARS-NUT-MILK-MAKER` |
| Facebook Page | `https://www.facebook.com/profile.php?id=61591016493564` |
| Messenger (chat) | `https://m.me/61591016493564` |
| Avatar (brand-logo) | `./assets/images/logo.jpg` |
| Giá 1 máy | 1,399 ฿ (gốc 1,999฿) |
| Giá 2 máy | 2,699 ฿ — **ขายดีที่สุด** (mặc định chọn trong popup) |
| Giá 3 máy | 3,999 ฿ |
| Quà tặng | E-book 30 สูตรทำนมถั่ว |
| Bảo hành | 1 ปีเต็ม |

## ✅ Cấu hình đã hoàn tất (page sẵn sàng deploy)

| Mục | Giá trị | Trạng thái |
|---|---|---|
| Webhook (đã deploy) | `https://script.google.com/macros/s/AKfycby0yzR2a1wcsp6t6NNh9OUpY_I-rcfuZTQFnvJ-NGn7cLqs7y8qEZi14ekgDpecMnLdbQ/exec` | ✅ live |
| Messenger | `https://m.me/61591016493564` | ✅ đã set |
| Facebook Page | `https://www.facebook.com/profile.php?id=61591016493564` | ✅ đã set |
| og:image (`./assets/images/01.jpg`) | (Tùy chọn) URL tuyệt đối sau khi deploy để share FB đẹp | tùy chọn |

> Webhook đã test thành công: đơn đổ về sheet **"Đại An - Thailand"** → tab **"Máy làm sữa hạt"** (10 cột, có cột Màu). Apps Script project: "OSTMARS - Máy làm sữa hạt" (account xuanbaobacgiang@gmail.com). Sửa webhook → Deploy → Manage deployments → Edit → New version.

Tìm nhanh: `grep -n PLACEHOLDER index.html`

## Form → Google Apps Script → Sheets

Fetch dùng `mode:'no-cors'` + `Content-Type:text/plain` để bypass CORS (giống D1).
Code webhook: [`apps-script.gs`](apps-script.gs) — script **độc lập** (`openById`), không đụng webhook các sản phẩm khác.
Đổ data về spreadsheet **"Đại An - Thailand"** (`12NQHsLfe8MD47FK1dUVm0gxuyvOk6JA7DbR9LxRPb8Y`), tab **"Máy làm sữa hạt"** (tự tạo + dòng tiêu đề khi có đơn đầu tiên).
Payload (10 cột): orderCode, product, option, **color** (สีครีม/สีม่วงลาเวนเดอร์), price, name, phone, address, pageUrl, ts.

> **Form:** ô "ghi chú" cũ đã đổi thành **chọn màu** (`#colorOpts`): สีครีม (Cream) / สีม่วงลาเวนเดอร์ (Lavender), mặc định Cream → gửi field `color`.

## Workflow

```bash
git add index.html assets/ CLAUDE.md README.md
git commit -m "mô tả thay đổi"
git push origin main   # Vercel tự deploy
```

## Lưu ý

- 3 review trong section `#reviews` là **mẫu** — thay bằng review thật trước khi chạy ads.
- Số liệu social proof (5,000+, 1,128 รีวิว, 4.9) là placeholder marketing — chỉnh theo thực tế.
- Giữ nguyên hệ màu đỏ; ảnh infographic nền pastel là chủ ý thiết kế, không xung đột.
