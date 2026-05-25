# Furkid Rescue Website

Hi! This is the website for Furkid Rescue. This page is for the people who run the rescue — it walks you through **launching the site** and **updating it over time** without needing to know code.

---

## TL;DR (for your developer/IT helper)

- Static HTML/CSS/JS site — no build step, no server, no dependencies.
- Drop this folder into any GitHub repo, enable GitHub Pages, done.
- All editable content lives in `content.json`. The six HTML files (`index.html`, `adopt.html`, etc.) are dumb templates that load `content.json` at runtime.
- Edit workflow for nontechnical owners: **CONTENT-GUIDE.xlsx** maps every field to plain-English descriptions and includes copy-paste ChatGPT prompts.

---

## What's in this folder

```
furkid-rescue/
├── index.html          ← Home page
├── adopt.html          ← Adopt a Furkid
├── help.html           ← How to Help
├── about.html          ← About Furkid Rescue
├── happy-tails.html    ← Happy Tails (success stories)
├── donate.html         ← Donate / Support Our Mission
│
├── content.json        ← 👈 All the text and image filenames live here
├── CONTENT-GUIDE.xlsx  ← 👈 Your plain-English editing guide (open this first!)
├── README.md           ← This file
│
└── assets/
    ├── css/styles.css  ← Colors, fonts, layout (developer-only)
    ├── js/render.js    ← Code that fills the pages (developer-only)
    └── images/         ← All your photos
        └── README.txt  ← Which photos go where
```

You will only ever need to touch **`content.json`** and the **`assets/images/`** folder.

---

## Part 1 — Launching the site on GitHub Pages (one-time, ~15 minutes)

You need a free GitHub account. If you don't have one, sign up at [github.com](https://github.com).

### Step 1. Create a new GitHub repository

1. Log into github.com and click the **+** icon in the top-right → **New repository**.
2. Name it something like `furkid-rescue` (or whatever you want — this becomes part of your URL).
3. Choose **Public**.
4. Click **Create repository**.

### Step 2. Create a Copy 

1. On the GitHub page, scroll to the top and click the green <> Code button.
2. In the menu that opens, click Download ZIP.
3. A .zip file will download to your computer, usually in your Downloads folder.
4. Open your Downloads folder, then open the .zip file: On many computers, you can double-click the .zip file. On Windows, you may need to right-click → Extract All. On Mac, double-clicking usually creates a normal folder automatically.
5. After it opens or extracts, you should see a regular folder containing the website files. You will use this folder in the next step.

### Step 3. Upload this folder

1. On the repo's home page, click **uploading an existing file**.
2. Drag the **entire contents** of the folder from the prev step into the upload area. (Drag the files and the `assets` folder, not the `furkid-rescue` folder itself.)
3. Scroll down and click **Commit changes**.

### Step 4. Turn on GitHub Pages

1. On the repo, click **Settings** (top tab).
2. On the left, click **Pages**.
3. Under **Source**, pick **Deploy from a branch**.
4. Under **Branch**, pick **main** and **/ (root)**, then **Save**.
5. Wait 1–2 minutes. Your site will appear at:

   `https://YOUR-USERNAME.github.io/furkid-rescue/`

### Step 5. (Optional) Connect a custom domain

If you own `furkidrescue.org`:

1. On the repo's **Settings → Pages**, under **Custom domain**, type your domain and click **Save**.
2. At your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:
   - Four A records pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One CNAME record pointing `www` to `YOUR-USERNAME.github.io`
3. Back on GitHub, check **Enforce HTTPS** once it's available (usually within a few hours).

---

## Part 2 — Updating the site (whenever you want)

You don't need a developer. You have two options.

### Easiest: use ChatGPT

