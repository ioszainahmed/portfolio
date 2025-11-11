// Update time display
function updateTime() {
  const timeElement = document.getElementById('time');
  if (timeElement) {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    timeElement.textContent = timeString;
  }
}

// Update time immediately and then every minute
updateTime();
setInterval(updateTime, 60000);

// Optional: simple tap animation for tiles
document.querySelectorAll('.tile').forEach(t => {
  t.addEventListener('click', () => {
    t.style.transform = 'scale(0.96)';
    setTimeout(() => { t.style.transform = 'scale(1)'; }, 120);
  });
});
