
const LOGO_WHITE = 255;

/**
 * Clamp a value between 0 and 255
 * @param {number} value
 * @returns {number}
 */
function clamp(value) {
    return Math.max(0, Math.min(255, value));
}

/**
 * Reverse alpha blending for a single channel
 * @param {number} watermarked
 * @param {number} alpha
 * @returns {number}
 */
export function reverseAlpha(watermarked, alpha) {
    if (alpha === 1) {
        return watermarked;
    }
    if (alpha === 0) {
        return watermarked;
    }
    const original = (watermarked - alpha * LOGO_WHITE) / (1 - alpha);
    return clamp(original);
}
