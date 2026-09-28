/* Unified vehicle selector + tune comparison. Data in vehicles.js (HOC_DATA). */
(() => {
const data = window.HOC_DATA;
const sel = document.querySelector('#vehicle-selector');
const panel = document.querySelector('#vehicle-panel');
const previewRoutes = {
  'vw-golf-r-mk7': 'golf-r.html#finishes',
  'porsche-911': 'porsche-911.html#configurator',
  'audi-s3-8v': 'audi-s3.html#configurator'
};
function esc(s){return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function tuneTable(v){
  if(!v.tunes || !v.tunes.length) return '';
  const rows = v.tunes.map(t => `<tr>
    <td><strong>${esc(t.stage)}</strong><br><span class="tune-note">${esc(t.note||'')}</span></td>
    <td>${esc(t.stock)}</td><td><strong>${esc(t.tuned)}</strong></td>
    <td>${esc(t.fuel)}</td><td>${esc(t.price)}</td></tr>`).join('');
  const src = v.tunes.map(t => `<a class="text-link" href="${esc(t.source)}" target="_blank" rel="noopener">Source: ${esc(t.stage)} ↗</a>`).join(' ');
  return `<div class="no-preview" style="border-style:solid">
    <h3>Software options — ${esc(v.engine||'')} <span class="verified-tag">(verified ${esc(v.tunes[0].verified)})</span></h3>
    <table class="tune-table"><thead><tr><th>Stage</th><th>Stock</th><th>After software</th><th>Fuel requirement</th><th>Software price*</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="tune-note">*Price observed on the manufacturer page at research time. Region-dependent currency; HOC installation quoted separately. Figures are manufacturer-published for this specific engine/market and depend on your ECU version. ${src}</p>
  </div>`;
}
function card(v){
  const b = document.createElement('button');
  b.className = 'vehicle-card';
  b.dataset.id = v.id;
  const badge = v.status === 'preview' || v.status === 'published'
    ? '<span class="badge preview">Build preview</span>'
    : (v.tunes && v.tunes.length ? '<span class="badge">Software data</span>' : '<span class="badge">Coming</span>');
  b.innerHTML = `<span class="brand">${esc(v.brand)}</span><span class="name">${esc(v.model)} ${esc(v.gen)}</span>
    <span class="meta">${esc(v.years)}${v.engine ? ' · ' + esc(v.engine) : ''}</span>${badge}`;
  b.onclick = () => select(v);
  return b;
}
function select(v){
  document.querySelectorAll('.vehicle-card').forEach(c => c.classList.toggle('selected', c.dataset.id === v.id));
  document.body.dataset.model = (v.brand + ' ' + v.model + ' ' + v.gen).trim();
  const route = previewRoutes[v.id];
  let img = '';
  if (v.images && (v.images.front || v.images.rear)) {
    const panels = [v.images.front, v.images.rear].filter(Boolean).map(f =>
      `<img src="${esc(f)}" alt="${esc(v.model)} ${esc(v.brand)} preview" style="width:calc(50% - 5px);border-radius:10px;margin-top:12px;background:#0d0d0e">`).join('');
    img = `<div style="display:flex;flex-wrap:wrap;gap:10px">${panels}</div>`;
  }
  panel.innerHTML = `
    <div class="no-preview" style="border-style:solid;padding:20px">
      <h3 style="font-size:22px">${esc(v.brand)} ${esc(v.model)} <span style="color:#888">${esc(v.gen)} ${esc(v.years)}</span></h3>
      <p>${esc(v.engine || '')}${v.body ? ' · ' + esc(v.body) : ''}</p>
      ${img}
      ${route ? `<a class="cta" style="display:inline-block;margin-top:14px" href="${route}">Open the ${esc(v.model)} build studio ↗</a>` : ''}
    </div>
    ${tuneTable(v)}
    ${(v.tunes && v.tunes.length) ? `<button class="cta" style="margin-top:14px" data-quote="build">Get a quote for this build ↗</button>` : ''}
  `;
}
data.vehicles.forEach(v => sel.append(card(v)));
// default: S3 (the new one)
const s3 = data.vehicles.find(v => v.id === 'audi-s3-8v');
if (s3) select(s3);
})();
