const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
revealElements.forEach(el => observer.observe(el));

const heartsContainer = document.querySelector('.hearts');
function createHeart() {
  const heart = document.createElement('span');
  heart.textContent = Math.random() > 0.35 ? '♡' : '♥';
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${14 + Math.random() * 26}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  heart.style.opacity = `${0.22 + Math.random() * 0.45}`;
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}
setInterval(createHeart, 550);
for (let i = 0; i < 10; i++) setTimeout(createHeart, i * 180);

const messageButtons = document.querySelectorAll('.message-btn');
const specialMessage = document.getElementById('specialMessage');
messageButtons.forEach(button => {
  button.addEventListener('click', () => {
    specialMessage.textContent = button.dataset.message;
    specialMessage.animate([
      { transform: 'scale(.98)', opacity: .6 },
      { transform: 'scale(1)', opacity: 1 }
    ], { duration: 260, easing: 'ease-out' });
  });
});

const songFile = document.getElementById('songFile');
const audioPlayer = document.getElementById('audioPlayer');
songFile.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  audioPlayer.src = URL.createObjectURL(file);
  audioPlayer.play().catch(() => {});
});

const counter = document.getElementById('loveCounter');
const startDate = new Date(2026, 4, 30); // 30/05/2026
function updateLoveCounter() {
  const now = new Date();
  if (now < startDate) {
    counter.textContent = 'Muy pronto comenzará oficialmente nuestro contador de amor ♡';
    return;
  }
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();

  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += previousMonth;
    months--;
  }
  if (months < 0) { months += 12; years--; }

  const parts = [];
  if (years > 0) parts.push(`${years} año${years !== 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mes${months !== 1 ? 'es' : ''}`);
  parts.push(`${days} día${days !== 1 ? 's' : ''}`);
  parts.push(`${hours} hora${hours !== 1 ? 's' : ''}`);
  parts.push(`${minutes} minuto${minutes !== 1 ? 's' : ''}`);
  counter.textContent = `${parts.join(', ')} construyendo recuerdos ♡`;
}
updateLoveCounter();
setInterval(updateLoveCounter, 60000);

const modal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
document.querySelectorAll('.gallery figure').forEach(figure => {
  figure.addEventListener('click', () => {
    const img = figure.querySelector('img');
    const caption = figure.querySelector('figcaption')?.textContent || '';
    modalImage.src = img.src;
    modalCaption.textContent = caption;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
