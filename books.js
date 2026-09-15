// books.js — kartu sampul buku bergaya katalog perpustakaan.
// Dipakai bersama oleh: menu-Beranda-Rekomendasi.html,
// menu-Beranda-rekomendasi-matakuliah_wajib.html, dan
// menu-Beranda-rekomendasi-Matakuliah_umum.html.
//
// COVER BUKU ASLI — cara pakai di VS Code:
// 1. Buat folder "covers" di lokasi yang sama dengan file HTML.
// 2. Simpan file gambar sampul di folder itu dengan nama file yang SAMA
//    PERSIS seperti nilai `cover` pada buku yang bersangkutan.
// 3. Format gambar bebas (.jpg/.jpeg/.png/.webp) — sesuaikan saja
//    ekstensi pada nilai `cover` dengan file yang kamu punya.
// 4. Kalau file belum ada, kartu otomatis memakai desain sampul buatan
//    (judul + nomor panggil ala katalog perpustakaan).

const bookMarkSvg = `<svg class="book-mark" viewBox="0 0 24 24" fill="none" stroke="#F8F5EE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5c3-1.5 6-1.5 8 0v14c-2-1.5-5-1.5-8 0z"/><path d="M20 5c-3-1.5-6-1.5-8 0v14c2-1.5 5-1.5 8 0z"/></svg>`;

function renderBooks(list, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  list.forEach(function (b) {
    const el = document.createElement('div');
    el.className = 'book-card';
    el.setAttribute('aria-label', `${b.title}, ${b.author}`);
    const imgTag = b.cover
      ? `<img class="book-cover-img" src="${b.cover}" alt="Sampul ${b.title}" onerror="this.remove()">`
      : '';
    el.innerHTML = `
      <div class="book-cover" style="background:${b.color}">
        ${bookMarkSvg}
        <p class="book-cover-title">${b.title}</p>
        ${imgTag}
        <span class="book-call">${b.call}</span>
      </div>
      <p class="book-author">${b.author}</p>
    `;
    grid.appendChild(el);
  });
}
