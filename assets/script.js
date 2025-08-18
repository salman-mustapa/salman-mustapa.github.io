// ==========================
// 1. Initialize AOS (Animation On Scroll)
// ==========================
AOS.init({
    duration: 800, // durasi animasi
    once: true,    // animasi hanya jalan sekali
});

// ==========================
// 2. Smooth Scroll ketika klik anchor link (#)
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - (window.innerWidth > 768 ? 80 : 100),
            behavior: 'smooth'
        });
    });
});

// ==========================
// 3. Navbar Bottom → Active Link ketika diklik
// ==========================
document.querySelectorAll('.navbar-bottom .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.navbar-bottom .nav-link')
            .forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ==========================
// 4. Navbar Top → Highlight Active Link saat scroll (Intersection Observer)
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar-top .nav-link");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute("id");
                const navLink = document.querySelector(`.navbar-top .nav-link[href="#${id}"]`);

                if (entry.isIntersecting) {
                    navLinks.forEach((link) => link.classList.remove("active"));
                    if (navLink) navLink.classList.add("active");
                }
            });
        },
        { threshold: 0.5 } // aktif saat 50% section terlihat
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});
// ==========================
// 4b. Navbar Bottom → Highlight Active Link saat scroll (Intersection Observer)
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinksBottom = document.querySelectorAll(".navbar-bottom .nav-link");

    const observerBottom = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute("id");
                const navLink = document.querySelector(`.navbar-bottom .nav-link[href="#${id}"]`);

                if (entry.isIntersecting) {
                    navLinksBottom.forEach((link) => link.classList.remove("active"));
                    if (navLink) navLink.classList.add("active");
                }
            });
        },
        { threshold: 0.5 } // aktif saat 50% section terlihat
    );

    sections.forEach((section) => {
        observerBottom.observe(section);
    });
});

// ==========================
// 5. Contact Form → Kirim ke WhatsApp
// ==========================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Format pesan
    const text = `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`;
    const encodedText = encodeURIComponent(text);

    // Nomor WA tujuan
    const waNumber = '6282154488769';
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, '_blank');
});

// ==========================
// 6. Certificate Modal (Preview Sertifikat)
// ==========================
function openCertificateModal(title, year, expired, description, file, isPdf = false) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalYear").innerText = year;
    document.getElementById("modalExpired").innerText = expired;
    document.getElementById("modalDescription").innerText = description;

    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = isPdf 
      ? `<iframe src="${file}" class="w-full h-96 rounded-md"></iframe>`
      : `<img src="${file}" alt="${title}" class="mx-auto rounded-md max-h-64 object-contain" />`;

    document.getElementById("certificateModal").classList.remove("hidden");
}

function closeCertificateModal() {
    document.getElementById("certificateModal").classList.add("hidden");
}

// ==========================
// 7. PDF.js → Render Thumbnail Sertifikat (halaman pertama PDF)
// ==========================
const url = "assets/sertifikat/test.pdf";
const canvas = document.getElementById("thumb1");
const context = canvas.getContext("2d");

pdfjsLib.getDocument(url).promise.then(pdf => {
    pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 0.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({ canvasContext: context, viewport: viewport });
    });
});