1. Open **CONTENT-GUIDE.xlsx** in Excel.
2. Find the tab for the page you want to update (e.g. "Home Page").
3. In the **yellow "Your Changes" column**, type your new text next to the current version.
4. Save the workbook.
5. Open ChatGPT. Attach **content.json** (download it from GitHub) and **CONTENT-GUIDE.xlsx**.
6. Paste the **"Prompt 1 — General edits"** from the ChatGPT Prompts tab.
7. ChatGPT returns a new `content.json`. Copy everything inside the JSON code block.
8. On GitHub, open `content.json`, click the pencil icon, delete everything, paste the new content, click **Commit changes**.
9. Wait 1–2 minutes. Your site is updated.

### Direct edit (if you're comfortable)

1. On GitHub, click `content.json`.
2. Click the pencil icon.
3. Change only what's **between the quotes** after a colon. For example:
   ```
   "hero_title_part1": "Every Furkid Deserves a",
   ```
   You can safely change `Every Furkid Deserves a` but NOT `hero_title_part1`.
4. Scroll down, click **Commit changes**.

---

## Part 3 — Common "how do I..." tasks

### Add a new adoptable pet

Option A — ChatGPT: use **Prompt 2** from the ChatGPT Prompts tab. Fill in the blanks, attach `content.json`, send.

Option B — spreadsheet: add a row to the "Adopt - Pets" tab and use **Prompt 1**.

### Remove a pet (they got adopted! 🎉)

Use **Prompt 4** from the ChatGPT Prompts tab. Just tell it the pet's name.

### Add a new Happy Tail

Use **Prompt 3** from the ChatGPT Prompts tab. Fill in the pet's name, adopter, date, quote, and photo filename.

### Change a photo

1. Upload your new photo to the `assets/images/` folder on GitHub (use **Add file → Upload files**). Use a simple filename with no spaces, like `pet-rocky.jpg`.
2. Use **Prompt 5** from the ChatGPT Prompts tab to point `content.json` at the new filename.

See `assets/images/README.txt` for recommended photo sizes.

### Change the PayPal donation URL

1. Open **CONTENT-GUIDE.xlsx** → "Site Settings" tab.
2. Find the "PayPal donation URL" row.
3. Put your real PayPal.me link in the yellow column.
4. Follow the ChatGPT workflow.

### Change the header/footer contact info or social links

Same as above — all of that is on the **"Site Settings"** tab.

---

## Part 4 — What NOT to touch

If you stay out of these, you can't break the site:

- `assets/css/styles.css` — controls how the site looks
- `assets/js/render.js` — controls how content fills the pages
- All `.html` files (`index.html`, `adopt.html`, etc.) — they're templates
- **Field names** inside `content.json` (the bit to the left of each colon, in quotes)

You only ever change **values** (to the right of the colon) in `content.json`, and you add/replace files in `assets/images/`.

---

## Part 5 — Troubleshooting

**My change didn't show up on the site.**
Wait 2 minutes — GitHub Pages takes a moment to rebuild. Then refresh with **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows) to clear your browser cache.

**The page is blank / broken.**
You probably have a typo in `content.json`. Common issues: a missing quote, missing comma, or extra comma. Two fixes:

1. Go back to GitHub → **Commits** (top-right of the file) → click the commit just before yours → **Revert**. This undoes the change.
2. Or: paste your `content.json` into [jsonlint.com](https://jsonlint.com) — it will point out the error.

**ChatGPT truncated the content.json.**
Reply to it: "Please show the full, complete content.json with no truncation." Or use the ChatGPT Pro Canvas feature for long outputs.

**I want to test locally before pushing.**
You need a local web server (because `content.json` is loaded via `fetch`). Easiest way:

```bash
cd path/to/furkid-rescue
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## Credits

Design: per Figma mockup from the Furkid Rescue design file.
Icons: custom inline SVG (no external dependencies).
Fonts: [Nunito](https://fonts.google.com/specimen/Nunito) from Google Fonts.

Questions? The editing guide in `CONTENT-GUIDE.xlsx` has a "Start Here" tab and a "How to Edit with ChatGPT" tab that walk you through every common task.
