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
// 6. Blog
// ==========================

let currentPage = 1;
const perPage = 3;
let blogs = [];

// Fetch blogs from JSON
fetch("assets/data/blogs.json")
  .then(res => res.json())
  .then(data => {
    blogs = data;
    renderBlogs();
  });

// Render blog cards
function renderBlogs() {
  const start = 0;
  const end = currentPage * perPage;
  const visibleBlogs = blogs.slice(0, end);

  const grid = document.getElementById("blogGrid");
  grid.innerHTML = "";

  visibleBlogs.forEach(blog => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition";
    card.innerHTML = `
      <div class="h-48 bg-gray-200 overflow-hidden">
        <img src="${blog.thumbnail}" alt="${blog.title}" class="cover w-full h-full" />
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-1">${blog.title}</h3>
        <p class="text-gray-500 text-sm mb-2">${blog.date} • ${blog.author}</p>
        <p class="text-gray-600 text-sm">${blog.description}</p>
        <a href="${blog.url}" target="_blank" type="button"
              class="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">Baca Selengkapnya</a>
      </div>
    `;
    card.addEventListener("click", () => openBlogModal(blog));
    grid.appendChild(card);
  });

  // Hide "Show More" if all shown
  if (end >= blogs.length) {
    document.getElementById("loadMoreBtn").style.display = "none";
  }
}

// Load more button
document.getElementById("loadMoreBtn").addEventListener("click", () => {
  currentPage++;
  renderBlogs();
});


// ==========================
// 7. Experience
// ==========================
const LIMIT = 3;
let current = 0;
let experiences = [];

function renderExperiences() {
    const container = document.getElementById('timeline');
    container.innerHTML = '';

    const visible = experiences.slice(0, current);
    visible.forEach((exp, index) => {
    const side = index % 2 === 0 ? 'timeline-left' : 'timeline-right';
    const aos = index % 2 === 0 ? 'fade-right' : 'fade-left';
    const tasks = exp.tasks.map(t => `<li>${t}</li>`).join('');

    container.innerHTML += `
        <div class="timeline-item relative flex justify-${index % 2 === 0 ? 'start' : 'end'} items-start" data-aos="${aos}" data-aos-delay="${index * 100}">
        <div class="timeline-dot"></div>
        <div class="timeline-card ${side}">
            <h3 class="text-xl font-bold text-blue-700">${exp.position}</h3>
            <p class="text-gray-500 text-sm mb-2">${exp.company} • ${exp.period}</p>
            <ul class="list-disc list-inside text-gray-700 mb-3">${tasks}</ul>
            <div class="bg-gray-100 border rounded-lg p-3 text-sm text-gray-700">
            <span class="font-semibold">Contact:</span> ${exp.contact_name}
            <a href="${exp.contact_link}" class="text-blue-600 font-medium hover:underline" target="_blank">
                ${exp.contact_phone}
            </a>
            </div>
        </div>
        </div>
    `;
    });

    document.getElementById('load-more').style.display =
    current >= experiences.length ? 'none' : 'inline-block';
}

fetch('assets/data/experiences.json')
    .then(res => res.json())
    .then(data => {
    experiences = data;
    current = LIMIT;
    renderExperiences();
    })
    .catch(err => console.error('Gagal memuat pengalaman:', err));

document.getElementById('load-more').addEventListener('click', () => {
    current += LIMIT;
    renderExperiences();
});


// ==========================
// 8. Projects
// ==========================

const projectContainer = document.getElementById('project-list');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

// 🔹 Load projects.json
fetch('assets/data/projects.json')
    .then(res => res.json())
    .then(projects => {
    projectContainer.innerHTML = projects.map((p, i) => `
        <div class="project-card bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden" data-aos="fade-up" data-aos-delay="${i * 100}">
        <img src="${p.image}" alt="${p.title}" class="w-full h-48 object-cover bg-gray-100" onerror="this.onerror=null;this.src='assets/img/gambar-default.png';" />
        <div class="p-6">
            <h3 class="text-xl font-semibold text-blue-700 mb-2">${p.title}</h3>
            <p class="text-gray-600 mb-3">${p.description}</p>
            <button onclick="openProjectModal('${p.id}')" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Lihat Detail</button>
        </div>
        </div>
    `).join('');

    // Simpan ke window agar mudah diakses saat buka modal
    window.projectsData = projects;
    })
    .catch(err => {
    console.error('Gagal memuat projects.json:', err);
    projectContainer.innerHTML = `<p class='text-center text-red-500'>Gagal memuat proyek 😔</p>`;
    });

