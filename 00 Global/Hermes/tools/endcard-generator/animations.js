/*
 * IM8 End Card — Standardized Animation Choreography
 *
 * Every component has ONE canonical entrance animation.
 * Composition-specific hero animations and hold animations are separate.
 * Timing follows the build/breathe/resolve structure from motion-principles.md.
 *
 * Entrance order follows the 5-layer stack:
 *   A (logo/capsule) → B (headline/subhead) → C (hero) → D (badges) → E (cta/disclaimer/footnote/logo)
 */

// ── Component Entrances ──
// These are the canonical animations. Same across all compositions.

const COMPONENT = {
  logo:       (id, t) => `      tl.from("${id}", { opacity: 0, duration: 0.3, ease: "power2.out" }, ${t.toFixed(2)});`,
  logoTexture:(id, t) => `      tl.from("${id}", { y: -30, opacity: 0, duration: 0.4, ease: "power3.out" }, ${t.toFixed(2)});`,
  pill:       (id, t) => `      tl.from("${id}", { scale: 0.8, opacity: 0, duration: 0.35, ease: "back.out(1.5)" }, ${t.toFixed(2)});`,
  headline:   (id, t) => `      tl.from("${id}", { y: 40, opacity: 0, duration: 0.5, ease: "expo.out" }, ${t.toFixed(2)});`,
  subhead:    (id, t) => `      tl.from("${id}", { y: 20, opacity: 0, duration: 0.4, ease: "power3.out" }, ${t.toFixed(2)});`,
  badge:      (id, t) => `      tl.from("${id}", { scale: 0.7, opacity: 0, duration: 0.3, ease: "back.out(1.7)" }, ${t.toFixed(2)});`,
  cta:        (id, t) => `      tl.from("${id}", { y: 25, opacity: 0, duration: 0.4, ease: "expo.out" }, ${t.toFixed(2)});`,
  disclaimer: (id, t) => `      tl.from("${id}", { opacity: 0, duration: 0.3, ease: "sine.out" }, ${t.toFixed(2)});`,
  footnote:   (id, t) => `      tl.from("${id}", { opacity: 0, duration: 0.3, ease: "sine.out" }, ${t.toFixed(2)});`,
};

// Stagger gaps between components (seconds)
const GAP = {
  afterLogo: 0.1,
  afterPill: 0.15,
  afterHeadline: 0.15,
  afterSubhead: 0.15,
  afterHero: 0.0,    // hero entrance duration provides the gap
  betweenBadges: 0.1,
  afterBadges: 0.0,
  afterCta: 0.15,
  afterDisclaimer: 0.1,
  afterFootnote: 0.1,
};

// ── Hero Entrances ──
// Each composition type has its own hero reveal.

const HERO = {
  brollReveal: (t) =>
    `      tl.from("#photo-wrapper", { clipPath: "inset(100% 0 0 0)", duration: 0.6, ease: "power3.inOut" }, ${t.toFixed(2)});`,

  brollRevealTextured: (t) =>
    `      tl.from("#photo-wrapper", { scale: 0.6, opacity: 0, duration: 0.5, ease: "back.out(1.3)" }, ${t.toFixed(2)});`,

  heroImage: (t) =>
    `      tl.from("#hero-img", { scale: 0.9, opacity: 0, duration: 0.6, ease: "power3.out" }, ${t.toFixed(2)});`,

  heroComposite: (t) =>
    `      tl.from("#hero-img", { opacity: 0, duration: 0.8, ease: "power2.out" }, ${t.toFixed(2)});`,

  statNumber: (t) => [
    `      tl.from("#stat-number", { scale: 0.5, opacity: 0, duration: 0.7, ease: "back.out(1.3)" }, ${t.toFixed(2)});`,
  ].join("\n"),

  statLabel: (t) =>
    `      tl.from("#stat-label", { y: 15, opacity: 0, duration: 0.4, ease: "power3.out" }, ${t.toFixed(2)});`,

  seal: (t) =>
    `      tl.from("#seal", { scale: 0.3, opacity: 0, duration: 0.6, ease: "back.out(1.4)" }, ${t.toFixed(2)});`,

  listItem: (id, t) =>
    `      tl.from("${id}", { x: -30, opacity: 0, duration: 0.35, ease: "power3.out" }, ${t.toFixed(2)});`,

  gridCell: (id, t) =>
    `      tl.from("${id}", { scale: 0.7, opacity: 0, duration: 0.35, ease: "back.out(1.5)" }, ${t.toFixed(2)});`,
};

// ── Hold Animations ──
// Ambient motion during the breathe phase (starts at 2.5s).

