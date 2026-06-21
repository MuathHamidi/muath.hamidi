(function() {
    const canvas = document.getElementById('cosmicCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let width = 0;
    let height = 0;
    let particles = [];
    let sparkles = [];
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    
    // Config
    const MAX_PARTICLES = 40;
    const MAX_SPARKLES = 15;
    let rgb1 = [108, 99, 255];
    let rgb2 = [0, 210, 255];

    function parseColor(str, defaultRgb) {
        if (!str) return defaultRgb;
        const parts = str.trim().split(',').map(num => parseInt(num.trim(), 10));
        if (parts.length === 3 && parts.every(val => !isNaN(val))) {
            return parts;
        }
        return defaultRgb;
    }

    function updateThemeColors() {
        const styles = getComputedStyle(document.documentElement);
        const g1 = styles.getPropertyValue('--glow-1');
        const g2 = styles.getPropertyValue('--glow-2');
        rgb1 = parseColor(g1, [108, 99, 255]);
        rgb2 = parseColor(g2, [0, 210, 255]);
    }
    
    updateThemeColors();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Listen to theme and body animation changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'data-accent' || mutation.attributeName === 'data-theme') {
                updateThemeColors();
                if (document.body && document.body.classList.contains('no-animations')) {
                    drawStatic();
                }
            }
            if (mutation.attributeName === 'class' && mutation.target === document.body) {
                if (document.body.classList.contains('no-animations')) {
                    stopAnimation();
                    drawStatic();
                } else if (!motionQuery.matches && window.innerWidth >= 768) {
                    startAnimation();
                }
            }
        });
    });

    // We start observing body when it becomes ready or now
    if (document.body) {
        observer.observe(document.documentElement, { attributes: true });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.documentElement, { attributes: true });
            observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        });
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            canvas.style.display = 'none';
            stopAnimation();
        } else {
            canvas.style.display = 'block';
            initParticles();
            if (document.body && document.body.classList.contains('no-animations')) {
                drawStatic();
            } else {
                startAnimation();
            }
        }
    }

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * height; // Distribute initially
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + 10;
            this.size = Math.random() * 3 + 1.2;
            this.speedY = -(Math.random() * 0.25 + 0.08);
            this.speedX = (Math.random() - 0.5) * 0.1;
            this.opacity = Math.random() * 0.35 + 0.15;
            this.colorType = Math.random() > 0.5 ? 1 : 2;
            this.driftRange = Math.random() * 1.2 + 0.4;
            this.angle = Math.random() * Math.PI * 2;
            this.angleSpeed = Math.random() * 0.008 + 0.002;
        }

        update() {
            this.y += this.speedY;
            this.angle += this.angleSpeed;
            this.x += this.speedX + Math.sin(this.angle) * 0.04 * this.driftRange;

            // Parallax shift opposite to mouse
            const dx = (mouse.x - width / 2) * -0.008 * (this.size / 5);
            const dy = (mouse.y - height / 2) * -0.008 * (this.size / 5);
            
            this.tempX = this.x + dx;
            this.tempY = this.y + dy;

            if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                this.reset();
            }
        }

        draw() {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const baseOpacity = isLight ? this.opacity * 0.35 : this.opacity;
            const rgb = this.colorType === 1 ? rgb1 : rgb2;
            
            ctx.beginPath();
            const grad = ctx.createRadialGradient(
                this.tempX, this.tempY, 0,
                this.tempX, this.tempY, this.size * 2.2
            );
            grad.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${baseOpacity})`);
            grad.addColorStop(0.5, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${baseOpacity * 0.3})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = grad;
            ctx.arc(this.tempX, this.tempY, this.size * 2.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class Sparkle {
        constructor() {
            this.reset();
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5 + 0.8;
            this.opacity = 0;
            this.targetOpacity = Math.random() * 0.6 + 0.25;
            this.fadeSpeed = Math.random() * 0.008 + 0.003;
            this.state = 'fadein'; // fadein, active, fadeout
            this.rotation = Math.random() * Math.PI;
            this.rotationSpeed = (Math.random() - 0.5) * 0.008;
            this.life = Math.random() * 200 + 120;
        }

        update() {
            this.rotation += this.rotationSpeed;
            
            const dx = (mouse.x - width / 2) * -0.004 * (this.size / 2);
            const dy = (mouse.y - height / 2) * -0.004 * (this.size / 2);
            this.tempX = this.x + dx;
            this.tempY = this.y + dy;

            if (this.state === 'fadein') {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= this.targetOpacity) {
                    this.state = 'active';
                }
            } else if (this.state === 'active') {
                this.life--;
                if (this.life <= 0) {
                    this.state = 'fadeout';
                }
            } else if (this.state === 'fadeout') {
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0) {
                    this.reset();
                }
            }
        }

        draw() {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) return; // Hidden in light mode
            
            ctx.save();
            ctx.translate(this.tempX, this.tempY);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            
            ctx.moveTo(0, -this.size * 2.2);
            ctx.lineTo(this.size * 0.7, 0);
            ctx.lineTo(0, this.size * 2.2);
            ctx.lineTo(-this.size * 0.7, 0);
            ctx.closePath();
            
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffffff';
            ctx.fill();
            ctx.restore();
        }
    }

    function initParticles() {
        particles = [];
        sparkles = [];
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push(new Particle());
        }
        for (let i = 0; i < MAX_SPARKLES; i++) {
            sparkles.push(new Sparkle());
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        sparkles.forEach(s => {
            s.update();
            s.draw();
        });

        animationFrameId = requestAnimationFrame(draw);
    }

    function drawStatic() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.tempX = p.x;
            p.tempY = p.y;
            p.draw();
        });
        sparkles.forEach(s => {
            s.tempX = s.x;
            s.tempY = s.y;
            s.draw();
        });
    }

    function startAnimation() {
        if (!animationFrameId && !motionQuery.matches && (!document.body || !document.body.classList.contains('no-animations'))) {
            draw();
        }
    }

    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    window.addEventListener('resize', resize);
    
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
    });

    function handleMotionChange() {
        if (motionQuery.matches) {
            stopAnimation();
            drawStatic();
        } else {
            resize();
        }
    }
    motionQuery.addEventListener('change', handleMotionChange);

    // Initial run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleMotionChange);
    } else {
        handleMotionChange();
    }
})();
