document.getElementById('spinBtn').addEventListener('click', e => {
  e.preventDefault();
  const wheel = document.getElementById('wheel');
  wheel.style.transform = 'rotate(1440deg)';
  setTimeout(() => location.href = '/spin', 800);
});