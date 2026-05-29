document.addEventListener("DOMContentLoaded", () => {
    // ---- LOADING SCREEN + REVEAL ----
    const loader = document.getElementById("tva-loader");
    const mainContent = document.getElementById("mainContent");
    
    // Simulate temporal sync + GSAP reveal
    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: () => {
                loader.style.display = "none";
                gsap.to(mainContent, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                });
                // trigger scroll animations after reveal
                initScrollAnimations();
            }
        });
    }, 1900); // 1.9 seconds loader
    
    // ---- LIVE CLOCK (Temporal display) ----
    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
        const clockSpan = document.getElementById("liveClock");
        if (clockSpan) clockSpan.innerText = timeStr;
    }
    updateClock();
    setInterval(updateClock, 1000);
    
    // ---- FORM HANDLER (TVA Message Transmission) ----
    const contactForm = document.getElementById("tvaMessageForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("formName")?.value || "Variant";
            alert(`📟 TRANSMISSION SENT, ${name}. The TVA will review your message across timelines.`);
            contactForm.reset();
        });
    }
    
    // ---- SPOTIFY MUSIC BUTTON (Play Sempurnanya Aku by NPD) ----
    // ---- MUSIC PLAYER (LANGSUNG PLAY LAGU LOKAL) ----
const audioPlayer = document.getElementById('tvaAudio');
const playBtn = document.getElementById('audioPlayBtn');
const playIcon = document.getElementById('playPauseIcon');
let isPlaying = false;

// Fungsi untuk memutar/menghentikan lagu
function toggleAudio() {
    if (!audioPlayer) return;
    
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.textContent = '▶';
        playBtn.innerHTML = '<span id="playPauseIcon">▶</span> PLAY';
        isPlaying = false;
    } else {
        // Coba mainkan, jika gagal karena file tidak ada
        audioPlayer.play().then(() => {
            playIcon.textContent = '⏸';
            playBtn.innerHTML = '<span id="playPauseIcon">⏸</span> PAUSE';
            isPlaying = true;
        }).catch(error => {
            console.warn('Gagal memutar lagu lokal:', error);
            alert('File lagu "sempurnanya-aku-npd.mp3" tidak ditemukan.\nPastikan file tersebut ada di folder yang sama dengan website ini.\n\nAtau Anda bisa mencari lagu di Spotify.');
            // Opsional: fallback ke Spotify
            const query = encodeURIComponent("Sempurnanya Aku NPD");
            window.open(`https://open.spotify.com/search/${query}`, "_blank");
        });
    }
}

if (playBtn) {
    playBtn.addEventListener('click', toggleAudio);
}

// Optional: hentikan lagu saat halaman ditutup atau pindah section? Tidak perlu.
    
    // ---- SMOOTH SCROLL (Nav links) ----
    document.querySelectorAll('.nav-links a, .tva-button.primary-btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== "#" && targetId.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
    
    // ---- INITIALIZE GSAP Scroll Animations (fade-up, timeline events) ----
    function initScrollAnimations() {
        // register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Fade-up for all sections
        gsap.utils.toArray(".section").forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            });
        });
        
        // special animation for project cards
        gsap.utils.toArray(".project-card").forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                },
                scale: 0.95,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1,
            });
        });
        
        // timeline events stagger
        gsap.utils.toArray(".timeline-event").forEach((event, idx) => {
            gsap.from(event, {
                scrollTrigger: {
                    trigger: event,
                    start: "top 85%"
                },
                x: -20,
                opacity: 0,
                duration: 0.6,
                delay: idx * 0.15,
            });
        });
        
        // skills cards hover independent fine, but appear animation
        gsap.from(".skill-card", {
            scrollTrigger: {
                trigger: ".skills-grid",
                start: "top 85%"
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08
        });
    }
    
    // Optional: prevent flash before GSAP
    if (loader.style.display === "none") {
        initScrollAnimations();
    }
    
    // Extra retro cursor effect (dot glow on links)
    const links = document.querySelectorAll("a, button");
    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            link.style.transition = "all 0.1s";
        });
    });
    
    // add small console greeting (TVA boot)
    console.log("%c⏱️ TVA PORTFOLIO LOADED | Variant Vandjalu - Timeline active", "color: #C98A6B; font-size: 14px; font-family: monospace;");
    
    // Hover effect on cards (manual already in css)
    // Add scanline monitor effect dynamic: no additional needed.
});
