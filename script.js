/* ==========================================================================
   1. DYNAMIC GREETING (Sapaan Berdasarkan Waktu)
   ========================================================================== */
const greetingElement = document.getElementById('greeting');
const hour = new Date().getHours();
let greetingText = "Hi There,";

// Mengatur ucapan (dalam bahasa Inggris agar senada dengan teks di HTML)
if (hour >= 5 && hour < 11) greetingText = "Good Morning,";
else if (hour >= 11 && hour < 15) greetingText = "Good Afternoon,";
else if (hour >= 15 && hour < 18) greetingText = "Good Evening,";
else greetingText = "Good Night,";

// Memastikan elemen ada sebelum mengubah teksnya
if (greetingElement) {
    greetingElement.innerText = greetingText;
}

/* ==========================================================================
   2. SCROLL REVEAL ANIMATION (Efek Muncul saat di-Scroll)
   ========================================================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" 
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

/* ==========================================================================
   3. DARK MODE TOGGLE (Sakelar Late Night Vibe)
   ========================================================================== */
const themeBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

if (themeBtn) {
    const themeIcon = themeBtn.querySelector('i');
    
    themeBtn.addEventListener('click', () => {
        // Toggle (tambah/hapus) class 'dark-mode' pada body
        bodyElement.classList.toggle('dark-mode');
        
        // Ganti icon Bulan menjadi Matahari dan sebaliknya
        if (bodyElement.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
}

/* ==========================================================================
   4. VIBE CHECK SWITCHER (Ganti Playlist Spotify)
   ========================================================================== */
const vibeButtons = document.querySelectorAll('.vibe-btn');
const spotifyPlayer = document.getElementById('spotify-player');

// Pastikan tombol dan iframe spotify ada di halaman
if (vibeButtons.length > 0 && spotifyPlayer) {
    vibeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Hapus class 'active' dari semua tombol
            vibeButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. Tambahkan class 'active' ke tombol yang baru diklik
            button.classList.add('active');
            
            // 3. Ambil ID playlist baru dari atribut data-playlist
            const newPlaylistId = button.getAttribute('data-playlist');
            
            // 4. Efek fade out sementara agar transisi mulus
            spotifyPlayer.style.opacity = 0;
            
            // 5. Tunggu 300ms, ganti linknya, lalu munculkan lagi (fade in)
            setTimeout(() => {
                spotifyPlayer.src = `https://open.spotify.com/embed/playlist/${newPlaylistId}?utm_source=generator&theme=0`;
                spotifyPlayer.style.opacity = 1;
            }, 300);
        });
    });
}

// 6. Fitur Interactive Particles (Latar Belakang Bergerak)
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#c5a059" }, // Warna emas sesuai tema
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#c5a059",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 }
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": { "enable": true, "mode": "grab" }, // Partikel menyatu ke kursor saat di-hover
            "onclick": { "enable": true, "mode": "push" }
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

const cat = document.getElementById('virtual-cat');
const pupils = document.querySelectorAll('.pupil');
let sleepTimer;

if (cat && pupils.length > 0) {
    // Fungsi untuk membangunkan kucing
    const wakeUpCat = () => {
        cat.classList.remove('sleeping');
        clearTimeout(sleepTimer);
        
        // Kucing akan tidur lagi setelah didiamkan 4 detik
        sleepTimer = setTimeout(() => {
            cat.classList.add('sleeping');
        }, 4000); 
    };

    // Event: Mata ngikutin kursor
    document.addEventListener('mousemove', (e) => {
        wakeUpCat();
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        pupils.forEach(pupil => {
            // Mendapatkan posisi tengah mata kucing
            const rect = pupil.parentElement.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;

            // Menghitung sudut arah kursor
            const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
            
            // Menentukan seberapa jauh pupil boleh bergerak (maksimal 4px)
            const distance = Math.min(4, Math.hypot(mouseX - eyeX, mouseY - eyeY) / 15);

            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            // Menggerakkan pupil
            pupil.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Event: Kalau kucingnya diklik
    cat.addEventListener('click', () => {
        wakeUpCat();
        cat.classList.add('meowing');
        
        // Menghapus efek lompat dan meow setelah 1 detik
        setTimeout(() => {
            cat.classList.remove('meowing');
        }, 1000);
    });

    // Jalankan timer tidur pertama kali web dibuka
    wakeUpCat();
}