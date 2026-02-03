
import { generateAlphaMap } from './alphaMap.js';
import { reverseAlpha } from './blendModes.js';

const WATERMARK_SIZE_48 = 48;
const WATERMARK_SIZE_96 = 96;
const WATERMARK_MARGIN_48 = 32;
const WATERMARK_MARGIN_96 = 64;

async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

export class WatermarkEngine {
    constructor(alphaMaps) {
        this.alphaMaps = alphaMaps;
    }

    static async create() {
        const [bg48, bg96] = await Promise.all([
            loadImage('./assets/bg_48.png'),
            loadImage('./assets/bg_96.png')
        ]);

        const alphaMaps = {
            [WATERMARK_SIZE_48]: generateAlphaMap(bg48),
            [WATERMARK_SIZE_96]: generateAlphaMap(bg96)
        };

        return new WatermarkEngine(alphaMaps);
    }

    getWatermarkInfo(imageWidth, imageHeight) {
        const use96 = imageWidth > 1024 && imageHeight > 1024;
        const size = use96 ? WATERMARK_SIZE_96 : WATERMARK_SIZE_48;
        const margin = use96 ? WATERMARK_MARGIN_96 : WATERMARK_MARGIN_48;

        const x = imageWidth - size - margin;
        const y = imageHeight - size - margin;

        return {
            size,
            position: { x, y }
        };
    }

    async removeWatermarkFromImage(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const watermarkInfo = this.getWatermarkInfo(img.width, img.height);
        const alphaMap = this.alphaMaps[watermarkInfo.size];
        const { x, y } = watermarkInfo.position;
        const { size } = watermarkInfo;

        const imageData = ctx.getImageData(x, y, size, size);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const alpha = alphaMap[i / 4];
            data[i] = reverseAlpha(data[i], alpha);
            data[i + 1] = reverseAlpha(data[i + 1], alpha);
            data[i + 2] = reverseAlpha(data[i + 2], alpha);
        }

        ctx.putImageData(imageData, x, y);

        return canvas;
    }
}
