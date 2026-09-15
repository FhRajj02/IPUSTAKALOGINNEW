// nav.js — perilaku sidebar yang dipakai bersama di semua halaman.
// Klik tombol panah (▸) untuk membuka/menutup submenu tanpa berpindah
// halaman. Klik teks menu (mis. "Beranda" atau "Rekomendasi") untuk
// benar-benar membuka halaman tersebut.
//
// Status "aktif" dan "terbuka" pada setiap menu sudah ditulis langsung
// di masing-masing file .html (lihat class="active" / class="nav-group open"),
// jadi tidak perlu disimpan lewat JavaScript di sini.

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const group = btn.closest('.nav-group');
      if (!group) return;
      const chevron = btn.querySelector('.nav-chevron');
      const willOpen = !group.classList.contains('open');
      group.classList.toggle('open', willOpen);
      if (chevron) chevron.classList.toggle('rotated', willOpen);
    });
  });
});
