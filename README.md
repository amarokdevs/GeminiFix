# Gemini Watermark Remover – Lossless Watermark Remover

Gemini Watermark Remover is a high-performance, 100% client-side tool designed to remove Gemini AI visible watermarks with mathematical precision.
It uses a deterministic Reverse Alpha Blending algorithm instead of unreliable AI inpainting, ensuring zero-loss restoration wherever possible.

<p align="center">
  <img src="https://count.getloli.com/@gemini-watermark-remover?name=gemini-watermark-remover&theme=minecraft&padding=7&offset=0&align=top&scale=1&pixelated=1&darkmode=auto" width="400">
</p>

---

## 🚀 Features

- ✅ 100% Client-Side – No servers, no uploads, no tracking
- ✅ Privacy-First – Images never leave your browser
- ✅ Lossless Restoration – Mathematical reverse alpha compositing
- ✅ Smart Detection – Automatically detects 48×48 and 96×96 Gemini watermarks
- ✅ Instant Processing – Drag, drop, done
- ✅ Cross-Platform – Works on all modern browsers

---

## 🖼 Examples

<details open>
<summary><strong>Click to Expand / Collapse</strong></summary>

<p><strong>Before / After</strong></p>

| Original | Removed |
| :---: | :---: |
| <img src="docs/1.webp" width="400"> | <img src="docs/unwatermarked_1.webp" width="400"> |

</details>

---

## ⚠️ Disclaimer

USE AT YOUR OWN RISK

Gemini Watermark Remover modifies image pixel data. Although designed to be deterministic and safe, results may vary due to:

- Changes in Gemini watermark rendering
- Corrupted or unsupported image formats
- Uncovered edge cases

By using this tool, you accept full responsibility for any outcomes.
The author is not liable for data loss or unintended image modification.

Privacy Notice:
Gemini Watermark Remover is designed to operate entirely on the client side.

For transparency about how data is handled, please review the Privacy Policy:
https://github.com/amarokdevs/gemini-watermark-remover/blob/main/privacy.txt

To ensure correct image processing, browser extensions that modify or protect canvas output
(such as canvas or fingerprint defender extensions) should be disabled while using Gemini Watermark Remover.
These extensions may interfere with pixel-level operations.

---

## 🧩 Usage

### Userscript (Gemini Conversation Pages)

1. Install a userscript manager (Tampermonkey or Greasemonkey)
2. Install the Gemini Watermark Remover userscript
3. Open any Gemini conversation
4. Use “Copy Image” or “Download Image”
   → Watermark is removed automatically

---

## 🛠 Development

Install dependencies:
    npm install

Run development server:
    npm run dev

Build for production:
    npm run build

Preview production build:
    npm run serve

---

## 🔬 How It Works

### Gemini Watermark Model

Gemini watermarks are applied using standard alpha compositing:

watermarked = α × logo + (1 − α) × original

Where:
- watermarked = final pixel
- α = alpha transparency (0–1)
- logo = watermark color (white = 255)
- original = original pixel value

---

### Reverse Alpha Blending (Gemini Watermark Remover)

To recover the original pixel:

original = (watermarked − α × logo) / (1 − α)

By capturing the watermark over known solid backgrounds, Gemini Watermark Remover reconstructs the exact alpha map and reverses the blend with no AI guessing.

---

## 📐 Detection Rules

| Condition | Watermark | Right Margin | Bottom Margin |
|---------|----------|--------------|---------------|
| Width > 1024 AND Height > 1024 | 96×96 | 64px | 64px |
| Otherwise | 48×48 | 32px | 32px |

---

## 📁 Project Structure

gemini-watermark-remover/
├── .idx/
│   └── dev.nix
├── docs/
│   ├── 1.webp
│   └── unwatermarked_1.webp
├── node_modules/
├── public/
│   ├── index.html
│   └── terms.html
├── src/
│   ├── assets/
│   │   ├── bg_48.png
│   │   └── bg_96.png
│   ├── dpk/
│   │   └── en-US.json
│   ├── app.js
│   └── dpk.js
├── build.js
└── package.json

---

## 🧠 Core Modules

alphaMap.js logic summary:
- Extract max RGB channel
- Normalize to 0–1
- Store alpha values in Float32Array

blendModes.js logic summary:
- Clamp alpha
- Apply reverse alpha blending formula
- Restore pixel values safely

---

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Required APIs:
- ES6 Modules
- Canvas API
- Typed Arrays
- Async / Await

---

**Created & maintained by AmarokDevs**  
Independent research & implementation by the Deepak Dev.

---

## ❌ Limitations

- Removes only visible Gemini watermarks
- Does not remove invisible or steganographic watermarks (for example: SynthID)
- Optimized for Gemini’s watermark format (as of 2025)

---

## ⚖️ Legal Notice

Gemini Watermark Remover is intended for personal and educational use only.

Users are responsible for complying with all applicable laws, licenses, and terms of service.
This project does not encourage copyright infringement or misuse.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND.

---

## 📜 License

MIT License — see LICENSE file
