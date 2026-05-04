// ==========================================
// KONFIGURASI SUPABASE (HANYA BOLEH ADA 1X)
// ==========================================
const SUPABASE_URL = 'https://ogrboadxaeymeqsksdau.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncmJvYWR4YWV5bWVxc2tzZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NzczNDAsImV4cCI6MjA5MTQ1MzM0MH0.liLIar3JdLuYq2ni0ANKHL4z0MJ8mP01MVS9eEt3EoUeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncmJvYWR4YWV5bWVxc2tzZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NzczNDAsImV4cCI6MjA5MTQ1MzM0MH0.liLIar3JdLuYq2ni0ANKHL4z0MJ8mP01MVS9eEt3EoU';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// LOGIKA LOGIN
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  const alertArea = document.getElementById('alertArea');
  const btnLogin = document.getElementById('btnLogin');

  // Cek sesi aktif
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = 'dashboard.html';
    return;
  }

  // Fungsi notifikasi
  function showAlert(msg, type = 'danger') {
    alertArea.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show">${msg}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
  }

  // Handle submit login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    btnLogin.disabled = true;
    btnLogin.textContent = 'Memproses...';
    alertArea.innerHTML = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      showAlert('Berhasil! Mengalihkan...', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 1000);
    } catch (err) {
      showAlert(err.message || 'Email/password salah.');
      btnLogin.disabled = false;
      btnLogin.textContent = 'Masuk';
    }
  });
});

// Fungsi logout global
window.logout = async () => {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
};
