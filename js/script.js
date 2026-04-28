// ハンバーガーメニューの開閉
document.querySelector(".openbtn").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector("#g-nav").classList.toggle("panelactive");
  document.querySelector(".circle-bg").classList.toggle("circleactive");
});

// ナビリンククリックでメニューを閉じる
document.querySelectorAll("#g-nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector(".openbtn").classList.remove("active");
    document.querySelector("#g-nav").classList.remove("panelactive");
    document.querySelector(".circle-bg").classList.remove("circleactive");
  });
});

// スムーススクロール
document.querySelectorAll("#g-nav a, #footer a").forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    target.style.position = "relative";
    const pos = target.getBoundingClientRect().top + window.scrollY;
    target.style.position = "sticky";

    window.scrollTo({ top: pos, behavior: "smooth" });
  });
});

// スクロールアニメーション（glideTrigger）
function fadeAnime() {
  const scroll = window.scrollY;
  const windowHeight = window.innerHeight;

  document.querySelectorAll(".glideTrigger").forEach(function (el) {
    const elemPos = el.getBoundingClientRect().top + scroll - 50;
    if (scroll >= elemPos - windowHeight) {
      el.classList.add("glide");
    } else {
      el.classList.remove("glide");
    }
  });

  document.querySelectorAll(".production-card").forEach(function (el) {
    const elemPos = el.getBoundingClientRect().top + scroll - 100;
    if (scroll >= elemPos - windowHeight) {
      el.classList.add("card-animate");
    } else {
      el.classList.remove("card-animate");
    }
  });
}

// テキストアニメーション（glideTextTrigger）
function glideTextAnime() {
  const scroll = window.scrollY;
  const windowHeight = window.innerHeight;

  document.querySelectorAll(".glideTextTrigger").forEach(function (el) {
    const elemPos = el.getBoundingClientRect().top + scroll - 50;
    if (scroll >= elemPos - windowHeight) {
      el.classList.add("glideTextAppear");
    } else {
      el.classList.remove("glideTextAppear");
    }
  });
}

// スクロールイベント
window.addEventListener("scroll", function () {
  fadeAnime();
  glideTextAnime();
});

// ローディング
window.addEventListener("load", function () {
  const loadingLogo = document.querySelector("#loading-logo");
  const loading = document.querySelector("#loading");
  const loadingBg = document.querySelector(".loadingbg");

  setTimeout(function () {
    loadingLogo.style.transition = "opacity 0.6s";
    loadingLogo.style.opacity = "0";
  }, 1200);

  setTimeout(function () {
    loading.style.transition = "opacity 0.6s";
    loading.style.opacity = "0";
    loading.addEventListener("transitionend", function () {
      loading.style.display = "none";
      document.body.classList.add("appear");
    }, { once: true });
  }, 1500);

  loadingBg.addEventListener("animationend", function () {
    fadeAnime();
    glideTextAnime();
  });
});

// カードのチルトエフェクト
document.querySelectorAll(".card").forEach(function (card) {
  card.addEventListener("mousemove", function (e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;
    const tiltAmount = 20;
    card.style.transform = `perspective(1000px) rotateX(${yPercent * tiltAmount}deg) rotateY(${xPercent * tiltAmount}deg)`;
  });

  card.addEventListener("mouseleave", function () {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
});

// =============================================
// スクロール進捗バー
// =============================================
(function () {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";
  }, { passive: true });
})();

// =============================================
// カスタムカーソル
// =============================================
(function () {
  const cursor = document.querySelector(".cursor");
  const cursorText = document.querySelector(".cursor-text");
  if (!cursor) return;

  // マウス追従
  document.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.08,
      ease: "power2.out",
    });
  });

  // ホバー対象
  document.querySelectorAll("a, button, .openbtn, .openbtn-area span").forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      cursor.classList.add("is-hover");
      cursorText.textContent = "CLICK";
    });
    el.addEventListener("mouseleave", function () {
      cursor.classList.remove("is-hover");
      cursorText.textContent = "";
    });
  });

  // 画面外で非表示
  document.addEventListener("mouseleave", function () {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
  });
  document.addEventListener("mouseenter", function () {
    gsap.to(cursor, { opacity: 1, duration: 0.2 });
  });

  // クリック時に縮む
  document.addEventListener("mousedown", function () {
    gsap.to(cursor, { scale: 0.8, duration: 0.1 });
  });
  document.addEventListener("mouseup", function () {
    gsap.to(cursor, { scale: 1, duration: 0.15, ease: "back.out(2)" });
  });
})();

