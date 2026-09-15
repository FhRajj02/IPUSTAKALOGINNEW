# iPustaka PUA — struktur proyek

Situs ini dipisah per halaman (bukan satu file SPA) supaya gampang dibuka
dan diatur di VS Code. Buka folder ini sebagai workspace, lalu jalankan
`index.html` lewat ekstensi Live Server (atau buka langsung di browser).

## Alur situs

```
index.html (LOGIN)
  ├─ login sebagai admin (admin / 12345)  →  admin-dashboard.html
  └─ login sebagai anggota                →  menu.html (Beranda)
                                                ├─ menu-Beranda-Rekomendasi.html
                                                │    ├─ menu-Beranda-rekomendasi-matakuliah_wajib.html
                                                │    └─ menu-Beranda-rekomendasi-Matakuliah_umum.html
                                                ├─ menu-Berita.html
                                                └─ menu-rak_pinjam.html
```

## Peta file → jendela/menu

| File                                                   | Menu / cabang                                   |
|-----------------------------------------------------------|---------------------------------------------------|
| `index.html`                                               | **Login** (halaman pertama yang dibuka)            |
| `admin-dashboard.html`                                      | Dashboard Admin (tambah/hapus anggota)             |
| `menu.html`                                                 | Beranda (tampilan utama anggota)                   |
| `menu-Beranda-Rekomendasi.html`                             | Beranda → Rekomendasi                              |
| `menu-Beranda-rekomendasi-matakuliah_wajib.html`            | Beranda → Rekomendasi → Matakuliah wajib           |
| `menu-Beranda-rekomendasi-Matakuliah_umum.html`             | Beranda → Rekomendasi → Matakuliah umum            |
| `menu-Berita.html`                                          | Berita                                             |
| `menu-rak_pinjam.html`                                      | Rak Pinjam                                         |

## Login demo

- **Admin** — ID: `admin`, Password: `12345` → masuk ke `admin-dashboard.html`.
- **Anggota (bawaan/demo)** — Nama: `Anggota Demo`, Password: `demo123` → masuk ke `menu.html`.
  Anggota baru yang ditambahkan admin lewat Dashboard Admin juga bisa
  login dengan nama + password yang didaftarkan.

Nama anggota yang login akan otomatis muncul di topbar seluruh halaman
Beranda/Rekomendasi/Berita/Rak Pinjam, menggantikan nama contoh
"Muhammad Fajar Akbar Sophian".

## Menyimpan perubahan anggota secara permanen (members-data.js)

Daftar anggota "resmi" disimpan di **`members-data.js`** — file ini ikut
di-commit ke git dan ter-deploy bersama situs. Saat situs dibuka, isinya
disalin ke localStorage sebagai salinan kerja, supaya tambah/hapus anggota
di Dashboard Admin langsung terlihat tanpa reload.

Alur supaya perubahan itu **permanen** dan ikut tampil di situs live:

1. Login admin, tambah/hapus anggota seperti biasa di Dashboard Admin.
2. Scroll ke bagian **"Ekspor ke members-data.js"** — ada pratinjau kode
   dan dua tombol: **Unduh members-data.js** atau **Salin kode**.
3. Timpa (replace) file `members-data.js` di folder proyekmu dengan hasil
   unduhan/salinan tadi.
4. Di VS Code: `git add . && git commit -m "update anggota" && git push`
   (lihat bagian alur edit → push yang sudah dibahas sebelumnya).
5. Tunggu GitHub Pages selesai build ulang (biasanya 1–2 menit), situs
   live pun ikut menampilkan daftar anggota terbaru.

**Kenapa tidak otomatis push dari browser?** Push otomatis ke GitHub dari
JavaScript yang berjalan di browser butuh menyisipkan token akses GitHub
di kode yang ikut ter-publish ke repo publik — siapa pun yang membuka
situsnya bisa mengambil token itu dan memakainya untuk mengubah repo-mu.
Karena itu alurnya sengaja tetap manual: unduh/salin file, lalu kamu push
sendiri lewat git — persis seperti yang sudah kamu pahami sebelumnya.

## ⚠️ Batasan penting: ini BUKAN database sungguhan

Situs ini murni statis (HTML/CSS/JS tanpa server backend). Sebelum
di-export ulang lewat langkah di atas, tambah/hapus anggota di Dashboard
Admin hanya tersimpan di **localStorage browser kamu sendiri** — artinya:

- Perubahan yang belum di-export & di-push **tidak terlihat** oleh
  pengunjung lain — mereka masih melihat data dari `members-data.js`
  yang sedang live di GitHub Pages.
- Cocok untuk **demo/prototipe/tugas**, bukan sistem login sungguhan yang
  butuh perubahan real-time tanpa proses commit/push manual.
- Karena `members-data.js` ikut di-push ke repo publik, isinya (nama +
  password anggota) **bisa dilihat siapa saja** yang membuka repo
  GitHub-nya. Jangan taruh password sungguhan/sensitif di sini — ini
  murni simulasi antarmuka.
- Login berbasis JavaScript ini juga tidak aman secara teknis — siapa pun
  yang membuka developer tools browser bisa melihat/mengubah data ini.
- Kalau nanti butuh login & database yang sungguhan terpusat dan
  real-time (semua pengunjung berbagi data yang sama, tanpa proses
  export/push manual), situs ini perlu ditambah **backend** — misalnya
  Firebase, Supabase, atau server sendiri. Ini di luar cakupan proyek
  HTML/CSS/JS statis semata.

## Mengganti logo login

Buka `index.html`, cari komentar `<!-- Ganti logo: ... -->`. Taruh file
gambar bernama persis **`LOGO-LOGIN.png`** di folder yang sama dengan
`index.html`. Format lain (.jpg/.jpeg/.webp) juga bisa, tinggal sesuaikan
nama file di atribut `src` pada tag `<img class="login-logo">`. Kalau
file belum ada, halaman login otomatis menampilkan lambang generik
sebagai gantinya.

## File bersama (satu sumber, dipakai semua halaman)

- `style.css` — semua styling: sidebar, kartu, login, dashboard admin.
- `nav.js` — logika buka/tutup submenu sidebar (tombol panah ▸).
- `books.js` — fungsi `renderBooks()` untuk kartu sampul buku.
- `auth.js` — sesi login, "database" anggota, penjaga (guard) akses
  halaman, dan fungsi ekspor ke `members-data.js`. Dipakai oleh
  `index.html`, `admin-dashboard.html`, dan semua halaman `menu*.html`.
- `members-data.js` — daftar anggota "resmi" yang ikut di-commit ke git.
  Ditimpa manual lewat tombol unduh di Dashboard Admin (lihat bagian di
  atas).
- `covers/` — taruh file gambar sampul buku asli di sini kalau ada (lihat
  komentar di awal `books.js`).

## Menambah halaman/cabang baru

1. Salin salah satu file `menu-*.html` yang paling mirip sebagai
   titik awal (sudah termasuk guard login + personalisasi nama).
2. Ganti `<title>`, isi `<section class="view active">`, dan skrip
   data di bagian bawah `<body>`.
3. Tambahkan tautan `<a>` menu barunya di blok `<nav class="nav">`
   pada **semua** file `menu*.html`, lalu tandai `class="active"` pada
   file yang sesuai dan `class="nav-group open"` / `class="rotated"`
   pada leluhurnya supaya sidebar terbuka dengan benar.
