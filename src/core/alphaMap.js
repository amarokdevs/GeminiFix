
/**
 * Generate an alpha map from an image
 * @param {HTMLImageElement} img
 * @returns {Float32Array}
 */
export function generateAlphaMap(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const alphaMap = new Float32Array(canvas.width * canvas.height);

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // The alpha is encoded in the red channel of the watermark image, apparently
        const alpha = Math.max(r, g, b) / 255;
        alphaMap[i / 4] = alpha;
    }

    return alphaMap;
}