// =============================================
// 作品フィルター
// =============================================
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');
  if (!buttons.length || !cards.length) return;

  // Productionsエリアを relative にしてabsoluteカードの基点に
  const area = document.querySelector('.Productions-area');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;

      // ボタンのアクティブ切替
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // カードの表示・非表示
      cards.forEach(function (card) {
        const tags = card.dataset.tags || '';
        const match = filter === 'all' || tags.split(' ').includes(filter);

        if (match) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// =============================================
// 作品詳細モーダル
// =============================================
(function () {
  const overlay  = document.getElementById('work-modal');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay) return;

  const modalImg   = document.getElementById('modal-img');
  const modalTags  = document.getElementById('modal-tags');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc  = document.getElementById('modal-desc');
  const modalLink  = document.getElementById('modal-link');

  function openModal(card) {
    modalImg.src        = card.dataset.modalImg   || '';
    modalImg.alt        = card.dataset.modalTitle || '';
    modalTags.textContent  = card.dataset.modalTags  || '';
    modalTitle.textContent = card.dataset.modalTitle || '';
    modalDesc.textContent  = card.dataset.modalDesc  || '';
    modalLink.href      = card.dataset.modalUrl   || '#';

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  // カードクリックで開く
  document.querySelectorAll('.work-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      // ボタン・リンク内のクリックは除外
      if (e.target.closest('a, button')) return;
      openModal(card);
    });
  });

  // 閉じるボタン
  closeBtn.addEventListener('click', closeModal);

  // 背景クリックで閉じる
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // ESCキーで閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();

// =============================================
// ScrollTrigger アニメーション
// =============================================
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ----------------------------------------
  // 共通：セクション見出し（h2）
  // ----------------------------------------
  document.querySelectorAll('#Productions h2, #about h2, #contact h2').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      skewY: 4,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  // ----------------------------------------
  // 共通：section-label（オレンジライン付き小見出し）
  // ----------------------------------------
  document.querySelectorAll('.section-label').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
      x: -30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
  });

  // ----------------------------------------
  // Productions：フィルターボタン
  // ----------------------------------------
  gsap.from('.filter-buttons', {
    scrollTrigger: {
      trigger: '.filter-buttons',
      start: 'top 88%',
      toggleActions: 'play none none reverse',
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  });

  // ----------------------------------------
  // Productions：カードを左右交互にスライドイン
  // ----------------------------------------
  document.querySelectorAll('.work-card').forEach(function (card, i) {
    const fromX = i % 2 === 0 ? -60 : 60;
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
      x: fromX,
      opacity: 0,
      duration: 0.8,
      delay: (i % 2) * 0.1,
      ease: 'power3.out',
    });
  });

  // ----------------------------------------
  // About：リスト項目をstaggerでフェードアップ
  // ----------------------------------------
  gsap.from('#about .about-list li', {
    scrollTrigger: {
      trigger: '#about .about-list',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
  });

  // ----------------------------------------
  // Contact：テキストを左からスライドイン（stagger）
  // ----------------------------------------
  gsap.from('#contact .tel, #contact .mail', {
    scrollTrigger: {
      trigger: '#contact .tel',
      start: 'top 88%',
      toggleActions: 'play none none reverse',
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
  });

  // SNSリンク
  gsap.from('#contact .sns-link', {
    scrollTrigger: {
      trigger: '#contact .sns-link',
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  });

  // ----------------------------------------
  // portfolio-button
  // ----------------------------------------
  gsap.from('.portfolio-button', {
    scrollTrigger: {
      trigger: '.portfolio-button',
      start: 'top 92%',
      toggleActions: 'play none none reverse',
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  });

})();

// =============================================
// View Transitions API によるページ遷移
// =============================================
(function () {
  // 対応ブラウザチェック
  if (!document.startViewTransition) return;

  // ページ内リンク（#始まり）・外部リンク・tel・mailtoは除外
  function isPageLink(href) {
    if (!href) return false;
    if (href.startsWith('#')) return false;
    if (href.startsWith('tel:')) return false;
    if (href.startsWith('mailto:')) return false;
    if (href.startsWith('http') && !href.includes(location.hostname)) return false;
    // index.html ↔ portfolio.html のみ対象
    return href.includes('index.html') || href.includes('portfolio.html');
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!isPageLink(href)) return;

    e.preventDefault();

    document.startViewTransition(function () {
      window.location.href = href;
    });
  });
})();

