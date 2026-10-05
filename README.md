# 🎬 CINEMATIC CANVAS — Next-Gen Film Production & 3D Stagecraft Platform

> A premier, Awwwards-caliber interactive film studio web platform engineered with **React 19**, **JavaScript**, **Tailwind CSS**, **Three.js 3D WebGL**, and **Framer Motion**.

---

## 🌟 Project Highlights & 12 Complete Pages

1. **Home / Hero Showcase (`/home`)**
   - Interactive 3D particle starfield & rotating gyroscope cinema aperture in Three.js.
   - Dynamic spotlight productions carousel with 4K screener trailer player.
   - Studio statistics ribbon (140+ Films, $1.2B+ Reach, 250m² LED Volume, 98% Critic score).
   - 4 Pillars of Disruptive Cinematography.

2. **Films Vault (`/projects`)**
   - Filterable catalog (Sci-Fi, Feature Film, Virtual Production, Commercial, Documentary).
   - Real-time search by title, director, and genre.
   - Movie poster cards with aspect ratio badges (2.39:1 CinemaScope, 1.43:1 IMAX) and instant trailer playback.

3. **Feature Case Study (`/project-detail`)**
   - Deep dive into *"CHRONO: ODYSSEY 2088"*.
   - Director's log & statement by Elena Vance.
   - Multi-pass VFX compositing progression (Practical Stage Plate ➔ Unreal Nanite Mesh ➔ ACES Kodak 2383 Grade).
   - Authentic Courier New screenplay excerpt viewer.
   - Spectral ACEScc color palette swatches with HEX codes.

4. **Live 3D Virtual Stage (`/studio-3d`)**
   - Real-time interactive 3D WebGL virtual production stage.
   - 4 Lighting rigs: *Neo-Tokyo Cyberpunk*, *35mm Golden Hour*, *Film Noir*, *Deep Space Ice Moon*.
   - Dynamic optical focal length simulator (18mm Ultra Wide up to 135mm Telephoto) with real-time camera FOV matrix recalculation.
   - Volumetric atmospheric fog slider and rotating gimbal turntable.

5. **Visual Storyboard Canvas (`/storyboard`)**
   - Interactive director shot sequencing board with dynamic aspect ratio gate masks (2.39:1 CinemaScope, 1.85:1 Academy, 1.43:1 IMAX).
   - Shot beats detailing camera movements (Technocrane, Steadicam, Ronin 4D), lens focal lengths, framing types, and audio cues.
   - Add custom shot beats and export full shot list with one click.

6. **Color Lab & LUT Suite (`/color-lab`)**
   - Interactive before/after split-screen comparison slider.
   - Drag horizontally to compare RAW ARRI Log C3 sensor dynamic range against final film emulation.
   - 4 Hollywood LUT profiles: *Kodak 2383 Print*, *Neo-Tokyo Cyberpunk*, *Dune Warm Dust*, *Silver Bleach Bypass*.
   - Live animated 100-IRE RGB Waveform monitor with Exposure and Saturation grading dials.

7. **Soundtrack & Audio Stem Mixer (`/soundtrack`)**
   - Interactive 5-channel stems console:
     - 🎻 *Orchestral Strings (Philharmonic)*
     - 🎺 *Cinematic Brass & Horn Swell*
     - 🎹 *Analog Sub Bass (Moog Sub 37)*
     - ⚡ *Cyber Arpeggiator (Prophet-6)*
     - 🌧️ *Atmos Foley & Rain Hydrophone*
   - Solo / Mute toggles and volume sliders per track with audio spectrum animations.

8. **Cinema Hardware Arsenal (`/gear`)**
   - Full technical camera and optical lens inventory (ARRI Alexa 35, RED V-Raptor XL 8K, Cooke Anamorphic /i, StageCraft LED Wall, Ronin 4D Flex).
   - Interactive side-by-side flagship camera comparison modal (Sensor Size, Dynamic Range, Max FPS, Color Science, ND Filters).

9. **Directors & Crew Collective (`/creators`)**
   - Portfolio directory of directors, ASC/BSC cinematographers, Unreal Engine VFX supervisors, and master colorists.
   - Accolades, notable filmography badges, and direct shoot inquiry dispatch.

10. **Journal & Masterclasses (`/journal`)**
    - Technical essays on anamorphic physics, Unreal Engine ICVFX, ACES color science, and Dolby Atmos spatial audio.
    - Topic filtering, reader modal, and interactive appreciation counter.

11. **Production Packages & Budget Estimator (`/pricing`)**
    - 3 Transparent tiers: *Indie Narrative*, *Commercial / Brand Anthem*, *Hollywood Feature*.
    - Interactive real-time budget calculator: dynamically compute estimated cost based on shoot days, camera package, LED volume days, and Dolby Atmos master.
    - FAQ accordion.

