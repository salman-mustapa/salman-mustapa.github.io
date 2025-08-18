
// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
});

// Smooth Scroll
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

// Add active class to bottom nav link on click
document.querySelectorAll('.navbar-bottom .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.navbar-bottom .nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

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
    { threshold: 0.5 } // 50% dari section terlihat baru dianggap aktif
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Gabung pesan
    const text = `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`;
    const encodedText = encodeURIComponent(text);

    const waNumber = '6282154488769'; // Nomor WA tujuan
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, '_blank');
});

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