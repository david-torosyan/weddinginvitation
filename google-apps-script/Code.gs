const SHEET_ID = '1aRyhXhN-A0p262WOF_KsZwWQ8vPVSGWufV6sBnPiPbg';

function doGet() {
  return ContentService.createTextOutput('RSVP endpoint is ready.');
}

function doPost(event) {
  const payload = JSON.parse(event.postData.contents || '{}');
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Ամսաթիվ', 'Անուն, ազգանուն', 'Պատասխան', 'Հյուրերի քանակ']);
  } else if (sheet.getRange(1, 4).getValue() !== 'Հյուրերի քանակ') {
    sheet.getRange(1, 4).setValue('Հյուրերի քանակ');
  }

  sheet.appendRow([
    new Date(),
    safeCell(payload.guestName),
    safeCell(payload.attendance),
    Number(payload.guestCount) || 1,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Prevent a guest name from being interpreted as a spreadsheet formula.
function safeCell(value) {
  const text = String(value || '').trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
