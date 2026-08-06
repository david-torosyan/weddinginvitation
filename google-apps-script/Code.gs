const SHEET_ID = '1aRyhXhN-A0p262WOF_KsZwWQ8vPVSGWufV6sBnPiPbg';

function doGet() {
  return ContentService.createTextOutput('RSVP endpoint is ready.');
}

function doPost(event) {
  const payload = JSON.parse(event.postData.contents || '{}');
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const headers = ['Ամսաթիվ', 'Անուն, ազգանուն', 'Պատասխան', 'Հյուրերի քանակ', 'Ում կողմից'];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else if (sheet.getRange(1, 5).getValue() !== headers[4]) {
    sheet.getRange(1, 5).setValue(headers[4]);
  }

  const rowNumber = sheet.getLastRow() + 1;
  sheet.appendRow([
    new Date(),
    safeCell(payload.guestName),
    safeCell(payload.attendance),
    payload.guestCount === '' || payload.guestCount === null || payload.guestCount === undefined
      ? 0
      : Number(payload.guestCount),
    safeCell(payload.invitedBy),
  ]);

  colorRsvpRow(sheet, rowNumber, payload.attendance, payload.invitedBy);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Colors the full RSVP row so it is easy to scan in the spreadsheet.
function colorRsvpRow(sheet, rowNumber, attendance, invitedBy) {
  const row = sheet.getRange(rowNumber, 1, 1, 5);
  const answer = String(attendance || '').toLowerCase();
  const side = String(invitedBy || '').toLowerCase();
  let color = '#ffffff';
  let textColor = '#202124';

  if (answer === 'no') {
    color = '#c00000'; // vivid red
    textColor = '#ffffff';
  } else if (answer === 'yes' && side === 'groom') {
    color = '#1f4e78'; // dark blue
    textColor = '#ffffff';
  } else if (answer === 'yes' && side === 'bride') {
    color = '#b4236a'; // dark pink
    textColor = '#ffffff';
  }

  row.setBackground(color).setFontColor(textColor);
}

// Run this once from Apps Script to color rows already in the sheet.
function colorExistingRsvpRows() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const values = sheet.getRange(2, 3, lastRow - 1, 3).getValues();
  values.forEach((row, index) => colorRsvpRow(sheet, index + 2, row[0], row[2]));
}

// Prevent a guest value from being interpreted as a spreadsheet formula.
function safeCell(value) {
  const text = String(value || '').trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
