// Optional: simple tap animation for tiles
document.querySelectorAll('.tile').forEach(t => {
  t.addEventListener('click', () => {
    t.style.transform = 'scale(0.96)';
    setTimeout(() => { t.style.transform = 'scale(1)'; }, 120);
  });
});
