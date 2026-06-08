const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const animations = [
  {
    name: 'T003-sleep-anim',
    label: '# EC-M3 v6 — Perfected Typography & Sensical Icons',
    base: 'IM8/00 Assets/Animations/T003-sleep-anim-vbg',
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      @font-face {
        font-family: "Arizona Flare";
        src: local("ABC Arizona Flare Variable Unlicensed Trial");
        font-weight: 100 700;
        font-style: normal;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        margin: 0;
        width: 1080px;
        height: 1920px;
        overflow: hidden;
        background: #F5F2F3;
      }
      #root {
        width: 100%;
        height: 100%;
        background: #F5F2F3;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 90px 48px 288px;
      }
      .headline {
        font-family: "Arizona Flare", serif;
        font-size: 160px;
        font-weight: 400;
        color: #4A1A22;
        text-align: center;
        line-height: 1;
        margin-bottom: -15px;
      }
      .stat {
        font-family: "Plus Jakarta Sans", sans-serif;
        font-size: 420px;
        font-weight: 800;
        color: #4A1A22;
        text-align: center;
        line-height: 0.95;
        letter-spacing: -24px;
        margin-left: -20px;
        margin-bottom: 5px;
      }
      .sign {
        font-size: 75%;
      }
      .subhead {
        font-family: "Manrope", sans-serif;
        font-size: 40px;
        font-weight: 400;
        color: #806A6D;
        text-align: center;
        line-height: 1.35;
        margin-bottom: 44px;
      }
      .photo-wrapper {
        width: 100%;
        max-width: 984px;
        flex-grow: 1;
        min-height: 0;
        border-radius: 36px;
        overflow: hidden;
        position: relative;
        background: #dedede;
        margin-bottom: 40px;
      }
      .broll {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        opacity: 0;
      }
      #broll-1 { opacity: 1; }
      .badges {
        display: flex;
        gap: 20px;
        width: 100%;
        max-width: 984px;
      }
      .badge {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px 10px;
        background: #F1E9E9;
        border: 2px solid rgba(74,26,34,0.15);
        border-radius: 20px;
      }
      .badge-icon {
        width: 44px;
        height: 44px;
        margin-bottom: 12px;
        opacity: 0.9;
      }
      .badge-title {
        font-family: "Manrope", sans-serif;
        font-size: 24px;
        font-weight: 800;
        color: #4A1A22;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="15" data-width="1080" data-height="1920">
      <div class="headline" id="headline">Better Sleep.</div>
      <div class="stat" id="stat">80<span class="sign">%</span></div>
      <div class="subhead" id="subhead">of users reported better sleep in<br>a 12 week clinical trial</div>
      <div class="photo-wrapper" id="photo">
        <video class="broll" id="broll-1" src="broll-1.mp4" data-volume="0" muted playsinline data-start="0" data-duration="15" style="z-index: 1"></video>
        <video class="broll" id="broll-2" src="broll-2.mp4" data-volume="0" muted playsinline data-start="4" data-duration="11" style="z-index: 2"></video>
        <video class="broll" id="broll-3" src="broll-3.mp4" data-volume="0" muted playsinline data-start="6" data-duration="9" style="z-index: 3"></video>
        <video class="broll" id="broll-4" src="broll-4.mp4" data-volume="0" muted playsinline data-start="8" data-duration="7" style="z-index: 4"></video>
        <video class="broll" id="broll-5" src="broll-5.mp4" data-volume="0" muted playsinline data-start="10" data-duration="5" style="z-index: 5"></video>
        <video class="broll" id="broll-6" src="broll-6.mp4" data-volume="0" muted playsinline data-start="12" data-duration="3" style="z-index: 6"></video>
      </div>
      <div class="badges" id="badges-row">
        <div class="badge" id="badge1">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#4A1A22" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          <span class="badge-title">Magnesium</span>
        </div>
        <div class="badge" id="badge2">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#4A1A22" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <span class="badge-title">Saffron<br>30MG</span>
        </div>
        <div class="badge" id="badge3">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#4A1A22" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          <span class="badge-title">Active B<br>Vitamins</span>
        </div>
      </div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      tl.from("#headline", { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.2);
      tl.from("#stat", { scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.4)" }, 0.3);
      tl.from("#subhead", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.5);
      tl.from("#photo", { clipPath: "inset(20% 0 20% 0)", duration: 0.8, ease: "power3.inOut" }, 0.7);
      
      tl.from("#badge1", { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, 1.0);
      tl.from("#badge2", { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, 1.1);
      tl.from("#badge3", { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, 1.2);

      const scenes = 6;
      const montageStart = 2.0;
      const montageEnd = 14.5;
      const sceneDur = (montageEnd - montageStart) / scenes;
      for (let i = 1; i < scenes; i++) {
        tl.fromTo("#broll-" + (i + 1), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, montageStart + sceneDur * i);
      }
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`
  },
  {
    name: 'T003-261day-anim',
    label: '# EC-G4 v6 — 1:1 Condensed Sans (Oswald)',
    base: 'IM8/00 Assets/Animations/T003-261day-anim-vbg',
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        margin: 0;
        width: 1080px;
        height: 1920px;
        overflow: hidden;
        background: #3B161B;
      }
      #root {
        width: 100%;
        height: 100%;
        background: #3B161B;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 70px 48px 288px;
      }
      .bg-video {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        opacity: 0.4;
        z-index: 0;
      }
      #root > *:not(.bg-video) {
        position: relative;
        z-index: 1;
      }
      .pre-headline {
        font-family: "Manrope", sans-serif;
        font-size: 40px;
        font-weight: 800;
        color: #F5F1ED;
        text-transform: uppercase;
        letter-spacing: 4px;
        margin-bottom: -15px;
      }
      .stat {
        font-family: "Oswald", sans-serif;
        font-size: 520px;
        font-weight: 700;
        color: #F5F1ED;
        line-height: 1;
        letter-spacing: -15px;
        margin-left: -20px;
        margin-bottom: 0px;
      }
      .sign {
        font-size: 75%;
      }
      .stat-label {
        font-family: "Manrope", sans-serif;
        font-size: 46px;
        font-weight: 700;
        color: #F5F1ED;
        text-transform: uppercase;
        letter-spacing: 6px;
        margin-bottom: 30px;
      }
      .photo-wrapper {
        width: 100%;
        max-width: 984px;
        flex-grow: 1;
        min-height: 0;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
        background: #000;
        margin-bottom: 30px;
      }
      .broll {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        opacity: 0;
      }
      #broll-1 { opacity: 1; }
      .badges {
        display: flex;
        gap: 20px;
        width: 100%;
        max-width: 984px;
      }
      .badge {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px 10px;
        background: rgba(255,255,255,0.05);
        border: 2px solid rgba(255,255,255,0.15);
        border-radius: 12px;
      }
      .badge-icon {
        width: 44px;
        height: 44px;
        margin-bottom: 12px;
        opacity: 0.9;
      }
      .badge-title {
        font-family: "Manrope", sans-serif;
        font-size: 24px;
        font-weight: 700;
        color: #F5F1ED;
        text-align: center;
        line-height: 1.3;
      }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="15" data-width="1080" data-height="1920">
      <video class="bg-video" id="bg" src="bg-video.mp4" data-volume="0" muted playsinline data-start="0" data-duration="15"></video>
      <div class="pre-headline" id="pre-headline">Replaces 16+ Supplements</div>
      <div class="stat" id="stat"><span class="sign">$</span>2.61</div>
      <div class="stat-label" id="stat-label">A Day</div>
      <div class="photo-wrapper" id="photo">
        <video class="broll" id="broll-1" src="broll-1.mp4" data-volume="0" muted playsinline data-start="0" data-duration="15" style="z-index: 1"></video>
        <video class="broll" id="broll-2" src="broll-2.mp4" data-volume="0" muted playsinline data-start="2" data-duration="13" style="z-index: 2"></video>
        <video class="broll" id="broll-3" src="broll-3.mp4" data-volume="0" muted playsinline data-start="4.5" data-duration="10.5" style="z-index: 3"></video>
        <video class="broll" id="broll-4" src="broll-4.mp4" data-volume="0" muted playsinline data-start="7" data-duration="8" style="z-index: 4"></video>
        <video class="broll" id="broll-5" src="broll-5.mp4" data-volume="0" muted playsinline data-start="9" data-duration="6" style="z-index: 5"></video>
        <video class="broll" id="broll-6" src="broll-6.mp4" data-volume="0" muted playsinline data-start="11" data-duration="4" style="z-index: 6"></video>
      </div>
      <div class="badges" id="badges-row">
        <div class="badge" id="badge1">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#F5F1ED" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          <span class="badge-title">NSF Certified<br>for Sport</span>
        </div>
        <div class="badge" id="badge2">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#F5F1ED" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9 12h.01M12 12h.01M15 12h.01"/></svg>
          <span class="badge-title">6000+<br>Reviews</span>
        </div>
        <div class="badge" id="badge3">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#F5F1ED" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span class="badge-title">Money-Back<br>Guarantee</span>
        </div>
      </div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      tl.fromTo("#bg", { opacity: 0 }, { opacity: 0.4, duration: 1.5, ease: "power2.inOut" }, 0);
      tl.from("#pre-headline", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.2);
      tl.from("#stat", { scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.4)" }, 0.3);
      tl.from("#stat-label", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.5);
      tl.from("#photo", { clipPath: "inset(20% 0 20% 0)", duration: 0.8, ease: "power3.inOut" }, 0.7);
      
      tl.from("#badge1", { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, 1.0);
      tl.from("#badge2", { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, 1.1);
      tl.from("#badge3", { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, 1.2);

      const scenes = 6;
      const montageStart = 2.0;
      const montageEnd = 14.5;
      const sceneDur = (montageEnd - montageStart) / scenes;
      for (let i = 1; i < scenes; i++) {
        tl.fromTo("#broll-" + (i + 1), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, montageStart + sceneDur * i);
      }
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`
  },
  {
    name: 'T003-save30-anim',
    label: '# EC-O2 v6 — 1:1 Wide Sans (Epilogue)',
    base: 'IM8/00 Assets/Animations/T003-save30-anim-vbg',
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@900&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        margin: 0;
        width: 1080px;
        height: 1920px;
        overflow: hidden;
        background: #3B161B;
      }
      #root {
        width: 100%;
        height: 100%;
        background: #3B161B;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 70px 48px 288px;
      }
      .bg-video {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        opacity: 0.25;
        z-index: 0;
      }
      #root > *:not(.bg-video) {
        position: relative;
        z-index: 1;
      }
      .pre-headline {
        font-family: "Manrope", sans-serif;
        font-size: 40px;
        font-weight: 800;
        color: #F5F1ED;
        text-transform: uppercase;
        letter-spacing: 5px;
        margin-bottom: -25px;
      }
      .stat {
        font-family: "Epilogue", sans-serif;
        font-size: 460px;
        font-weight: 900;
        color: #F5F1ED;
        line-height: 1;
        letter-spacing: -25px;
        margin-left: -20px;
        margin-bottom: -20px;
      }
      .sign {
        font-size: 75%;
      }
      .stat-label {
        font-family: "Manrope", sans-serif;
        font-size: 34px;
        font-weight: 700;
        color: #F5F1ED;
        text-transform: uppercase;
        letter-spacing: 5px;
        margin-bottom: 40px;
      }
      .photo-wrapper {
        width: 100%;
        max-width: 984px;
        flex-grow: 1;
        min-height: 0;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        background: #000;
        margin-bottom: 30px;
      }
      .broll {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        opacity: 0;
      }
      #broll-1 { opacity: 1; }
      .badges {
        display: flex;
        gap: 20px;
        width: 100%;
        max-width: 984px;
      }
      .badge {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px 10px;
        background: rgba(255,255,255,0.05);
        border: 2px solid rgba(255,255,255,0.15);
        border-radius: 20px;
      }
      .badge-amount {
        font-family: "Manrope", sans-serif;
        font-size: 48px;
        font-weight: 800;
        color: #F5F1ED;
        margin-bottom: 5px;
        line-height: 1;
      }
      .badge-label {
        font-family: "Manrope", sans-serif;
        font-size: 22px;
        font-weight: 700;
        color: #F5F1ED;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="15" data-width="1080" data-height="1920">
      <video class="bg-video" id="bg" src="bg-video.mp4" data-volume="0" muted playsinline data-start="0" data-duration="15"></video>
      <div class="pre-headline" id="pre-headline">Save Up To</div>
      <div class="stat" id="stat">30<span class="sign">%</span></div>
      <div class="stat-label" id="stat-label">With A Quarterly Subscription.</div>
      <div class="photo-wrapper" id="photo">
        <video class="broll" id="broll-1" src="broll-1.mp4" data-volume="0" muted playsinline data-start="0" data-duration="15" style="z-index: 1"></video>
        <video class="broll" id="broll-2" src="broll-2.mp4" data-volume="0" muted playsinline data-start="2" data-duration="13" style="z-index: 2"></video>
        <video class="broll" id="broll-3" src="broll-3.mp4" data-volume="0" muted playsinline data-start="4.5" data-duration="10.5" style="z-index: 3"></video>
        <video class="broll" id="broll-4" src="broll-4.mp4" data-volume="0" muted playsinline data-start="7" data-duration="8" style="z-index: 4"></video>
        <video class="broll" id="broll-5" src="broll-5.mp4" data-volume="0" muted playsinline data-start="9" data-duration="6" style="z-index: 5"></video>
        <video class="broll" id="broll-6" src="broll-6.mp4" data-volume="0" muted playsinline data-start="11" data-duration="4" style="z-index: 6"></video>
      </div>
      <div class="badges" id="badges-row">
        <div class="badge" id="badge1">
          <span class="badge-amount">$72</span>
          <span class="badge-label">Welcome Gifts</span>
        </div>
        <div class="badge" id="badge2">
          <span class="badge-amount">Free</span>
          <span class="badge-label">Shipping</span>
        </div>
        <div class="badge" id="badge3">
          <span class="badge-amount">90-Day</span>
          <span class="badge-label">Guarantee</span>
        </div>
      </div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      tl.fromTo("#bg", { opacity: 0 }, { opacity: 0.25, duration: 1.5, ease: "power2.inOut" }, 0);
      tl.from("#pre-headline", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.2);
      tl.from("#stat", { scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.4)" }, 0.3);
      tl.from("#stat-label", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.5);
      tl.from("#photo", { clipPath: "inset(20% 0 20% 0)", duration: 0.8, ease: "power3.inOut" }, 0.7);
      
      tl.from("#badge1", { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, 1.0);
      tl.from("#badge2", { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, 1.1);
      tl.from("#badge3", { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, 1.2);

      const scenes = 6;
      const montageStart = 2.0;
      const montageEnd = 14.5;
      const sceneDur = (montageEnd - montageStart) / scenes;
      for (let i = 1; i < scenes; i++) {
        tl.fromTo("#broll-" + (i + 1), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, montageStart + sceneDur * i);
      }
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`
  }
];

const newNodes = [];
let startX = 14500;

for (const anim of animations) {
  const v6Dir = `IM8/00 Assets/Animations/${anim.name}-v6`;
  
  if (!fs.existsSync(v6Dir)) {
    fs.mkdirSync(v6Dir, { recursive: true });
  }

  const filesToCopy = ['bg-video.mp4', 'broll-1.mp4', 'broll-2.mp4', 'broll-3.mp4', 'broll-4.mp4', 'broll-5.mp4', 'broll-6.mp4'];
  for (const file of filesToCopy) {
    const srcPath = path.join(anim.base, file);
    const destPath = path.join(v6Dir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  fs.writeFileSync(path.join(v6Dir, 'index.html'), anim.html);

  fs.writeFileSync(path.join(v6Dir, 'package.json'), JSON.stringify({
    name: `${anim.name}-v6`,
    private: true,
    type: "module",
    scripts: {
      "check": "npx --yes hyperframes@0.5.3 lint && npx --yes hyperframes@0.5.3 validate && npx --yes hyperframes@0.5.3 inspect",
      "render": "npx --yes hyperframes@0.5.3 render"
    }
  }, null, 2));

  fs.writeFileSync(path.join(v6Dir, 'hyperframes.json'), JSON.stringify({
    "$schema": "https://hyperframes.heygen.com/schema/hyperframes.json",
    "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
    "paths": { "blocks": "compositions", "components": "compositions/components", "assets": "assets" }
  }, null, 2));

  console.log(`Rendering ${anim.name}-v6...`);
  try {
    execSync(`cd "${v6Dir}" && npm run render`, { stdio: 'inherit' });
  } catch(e) {
    console.error(`Failed to render ${anim.name}-v6`);
  }

  const renderDir = path.join(v6Dir, 'renders');
  if (fs.existsSync(renderDir)) {
    const renders = fs.readdirSync(renderDir).filter(f => f.endsWith('.mp4')).sort();
    if (renders.length > 0) {
      const latestRender = renders[renders.length - 1];
      const videoPath = path.join(renderDir, latestRender);

      newNodes.push({"id": `${anim.name}-v6-label`, "type": "text", "text": anim.label, "x": startX, "y": 9400, "width": 600, "height": 40, "color": "4"});
      newNodes.push({"id": `${anim.name}-v6-video`, "type": "file", "file": videoPath, "x": startX, "y": 9450, "width": 400, "height": 711});
      
      startX += 650;
    }
  }
}

const canvasPath = 'IM8/T003 Images.canvas';
if (fs.existsSync(canvasPath)) {
  const canvas = JSON.parse(fs.readFileSync(canvasPath, 'utf8'));
  canvas.nodes.push(...newNodes);
  fs.writeFileSync(canvasPath, JSON.stringify(canvas, null, '\t'));
  console.log('Canvas updated with new v6 animations.');
}
