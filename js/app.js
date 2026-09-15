/* ============================================================
   AUMIAU / PATAS & PELOS — app.js
   Camada extra de compatibilidade e interações gerais.
   Não substitui products.js, cart.js, favorites.js, search.js etc.
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function toast(message, type) {
    if (window.PS && typeof PS.toast === 'function') {
      try { PS.toast(message, type || 'success'); return; } catch (_) {}
    }
    var old = document.getElementById('aumiau-toast');
    if (old) old.remove();
    var el = document.createElement('div');
    el.id = 'aumiau-toast';
    el.textContent = message;
    el.style.cssText = [
      'position:fixed','left:50%','bottom:24px','transform:translateX(-50%)',
      'z-index:99999','padding:12px 18px','border-radius:12px','background:#0B2B4C',
      'color:#fff','font:700 14px Nunito,Arial,sans-serif','box-shadow:0 10px 30px rgba(0,0,0,.2)',
      'opacity:0','transition:opacity .2s ease'
    ].join(';');
    if (type === 'error') el.style.background = '#b42318';
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.style.opacity = '1'; });
    setTimeout(function () {
      el.style.opacity = '0';
      setTimeout(function () { if (el.parentNode) el.remove(); }, 220);
    }, 2600);
  }

  function scrollTopButton() {
    if (document.getElementById('aumiau-top')) return;
    var btn = document.createElement('button');
    btn.id = 'aumiau-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Voltar ao topo');
    btn.textContent = '↑';
    btn.style.cssText = [
      'position:fixed','right:20px','bottom:20px','width:46px','height:46px',
      'border:0','border-radius:50%','background:#0B2B4C','color:#fff','font-size:23px',
      'font-weight:900','cursor:pointer','z-index:9998','opacity:0','visibility:hidden',
      'transform:translateY(12px)','transition:.2s ease','box-shadow:0 8px 25px rgba(0,0,0,.18)'
    ].join(';');
    document.body.appendChild(btn);
    function update() {
      var show = window.scrollY > 450;
      btn.style.opacity = show ? '1' : '0';
      btn.style.visibility = show ? 'visible' : 'hidden';
      btn.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
    }
    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    update();
  }

  function progressBar() {
    if (document.getElementById('aumiau-progress')) return;
    var bar = document.createElement('div');
    bar.id = 'aumiau-progress';
    bar.style.cssText = 'position:fixed;top:0;left:0;width:0;height:3px;background:#F2A007;z-index:100000;pointer-events:none;transition:width .08s linear;';
    document.body.appendChild(bar);
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function smoothAnchors() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target;
      try { target = document.querySelector(href); } catch (_) { return; }
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', href);
    });
  }

  function keyboardSearch() {
    document.addEventListener('keydown', function (event) {
      if (event.key !== '/' || event.ctrlKey || event.altKey || event.metaKey) return;
      var active = document.activeElement;
      if (active && /INPUT|TEXTAREA|SELECT/.test(active.tagName)) return;
      var input = document.getElementById('buscaInput') || document.getElementById('buscaPageInput');
      if (!input) return;
      event.preventDefault();
      input.focus();
      if (typeof input.select === 'function') input.select();
    });
  }

  function escapeKey() {
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      var sug = document.getElementById('searchSug');
      if (sug) sug.classList.remove('show', 'open');
      var modal = document.querySelector('.modal.is-open, .modal.open, [role="dialog"].is-open');
      if (modal) modal.classList.remove('is-open', 'open');
      document.body.classList.remove('modal-open');
    });
  }

  function imageFallback() {
    document.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.dataset.fallback) return;
        img.dataset.fallback = '1';
        img.alt = img.alt || 'Imagem do produto';
        img.style.visibility = 'hidden';
        var parent = img.parentElement;
        if (!parent || parent.querySelector('.aumiau-img-fallback')) return;
        var fallback = document.createElement('div');
        fallback.className = 'aumiau-img-fallback';
        fallback.textContent = '🐾';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:42px;background:#f4f6f8;';
        if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
        parent.appendChild(fallback);
      }, { once: true });
    });
  }

  function copyButtons() {
    document.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-copy]');
      if (!btn) return;
      var value = btn.getAttribute('data-copy');
      if (!value) return;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(function () {
          toast('Cupom copiado: ' + value);
        }).catch(function () { fallbackCopy(value); });
      } else fallbackCopy(value);
    });
    function fallbackCopy(value) {
      var input = document.createElement('textarea');
      input.value = value;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      try { document.execCommand('copy'); toast('Cupom copiado: ' + value); }
      catch (_) { toast('Copie o cupom: ' + value); }
      input.remove();
    }
  }

  function productButtonFeedback() {
    document.addEventListener('click', function (event) {
      var button = event.target.closest('[data-add]');
      if (!button || button.dataset.aumiauFeedback === '1') return;
      button.dataset.aumiauFeedback = '1';
      var original = button.innerHTML;
      setTimeout(function () {
        if (!document.body.contains(button)) return;
        button.innerHTML = '✓ Adicionado';
        button.classList.add('aumiau-added');
        setTimeout(function () {
          if (!document.body.contains(button)) return;
          button.innerHTML = original;
          button.classList.remove('aumiau-added');
          delete button.dataset.aumiauFeedback;
        }, 900);
      }, 30);
    });
  }

  function connectionStatus() {
    window.addEventListener('offline', function () { toast('Você está sem conexão com a internet.', 'error'); });
    window.addEventListener('online', function () { toast('Conexão restabelecida!'); });
  }

  function reveal() {
    var nodes = document.querySelectorAll('.reveal:not(.aumiau-observed)');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    nodes.forEach(function (el) {
      el.classList.add('aumiau-observed');
      observer.observe(el);
    });
  }

  function init() {
    scrollTopButton();
    progressBar();
    smoothAnchors();
    keyboardSearch();
    escapeKey();
    imageFallback();
    copyButtons();
    productButtonFeedback();
    connectionStatus();
    reveal();

    // Atualiza animações após vitrines renderizadas por outros scripts.
    setTimeout(reveal, 250);
    setTimeout(reveal, 900);

    console.log('🐾 Aumiau: app.js carregado com sucesso.');
  }

  ready(init);
})();
