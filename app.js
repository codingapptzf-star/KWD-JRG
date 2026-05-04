// ==========================================
// KONFIGURASI SUPABASE
// Ganti dengan data project Anda
// ==========================================
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// Inisialisasi client (hanya sekali)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// LOGIKA HALAMAN LOGIN (index.html)
// ==========================================
const loginForm = document.getElementById('loginForm');
const alertArea = document.getElementById('alertArea');
const btnLogin = document.getElementById('btnLogin');

// Cek sesi saat halaman dimuat
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = 'dashboard.html';
  }
}

// Tampilkan notifikasi
function showAlert(message, type = 'danger') {
  if (!alertArea) return;
  alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
      <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2"></i>${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

// Handle Submit Login
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btnLogin.disabled = true;
    btnLogin.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses...';
    alertArea.innerHTML = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showAlert(error.message);
      btnLogin.disabled = false;
      btnLogin.textContent = 'Masuk';
    } else {
      showAlert('Berhasil masuk! Mengalihkan...', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 800);
    }
  });
}

// Fungsi logout global
window.logout = async function() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
};

// Jalankan cek sesi
document.addEventListener('DOMContentLoaded', checkSession);