// 🔹 Fungsi buka modal
function openProjectModal(id) {
    const p = window.projectsData.find(x => x.id === id);
    if (!p) return;

    modalContent.innerHTML = `
    <img src="${p.image}" alt="${p.title}" class="w-full max-h-[400px] object-cover rounded-xl mb-6 bg-gray-100" onerror="this.onerror=null;this.src='assets/img/gambar-default.png';" />
    <h3 class="text-2xl font-bold text-blue-700 mb-2">${p.title}</h3>
    <p class="text-gray-700 mb-3">${p.details}</p>
    <p class="text-gray-600 text-sm mb-4"><strong>Teknologi:</strong> ${p.tech}</p>
    <div class="flex gap-3">
        <a href="${p.preview_url}" target="_blank" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Lihat Demo</a>
        <a href="${p.source_url}" target="_blank" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition">Lihat Source</a>
    </div>
    `;
    modal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });


// ==========================
// 9. Education
// ==========================
fetch("assets/data/education.json")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("education-list");

        container.innerHTML = data.map((edu, index) => `
          <div class="relative flex flex-col md:flex-row md:items-start" data-aos="fade-up" data-aos-delay="${index * 100}">
            
            <!-- Titik timeline -->
            <div class="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full w-7 h-7 shadow-md z-10">
              <i class="fas fa-graduation-cap text-xs"></i>
            </div>

            <!-- Konten -->
            <div class="w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-20 md:ml-auto' : 'md:pr-20 md:mr-auto'}">
              <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-blue-50">
                <h3 class="text-xl font-semibold text-blue-700">${edu.degree}</h3>
                <p class="text-gray-500">${edu.institution}, ${edu.year}</p>

                <ul class="mt-3 space-y-2 text-gray-700">
                  ${edu.details.map(detail => `
                    <li>
                      <strong>${detail.label}:</strong> 
                      ${detail.value ? detail.value : ''}
                      ${detail.subitems ? `
                        <ul class="list-disc list-inside ml-4 mt-1 text-gray-600">
                          ${detail.subitems.map(sub => `
                            <li><span class="font-medium">${sub.name}</span> – ${sub.role}</li>
                          `).join('')}
                        </ul>
                      ` : ''}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `).join('');
      })
      .catch(err => {
        console.error("Gagal memuat education.json:", err);
        document.getElementById("education-list").innerHTML =
          `<p class='text-center text-red-500'>Gagal memuat data pendidikan 😔</p>`;
      });

// ==========================
// 10. Certificate Modal (Preview Sertifikat)
// ==========================
function openCertificateModal(title, year, expired, description, file, isPdf = false) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalYear").innerText = year;
  document.getElementById("modalExpired").innerText = expired;
  document.getElementById("modalDescription").innerText = description;

  const modalContent = document.getElementById("modalContent");
  const downloadLink = document.getElementById("downloadLink");

  const fileUrl = file.startsWith("http")
    ? file
    : `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, "/")}${file.replace(/^\.\//, "")}`;

  if (isPdf) {
    modalContent.innerHTML = `
      <iframe src="${fileUrl}" class="w-full h-96 rounded-md border border-gray-200 shadow-md"></iframe>
    `;
  } else {
    modalContent.innerHTML = `
      <img src="${fileUrl}" alt="${title}" class="mx-auto rounded-md max-h-96 object-contain shadow-md" />
    `;
  }

  downloadLink.href = fileUrl;
  downloadLink.download = title.replace(/\s+/g, "_");

  document.getElementById("certificateModal").classList.remove("hidden");
}

function closeCertificateModal() {
  document.getElementById("certificateModal").classList.add("hidden");
}

// ==========================
// 10b. Load Certificates (aman dari error)
// ==========================
async function loadCertificates() {
  try {
    const response = await fetch("assets/data/certificates.json");
    const data = await response.json();

    const container = document.getElementById("skillsCertificateGrid");
    container.innerHTML = "";

    data.forEach(cert => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition";
      card.onclick = () =>
        openCertificateModal(
          cert.title,
          cert.release,
          cert.expired,
          cert.description,
          cert.file,
          cert.isPdf
        );

      card.innerHTML = `
        <div class="flex items-center justify-between">
          <h4 class="font-semibold text-gray-800 text-lg">${cert.title}</h4>
          <span class="text-sm text-gray-500">Berlaku s/d ${cert.expired}</span>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Gagal memuat data sertifikat:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadCertificates);

// ==========================
// 11. Optional Thumbnail PDF.js (aman & tidak ganggu)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("thumb1");
  if (!canvas || typeof pdfjsLib === "undefined") return; // ✅ aman

  pdfjsLib.getDocument(url).promise
    .then(pdf => pdf.getPage(1))
    .then(page => {
      const viewport = page.getViewport({ scale: 0.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext: context, viewport });
    })
    .catch(err => console.warn("PDF.js tidak aktif:", err.message));
});

