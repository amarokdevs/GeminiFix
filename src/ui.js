export function initUI() {
    const uploadSection = document.getElementById('uploadSection');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('active');
                }
            }
        });
    }, {
        root: null,
        threshold: 0,
        rootMargin: "-20% 0px -20% 0px"
    });

    if (window.scrollY > 100) uploadSection.classList.add('active');
    observer.observe(uploadSection);

    window.addEventListener('scroll', () => {
        if (window.scrollY < 50) {
            uploadSection.classList.remove('active');
        }
    }, { passive: true });
}