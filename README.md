# เครื่องทำนมถั่ว OSTMARS — Landing Page (Thai)

Landing page bán **Máy làm sữa hạt OSTMARS PBJ-003** cho thị trường Thái Lan.
Single-file HTML (`index.html`) theo phong cách TikTok Shop, clone từ template D1 (giữ hệ màu đỏ).

## Demo local

```bash
python3 -m http.server 8323 --directory .
# http://localhost:8323
```

## Cấu trúc

```
.
├── index.html          # toàn bộ trang (HTML + CSS + JS inline)
├── assets/images/      # 20 ảnh infographic (01.jpg … 20.jpg)
├── CLAUDE.md           # tài liệu chi tiết + placeholder cần thay
└── README.md
```

## Trước khi deploy

Thay 3 placeholder (xem `CLAUDE.md`): webhook nhận đơn, link Messenger, link Facebook Page.
`grep -n PLACEHOLDER index.html`

## Deploy

Push lên `main` của repo `xuanbaobacgiang-bit/daianostmars` → Vercel auto-deploy.
