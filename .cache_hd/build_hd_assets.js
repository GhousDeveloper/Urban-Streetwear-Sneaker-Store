const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC_REF = '/app/applet/public/assets/aistudio/61ae6669418a1fe6996d2e1401ca53fd_43314874.jpg';
const CACHE = '/app/applet/.cache_hd';
const OUT = '/app/applet/public/images';

async function removeLightBg(inputPath, threshold = 240, feather = 18, darkenMidsole = false) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const out = Buffer.from(data);
  const bgR = out[0], bgG = out[1], bgB = out[2];

  const isBg = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const r = out[i * 4];
    const g = out[i * 4 + 1];
    const b = out[i * 4 + 2];
    const a = out[i * 4 + 3];
    if (a < 10) {
      isBg[i] = 1.0;
      continue;
    }
    const dist = Math.hypot(r - bgR, g - bgG, b - bgB);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum >= threshold && dist < 34) {
      isBg[i] = 1.0;
    } else if (lum >= threshold - feather && dist < 34 + feather) {
      const tLum = (lum - (threshold - feather)) / feather;
      const tDist = 1.0 - Math.max(0, (dist - 16) / (18 + feather));
      isBg[i] = Math.max(0, Math.min(1, tLum * tDist));
    } else {
      isBg[i] = 0.0;
    }
  }

  const visited = new Uint8Array(w * h);
  const extMask = new Float32Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0, tail = 0;

  const push = (x, y) => {
    const idx = y * w + x;
    if (!visited[idx] && isBg[idx] > 0.02) {
      visited[idx] = 1;
      extMask[idx] = isBg[idx];
      queue[tail++] = idx;
    }
  };

  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % w;
    const y = (idx / w) | 0;
    if (x > 0) push(x - 1, y);
    if (x + 1 < w) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y + 1 < h) push(x, y + 1);
  }

  for (let i = 0; i < w * h; i++) {
    const bgAmt = extMask[i];
    if (bgAmt > 0) {
      const newA = Math.round(out[i * 4 + 3] * (1 - bgAmt));
      out[i * 4 + 3] = newA;
      if (newA > 0 && newA < 245) {
        out[i * 4] = Math.max(0, Math.round((out[i * 4] - bgR * bgAmt) / (1 - bgAmt * 0.85)));
        out[i * 4 + 1] = Math.max(0, Math.round((out[i * 4 + 1] - bgG * bgAmt) / (1 - bgAmt * 0.85)));
        out[i * 4 + 2] = Math.max(0, Math.round((out[i * 4 + 2] - bgB * bgAmt) / (1 - bgAmt * 0.85)));
      }
    } else if (darkenMidsole) {
      const y = (i / w) | 0;
      if (y > h * 0.52) {
        const r = out[i * 4], g = out[i * 4 + 1], b = out[i * 4 + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (lum > 115) {
          const factor = 0.42 + (115 / lum) * 0.25;
          out[i * 4] = Math.round(r * factor);
          out[i * 4 + 1] = Math.round(g * factor);
          out[i * 4 + 2] = Math.round(b * factor);
        }
      }
    }
  }

  return sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 8 })
    .png()
    .toBuffer();
}

