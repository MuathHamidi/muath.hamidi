/**
 * PowerPoint Slide Deck Presentation Engine
 * Bulletproof DOMContentLoaded initialization checks to prevent readyState racing.
 */

(function() {
    let currentSlide = 0;
    let autoplayInterval = null;
    const autoplayDuration = 8000; // 8 seconds

    // Global DOM variables
    let wrapper = null;
    let drawerList = null;
    let prevBtn = null;
    let nextBtn = null;
    let slideCounter = null;
    let autoplayBtn = null;
    let playIcon = null;
    let pauseIcon = null;
    let fullscreenBtn = null;
    let enterFsIcon = null;
    let exitFsIcon = null;
    let progressStrip = null;
    let drawer = null;
    let openDrawerBtn = null;
    let closeDrawerBtn = null;

    // 1. Core initialization sequence
    function init() {
        wrapper = document.getElementById('slides-wrapper');
        drawerList = document.getElementById('drawer-slide-list');
        prevBtn = document.getElementById('prev-btn');
        nextBtn = document.getElementById('next-btn');
        slideCounter = document.getElementById('slide-counter');
        autoplayBtn = document.getElementById('autoplay-btn');
        playIcon = document.getElementById('play-icon');
        pauseIcon = document.getElementById('pause-icon');
        fullscreenBtn = document.getElementById('fullscreen-btn');
        enterFsIcon = document.getElementById('enter-fullscreen-icon');
        exitFsIcon = document.getElementById('exit-fullscreen-icon');
        progressStrip = document.getElementById('progress-strip');
        drawer = document.getElementById('index-drawer');
        openDrawerBtn = document.getElementById('toggle-drawer-btn');
        closeDrawerBtn = document.getElementById('close-drawer-btn');

        if (!wrapper) {
            console.error("DOM Initialization Error: slides-wrapper element not found.");
            return;
        }

        // Attach event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        autoplayBtn.addEventListener('click', toggleAutoplay);
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        openDrawerBtn.addEventListener('click', toggleDrawer);
        closeDrawerBtn.addEventListener('click', closeDrawer);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                case 'Enter':
                case 'PageDown':
                    e.preventDefault();
                    nextSlide();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                case 'Backspace':
                    e.preventDefault();
                    prevSlide();
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
                case 'a':
                case 'A':
                    toggleAutoplay();
                    break;
                case 'm':
                case 'M':
                    toggleDrawer();
                    break;
            }
        });

        const handleResize = () => {
            fitSlides();
            setTimeout(fitSlides, 100);
            setTimeout(fitSlides, 250);
        };
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        // Touch Swipe Gestures for Mobile Navigation
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
        }, { passive: true });

        const fsEvents = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
        fsEvents.forEach(evt => {
            document.addEventListener(evt, () => {
                const fsElement = document.fullscreenElement || 
                                   document.webkitFullscreenElement || 
                                   document.mozFullScreenElement || 
                                   document.msFullscreenElement;
                if (!fsElement) {
                    if (enterFsIcon) enterFsIcon.classList.remove('hidden');
                    if (exitFsIcon) exitFsIcon.classList.add('hidden');
                } else {
                    if (enterFsIcon) enterFsIcon.classList.add('hidden');
                    if (exitFsIcon) exitFsIcon.classList.remove('hidden');
                }
                setTimeout(fitSlides, 100);
            });
        });

        // Load slides and setup initial view
        loadSlides();
        updateUI();
        fitSlides();
        setTimeout(fitSlides, 150); // double-check refit
    }

    // 2. Build slide contents and drawer index
    function loadSlides() {
        if (!wrapper) return;
        wrapper.innerHTML = '';
        drawerList.innerHTML = '';

        slidesData.forEach((slide, idx) => {
            // Slide Card
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide';
            slideDiv.id = `slide-${idx}`;
            
            // For the title slide, render content directly (omitting standard slide-header)
            if (slide.layout === 'title-slide') {
                slideDiv.innerHTML = slide.content;
            } else {
                slideDiv.innerHTML = `
                    <div class="slide-header">
                        <div class="slide-header-left">
                            <h2 class="slide-title">${slide.title}</h2>
                            <span class="slide-subtitle">${slide.subtitle || ''}</span>
                        </div>
                        <span class="slide-number-disp">${String(idx + 1).padStart(2, '0')} / ${String(slidesData.length).padStart(2, '0')}</span>
                    </div>
                    ${slide.content}
                `;
            }
            wrapper.appendChild(slideDiv);

            // Drawer item
            const li = document.createElement('li');
            li.dataset.index = idx;
            li.innerHTML = `<span style="color: var(--accent-blue); font-weight: 700; margin-right: 8px;">${String(idx + 1).padStart(2, '0')}.</span> ${slide.title}`;
            li.addEventListener('click', () => {
                goToSlide(idx);
                closeDrawer();
            });
            drawerList.appendChild(li);
        });
    }

    // 3. Navigation Actions
    function updateUI() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((s, idx) => {
            if (idx === currentSlide) s.classList.add('active');
            else s.classList.remove('active');
        });

        const drawerItems = drawerList.querySelectorAll('li');
        drawerItems.forEach((item, idx) => {
            if (idx === currentSlide) item.classList.add('active');
            else item.classList.remove('active');
        });

        // HUD indicators
        if (slideCounter) {
            slideCounter.innerText = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slidesData.length).padStart(2, '0')}`;
        }
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === slidesData.length - 1;

        // Progress line
        if (progressStrip) {
            const pct = ((currentSlide + 1) / slidesData.length) * 100;
            progressStrip.style.width = `${pct}%`;
        }

        // Load active slide widget
        Widgets.init(currentSlide);

        // Typeset LaTeX equations dynamically
        if (window.MathJax) {
            MathJax.typesetPromise().catch(err => console.warn("MathJax Typeset Failed:", err));
        }
    }

    function goToSlide(idx) {
        if (idx >= 0 && idx < slidesData.length) {
            currentSlide = idx;
            updateUI();
            resetAutoplay();
        }
    }

    function nextSlide() {
        if (currentSlide < slidesData.length - 1) {
            goToSlide(currentSlide + 1);
        } else if (autoplayInterval) {
            goToSlide(0); // loop
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }

    // 4. Aspect Ratio Scale Engine (Centered Centric Fitting)
    function fitSlides() {
        const container = document.getElementById('slide-container');
        if (!container) return;

        const baseWidth = 1920;
        const baseHeight = 1080;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (!windowWidth || !windowHeight) return;

        // Scale factor
        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;
        const scale = Math.min(scaleX, scaleY);

        if (isNaN(scale) || scale <= 0) return;

        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    // 5. Index Drawer Controls
    function openDrawer() {
        if (drawer) drawer.classList.remove('drawer-closed');
    }

    function closeDrawer() {
        if (drawer) drawer.classList.add('drawer-closed');
    }

    function toggleDrawer() {
        if (drawer) drawer.classList.toggle('drawer-closed');
    }

    // 6. Autoplay Systems
    function startAutoplay() {
        if (autoplayInterval) return;
        autoplayInterval = setInterval(nextSlide, autoplayDuration);
        if (playIcon) playIcon.classList.add('hidden');
        if (pauseIcon) pauseIcon.classList.remove('hidden');
        if (autoplayBtn) autoplayBtn.classList.add('active');
    }

    function stopAutoplay() {
        if (!autoplayInterval) return;
        clearInterval(autoplayInterval);
        autoplayInterval = null;
        if (playIcon) playIcon.classList.remove('hidden');
        if (pauseIcon) pauseIcon.classList.add('hidden');
        if (autoplayBtn) autoplayBtn.classList.remove('active');
    }

    function toggleAutoplay() {
        if (autoplayInterval) stopAutoplay();
        else startAutoplay();
    }

    function resetAutoplay() {
        if (autoplayInterval) {
            stopAutoplay();
            startAutoplay();
        }
    }

    // 7. Fullscreen API Wrapper with iOS and vendor fallback
    let isSoftFullscreen = false;
    function toggleFullscreen() {
        const docEl = document.documentElement;
        const app = document.getElementById('slideshow-app');
        
        const requestFs = app.requestFullscreen || 
                          app.webkitRequestFullscreen || 
                          app.mozRequestFullScreen || 
                          app.msRequestFullscreen;
        
        const exitFs = document.exitFullscreen || 
                       document.webkitExitFullscreen || 
                       document.mozCancelFullScreen || 
                       document.msExitFullscreen;

        const getFsElement = () => {
            return document.fullscreenElement || 
                   document.webkitFullscreenElement || 
                   document.mozFullScreenElement || 
                   document.msFullscreenElement;
        };
        
        const updateUI = (active) => {
            if (active) {
                if (enterFsIcon) enterFsIcon.classList.add('hidden');
                if (exitFsIcon) exitFsIcon.classList.remove('hidden');
            } else {
                if (enterFsIcon) enterFsIcon.classList.remove('hidden');
                if (exitFsIcon) exitFsIcon.classList.add('hidden');
            }
            setTimeout(fitSlides, 100);
        };

        if (requestFs && exitFs) {
            try {
                if (!getFsElement()) {
                    const promise = requestFs.call(app);
                    if (promise && promise.then) {
                        promise.then(() => updateUI(true))
                               .catch(err => {
                                   console.warn("Fullscreen request rejected. Falling back to soft-fullscreen:", err);
                                   toggleSoftFullscreen(app, updateUI);
                               });
                    } else {
                        // Older WebKit might return undefined on requestFullscreen (like older Safari/iOS)
                        // Wait a tiny bit and check if it went fullscreen. If not, trigger soft fallback.
                        setTimeout(() => {
                            if (getFsElement()) {
                                updateUI(true);
                            } else {
                                toggleSoftFullscreen(app, updateUI);
                            }
                        }, 120);
                    }
                } else {
                    const promise = exitFs.call(document);
                    if (promise && promise.then) {
                        promise.then(() => updateUI(false))
                               .catch(err => console.error("Fullscreen exit failed:", err));
                    } else {
                        updateUI(false);
                    }
                }
            } catch (err) {
                console.warn("Fullscreen request crashed. Falling back to soft-fullscreen:", err);
                toggleSoftFullscreen(app, updateUI);
            }
        } else {
            toggleSoftFullscreen(app, updateUI);
        }
    }

    function toggleSoftFullscreen(app, updateUICallback) {
        isSoftFullscreen = !isSoftFullscreen;
        if (app) {
            if (isSoftFullscreen) {
                app.classList.add('pseudo-fullscreen');
                updateUICallback(true);
            } else {
                app.classList.remove('pseudo-fullscreen');
                updateUICallback(false);
            }
        }
        setTimeout(fitSlides, 50);
    }

    // 8. Boot Guard checking readyState
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
