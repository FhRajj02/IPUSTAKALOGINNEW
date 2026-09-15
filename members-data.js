// members-data.js — "database" anggota, dikelola manual lewat Dashboard Admin.
//
// Ini BUKAN database sungguhan (lihat README.md) — cuma array JavaScript
// biasa yang ikut di-deploy bareng situs. Supaya perubahan (tambah/hapus
// anggota) yang dibuat lewat Dashboard Admin ikut tersimpan permanen dan
// ikut tampil di situs live (GitHub Pages), admin perlu:
//
//   1. Login admin, tambah/hapus anggota seperti biasa di Dashboard Admin.
//   2. Klik "Unduh members-data.js" di Dashboard Admin.
//   3. Timpa (replace) file ini dengan file hasil unduhan tadi.
//   4. git add . && git commit -m "update anggota" && git push
//   5. Tunggu GitHub Pages selesai build ulang (biasanya 1-2 menit),
//      lalu situs live pun ikut menampilkan daftar anggota terbaru.
//
// Sebelum di-export ulang, perubahan yang dibuat di Dashboard Admin HANYA
// tersimpan sementara di localStorage browser kamu — belum permanen dan
// belum ter-deploy ke pengunjung lain.

// members-data.js — "database" anggota, dikelola manual lewat Dashboard Admin.
// Lihat README.md untuk cara pakai file ini (unduh, timpa, lalu git push).

const membersData = [
  { name: "Anggota Demo", password: "demo123" },
  { name: "Fajar", password: "Fajar" },
  { name: "Khairan", password: "Khairan" },
  { name: "Umar", password: "Umar" }
];

