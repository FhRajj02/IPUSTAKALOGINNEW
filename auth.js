// auth.js — sesi login & "database" anggota.
//
// PENTING — batasan yang perlu kamu tahu:
// Situs ini murni statis (tanpa server/backend sungguhan). Daftar anggota
// "resmi" disimpan di members-data.js (ikut di-commit ke git & ter-deploy),
// tapi begitu situs dibuka, salinan kerja anggota disimpan sementara di
// localStorage BROWSER MASING-MASING ORANG supaya tambah/hapus anggota di
// Dashboard Admin langsung terlihat tanpa reload. Artinya:
//   - Tambah/hapus anggota di Dashboard Admin BELUM permanen sampai kamu
//     klik "Unduh members-data.js", timpa file itu di proyekmu, lalu
//     commit & push manual ke GitHub (lihat komentar di members-data.js).
//   - Sebelum di-push, perubahan itu hanya ada di browser kamu sendiri —
//     pengunjung lain masih melihat data lama dari members-data.js yang
//     sedang live.
//   - Ini cocok untuk DEMO/PROTOTIPE, bukan sistem login terpusat
//     sungguhan. Untuk itu, situs statis ini perlu ditambah backend
//     (mis. Firebase, Supabase, atau server sendiri).
// Login berbasis JS seperti ini juga TIDAK aman secara teknis (siapa pun
// yang mengerti developer tools browser bisa melihat/mengubah data ini,
// dan karena members-data.js ikut di-push ke repo publik, isinya bisa
// dilihat siapa saja yang membuka repo GitHub-nya) — jangan dipakai untuk
// password/data sungguhan yang sensitif.
//
// Catatan soal "push otomatis": auth.js sengaja TIDAK mencoba push ke
// GitHub langsung dari browser. Itu butuh menyisipkan token akses GitHub
// di kode yang ikut ter-publish ke repo publik — siapa pun yang membuka
// situsnya bisa mengambil token itu dan memakainya. Makanya alurnya tetap
// unduh file lalu kamu push manual sendiri lewat git/VS Code.

const AUTH_ADMIN = { id: "admin", password: "12345" };
const MEMBERS_KEY = "ipustaka_members";
const SESSION_KEY = "ipustaka_session";

function getMembers() {
  const raw = localStorage.getItem(MEMBERS_KEY);
  if (!raw) {
    const seed = (typeof membersData !== "undefined") ? membersData.slice() : [];
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveMembers(list) {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(list));
}

// Membentuk isi file members-data.js dari daftar anggota saat ini.
function generateMembersDataJs(members) {
  const lines = members.map(function (m) {
    return "  { name: " + JSON.stringify(m.name) + ", password: " + JSON.stringify(m.password) + " }";
  });
  return (
    "// members-data.js — \"database\" anggota, dikelola manual lewat Dashboard Admin.\n" +
    "// Lihat README.md untuk cara pakai file ini (unduh, timpa, lalu git push).\n\n" +
    "const membersData = [\n" +
    lines.join(",\n") +
    "\n];\n"
  );
}

// Memicu unduhan file members-data.js berisi daftar anggota saat ini.
function downloadMembersDataJs() {
  const content = generateMembersDataJs(getMembers());
  const blob = new Blob([content], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "members-data.js";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function initials(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// Dipanggil di halaman yang mewajibkan login (menu*.html).
// Mengembalikan session kalau ada, atau mengarahkan ke halaman login.
function requireSession(redirectTo) {
  const session = getSession();
  if (!session) {
    window.location.href = redirectTo || "index.html";
    return null;
  }
  return session;
}

// Mengisi nama & inisial avatar di topbar, dan memasang tombol logout.
function applySessionToPage(session, logoutRedirect) {
  if (!session) return;
  const nameEl = document.querySelector(".user-name");
  const avatarEl = document.querySelector(".avatar");
  if (nameEl) nameEl.textContent = session.name;
  if (avatarEl) avatarEl.textContent = initials(session.name);
  const logoutEl = document.querySelector(".user-logout");
  if (logoutEl) {
    logoutEl.style.cursor = "pointer";
    logoutEl.addEventListener("click", function (e) {
      e.preventDefault();
      clearSession();
      window.location.href = logoutRedirect || "index.html";
    });
  }
}
