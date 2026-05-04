// ==========================================
// ️ KONFIGURASI SUPABASE
// Ganti dengan URL & ANON KEY dari project Anda
// ==========================================
const SUPABASE_URL = 'https://ogrboadxaeymeqsksdau.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncmJvYWR4YWV5bWVxc2tzZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NzczNDAsImV4cCI6MjA5MTQ1MzM0MH0.liLIar3JdLuYq2ni0ANKHL4z0MJ8mP01MVS9eEt3EoUeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncmJvYWR4YWV5bWVxc2tzZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NzczNDAsImV4cCI6MjA5MTQ1MzM0MH0.liLIar3JdLuYq2ni0ANKHL4z0MJ8mP01MVS9eEt3EoU';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// 🔐 LOGIKA HALAMAN LOGIN (index.html)
// ==========================================
const loginForm = document.getElementById('loginForm');
const alertArea = document.getElementById('alertArea');
const btnLogin = document.getElementById('btnLogin');

// Cek sesi saat halaman dimuat
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    // User sudah login, langsung arahkan ke dashboard
    window.location.href = 'dashboard.html';
  }
}

// Tampilkan notifikasi
function showAlert(message, type = 'danger') {
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
    
    // UI Loading
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

// ==========================================
// 🌍 FUNGSI GLOBAL (Dipakai di halaman lain)
// ==========================================
window.logout = async function() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
};

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  checkSession();
});