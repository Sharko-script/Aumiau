/* ============================================================
   AUMIAU / PATAS & PELOS — app.js
   Camada de compatibilidade, recuperação e interações gerais.
   ============================================================ */
(function () {
  'use strict';

  var wrapped = {};
  var failed = [];

  /* ============================================================
     Inicialização protegida
     Um erro em uma página/componente não interrompe os demais.
  ============================================================ */
  function protectInit(owner, method) {
    if (!window.PS || !PS[owner] || typeof PS[owner][method] !== 'function') return;
    var key = owner + '.' + method;
    if (wrapped[key]) return;

    var original = PS[owner][method];
    wrapped[key] = true;
    PS[owner][method] = function () {
      try {
        return original.apply(this, arguments);
      } catch (err) {
        failed.push({ owner: owner, method: method, fn: original });
        console.error('[Aumiau] Erro em ' + key + ':', err);
        return null;
      }
    };
  }

  function installInitGuards() {
    [
      ['layout', 'init'],
      ['cartUI', 'init'],
      ['favUI', 'init'],
      ['authUI', 'init'],
      ['searchUI', 'init'],
      ['productUI', 'init'],
      ['categoryUI', 'init'],
      ['home', 'init']
    ].forEach(function (item) {
      protectInit(item[0], item[1]);
    });
  }

  /* Os módulos principais já foram carregados neste ponto,
     mas DOMContentLoaded ainda não ocorreu. */
  installInitGuards();

  /* ============================================================
     Helpers de Storage
  ============================================================ */
  var memory = {};
  function getStore(key) {
    try { return localStorage.getItem(key); }
    catch (e) { return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null; }
  }
  function setStore(key, value) {
    try { localStorage.setItem(key, value); }
    catch (e) { memory[key] = String(value); }
  }
  function removeStore(key) {
    try { localStorage.removeItem(key); }
    catch (e) { delete memory[key]; }
  }

  function safeJSON(value, fallback) {
    try {
      var parsed = JSON.parse(value);
      return parsed == null ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  }

  /* ============================================================
     Carrinho — valida IDs, quantidades e cupons.
  ============================================================ */
  function normalizeCart() {
    if (!window.PS || !PS.cart || !Array.isArray(PS.PRODUCTS)) return;
    var source = PS.cart.items && typeof PS.cart.items === 'object' ? PS.cart.items : {};
    var clean = {};

    Object.keys(source).forEach(function (id) {
      var product = typeof PS.prodById === 'function' ? PS.prodById(id) : null;
      var qty = parseInt(source[id], 10);
      if (product && isFinite(qty) && qty > 0) clean[id] = Math.min(99, qty);
    });

    PS.cart.items = clean;
    if (PS.cart.coupon && (!PS.cart.COUPONS || !PS.cart.COUPONS[PS.cart.coupon])) {
      PS.cart.coupon = null;
    }
  }

  function patchCart() {
    if (!PS.cart) return;

    var add = PS.cart.add;
    PS.cart.add = function (id, qty) {
      if (!id || typeof PS.prodById !== 'function' || !PS.prodById(id)) {
        console.warn('[Aumiau] Tentativa de adicionar produto inexistente:', id);
        return false;
      }
      var n = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
      try {
        add.call(this, id, n);
        normalizeCart();
        return true;
      } catch (e) {
        console.error('[Aumiau] Falha ao adicionar ao carrinho:', e);
        return false;
      }
    };

    var setQty = PS.cart.setQty;
    PS.cart.setQty = function (id, qty) {
      if (!id || typeof PS.prodById !== 'function' || !PS.prodById(id)) return false;
      var n = Math.max(0, Math.min(99, parseInt(qty, 10) || 0));
      try {
        setQty.call(this, id, n);
        normalizeCart();
        return true;
      } catch (e) {
        console.error('[Aumiau] Falha ao alterar quantidade:', e);
        return false;
      }
    };

    var load = PS.cart.load;
    PS.cart.load = function () {
      try { load.call(this); }
      catch (e) { this.items = {}; this.coupon = null; }
      normalizeCart();
      return this.items;
    };
  }

  /* ============================================================
     Favoritos — IDs inválidos são descartados.
  ============================================================ */
  function patchFavorites() {
    if (!PS.fav) return;

    var load = PS.fav.load;
    PS.fav.load = function () {
      try { load.call(this); }
      catch (e) { this.ids = []; }
      if (!Array.isArray(this.ids)) this.ids = [];
      this.ids = this.ids.filter(function (id) {
        return typeof PS.prodById === 'function' && !!PS.prodById(id);
      });
      return this.ids;
    };

    var toggle = PS.fav.toggle;
    PS.fav.toggle = function (id) {
      if (!id || typeof PS.prodById !== 'function' || !PS.prodById(id)) return false;
      try {
        var result = toggle.call(this, id);
        this.ids = Array.from(new Set((this.ids || []).filter(function (x) {
          return typeof PS.prodById === 'function' && !!PS.prodById(x);
        })));
        try { this.save(); } catch (e) {}
        return result;
      } catch (e) {
        console.error('[Aumiau] Falha nos favoritos:', e);
        return false;
      }
    };
  }

  /* ============================================================
     Login/Cadastro — validação extra e Storage protegido.
  ============================================================ */
  function patchAuth() {
    if (!PS.auth) return;

    var load = PS.auth.load;
    PS.auth.load = function () {
      try { load.call(this); }
      catch (e) { this.users = []; }
      if (!Array.isArray(this.users)) this.users = [];
      this.users = this.users.filter(function (u) {
        return u && typeof u.email === 'string' && typeof u.senha === 'string';
      });
      this.users.forEach(function (u) {
        if (!Array.isArray(u.enderecos)) u.enderecos = [];
      });
      return this.users;
    };

    var login = PS.auth.login;
    PS.auth.login = function (email, senha, lembrar) {
      email = String(email || '').trim().toLowerCase();
      senha = String(senha || '');
      if (!this.emailOk(email) || !senha) return null;
      try { return login.call(this, email, senha, !!lembrar); }
      catch (e) { console.error('[Aumiau] Falha no login:', e); return null; }
    };

    var register = PS.auth.register;
    PS.auth.register = function (data) {
      if (!data || typeof data !== 'object') return 'invalid';
      data.nome = String(data.nome || '').trim();
      data.email = String(data.email || '').trim().toLowerCase();
      data.senha = String(data.senha || '');
      data.tel = String(data.tel || '').trim();
      if (data.nome.length < 3 || !this.emailOk(data.email) || data.senha.length < 6) return 'invalid';
      data.enderecos = Array.isArray(data.enderecos) ? data.enderecos : [];
      try { return register.call(this, data); }
      catch (e) { console.error('[Aumiau] Falha no cadastro:', e); return 'error'; }
    };
  }

  /* ============================================================
     Busca — nunca retorna undefined/null.
  ============================================================ */
  function patchSearch() {
    if (!PS.search || typeof PS.search.query !== 'function') return;
    var query = PS.search.query;
    PS.search.query = function (q) {
      try {
        var result = query.call(this, String(q == null ? '' : q));
        return Array.isArray(result) ? result : [];
      } catch (e) {
        console.error('[Aumiau] Falha na busca:', e);
        return Array.isArray(PS.PRODUCTS) ? PS.PRODUCTS.slice() : [];
      }
    };
  }

  /* ============================================================
     Inicialização final e recuperação de módulos.
  ============================================================ */
  function afterReady() {
    patchCart();
    patchFavorites();
    patchAuth();
    patchSearch();
    normalizeCart();

    /* Repara estados antigos/corrompidos. */
    try {
      var favs = safeJSON(getStore('pp_favs_v1'), []);
      if (!Array.isArray(favs)) setStore('pp_favs_v1', '[]');
    } catch (e) {}

    try {
      var cart = safeJSON(getStore('pp_cart_v1'), {});
      if (!cart || typeof cart !== 'object' || Array.isArray(cart)) setStore('pp_cart_v1', '{}');
    } catch (e) {}

    /* Se algum módulo abortou sua inicialização, tenta novamente. */
    if (failed.length) {
      var retry = failed.slice();
      failed.length = 0;
      retry.forEach(function (item) {
        try {
          PS[item.owner][item.method] = item.fn;
          PS[item.owner][item.method]();
          protectInit(item.owner, item.method);
        } catch (e) {
          console.error('[Aumiau] Segunda tentativa falhou em ' + item.owner + '.' + item.method + ':', e);
        }
      });
    }

    try {
      if (PS.fav && typeof PS.fav.load === 'function') PS.fav.load();
      if (PS.fav && typeof PS.fav.syncHearts === 'function') PS.fav.syncHearts();
      if (PS.layout && typeof PS.layout.syncUser === 'function') PS.layout.syncUser();
      if (PS.cart) normalizeCart();
    } catch (e) {
      console.warn('[Aumiau] Sincronização final incompleta:', e);
    }
  }

  /* ============================================================
     Interações gerais
  ============================================================ */
  function toast(message, type) {
    if (window.PS && typeof PS.toast === 'function') {
      try { PS.toast(message, type || 'success'); return; } catch (e) {}
    }
    var old = document.getElementById('aumiau-toast');
    if (old) old.remove();
    var el = document.createElement('div');
    el.id = 'aumiau-toast';
    el.textContent = message;
    el.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99999;padding:12px 18px;border-radius:12px;background:#0B2B4C;color:#fff;font:700 14px Nunito,Arial,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.2);';
    if (type === 'error') el.style.background = '#b42318';
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.remove(); }, 2600);
  }

  function scrollTopButton() {
    if (document.getElementById('aumiau-top')) return;
    var btn = document.createElement('button');
    btn.id = 'aumiau-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Voltar ao topo');
    btn.textContent = '↑';
    btn.style.cssText = 'position:fixed;right:20px;bottom:20px;width:46px;height:46px;border:0;border-radius:50%;background:#0B2B4C;color:#fff;font-size:23px;font-weight:900;cursor:pointer;z-index:9998;opacity:0;visibility:hidden;transform:translateY(12px);transition:.2s ease;box-shadow:0 8px 25px rgba(0,0,0,.18);';
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
      var link = event.target && event.target.closest ? event.target.closest('a[href^="#"]') : null;
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target;
      try { target = document.querySelector(href); } catch (e) { return; }
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
      if (window.PS && PS.modal && typeof PS.modal.close === 'function') {
        try { PS.modal.close(); } catch (e) {}
      }
    });
  }

  function imageFallback() {
    document.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.dataset.fallback) return;
        img.dataset.fallback = '1';
        var parent = img.parentElement;
        if (!parent || parent.querySelector('.aumiau-img-fallback')) return;
        var fallback = document.createElement('div');
        fallback.className = 'aumiau-img-fallback';
        fallback.textContent = '🐾';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:42px;background:#f4f6f8;';
        if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
        img.style.visibility = 'hidden';
        parent.appendChild(fallback);
      }, { once: true });
    });
  }

  function copyButtons() {
    document.addEventListener('click', function (event) {
      var btn = event.target && event.target.closest ? event.target.closest('[data-copy]') : null;
      if (!btn) return;
      var value = btn.getAttribute('data-copy');
      if (!value) return;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(function () { toast('Copiado: ' + value); }).catch(function () {});
      }
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
    try { afterReady(); } catch (e) { console.error('[Aumiau] Falha na recuperação:', e); }
    scrollTopButton();
    progressBar();
    smoothAnchors();
    keyboardSearch();
    escapeKey();
    imageFallback();
    copyButtons();
    connectionStatus();
    reveal();
    setTimeout(reveal, 250);
    setTimeout(reveal, 900);
    console.log('🐾 Aumiau: JavaScript corrigido e inicializado.');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.addEventListener('error', function (event) {
    console.error('[Aumiau] Erro JavaScript:', event.error || event.message);
  });
  window.addEventListener('unhandledrejection', function (event) {
    console.error('[Aumiau] Promise rejeitada:', event.reason);
  });

  window.AumiauDebug = {
    normalizeCart: normalizeCart,
    storageGet: getStore,
    storageSet: setStore,
    storageRemove: removeStore,
    state: function () {
      return {
        page: document.body && document.body.dataset ? document.body.dataset.page : '',
        products: Array.isArray(PS.PRODUCTS) ? PS.PRODUCTS.length : 0,
        cart: PS.cart ? PS.cart.items : {},
        favorites: PS.fav ? PS.fav.ids : [],
        user: PS.auth && typeof PS.auth.current === 'function' ? PS.auth.current() : null
      };
    }
  };
})();
