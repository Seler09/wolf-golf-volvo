/* wolf_golf: photo viewer */
(function () {
  var d = document.getElementById('lb');
  if (!d || typeof d.showModal !== 'function') return;
  var links = Array.prototype.slice.call(document.querySelectorAll('a[data-lb]'));
  if (!links.length) return;
  var frame = d.querySelector('.lb-frame'), img = frame.querySelector('img'),
      cap = d.querySelector('.lb-cap'), cnt = d.querySelector('.lb-count'), i = 0, opener = null;
  var navs = d.querySelectorAll('.lb-nav');
  for (var n = 0; n < navs.length; n++) navs[n].hidden = links.length < 2;
  function show(k) {
    i = (k + links.length) % links.length;
    var a = links[i], t = a.querySelector('img');
    img.src = a.getAttribute('href');
    img.alt = t ? (t.getAttribute('alt') || '') : '';
    cap.textContent = a.getAttribute('data-cap') || '';
    cnt.textContent = (i + 1) + ' / ' + links.length;
    frame.classList.toggle('round', a.hasAttribute('data-round'));
    frame.classList.toggle('photo', a.hasAttribute('data-photo'));
  }
  links.forEach(function (a, k) {
    a.addEventListener('click', function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault(); opener = a; show(k); d.showModal();
    });
  });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
  });
  d.addEventListener('click', function (e) {
    var t = e.target;
    if (t === d) { d.close(); return; }
    if (t.closest('[data-lb-close]')) d.close();
    else if (t.closest('[data-lb-prev]')) show(i - 1);
    else if (t.closest('[data-lb-next]')) show(i + 1);
  });
  d.addEventListener('close', function () { if (opener) opener.focus(); });
})();
