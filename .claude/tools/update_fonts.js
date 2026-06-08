const fs = require('fs');

function updateHtml(filePath, newFontUrl, cssUpdates) {
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Replace Google Fonts URL to include new fonts
  html = html.replace(
    /family=DM\+Serif\+Display:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&display=swap/,
    newFontUrl
  );
  
  // Apply CSS updates
  for (const [selector, rules] of Object.entries(cssUpdates)) {
    const backupRegex = new RegExp(`(\\.${selector}\\s*\\{)([\\s\\S]*?)(\\})`);
    html = html.replace(backupRegex, (match, p1, p2, p3) => {
        let inner = p2;
        if (rules.fontFamily !== undefined) inner = inner.replace(/font-family:[^;]+;/, `font-family: ${rules.fontFamily};`);
        if (rules.fontSize !== undefined) inner = inner.replace(/font-size:[^;]+;/, `font-size: ${rules.fontSize};`);
        if (rules.letterSpacing !== undefined) inner = inner.replace(/letter-spacing:[^;]+;/, `letter-spacing: ${rules.letterSpacing};`);
        if (rules.marginBottom !== undefined) inner = inner.replace(/margin-bottom:[^;]+;/, `margin-bottom: ${rules.marginBottom};`);
        if (rules.marginRight !== undefined) inner = inner.replace(/margin-right:[^;]+;/, `margin-right: ${rules.marginRight};`);
        if (rules.fontWeight !== undefined) inner = inner.replace(/font-weight:[^;]+;/, `font-weight: ${rules.fontWeight};`);
        return p1 + inner + p3;
    });
  }
  
  fs.writeFileSync(filePath, html);
}

// 1. Save 30% (EC-O2) -> Bold, heavy sans-serif (Anton)
updateHtml(
  'IM8/00 Assets/Animations/T003-save30-anim-v2/index.html',
  'family=Anton&family=Manrope:wght@300;400;500;600;700;800&display=swap',
  {
    'stat': { fontFamily: '"Anton", sans-serif', fontSize: '500px', letterSpacing: '0px', fontWeight: '400', marginRight: '0px' }
  }
);

// 2. $2.61 A Day (EC-G4) -> Condensed bold sans-serif (Oswald)
updateHtml(
  'IM8/00 Assets/Animations/T003-261day-anim-v2/index.html',
  'family=Oswald:wght@700&family=Manrope:wght@300;400;500;600;700;800&display=swap',
  {
    'stat': { fontFamily: '"Oswald", sans-serif', fontSize: '480px', letterSpacing: '-5px', fontWeight: '700', marginRight: '0px' }
  }
);

// 3. Sleep 80% (EC-M3) -> Extra bold sans (Manrope 800)
updateHtml(
  'IM8/00 Assets/Animations/T003-sleep-anim-v2/index.html',
  'family=Manrope:wght@300;400;500;600;700;800&display=swap',
  {
    'stat': { fontFamily: '"Manrope", sans-serif', fontSize: '450px', letterSpacing: '-15px', fontWeight: '800', marginRight: '0px' }
  }
);

console.log('Fonts updated successfully');
