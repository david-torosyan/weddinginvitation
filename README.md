# Armenian wedding invitation

## Run

`npm install`, then `npm run dev`. Use `npm run build` for a production build and `npm run preview` to view it.

## Edit the invitation

All editable copy, people, date, deadline, events, gallery paths and RSVP choices live in `src/config/weddingConfig.js`. Change `wedding.date` once; the hero, countdown and date display follow it automatically. Edit `rsvpDeadline`, event `time`, `venue`, `address`, and optional `mapUrl` in the same file. Paste a Google Maps share URL into an event’s `mapUrl` to show its map button.

## Images

See `public/images/README.md`. Replace the local files while retaining filenames, or update the paths centrally in `weddingConfig.js`.

## RSVP → Google Sheets

The form sends the guest name, attendance choice, and submission time through the webhook service. To connect the provided spreadsheet:

1. Open the spreadsheet and choose **Extensions → Apps Script**.
2. Copy the contents of `google-apps-script/Code.gs` into the Apps Script editor and save it.
3. Choose **Deploy → New deployment → Web app**.
4. Set **Execute as** to yourself and **Who has access** to **Anyone**. Approve the Google permissions and copy the web app URL.
5. Create `.env` from `.env.example`, then set:

```env
VITE_RSVP_MODE=webhook
VITE_RSVP_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart Vite after changing `.env`. Every RSVP then appears as a new row in the first tab of the spreadsheet. The sheet may remain editable by anyone with the link; the web-app permission controls form submissions separately.

## Deployment

For Vercel: import the repository, use `npm run build`, output directory `dist`, and define the RSVP environment variables. For Netlify: build command `npm run build`, publish directory `dist`, with the same environment variables. The configured ISO date includes `+04:00`; verify its local time against Asia/Yerevan before publishing.

Use WebP/AVIF where supported and keep hero imagery around 2400px tall or less.