async function composeStudioProduct({
  fgBuffer,
  outFile,
  maxW = 1040,
  maxH = 820,
  flipX = false,
  offsetY = 0,
  overlaySvg = null,
}) {
  const W = 1400;
  const H = 1100;

  let prodPipe = sharp(fgBuffer);
  if (flipX) prodPipe = prodPipe.flop();

  const resizedFg = await prodPipe
    .resize(maxW, maxH, { fit: 'inside', kernel: 'lanczos3' })
    .sharpen({ sigma: 0.85, m1: 0.8, m2: 2.0 })
    .toBuffer({ resolveWithObject: true });

  const fgW = resizedFg.info.width;
  const fgH = resizedFg.info.height;
  const left = Math.round((W - fgW) / 2);
  const top = Math.round((H - fgH) / 2) + offsetY;

  const shadowY = Math.min(H - 95, top + fgH - 18);
  const shadowRx = Math.round(fgW * 0.42);
  const bgSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="studioGlow" cx="50%" cy="46%" r="58%">
        <stop offset="0%" stop-color="#2B2B2E"/>
        <stop offset="65%" stop-color="#222224"/>
        <stop offset="100%" stop-color="#1C1C1E"/>
      </radialGradient>
      <radialGradient id="contactShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#050506" stop-opacity="0.72"/>
        <stop offset="55%" stop-color="#050506" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="#222224" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#studioGlow)"/>
    <ellipse cx="${W / 2}" cy="${shadowY}" rx="${shadowRx}" ry="28" fill="url(#contactShadow)"/>
  </svg>`;

  const layers = [{ input: resizedFg.data, left, top }];
  if (overlaySvg) {
    layers.push({
      input: Buffer.from(overlaySvg(fgW, fgH)),
      left,
      top,
    });
  }

  await sharp(Buffer.from(bgSvg))
    .composite(layers)
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, outFile));
  console.log('Saved studio product:', outFile);
}

async function buildProductsAndCategories() {
  // 5. PROD-5: Essentials Fleece Hoodie 'Sand'
  const p5Clean = await removeLightBg(path.join(CACHE, 'p5_b.png'), 242, 16, false);
  await composeStudioProduct({
    fgBuffer: p5Clean,
    outFile: 'prod-5.jpg',
    maxW: 940,
    maxH: 900,
    flipX: false,
    offsetY: 0,
    overlaySvg: (w, h) => `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(${Math.round(w * 0.5)}, ${Math.round(h * 0.38)})" text-anchor="middle">
        <text y="0" fill="#181715" font-family="Impact, Arial Black, sans-serif" font-weight="900" font-size="${Math.round(w * 0.068)}" letter-spacing="${Math.round(w * 0.005)}" opacity="0.93">ESSENTIALS</text>
        <text y="${Math.round(w * 0.032)}" fill="#181715" font-family="Arial, sans-serif" font-weight="800" font-size="${Math.round(w * 0.021)}" letter-spacing="${Math.round(w * 0.008)}" opacity="0.88">FEAR OF GOD</text>
      </g>
    </svg>`,
  });

  // 6. PROD-6: Classic Club Cap Black
  const p6Clean = await removeLightBg(path.join(CACHE, 'p6_a.png'), 235, 25, false);
  await composeStudioProduct({
    fgBuffer: p6Clean,
    outFile: 'prod-6.jpg',
    maxW: 980,
    maxH: 760,
    flipX: true,
    offsetY: 10,
    overlaySvg: (w, h) => `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <path d="M ${w * 0.34} ${h * 0.43} C ${w * 0.31} ${h * 0.48}, ${w * 0.34} ${h * 0.52}, ${w * 0.41} ${h * 0.49} C ${w * 0.48} ${h * 0.46}, ${w * 0.55} ${h * 0.42}, ${w * 0.58} ${h * 0.40} C ${w * 0.51} ${h * 0.43}, ${w * 0.42} ${h * 0.46}, ${w * 0.37} ${h * 0.45} C ${w * 0.35} ${h * 0.445}, ${w * 0.345} ${h * 0.435}, ${w * 0.34} ${h * 0.43} Z"
        fill="#F5F5F7" opacity="0.96"/>
    </svg>`,
  });

  // 7. PROD-7: Never Follow Graphic Hoodie (dedicated studio card on #222224)
  const p3FrontClean = await removeLightBg(path.join(CACHE, 'p3_a.png'), 235, 20, false);
  await composeStudioProduct({
    fgBuffer: p3FrontClean,
    outFile: 'prod-7.jpg',
    maxW: 940,
    maxH: 900,
    flipX: false,
    offsetY: 0,
  });

  // 8. PROD-8: Inferno Archive Graphic Tee (dedicated studio card on #222224)
  const p3BackClean = await removeLightBg(path.join(CACHE, 'p3_c.png'), 235, 20, false);
  await composeStudioProduct({
    fgBuffer: p3BackClean,
    outFile: 'prod-8.jpg',
    maxW: 940,
    maxH: 900,
    flipX: false,
    offsetY: 0,
  });

  // 9. CAT-SNEAKERS (1600x1360): Use HD p1Clean tilted dynamically at -15deg over dark graffiti-drip studio backdrop
  const p1Clean = await removeLightBg(path.join(CACHE, 'p1.png'), 238, 22, false);
  const rotatedShoe = await sharp(p1Clean)
    .rotate(-15, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(1120, 960, { fit: 'inside', kernel: 'lanczos3' })
    .sharpen({ sigma: 0.9, m1: 0.8, m2: 2.0 })
    .toBuffer({ resolveWithObject: true });

  const catW = 1600, catH = 1360;
  const catSneakerBgSvg = `<svg width="${catW}" height="${catH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="snkGlow" cx="52%" cy="46%" r="55%">
        <stop offset="0%" stop-color="#252528"/>
        <stop offset="55%" stop-color="#121214"/>
        <stop offset="100%" stop-color="#070708"/>
      </radialGradient>
      <linearGradient id="btmFade" x1="0" y1="0.65" x2="0" y2="1">
        <stop offset="0%" stop-color="#050506" stop-opacity="0"/>
        <stop offset="100%" stop-color="#050506" stop-opacity="0.92"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#snkGlow)"/>
    <!-- Subtle dark street-art graffiti drip silhouettes in background -->
    <g fill="#08080A" opacity="0.65">
      <rect x="95" y="0" width="14" height="390" rx="7"/>
      <rect x="130" y="0" width="8" height="270" rx="4"/>
      <rect x="210" y="0" width="18" height="460" rx="9"/>
      <rect x="1340" y="0" width="16" height="440" rx="8"/>
      <rect x="1390" y="0" width="10" height="310" rx="5"/>
      <rect x="1450" y="0" width="22" height="520" rx="11"/>
      <path d="M 320 220 Q 520 120 780 210 T 1240 240" stroke="#09090B" stroke-width="58" fill="none" stroke-linecap="round"/>
      <path d="M 280 340 Q 620 240 920 350 T 1310 330" stroke="#09090B" stroke-width="44" fill="none" stroke-linecap="round"/>
    </g>
    <ellipse cx="830" cy="860" rx="440" ry="48" fill="#000000" opacity="0.72"/>
    <rect width="100%" height="100%" fill="url(#btmFade)"/>
  </svg>`;

  await sharp(Buffer.from(catSneakerBgSvg))
    .composite([
      {
        input: rotatedShoe.data,
        left: Math.round((catW - rotatedShoe.info.width) / 2) - 20,
        top: Math.round((catH - rotatedShoe.info.height) / 2) - 70,
      },
    ])
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, 'cat-sneakers.jpg'));
  console.log('Saved cat-sneakers.jpg');

  // 10. SALE-SMILEY.JPG (1600x1280): Native 2K Street-Art Acid-Lime Spray Smiley
  const smW = 1600, smH = 1280;
  const smileySvg = `<svg width="${smW}" height="${smH}" viewBox="0 0 1600 1280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="sprayGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="11" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" result="disp"/>
        <feGaussianBlur in="disp" stdDeviation="2.2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="disp"/>
        </feMerge>
      </filter>
      <filter id="outerOverspray" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="26" result="glow"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="speck"/>
        <feComposite in="glow" in2="speck" operator="in" result="spatter"/>
        <feMerge>
          <feMergeNode in="spatter"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <radialGradient id="acidGrad" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#E2FF00"/>
        <stop offset="65%" stop-color="#C4FF00"/>
        <stop offset="100%" stop-color="#9EFF00"/>
      </radialGradient>
    </defs>

    <!-- Pure black background so mix-blend-lighten in SaleBanner is 100% seamless -->
    <rect width="1600" height="1280" fill="#050505"/>

    <!-- Subtle orange street-art grunge splatters around edges matching banner -->
    <g fill="#D84315" opacity="0.55" filter="url(#sprayGlow)">
      <circle cx="1450" cy="180" r="95"/>
      <circle cx="1510" cy="420" r="65"/>
      <circle cx="1420" cy="860" r="110"/>
      <circle cx="1520" cy="1060" r="85"/>
      <circle cx="140" cy="210" r="70"/>
    </g>

    <!-- Main Acid-Lime Spray-Painted Smiley -->
    <g filter="url(#outerOverspray)">
      <g filter="url(#sprayGlow)" stroke="url(#acidGrad)" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Outer irregular spray circle -->
        <circle cx="790" cy="560" r="465" stroke-width="64"/>
        <circle cx="790" cy="560" r="465" stroke="#E8FF40" stroke-width="24" opacity="0.8"/>

        <!-- Left X Eye -->
        <path d="M 520 350 L 665 545" stroke-width="58"/>
        <path d="M 670 355 L 515 540" stroke-width="58"/>

        <!-- Right X Eye -->
        <path d="M 915 365 L 1060 555" stroke-width="58"/>
        <path d="M 1065 365 L 910 550" stroke-width="58"/>

        <!-- Wide Curved Grunge Smile -->
        <path d="M 505 685 Q 790 925 1045 710" stroke-width="62"/>

        <!-- Vertical Paint Drips from Smile & Bottom Rim -->
        <path d="M 775 810 L 775 995" stroke-width="22"/>
        <path d="M 835 805 L 835 940" stroke-width="16"/>
        <path d="M 545 975 L 545 1265" stroke-width="24"/>
        <path d="M 625 1010 L 625 1190" stroke-width="18"/>
        <path d="M 795 1025 L 795 1270" stroke-width="26"/>
        <path d="M 960 995 L 960 1240" stroke-width="19"/>
        <path d="M 1065 935 L 1065 1270" stroke-width="28"/>
        <path d="M 1110 895 L 1110 1250" stroke-width="20"/>
      </g>
    </g>
  </svg>`;

  await sharp(Buffer.from(smileySvg))
    .sharpen({ sigma: 0.9 })
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, 'sale-smiley.jpg'));
  console.log('Saved sale-smiley.jpg');
}

buildProductsAndCategories().catch(console.error);
