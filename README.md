# Ignis RescueLink - Portfolio Website

A 4-page website (Home, Solution, Team, Contact) plus a friendly 404 page, for our Final Year Project
(BS(CS), FAST NUCES Karachi). It has a 3D ambulance scene, scroll effects and a working contact form.

## 1. Folder map - where do I edit things?

| I want to change...            | Edit this                                  |
|--------------------------------|--------------------------------------------|
| Name, tagline, email, location, video link | `src/config/site.ts`           |
| Home page text                 | `src/content/home.ts`                      |
| Solution page text             | `src/content/solution.ts`                  |
| Team members, supervisor, photos, LinkedIn/GitHub | `src/content/team.ts`   |
| Photos (skyline, control room...) | `public/images/` (read `README.txt` there) |
| Walkthrough video              | `public/video/ignis-rescuelink.mp4`        |
| Colours                        | `tailwind.config.ts`                       |
| Secret keys                    | `.env.local` (never share, never commit)   |

## 2. Prerequisite

Node 20 or newer. Check in PowerShell:

```powershell
node -v
```

If it shows v20 or higher you are fine. Otherwise install the LTS version from nodejs.org.

## 3. Run it on your computer (Windows PowerShell)

```powershell
mkdir C:\dev -Force; Expand-Archive "$HOME\Downloads\ignis-rescuelink-website.zip" -DestinationPath C:\dev -Force
cd C:\dev\ignis-rescuelink-website
npm install
copy .env.example .env.local
```

Open `.env.local` in Notepad and paste your Resend key after `RESEND_API_KEY=` (see section 4). Then:

```powershell
npm run dev
```

Open http://localhost:3000 in your browser. To stop the server press **Ctrl+C** in PowerShell.

## 4. Get the Resend API key (needed for the contact form)

1. Go to resend.com and sign up with **harmainrashid222@gmail.com** (this exact address matters, see the note below).
2. Verify the email Resend sends you.
3. Open the **API Keys** page and create a key with **sending access**.
4. Copy the key into `.env.local` as `RESEND_API_KEY=...`.
5. Never share the key in chat and never commit it to GitHub.
6. Check Resend's current free-plan limits on its pricing page.
7. If the dashboard labels differ from the above, follow what Resend shows.

**Important:** until you verify your own domain in Resend, it only delivers to the email address you used to sign up.
So the email shown on the website and `CONTACT_TO_EMAIL` must be the same address as your Resend account.
The form does not send an auto-reply to visitors for the same reason.

## 5. How to add things

- **Video:** copy your file to `public/video/ignis-rescuelink.mp4` (optional poster: `public/video/poster.jpg`).
  Until it exists, a "Video coming soon" card is shown. Or paste a YouTube *embed* link into `youtubeEmbedUrl` in `src/config/site.ts`.
- **Photos:** save them in `public/images/` using the file names listed in `public/images/README.txt`.
  Check the license of every photo you download (Unsplash / Pexels). Do not copy from Google.
- **Team details:** edit `src/content/team.ts` (look for the `TODO` comments). Put member photos in `public/images/`.
- **Change the contact email** in TWO places, then redeploy:
  1. `contactEmail` in `src/config/site.ts` (the address shown on the website)
  2. `CONTACT_TO_EMAIL` in `.env.local` / Vercel (plus a NEW Resend API key from an account that uses the new email)

## 6. Test the contact form

Run `npm run dev`, open http://localhost:3000/contact, fill the form and press Send.

| Message you see | Meaning |
|---|---|
| Red text under a field | That field breaks a rule (name 2-80, valid email, message 10-2000 characters). |
| "Too many messages in a short time" | More than 5 sends in 10 minutes from one address. Wait and retry. |
| "The contact form is not configured yet." | `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing. Check `.env.local`, restart the server. |
| "Sorry, we could not send your message right now." | Resend refused it (wrong key, or email is not your Resend sign-up email). Look at the PowerShell window for a `[contact]` line. |
| "Thank you! Your message has been sent..." | It worked. Check the inbox of `CONTACT_TO_EMAIL` (and spam). |

The rate limit lives in memory. On hosting with many server instances (like Vercel) it is best-effort only.

## 7. Deploy (GitHub + Vercel)

1. On github.com create a **new empty repository** named `ignis-rescuelink-website`.
2. In the project folder run these one by one (replace `<repo-url>` with your repository link):

```powershell
git init
git add .
git status
git ls-files | Select-String "\.env"
git commit -m "Initial website"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

The `Select-String` line must show **only** `.env.example`. If `.env.local` appears, STOP and do not push.

3. On vercel.com: **Add New > Project > import the repository**.
4. Add environment variables `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (and `NEXT_PUBLIC_SITE_URL` with your live address after the first deploy). Then press **Deploy**.
5. Open the live address and test the contact form there.

Remember: every push to `main` redeploys automatically. Build-time variable rules from other tools (like VITE_) are not used here,
but after you change an environment variable in Vercel you must **redeploy** for it to take effect.

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| Form says "not configured" | `.env.local` missing or empty. Copy `.env.example`, fill it, restart `npm run dev`. On Vercel add the variables and redeploy. |
| Resend returns 403 / form fails | You are not sending to your Resend sign-up email. Use the same address in `CONTACT_TO_EMAIL` and for the Resend account. |
| Port 3000 is busy | Close the other server, or run `npm run dev -- -p 3001` and open http://localhost:3001 |
| `npm install` errors | Check `node -v` is 20+, delete the `node_modules` folder and run `npm install` again. Do not use `--force`. |
| Video does not play | File must be named exactly `ignis-rescuelink.mp4` and live in `public/video/`. Use an H.264 MP4. |
| 3D scene not showing | The browser has WebGL off, the device is low-powered, or "reduce motion" is on in the system. The site then shows a static illustration on purpose. |
