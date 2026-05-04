// ⚠️ GANTI DUA BARIS INI DENGAN DATA SUPABASE ANDA
const SUPABASE_URL = 'https://ogrboadxaeymeqsksdau.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncmJvYWR4YWV5bWVxc2tzZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NzczNDAsImV4cCI6MjA5MTQ1MzM0MH0.liLIar3JdLuYq2ni0ANKHL4z0MJ8mP01MVS9eEt3EoU';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('loginForm');
  if (!form) return;
  
  const {  { session } } = await supabase.auth.getSession();
  if (session) window.location.href = 'dashboard.html';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btnLogin');
    const alert = document.getElementById('alertArea');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    btn.disabled = true;
    btn.textContent = '...';
    alert.innerHTML = '';

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
      btn.disabled = false;
      btn.textContent = 'Masuk';
    } else {
      alert.innerHTML = `<div class="alert alert-success">Berhasil!</div>`;
      setTimeout(() => window.location.href = 'dashboard.html', 800);
    }
  });
});

window.logout = () => { supabase.auth.signOut(); window.location.href = 'index.html'; };
