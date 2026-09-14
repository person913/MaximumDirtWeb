# Maximum Dirt Studios — site

A small, static, no-build-step website. Every file here can be edited directly
and deployed as-is to any static host (Netlify, Vercel, GitHub Pages, S3, or
just an FTP upload to shared hosting).

## Files

| File                   | What it is                                                   |
|------------------------|----------------------------------------------------------------|
| `index.html`           | The whole site — header, hero, about, games, contact, footer  |
| `styles.css`           | All styling                                                    |
| `script.js`            | Small behavior layer (footer year, closes mobile menu on tap)  |
| `favicon.ico`          | Browser tab icon (16/32/48px)                                  |
| `apple-touch-icon.png` | iOS home-screen icon (180×180)                                 |
| `icon-512.png`         | Large icon, used by `site.webmanifest`                         |
| `social-preview.png`   | 1200×630 image shown in link previews (Slack, iMessage, X, …)  |
| `site.webmanifest`     | Lets mobile browsers "Add to Home Screen" with the right icon  |
| `robots.txt`           | Allows all crawlers, points at the sitemap                     |
| `sitemap.xml`          | Single-page sitemap                                            |

The site does **not** use a build step, bundler, or framework. Open
`index.html` in a browser and it works; upload the whole folder to a host and
it works.

## Before you go live

1. **Domain.** `robots.txt`, `sitemap.xml`, and four meta tags in
   `index.html` (`og:url`, `og:image`, `twitter:image`, and the
   `canonical` link) currently point at `https://maximumdirt.studio/`.
   If that's not the real domain, update all of those — search the repo
   for `maximumdirt.studio` to find every instance.
2. **Games.** Open `index.html` and search for `EDIT ME` — that comment
   marks the three placeholder game cards. Each one needs:
   - a real title (replace `[Game One Title]` etc.)
   - genre / platform / status tags
   - a one- or two-sentence description
   - working `href`s on the "Download for Mac" and "Source" buttons
   Once a link is real, delete `aria-disabled="true"` and `tabindex="-1"`
   from that `<a>` so it becomes a normal, clickable button.

   The Contact form's "Which game is this about?" dropdown (also marked
   `EDIT ME`) lists the same three placeholder titles — keep it in sync
   whenever you rename or add a game.
3. **About facts.** The "Studio / Focus / Team size / Status" panel in the
   About section is reasonable placeholder copy, not verified facts —
   check it says what you actually want it to say.
4. **Email.** `contact@maximumdirt.studio` appears in three places: the
   footer, the About panel, and the Contact form's `action` attribute
   (the one that actually matters — see below). Update all three if the
   address changes.

## Page order

Hero → Games → Contact → About → Footer. About is last on purpose — the
nav links (Games / Contact / About) match this order, and the hero's
"About the studio" button still scrolls all the way down to it.

## How your contact form sends email

The form on the Contact section sends straight to
`contact@maximumdirt.studio` using **FormSubmit.co** — a free service
that forwards form submissions to an inbox. No account, no API key, no
server code. It works via the form's own `action="https://formsubmit.co/..."`
attribute in `index.html`, so it even works with JavaScript turned off.

**One-time setup (do this once, after the site is live):**

1. Open the live site, scroll to the Contact form, and send yourself a
   test message (anything, it's just to trigger setup).
2. Check the inbox for `contact@maximumdirt.studio` for an email from
   FormSubmit with a subject like "Please Activate Your FormSubmit".
   (If nothing shows up in a minute or two, check spam.)
3. Open that email and click the activation link. This is a one-time,
   per-email-address confirmation — it stops random strangers from
   using FormSubmit to spam an inbox that isn't theirs.
4. Go back to the site and submit the test form one more time. This
   second submission is the one that actually arrives.
5. Done. Every message the form sends from now on lands directly in
   that inbox, forever, for free.

A hidden `_honey` field is included as basic spam protection (bots tend
to fill in every field; real visitors never see or touch it, since it's
invisible). `_captcha` is set to `false` so visitors aren't interrupted
by a puzzle page — the honeypot is usually enough for a form like this.

**If you change the destination email**, update it in exactly one place:
the `action="https://formsubmit.co/..."` attribute on the `<form>` tag
in `index.html`. You'll need to repeat the one-time activation step
above for the new address.

**If FormSubmit's free tier ever isn't enough** (it doesn't have a hard
monthly cap the way some competitors do, but if you outgrow it): swap
the form's `action` for a Formspree or Netlify Forms endpoint instead —
same idea, same one-line change, different provider.

## Editing the games list

Each game is one `<article class="game">` block inside `#games` in
`index.html`. To add a fourth game, copy one whole block (from
`<article class="game">` to `</article>`) and paste it before
`</div>` that closes `.game-list`. Update the `<span class="tag-corner">`
number and the cover SVG's colors if you want it visually distinct from
the others.

## Regenerating the icons / social image

`apple-touch-icon.png`, `icon-512.png`, `favicon.ico`, and
`social-preview.png` were generated from the brand's amber/dark palette
and the same "signal mark" logo used in the nav. If you change the logo
or palette, regenerate them (any image editor, or a short PIL/ImageMagick
script) at these exact sizes:

- `favicon.ico` — 16×16, 32×32, 48×48 (multi-size ICO)
- `apple-touch-icon.png` — 180×180, PNG (iOS ignores SVG here)
- `icon-512.png` — 512×512, PNG
- `social-preview.png` — 1200×630, PNG or JPG

## Accessibility / robustness notes for future edits

- The mobile nav menu is CSS-only (a hidden checkbox + label), not
  JavaScript — it works even if `script.js` fails to load. Don't
  reintroduce a JS-driven `.open` class toggle; edit the `#navCheck`
  rules in `styles.css` instead.
- The hero's entrance animation is pure CSS and respects
  `prefers-reduced-motion`. Don't gate content visibility behind a
  JS-added class — if JS is slow or blocked, content must still show.
- Disabled buttons (the placeholder game downloads) use both
  `aria-disabled="true"` *and* `tabindex="-1"`. The first communicates
  the state to screen readers; the second is required because
  `pointer-events:none` blocks mouse clicks but not keyboard `Enter` on
  a focused link. Keep both until the link is real, then remove both.
