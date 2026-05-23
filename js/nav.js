// js/nav.js
document.addEventListener('DOMContentLoaded', () => {
  const current = window.location.pathname.split('/').pop() || 'index.html';

  initMobileNav();
  highlightSidebar(current);
  buildToc();
  buildProgressBar();
});

function highlightSidebar(current) {
  document.querySelectorAll('.sidebar a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
}

function initMobileNav() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  // 汉堡按钮
  const toggle = document.createElement('button');
  toggle.className = 'mobile-nav-toggle';
  toggle.setAttribute('aria-label', '菜单');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  document.body.appendChild(toggle);

  // 遮罩
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  };

  toggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('visible', isOpen);
  });

  overlay.addEventListener('click', closeSidebar);

  // 点击导航链接后自动关闭
  sidebar.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        setTimeout(closeSidebar, 200);
      }
    });
  });
}

function buildToc() {
  const headings = document.querySelectorAll('.main h2');
  if (headings.length < 2) return;

  const tocSidebar = document.createElement('aside');
  tocSidebar.className = 'toc-sidebar';
  tocSidebar.innerHTML = '<div class="toc-title">本页目录</div><nav></nav>';
  const nav = tocSidebar.querySelector('nav');

  headings.forEach((h2, i) => {
    if (!h2.id) h2.id = 's' + i;
    const a = document.createElement('a');
    a.href = '#' + h2.id;
    a.textContent = h2.textContent;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      h2.scrollIntoView({ behavior: 'smooth' });
    });
    nav.appendChild(a);
  });

  document.body.appendChild(tocSidebar);

  const links = nav.querySelectorAll('a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = nav.querySelector(`a[href="#${entry.target.id}"]`);
      if (entry.isIntersecting && link) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-15% 0px -75% 0px' });

  headings.forEach(h => observer.observe(h));
}

function buildProgressBar() {
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const pct = scrollTop / (scrollHeight - clientHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}
