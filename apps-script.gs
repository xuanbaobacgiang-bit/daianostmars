/**
 * Google Apps Script — nhận đơn hàng từ Landing page Máy làm sữa hạt OSTMARS
 * Đổ data về sheet "Đại An - Thailand", tab "Máy làm sữa hạt".
 * ----------------------------------------------------------------------------
 * CÁCH DEPLOY (script ĐỘC LẬP — không đụng tới webhook của các sản phẩm khác):
 *  1. Vào https://script.google.com  → New project (Dự án mới).
 *  2. Xoá code mẫu, dán TOÀN BỘ file này vào, đặt tên project (vd "OSTMARS - May sua hat"), Save (💾).
 *  3. Deploy (Triển khai) → New deployment → bánh răng ⚙️ chọn "Web app".
 *       - Execute as:        Me (xuanbaobacgiang@gmail.com)
 *       - Who has access:    Anyone (Bất kỳ ai)
 *     → Deploy → Authorize access → chọn tài khoản → Advanced → "Go to ... (unsafe)" → Allow.
 *  4. Copy "Web app URL" (https://script.google.com/macros/s/.../exec) → đưa cho Claude.
 *
 *  Tab "Máy làm sữa hạt" + dòng tiêu đề sẽ TỰ tạo khi có đơn đầu tiên.
 *  Sửa code sau này: Deploy → Manage deployments → Edit → Version: New version → Deploy.
 */

var SPREADSHEET_ID = '12NQHsLfe8MD47FK1dUVm0gxuyvOk6JA7DbR9LxRPb8Y';
var SHEET_NAME = 'Máy làm sữa hạt';
var HEADERS = ['Thời gian', 'Mã đơn', 'Sản phẩm', 'Gói (số máy)', 'Màu', 'Giá', 'Họ tên', 'SĐT', 'Địa chỉ', 'Trang'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    sh.appendRow([
      new Date(),
      data.orderCode || '',
      data.product || '',
      data.option || '',
      data.color || '',
      data.price || '',
      data.name || '',
      "'" + (data.phone || ''),   // prefix ' để giữ số 0 đầu SĐT
      data.address || '',
      data.pageUrl || ''
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', orderCode: data.orderCode }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Mở URL /exec bằng GET để kiểm tra script còn sống.
function doGet() {
  return ContentService
    .createTextOutput('OSTMARS webhook is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