// =============================================
// ダークモード切替
// =============================================
(function () {
  const toggle = document.getElementById('dark-toggle');
  if (!toggle) return;

  const STORAGE_KEY = 'portfolio-dark-mode';

  // 保存済みの設定を復元
  function applyDark(isDark) {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? '1' : '0');
  }

  // 保存済みの設定を復元
  function applyDark(isDark) {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? '1' : '0');
  }

  // 初期化：保存設定 → OS設定の順で判定
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) {
    applyDark(saved === '1');
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyDark(true);
  }

  // トグルクリック
  toggle.addEventListener('click', function () {
    applyDark(!document.body.classList.contains('dark'));
  });

  // OSのカラースキーム変更を監視
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      applyDark(e.matches);
    }
  });
})();

// =============================================
// スキルレーダーチャート（Chart.js）
// =============================================
(function () {
  const canvas = document.getElementById('skillChart');
  if (!canvas || typeof Chart === 'undefined') return;

  // ダークモード判定
  function isDark() {
    return document.body.classList.contains('dark');
  }

  function getColors() {
    return {
      text:    isDark() ? 'rgba(240,240,240,0.7)' : 'rgba(0,0,0,0.5)',
      grid:    isDark() ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      fill:    isDark() ? 'rgba(255,136,0,0.15)'  : 'rgba(255,136,0,0.12)',
      border:  '#ff8800',
      point:   '#ff8800',
    };
  }

  const labels = [
    'HTML/CSS',
    'JavaScript',
    'Vue3 / TS',
    'PHP',
    'Python',
    'SQL',
  ];

  const data = [90, 80, 75, 65, 60, 70];

  function buildChart() {
    const c = getColors();

    return new Chart(canvas, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Skill',
          data: data,
          fill: true,
          backgroundColor: c.fill,
          borderColor: c.border,
          pointBackgroundColor: c.point,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: c.border,
          borderWidth: 2,
          pointRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ' ' + ctx.raw + ' / 100';
              },
            },
          },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 25,
              display: false,
            },
            grid: {
              color: c.grid,
            },
            angleLines: {
              color: c.grid,
            },
            pointLabels: {
              font: {
                family: "'Teko', sans-serif",
                size: 14,
              },
              color: c.text,
            },
          },
        },
        animation: {
          duration: 1200,
          easing: 'easeInOutQuart',
        },
      },
    });
  }

  // ScrollTriggerでスクロール時に描画
  let chart = null;
  let drawn = false;

  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: '#skillChart',
      start: 'top 85%',
      onEnter: function () {
        if (!drawn) {
          chart = buildChart();
          drawn = true;
        }
      },
    });
  } else {
    chart = buildChart();
  }

  // ダークモード切替時にチャートの色を更新
  const darkToggle = document.getElementById('dark-toggle');
  if (darkToggle && chart) {
    darkToggle.addEventListener('click', function () {
      setTimeout(function () {
        if (!chart) return;
        const c = getColors();
        chart.data.datasets[0].backgroundColor = c.fill;
        chart.data.datasets[0].borderColor      = c.border;
        chart.options.scales.r.grid.color       = c.grid;
        chart.options.scales.r.angleLines.color = c.grid;
        chart.options.scales.r.pointLabels.color = c.text;
        chart.update();
      }, 300);
    });
  }
})();