
import exifr from 'exifr';
import dpk from './dpk.js';

const statusMessage = document.getElementById('statusMessage');
const loadingOverlay = document.getElementById('loadingOverlay');

/**
 * Load an image from a file
 * @param {File} file
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

/**
 * Check if the image is an original from Google
 * @param {File | HTMLImageElement} file
 * @returns {Promise<{is_google: boolean, is_original: boolean}>}
 */
export async function checkOriginal(file) {
    try {
        const exif = await exifr.parse(file, ['Make', 'Model']);
        const is_google = exif && exif.Make === 'Google';
        const is_original = is_google && exif.Model.includes('Original');
        return { is_google, is_original };
    } catch (error) {
        return { is_google: false, is_original: false };
    }
}

/**
 * Get the status message for the original image
 * @param {{is_google: boolean, is_original: boolean}}
 * @returns {string}
 */
export function getOriginalStatus({ is_google, is_original }) {
    if (is_google && !is_original) {
        return dpk.t('status.edited');
    }
    return '';
}

/**
 * Set the status message
 * @param {string} message
 * @param {'success' | 'warn' | 'error'} type
 */
export function setStatusMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `font-medium text-sm ${{
        success: 'text-green-600',
        warn: 'text-yellow-600',
        error: 'text-red-600'
    }[type] || 'text-gray-600'}`;
}

/**
 * Show the loading overlay
 * @param {string} message
 */
export function showLoading(message) {
    loadingOverlay.querySelector('p').textContent = message;
    loadingOverlay.classList.remove('hidden');
}

/**
 * Hide the loading overlay
 */
export function hideLoading() {
    loadingOverlay.classList.add('hidden');
}
