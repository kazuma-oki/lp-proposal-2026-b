(() => {
 const header = document.querySelector('.site-header');
 const btn = header.querySelector('.menu-btn');
 const menu = document.getElementById('menu');
 const sticky = document.querySelector('.sticky');
 const offer = document.getElementById('offer');
 const heroCta = document.querySelector('.hero .btn');

 // メニュー
 const setMenu = open => {
  menu.hidden = !open;
  btn.setAttribute('aria-expanded', open);
  btn.querySelector('.vh').textContent = open ? '目次を閉じる' : '目次を開く';
  document.body.style.overflow = open ? 'hidden' : '';
  update();
 };
 btn.addEventListener('click', () => setMenu(menu.hidden));
 menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
 addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); btn.focus(); } });
 matchMedia('(min-width:1080px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

 // 下部CTA：ヒーローのボタンを過ぎてから、オファーとページ末尾が見えるまで
 let heroGone = false, offerSeen = false;
 const update = () => sticky.classList.toggle('show', heroGone && !offerSeen && menu.hidden && innerHeight + scrollY < document.body.scrollHeight - 260);
 new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(heroCta);
 new IntersectionObserver(([e]) => { offerSeen = e.isIntersecting; update(); }).observe(offer);
 addEventListener('scroll', () => { header.classList.toggle('scrolled', scrollY > 8); update(); }, {passive: true});

 // PC目次の現在地
 const links = [...document.querySelectorAll('.side-nav a')];
 const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  links.forEach(a => { const on = a.hash === '#' + e.target.id; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'); });
 }), {rootMargin: '-35% 0px -60% 0px'});
 ['#top', ...links.map(a => a.hash)].forEach(h => { const s = document.querySelector(h); if (s) io.observe(s); });
})();
