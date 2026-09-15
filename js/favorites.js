/* ============================================================
   Patas & Pelos Pet Shop — Favoritos (favorites.js)
   ============================================================ */
window.PS = window.PS || {};

PS.fav = {
  ids: [],

  load: function(){
    try { this.ids = JSON.parse(localStorage.getItem('pp_favs_v1')) || []; }
    catch(e){ this.ids = []; }
    this.ids = this.ids.filter(function(id){ return PS.prodById(id); });
  },
  save: function(){
    localStorage.setItem('pp_favs_v1', JSON.stringify(this.ids));
  },
  has: function(id){ return this.ids.indexOf(id) > -1; },
  toggle: function(id){
    var i = this.ids.indexOf(id);
    var added;
    if(i > -1){ this.ids.splice(i, 1); added = false; }
    else { this.ids.push(id); added = true; }
    this.save();
    this.syncHearts();
    PS.layout.setCount('favCount', this.ids.length);
    if(document.body.dataset.page === 'favoritos') PS.favUI.renderPage();
    return added;
  },
  syncHearts: function(){
    var self = this;
    document.querySelectorAll('[data-fav]').forEach(function(btn){
      var on = self.has(btn.dataset.fav);
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-label', on ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
};

PS.favUI = {
  init: function(){
    PS.fav.load();
    PS.layout.setCount('favCount', PS.fav.ids.length);

    /* Coração (delegação global) */
    document.addEventListener('click', function(e){
      var btn = e.target.closest('[data-fav]');
      if(!btn) return;
      e.preventDefault();
      e.stopPropagation();
      var p = PS.prodById(btn.dataset.fav);
      if(!p) return;
      var added = PS.fav.toggle(p.id);
      PS.toast(added ? 'Adicionado aos favoritos!' : 'Removido dos favoritos.', added ? 'success' : 'info');
    });

    if(document.body.dataset.page === 'favoritos') this.renderPage();
  },

  renderPage: function(){
    var wrap = document.getElementById('favWrap');
    if(!wrap) return;
    var b = PS.layout.base || '';
    if(!PS.fav.ids.length){
      wrap.innerHTML = '<div class="empty-state">' +
        '<div class="e-icon">' + PS.icon('heart') + '</div>' +
        '<h2>Nenhum favorito ainda</h2>' +
        '<p>Toque no coração dos produtos que você amar para encontrá-los aqui.</p>' +
        '<a class="btn btn-primary" href="' + b + 'pages/busca.html?ofertas=1">Descobrir ofertas</a></div>';
      return;
    }
    var grid = PS.fav.ids.map(function(id){ return PS.prodById(id); })
      .filter(Boolean)
      .map(function(p, i){ return PS.ui.cardHTML(p, i); }).join('');
    wrap.innerHTML =
      '<div class="toolbar"><span class="result-count">' + PS.fav.ids.length + (PS.fav.ids.length === 1 ? ' produto salvo' : ' produtos salvos') + '</span>' +
      '<button class="btn btn-dark btn-sm" id="btnFavAll">' + PS.icon('cart') + ' Adicionar todos ao carrinho</button></div>' +
      '<div class="grid-products">' + grid + '</div>';
    PS.ui.reveal(wrap);
    PS.fav.syncHearts();
    document.getElementById('btnFavAll').addEventListener('click', function(){
      PS.fav.ids.forEach(function(id){ PS.cart.add(id, 1); });
      PS.cartUI.openDrawer();
    });
  }
};
