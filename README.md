# Sachin Kumar – Personal Portfolio

A responsive portfolio built with only HTML5, CSS3 and Vanilla JavaScript. No build step is needed, so it works directly on GitHub Pages.

## Folder structure

```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/ (profile.jpg, project1.png)
│   └── documents/resume.pdf
└── README.md
```

## How to edit each section

Open `index.html`. Every section starts with an HTML comment that begins with `EDIT:`. Change only the text inside the tags.

| Section | What to change |
|---|---|
| Home | Name, headline and intro text inside `<section id="home">` |
| About Me | The paragraph inside `<section id="about">` |
| Education | Each `<li class="timeline-item">` is one entry. Copy a block to add one. Keep the newest first. |
| Skills | Each `<li>` inside a `chips` list is one skill chip. Add or delete `<li>` lines. |
| Projects | Edit the title, description, and the two `[placeholder]` lines (Technologies and Contribution). |
| Training | Edit the text inside the `training-card`. |
| Certifications | Each `<article class="card cert-card">` is one card. Copy one to add more. |
| Contact | Update the `mailto:`, `tel:`, LinkedIn and GitHub links. |

Colors and fonts: edit the variables at the top of `css/style.css` (`:root` for light, `:root[data-theme="dark"]` for dark).

**Project buttons:** In the Projects section, replace `href="[placeholder]"` on the "Live Demo" and "GitHub Repo" links with your real URL. While the link is still `[placeholder]`, the button stays hidden.

**Hiding a section:** Delete the whole `<section>` block and its matching `<li>` link in the navbar.

## How to replace the photo, project image and resume

1. **Photo:** Save your picture as `assets/images/profile.jpg` (replace the old file). A portrait with the face in the upper half works best. The image is cropped to a circle from the top.
2. **Project image:** Save a screenshot as `assets/images/project1.png`. A 16:9 image looks best.
3. **Resume:** Save your PDF as `assets/documents/resume.pdf` (replace the old file).

Keep the file names exactly the same, including lowercase letters.

## Test on your computer

Double-click `index.html` to open it in your browser. No server is needed.

## Deploy on GitHub Pages

1. Sign in at [github.com](https://github.com) and click **New repository**.
2. Name it (for example `portfolio`), choose **Public**, and click **Create repository**.
3. Click **uploading an existing file**, then drag in everything inside the `portfolio` folder (`index.html`, `css`, `js`, `assets`, `README.md`). Make sure `index.html` is at the top level of the repository.
4. Click **Commit changes**.
5. Go to **Settings → Pages**.
6. Under **Build and deployment → Source**, choose **Deploy from a branch**.
7. Select branch **main** and folder **/ (root)**, then click **Save**.
8. Wait 1–2 minutes, then refresh the Pages screen. Your live URL appears at the top, usually `https://Sachin5571.github.io/portfolio/`.
9. Open the URL and check every section, button and link.

To update the site later, upload the changed files to the repository again. The live site refreshes in a minute or two.