12. **Production Booking & Script Terminal (`/contact`)**
    - High-conversion inquiry form with budget selector, target shoot date picker, script synopsis field, and NDA request.
    - Golden cinematic confetti celebration on form submission.
    - Global stage directory with active timezones (Los Angeles HQ, London Pinewood, Tokyo Post Lab).

---

## 🚀 Step-by-Step: How to Run in VS Code

### Step 1: Open the Project in VS Code
1. Launch **Visual Studio Code**.
2. Go to **File ➔ Open Folder...** (or press `Ctrl+K Ctrl+O` on Windows / `Cmd+O` on Mac).
3. Select the folder:
   ```plaintext
   C:\Users\rajal\.gemini\antigravity\scratch\cinematic-canvas
   ```
4. Open the integrated terminal in VS Code (`Ctrl + ~` or **Terminal ➔ New Terminal**).

### Step 2: Install Dependencies & Run Development Server
```bash
# If running for the first time
npm install

# Start the lightning-fast Vite dev server
npm run dev
```

### Step 3: Open in Browser
Open your browser and navigate to:
```plaintext
http://localhost:5173
```

---

## 🌐 How to Generate a Live Public Link (Free Deployment)

You can deploy this project in under 2 minutes using either **Vercel** (recommended) or **Netlify**:

### Option A: Deploy with Vercel (Instant & Free)
1. Install Vercel CLI (optional) or push to GitHub (see below).
2. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Add New..." ➔ "Project"**.
4. Select your **`cinematic-canvas`** GitHub repository.
5. Vercel automatically detects **Vite** and **React**. Leave the default build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**.
7. In ~30 seconds, Vercel will generate your live production URL (e.g., `https://cinematic-canvas.vercel.app`)!

### Option B: Deploy with Netlify
1. Go to [https://app.netlify.com](https://app.netlify.com).
2. Click **"Add new site" ➔ "Import an existing project" ➔ "GitHub"**.
3. Choose `cinematic-canvas`.
4. Click **Deploy Site**. Netlify will provide a live URL (e.g., `https://cinematic-canvas.netlify.app`).

---

## 🐙 Step-by-Step: How to Push to GitHub

Run these commands inside your VS Code terminal:

```bash
# 1. Stage all files
git add .

# 2. Create your initial commit
git commit -m "feat: initial release of Cinematic Canvas with 12 pages and 3D WebGL stage"

# 3. Create a new repository on GitHub:
#    - Go to https://github.com/new
#    - Name it: cinematic-canvas
#    - Keep it Public and DO NOT initialize with README (already created)
#    - Click "Create repository"

# 4. Set main branch and link your remote repository
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/cinematic-canvas.git

# 5. Push to GitHub
git push -u origin main
```

---

## 💼 LinkedIn Post Template (Copy & Paste Ready)

Here is an optimized post copy tailored for LinkedIn to maximize reach, showcasing both the design and frontend engineering:

```markdown
🚀 Excited to unveil my latest project: CINEMATIC CANVAS 🎬 — A next-gen interactive film production studio & 3D virtual stagecraft web platform!

Inspired by cutting-edge cinema tech (ARRI Alexa 35, Panavision Anamorphic, and Unreal Engine StageCraft LED Volumes), I built an immersive 12-page web application fusing classical cinematic aesthetics with modern WebGL and React 19.

✨ Key Features:
🔹 Live 3D Virtual Production Stage (Three.js): Interactive 3-point lighting schematics, dynamic focal length zoom (18mm–135mm), and real-time volumetric atmospheric haze.
🔹 Interactive 3D Hero Aperture: Stardust particle field with gyro-responsive physics.
🔹 Hollywood Color Lab: Real-time before/after split slider comparing RAW ARRI Log C3 dynamic range against ACES Kodak 2383 film print emulation + live RGB waveform scopes.
🔹 Interactive Storyboard Suite: Visual shot sequencing with 2.39:1 CinemaScope and 1.43:1 IMAX gate masks + instant shotlist export.
🔹 Audio Scoring Console: 5-channel stems mixer (Philharmonic strings, Moog sub-bass, foley) with real-time frequency visualizer.
🔹 Dynamic Shoot Budget Estimator: Interactive production calculator adjusting camera packages, LED stage days, and Dolby Atmos mastering.

🛠️ Tech Stack:
• Frontend: React 19, JavaScript (ESM)
• Styling: Tailwind CSS
• 3D & Physics: Three.js WebGL & Framer Motion
• Icons & Polish: Lucide React & Canvas Confetti

🔗 Live Demo: [PASTE_YOUR_VERCEL_OR_NETLIFY_LINK_HERE]
💻 GitHub Code: [PASTE_YOUR_GITHUB_REPO_LINK_HERE]

I'd love to hear your feedback on the 3D lighting simulator and the Color Lab! Drop your thoughts in the comments below. 👇

#ReactJS #ThreeJS #WebDevelopment #Frontend #TailwindCSS #UIUX #Cinematography #VirtualProduction #CreativeCoding #JavaScript #Portfolio
```