const HOLD = {
  kenBurns: (id) =>
    `\n      // Hold: Ken Burns\n      tl.to("${id}", { scale: 1.03, duration: 12, ease: "sine.inOut" }, 2.5);`,

  statPulse: (id) =>
    `\n      // Hold: stat pulse\n      tl.to("${id}", { scale: 1.02, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: 4 }, 2.5);`,

  sealRotation: (id) =>
    `\n      // Hold: seal rotation\n      tl.to("${id}", { rotation: 8, duration: 12, ease: "sine.inOut" }, 2.5);`,

  textureDrift: (id) =>
    `\n      // Hold: texture drift\n      tl.to("${id}", { x: 15, duration: 12, ease: "sine.inOut" }, 2.5);`,

  portraitPulse: (id) =>
    `\n      // Hold: portrait luminosity\n      tl.to("${id}", { filter: "brightness(1.05)", duration: 3, ease: "sine.inOut", yoyo: true, repeat: 3 }, 2.5);`,
};

// ── Background Entrance ──
// Textured compositions fade in the background first.

function bgEntrance(t) {
  return `      tl.fromTo("#bg", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, ${t.toFixed(2)});`;
}

// ── Main Builder ──

function buildEntrance(type, opts) {
  const lines = [];
  let t = 0.1;
  const isTextured = ["3e", "3f", "3g"].includes(type);

  // Background fade for textured compositions
  if (isTextured) {
    lines.push(bgEntrance(t));
    t += 0.1;
  }

  // Layer A: Logo
  if (opts.hasLogo) {
    lines.push(isTextured ? COMPONENT.logoTexture("#logo-top", t) : COMPONENT.logo("#logo-top", t));
    t += GAP.afterLogo;
  }

  // Layer A: Capsule
  if (opts.capsule) {
    lines.push(COMPONENT.pill("#pill", t));
    t += GAP.afterPill;
  }

  // Layer B: Headline
  lines.push(COMPONENT.headline("#headline", t));
  t += GAP.afterHeadline;

  // Layer B: Subhead
  if (opts.subhead) {
    lines.push(COMPONENT.subhead("#subhead", t));
    t += GAP.afterSubhead;
  }

  // Layer C: Hero (composition-specific)
  switch (type) {
    case "3a":
      lines.push(HERO.brollReveal(t));
      t += 0.5;
      break;
    case "3b":
      lines.push(HERO.heroImage(t));
      t += 0.5;
      break;
    case "3c":
      lines.push(HERO.heroImage(t));
      t += 0.5;
      break;
    case "3d":
      lines.push(HERO.statNumber(t));
      t += 0.3;
      if (opts.statLabel) {
        lines.push(HERO.statLabel(t));
        t += 0.15;
      }
      break;
    case "3e":
      lines.push(HERO.heroComposite(t));
      t += 0.6;
      break;
    case "3f":
      lines.push(HERO.brollRevealTextured(t));
      t += 0.5;
      break;
    case "3g":
      if (opts.heroType === "seal") {
        lines.push(HERO.seal(t));
        t += 0.4;
      } else {
        for (let i = 0; i < opts.listItemCount; i++) {
          lines.push(HERO.listItem(`#list-item-${i + 1}`, t));
          t += 0.12;
        }
      }
      break;
    case "3h":
      for (let i = 0; i < opts.gridCellCount; i++) {
        lines.push(HERO.gridCell(`#grid-cell-${i + 1}`, t));
        t += 0.1;
      }
      break;
  }

  // Layer D: Badges
  for (let i = 0; i < opts.badgeCount; i++) {
    lines.push(COMPONENT.badge(`#badge${i + 1}`, t));
    t += GAP.betweenBadges;
  }

  // Layer E: CTA
  lines.push(COMPONENT.cta("#cta", t));
  t += GAP.afterCta;

  // Layer E: Disclaimer
  if (opts.disclaimer) {
    lines.push(COMPONENT.disclaimer("#disclaimer", t));
    t += GAP.afterDisclaimer;
  }

  // Layer E: Footnote
  if (opts.footnote) {
    lines.push(COMPONENT.footnote("#footnote", t));
    t += GAP.afterFootnote;
  }

  // Layer E: Logo bottom
  if (opts.hasLogoBottom) {
    lines.push(COMPONENT.logo("#logo-bottom", t));
  }

  // Hold animations
  switch (type) {
    case "3b":
    case "3c":
      lines.push(HOLD.kenBurns("#hero-img"));
      break;
    case "3d":
      lines.push(HOLD.statPulse("#stat-number"));
      break;
    case "3e":
      lines.push(HOLD.textureDrift("#bg"));
      lines.push(HOLD.portraitPulse("#hero-img"));
      break;
    case "3g":
      if (opts.heroType === "seal") {
        lines.push(HOLD.sealRotation("#seal"));
      }
      break;
    case "3h":
      lines.push(HOLD.statPulse("#grid-cell-1"));
      break;
  }

  return lines.join("\n");
}

export { buildEntrance, COMPONENT, HERO, HOLD, GAP };
