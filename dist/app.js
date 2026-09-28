const preview = document.querySelector('#model-art img');
const output = document.querySelector('.selection');
const wheelColor = document.querySelector('#wheel-color');
let color = 'Pink';
let wheel = 'Classic';
const wheelDesigns = {
  Classic: { image: 'porsche-quarter.png', finish: 'Black' },
  Sport: { image: 'porsche-sport.png', finish: 'Silver' },
  Forged: { image: 'porsche-forged.png', finish: 'Gold' },
  Track: { image: 'porsche-track.png', finish: 'Black' }
};
function update() {
  output.textContent = `${color} · ${wheel} wheels (${wheelColor.value.toLowerCase()}) · ${document.querySelector('#interior').value.toLowerCase()} interior`;
  preview.alt = `${color} Porsche 911 with ${wheel.toLowerCase()} wheels, rear three-quarter view`;
}
function chooseColor(button) {
  color = button.dataset.color;
  preview.style.filter = button.dataset.filter;
  document.querySelectorAll('.swatch').forEach(b => {
    const selected = b.dataset.color === color;
    b.classList.toggle('selected', selected);
    b.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('.model-choice').forEach(b => b.classList.toggle('active', b.dataset.color === color));
  update();
}
function chooseWheel(button) {
  wheel = button.dataset.wheel;
  const design = wheelDesigns[wheel];
  preview.src = design.image;
  wheelColor.value = design.finish;
  document.querySelectorAll('.wheel').forEach(b => {
    const selected = b === button;
    b.classList.toggle('selected', selected);
    b.setAttribute('aria-pressed', String(selected));
  });
  update();
}
document.querySelectorAll('.swatch,.model-choice').forEach(b => b.addEventListener('click', () => chooseColor(b)));
document.querySelectorAll('.wheel').forEach(b => b.addEventListener('click', () => chooseWheel(b)));
document.querySelectorAll('select').forEach(s => s.addEventListener('change', update));
Object.values(wheelDesigns).forEach(design => { const image = new Image(); image.src = design.image; });
const dialog = document.querySelector('#specs');
document.querySelector('#spec-button').addEventListener('click', () => dialog.showModal());
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }
});
