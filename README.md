# CampusEcho – Campus Feedback & Video Testimony Tool

CampusEcho is a web application for collecting campus feedback and video testimonials from students and faculty. It allows users to record or upload short video testimonials, which are then securely uploaded to Google Drive for analysis and promotional use.

## Features

- Modern, attractive landing page
- Simple user info form (name, email, role) before recording
- Video testimony recording directly in the browser
- Uploads videos to Google Drive with user info in the file description
- No login required for users

## How It Works

1. **Landing Page:** Users start at the landing page and click "Start Your Testimonial."
2. **User Info:** Users enter their name, email (optional), and role.
3. **Video Testimony:** Users record their video and upload it.
4. **Google Drive:** The video is uploaded to a designated Google Drive folder, with user info saved in the file description.

## Setup & Usage

1. **Clone the repository:**
   ```
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Add your Google service account key:**
   - Place your `vedio-testimonal-tool-461217-deea1e0fcb41.json` in the project root.
   - Make sure the service account has access to your target Google Drive folder.
4. **Start the server:**
   ```
   node server.js
   ```
5. **Open the app:**
   - Go to `http://localhost:3000` in your browser.

## File Structure

- `index.html` – Landing page
- `login.html` – User info form
- `video-recorder.html` – Video testimony page
- `app.js` – Frontend logic for recording/uploading
- `server.js` – Node.js backend for handling uploads
- `styles.css` – App styling

## Customization

- Update the Google Drive folder ID in `server.js` as needed.
- Change branding, colors, or text in the HTML/CSS files.

## License

MIT License

---

**Designed and developed by Gopika.**  
Copyright © 2025 GG
