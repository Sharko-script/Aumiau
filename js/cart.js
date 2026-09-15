/* ============================================================
   Patas & Pelos Pet Shop — Carrinho + checkout (cart.js)
   ============================================================ */
window.PS = window.PS || {};

PS.cart = {
  items: {},
  coupon: null,
  COUPONS: { 'BEMVINDO10': 0.10 },

  load: function(){
    try {
      this.items = JSON.parse(localStorage.getItem('pp_cart_v1')) || {};
      this.coupon = localStorage.getItem('pp_coupon_v1') || null;
    } catch(e){ this.items = {}; this.coupon = null; }
    /* Remove itens inválidos */
    var self = this;
    Object.keys(this.items).forEach(function(id){
      if(!PS.prodById(id) || !(self.items[id] > 0)) delete self.items[id];
    });
  },
  save: function(){
    localStorage.setItem('pp_cart_v1', JSON.stringify(this.items));
    if(this.coupon) localStorage.setItem('pp_coupon_v1', this.coupon);
    else localStorage.removeItem('pp_coupon_v1');
  },
  add: function(id, qty){
    qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    this.items[id] = Math.min(99, (this.items[id] || 0) + qty);
    this.save();
    PS.cartUI.sync();
  },
  setQty: function(id, qty){
    qty = parseInt(qty, 10) || 0;
    if(qty <= 0) delete this.items[id];
    else this.items[id] = Math.min(99, qty);
    this.save();
    PS.cartUI.sync();
  },
  remove: function(id){
    delete this.items[id];
    this.save();
    PS.cartUI.sync();
  },
  clear: function(){
    this.items = {};
    this.coupon = null;
    this.save();
    PS.cartUI.sync();
  },
  count: function(){
    return Object.keys(this.items).reduce(function(s, id){ return s + this.items[id]; }.bind(this), 0);
  },
  list: function(){
    var self = this;
    return Object.keys(this.items).map(function(id){
      return { p: PS.prodById(id), qty: self.items[id] };
    }).filter(function(l){ return l.p; });
  },
  subtotal: function(){
    return this.list().reduce(function(s, l){ return s + l.p.preco * l.qty; }, 0);
  },
  discount: function(){
    if(this.coupon && this.COUPONS[this.coupon])
      return this.subtotal() * this.COUPONS[this.coupon];
    return 0;
  },
  shipping: function(){
    if(!this.list().length) return 0;
    return (this.subtotal() - this.discount()) >= 149 ? 0 : 14.9;
  },
  total: function(){
    return this.subtotal() - this.discount() + this.shipping();
  },
  applyCoupon: function(code){
    code = (code || '').trim().toUpperCase();
    if(this.COUPONS[code]){ this.coupon = code; this.save(); PS.cartUI.sync(); return true; }
    return false;
  }
};

PS.cartUI = {
  init: function(){
    PS.cart.load();
    this.sync();

    /* Adicionar ao carrinho (delegação global) */
    document.addEventListener('click', function(e){
      var add = e.target.closest('[data-add]');
      if(add){
        e.preventDefault();
        PS.cart.add(add.dataset.add, 1);
        PS.cartUI.openDrawer();
        return;
      }
      var inc = e.target.closest('[data-inc]');
      if(inc){ PS.cart.setQty(inc.dataset.inc, (PS.cart.items[inc.dataset.inc] || 0) + 1); return; }
      var dec = e.target.closest('[data-dec]');
      if(dec){ PS.cart.setQty(dec.dataset.dec, (PS.cart.items[dec.dataset.dec] || 0) - 1); return; }
      var del = e.target.closest('[data-del]');
      if(del){
        PS.cart.remove(del.dataset.del);
        PS.toast('Produto removido do carrinho.', 'info');
      }
    });

    if(document.body.dataset.page === 'carrinho') this.renderPage();
  },

  sync: function(){
    PS.layout.setCount('cartCount', PS.cart.count());
    this.renderDrawer();
    if(document.body.dataset.page === 'carrinho') this.renderPage();
  },

  openDrawer: function(){
    this.renderDrawer();
    var d = document.getElementById('cartDrawer');
    d.classList.add('open');
    d.setAttribute('aria-hidden', 'false');
    document.getElementById('scrim').classList.add('show');
    PS.lock();
  },

  renderDrawer: function(){
    var body = document.getElementById('drawerBody');
    var foot = document.getElementById('drawerFoot');
    if(!body) return;
    var b = PS.layout.base || '';
    var list = PS.cart.list();
    if(!list.length){
      body.innerHTML = '<div class="empty-state" style="box-shadow:none;padding:40px 10px">' +
        '<div class="e-icon">' + PS.icon('cart') + '</div>' +
        '<h2>Seu carrinho está vazio</h2><p>Que tal começar pelas ofertas?</p></div>';
      foot.innerHTML = '<a class="btn btn-primary btn-block" href="' + b + 'pages/busca.html?ofertas=1">Ver ofertas</a>';
      return;
    }
    body.innerHTML = list.map(function(l){
      return '<div class="d-line">' +
        '<a class="d-thumb h-' + l.p.hue + '" href="' + b + 'pages/produto.html?id=' + l.p.id + '" aria-label="' + PS.esc(l.p.nome) + '">' + PS.icon(l.p.icon) + '</a>' +
        '<div class="d-info"><strong>' + PS.esc(l.p.nome) + '</strong><span>' + PS.money(l.p.preco) + ' cada</span></div>' +
        '<div class="d-right"><strong>' + PS.money(l.p.preco * l.qty) + '</strong>' +
          '<span class="d-qty"><button data-dec="' + l.p.id + '" aria-label="Diminuir quantidade">' + PS.icon('minus') + '</button><b>' + l.qty + '</b><button data-inc="' + l.p.id + '" aria-label="Aumentar quantidade">' + PS.icon('plus') + '</button></span>' +
          '<button class="d-remove" data-del="' + l.p.id + '" aria-label="Remover ' + PS.esc(l.p.nome) + '">' + PS.icon('trash') + '</button>' +
        '</div></div>';
    }).join('');
    foot.innerHTML = '<div class="drawer-total"><span>Subtotal</span><span>' + PS.money(PS.cart.subtotal()) + '</span></div>' +
      '<a class="btn btn-dark btn-block" href="' + b + 'pages/carrinho.html">Ver carrinho</a>' +
      '<button class="btn btn-ghost btn-block" data-close-drawer>Continuar comprando</button>';
  },

  /* ------------------------- Página do carrinho ------------------------- */
  renderPage: function(){
    var wrap = document.getElementById('cartWrap');
    if(!wrap) return;
    var b = PS.layout.base || '';
    var list = PS.cart.list();
    if(!list.length){
      wrap.innerHTML = '<div class="empty-state">' +
        '<div class="e-icon">' + PS.icon('cart') + '</div>' +
        '<h2>Seu carrinho está vazio</h2>' +
        '<p>Explore nossas ofertas e encontre algo especial para o seu pet.</p>' +
        '<a class="btn btn-primary" href="' + b + 'pages/busca.html?ofertas=1">Ver ofertas</a> ' +
        '<a class="btn btn-outline-navy" href="' + b + 'index.html">Página inicial</a></div>';
      return;
    }
    var lines = list.map(function(l){
      return '<div class="cart-line">' +
        '<a class="c-thumb h-' + l.p.hue + '" href="' + b + 'pages/produto.html?id=' + l.p.id + '" aria-label="' + PS.esc(l.p.nome) + '">' + PS.icon(l.p.icon) + '</a>' +
        '<div class="c-info"><span class="p-cat">' + PS.animalLabel(l.p.animal) + ' • ' + PS.esc(l.p.sub) + '</span>' +
          '<strong><a href="' + b + 'pages/produto.html?id=' + l.p.id + '">' + PS.esc(l.p.nome) + '</a></strong>' +
          '<span class="qty"><button class="qty-btn" data-dec="' + l.p.id + '" aria-label="Diminuir quantidade">' + PS.icon('minus') + '</button><input value="' + l.qty + '" readonly aria-label="Quantidade"><button class="qty-btn" data-inc="' + l.p.id + '" aria-label="Aumentar quantidade">' + PS.icon('plus') + '</button></span></div>' +
        '<div class="c-right"><strong>' + PS.money(l.p.preco * l.qty) + '</strong>' +
          '<span class="c-unit">' + PS.money(l.p.preco) + ' cada</span>' +
          '<button class="btn btn-danger-ghost btn-sm" data-del="' + l.p.id + '">' + PS.icon('trash') + ' Remover</button></div>' +
      '</div>';
    }).join('');

    var couponBox = PS.cart.coupon
      ? '<div class="coupon-applied">' + PS.icon('tag') + ' ' + PS.cart.coupon + ' (-10%)<button id="couponRemove" aria-label="Remover cupom">' + PS.icon('x') + '</button></div>'
      : '<form class="coupon-form" id="couponForm"><label class="sr-only" for="couponInput">Cupom de desconto</label>' +
        '<input class="input" id="couponInput" placeholder="Cupom (ex: BEMVINDO10)" autocomplete="off"><button class="btn btn-dark btn-sm" type="submit">OK</button></form>';

    wrap.innerHTML =
      '<div class="cart-layout"><div class="cart-items">' + lines +
        '<div style="display:flex;justify-content:space-between;padding:16px 0 10px;flex-wrap:wrap;gap:10px">' +
          '<button class="btn btn-ghost btn-sm" id="btnClearCart">' + PS.icon('trash') + ' Limpar carrinho</button>' +
          '<a class="btn btn-ghost btn-sm" href="' + b + 'index.html">Continuar comprando</a>' +
        '</div></div>' +
      '<div class="cart-summary"><h2>Resumo do pedido</h2>' + couponBox +
        '<form class="cep-form" id="cepForm"><label class="sr-only" for="cepInput">Calcular frete por CEP</label>' +
          '<input class="input" id="cepInput" inputmode="numeric" placeholder="CEP para o frete" maxlength="9" autocomplete="postal-code"><button class="btn btn-outline-navy btn-sm" type="submit">Calcular</button></form>' +
        '<div class="ship-msg" id="shipMsg"></div>' +
        '<div class="sum-row"><span>Subtotal</span><span>' + PS.money(PS.cart.subtotal()) + '</span></div>' +
        (PS.cart.discount() ? '<div class="sum-row discount"><span>Desconto (' + PS.cart.coupon + ')</span><span>−' + PS.money(PS.cart.discount()) + '</span></div>' : '') +
        '<div class="sum-row' + (PS.cart.shipping() === 0 ? ' free' : '') + '"><span>Frete</span><span>' + (PS.cart.shipping() === 0 ? 'Grátis' : PS.money(PS.cart.shipping())) + '</span></div>' +
        '<div class="sum-total"><span>Total</span><span>' + PS.money(PS.cart.total()) + '</span></div>' +
        '<button class="btn btn-primary btn-block btn-lg" id="btnCheckout" style="margin-top:14px">' + PS.icon('lock') + ' Finalizar compra</button>' +
        '<div class="secure-note">' + PS.icon('shield') + ' Compra 100% segura</div>' +
      '</div></div>';

    var cf = document.getElementById('couponForm');
    if(cf) cf.addEventListener('submit', function(e){
      e.preventDefault();
      var code = document.getElementById('couponInput').value;
      if(PS.cart.applyCoupon(code)) PS.toast('Cupom aplicado: 10% de desconto!');
      else PS.toast('Cupom inválido. Tente BEMVINDO10.', 'error');
    });
    var cr = document.getElementById('couponRemove');
    if(cr) cr.addEventListener('click', function(){
      PS.cart.coupon = null; PS.cart.save(); PS.cartUI.sync();
      PS.toast('Cupom removido.', 'info');
    });
    document.getElementById('btnClearCart').addEventListener('click', function(){
      PS.cart.clear();
      PS.toast('Carrinho esvaziado.', 'info');
    });
    document.getElementById('cepForm').addEventListener('submit', function(e){
      e.preventDefault();
      var cep = document.getElementById('cepInput').value.replace(/\D/g, '');
      var msg = document.getElementById('shipMsg');
      if(cep.length < 8){ PS.toast('Digite um CEP válido com 8 números.', 'error'); return; }
      var first = parseInt(cep[0], 10);
      var prazo = first <= 4 ? '2 a 4 dias úteis' : '4 a 7 dias úteis';
      msg.textContent = PS.cart.shipping() === 0
        ? 'Frete GRÁTIS para ' + cep + ' • entrega em ' + prazo + '.'
        : 'Frete ' + PS.money(PS.cart.shipping()) + ' para ' + cep + ' • entrega em ' + prazo + '.';
    });
    document.getElementById('cepInput').addEventListener('input', function(){
      var v = this.value.replace(/\D/g, '').slice(0, 8);
      this.value = v.length > 5 ? v.slice(0, 5) + '-' + v.slice(5) : v;
    });
    document.getElementById('btnCheckout').addEventListener('click', function(){
      PS.checkout.open();
    });
  }
};

/* ------------------------------- Checkout ------------------------------- */
PS.checkout = {
  open: function(){
    var user = PS.auth && PS.auth.current();
    if(!user){
      PS.toast('Entre na sua conta para finalizar a compra.', 'info');
      setTimeout(function(){
        window.location.href = (PS.layout.base || '') + 'pages/login.html?next=' + encodeURIComponent('carrinho.html');
      }, 900);
      return;
    }
    if(!PS.cart.list().length){ PS.toast('Seu carrinho está vazio.', 'error'); return; }
    var addrs = PS.auth.addresses();
    var addrOpts = addrs.map(function(a, i){
      return '<option value="' + i + '">' + PS.esc(a.rotulo) + ' — ' + PS.esc(a.rua) + ', ' + PS.esc(a.numero) + ' (' + PS.esc(a.cidade) + '/' + PS.esc(a.uf) + ')</option>';
    }).join('');

    PS.modal.open({
      title: 'Finalizar compra',
      wide: true,
      body:
        '<h3>1. Endereço de entrega</h3>' +
        (addrs.length
          ? '<div class="field"><label for="coAddr">Escolha um endereço</label><select class="input" id="coAddr" style="width:100%">' + addrOpts + '</select></div>'
          : '<div class="field"><label for="coRua">Rua / Avenida</label><input class="input" id="coRua" placeholder="Ex: Rua das Flores"></div>' +
            '<div class="form-row"><div class="field"><label for="coNum">Número</label><input class="input" id="coNum" placeholder="123"></div>' +
            '<div class="field"><label for="coCep">CEP</label><input class="input" id="coCep" inputmode="numeric" placeholder="00000-000" maxlength="9"></div></div>' +
            '<div class="form-row"><div class="field"><label for="coCid">Cidade</label><input class="input" id="coCid"></div>' +
            '<div class="field"><label for="coUf">UF</label><input class="input" id="coUf" maxlength="2" placeholder="MG"></div></div>') +
        '<h3>2. Pagamento</h3>' +
        '<div class="pay-tabs" role="tablist">' +
          '<button class="pay-tab active" id="tabCard" role="tab" aria-selected="true">' + PS.icon('card') + ' Cartão</button>' +
          '<button class="pay-tab" id="tabPix" role="tab" aria-selected="false">' + PS.icon('pix') + ' Pix</button>' +
        '</div>' +
        '<div id="paneCard">' +
          '<div class="field"><label for="ccNum">Número do cartão</label><input class="input" id="ccNum" inputmode="numeric" placeholder="0000 0000 0000 0000" maxlength="19"></div>' +
          '<div class="field"><label for="ccNome">Nome impresso no cartão</label><input class="input" id="ccNome" placeholder="Como está no cartão"></div>' +
          '<div class="form-row"><div class="field"><label for="ccVal">Validade</label><input class="input" id="ccVal" inputmode="numeric" placeholder="MM/AA" maxlength="5"></div>' +
          '<div class="field"><label for="ccCvv">CVV</label><input class="input" id="ccCvv" inputmode="numeric" placeholder="123" maxlength="4"></div></div>' +
        '</div>' +
        '<div id="panePix" hidden>' +
          '<div class="pix-box"><p style="margin:0"><strong>Escaneie ou copie o código Pix</strong><br>Pedido reservado por 30 minutos.</p>' +
          '<div class="pix-code"><input class="input" id="pixCode" readonly value="00020126580014BR.GOV.BCB.PIX0136patasepelos-pagamentos@petshop.com520400005303986540' + PS.cart.total().toFixed(2) + '5802BR5913PATASPELos6009SAO PAULO62070503***6304A1B2"><button class="btn btn-dark btn-sm" id="btnCopyPix" type="button">' + PS.icon('copy') + ' Copiar</button></div></div>' +
        '</div>' +
        '<h3>3. Resumo</h3>' +
        '<div class="sum-row"><span>' + PS.cart.count() + ' itens</span><span>' + PS.money(PS.cart.subtotal()) + '</span></div>' +
        (PS.cart.discount() ? '<div class="sum-row discount"><span>Desconto</span><span>−' + PS.money(PS.cart.discount()) + '</span></div>' : '') +
        '<div class="sum-row"><span>Frete</span><span>' + (PS.cart.shipping() === 0 ? 'Grátis' : PS.money(PS.cart.shipping())) + '</span></div>' +
        '<div class="sum-total"><span>Total</span><span>' + PS.money(PS.cart.total()) + '</span></div>' +
        '<button class="btn btn-primary btn-block btn-lg" id="btnConfirmOrder" style="margin-top:16px">' + PS.icon('lock') + ' Confirmar pedido • ' + PS.money(PS.cart.total()) + '</button>',
      onOpen: function(scope){ PS.checkout.bind(scope); }
    });
  },

  bind: function(scope){
    var method = 'cartao';
    var tabCard = scope.querySelector('#tabCard');
    var tabPix = scope.querySelector('#tabPix');
    var paneCard = scope.querySelector('#paneCard');
    var panePix = scope.querySelector('#panePix');
    tabCard.addEventListener('click', function(){
      method = 'cartao';
      tabCard.classList.add('active'); tabPix.classList.remove('active');
      tabCard.setAttribute('aria-selected', 'true'); tabPix.setAttribute('aria-selected', 'false');
      paneCard.hidden = false; panePix.hidden = true;
    });
    tabPix.addEventListener('click', function(){
      method = 'pix';
      tabPix.classList.add('active'); tabCard.classList.remove('active');
      tabPix.setAttribute('aria-selected', 'true'); tabCard.setAttribute('aria-selected', 'false');
      panePix.hidden = false; paneCard.hidden = true;
    });
    /* Máscaras */
    var ccNum = scope.querySelector('#ccNum');
    ccNum.addEventListener('input', function(){
      this.value = this.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    });
    var ccVal = scope.querySelector('#ccVal');
    ccVal.addEventListener('input', function(){
      var v = this.value.replace(/\D/g, '').slice(0, 4);
      this.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v;
    });
    scope.querySelector('#ccCvv').addEventListener('input', function(){
      this.value = this.value.replace(/\D/g, '').slice(0, 4);
    });
    var cepEl = scope.querySelector('#coCep');
    if(cepEl) cepEl.addEventListener('input', function(){
      var v = this.value.replace(/\D/g, '').slice(0, 8);
      this.value = v.length > 5 ? v.slice(0, 5) + '-' + v.slice(5) : v;
    });
    scope.querySelector('#btnCopyPix').addEventListener('click', function(){
      var code = scope.querySelector('#pixCode');
      code.select();
      var done = function(){ PS.toast('Código Pix copiado!'); };
      if(navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(code.value).then(done, function(){ document.execCommand('copy'); done(); });
      else { document.execCommand('copy'); done(); }
    });

    scope.querySelector('#btnConfirmOrder').addEventListener('click', function(){
      /* Endereço */
      var addrText;
      var sel = scope.querySelector('#coAddr');
      if(sel){ addrText = sel.options[sel.selectedIndex].text; }
      else {
        var rua = scope.querySelector('#coRua').value.trim();
        var num = scope.querySelector('#coNum').value.trim();
        var cid = scope.querySelector('#coCid').value.trim();
        var uf = scope.querySelector('#coUf').value.trim().toUpperCase();
        var cep = scope.querySelector('#coCep').value.trim();
        if(rua.length < 3 || !num || cid.length < 2 || uf.length !== 2 || cep.replace(/\D/g, '').length < 8){
          PS.toast('Confira o endereço de entrega.', 'error'); return;
        }
        addrText = rua + ', ' + num + ' — ' + cid + '/' + uf + ' (' + cep + ')';
      }
      /* Pagamento */
      if(method === 'cartao'){
        var num = ccNum.value.replace(/\D/g, '');
        var nome = scope.querySelector('#ccNome').value.trim();
        var val = ccVal.value;
        var cvv = scope.querySelector('#ccCvv').value;
        var m = val.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
        var okVal = false;
        if(m){
          var exp = new Date(2000 + parseInt(m[2], 10), parseInt(m[1], 10));
          okVal = exp > new Date();
        }
        if(num.length !== 16){ PS.toast('Número do cartão inválido.', 'error'); return; }
        if(nome.length < 3){ PS.toast('Informe o nome impresso no cartão.', 'error'); return; }
        if(!okVal){ PS.toast('Validade do cartão inválida.', 'error'); return; }
        if(cvv.length < 3){ PS.toast('CVV inválido.', 'error'); return; }
      }
      PS.checkout.finish(method, addrText);
    });
  },

  finish: function(method, addrText){
    var user = PS.auth.current();
    var order = {
      id: 'PS' + Date.now().toString(36).toUpperCase(),
      email: user.email,
      data: new Date().toISOString(),
      itens: PS.cart.list().map(function(l){ return { id: l.p.id, nome: l.p.nome, qty: l.qty, preco: l.p.preco }; }),
      subtotal: PS.cart.subtotal(),
      desconto: PS.cart.discount(),
      frete: PS.cart.shipping(),
      total: PS.cart.total(),
      pagamento: method === 'pix' ? 'Pix' : 'Cartão de crédito',
      endereco: addrText,
      status: 'Em preparação'
    };
    var orders = [];
    try { orders = JSON.parse(localStorage.getItem('pp_orders_v1')) || []; } catch(e){}
    orders.unshift(order);
    localStorage.setItem('pp_orders_v1', JSON.stringify(orders));
    PS.cart.clear();
    var b = PS.layout.base || '';
    PS.modal.open({
      title: 'Pedido confirmado!',
      body: '<div class="order-success">' +
        '<div class="ok-icon">' + PS.icon('check') + '</div>' +
        '<h3>Obrigado pela compra, ' + PS.esc(user.nome.split(' ')[0]) + '!</h3>' +
        '<p>Enviamos os detalhes para <strong>' + PS.esc(user.email) + '</strong>.</p>' +
        '<div class="order-num">Pedido ' + order.id + '</div>' +
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
          '<a class="btn btn-dark" href="' + b + 'pages/perfil.html">Acompanhar pedido</a>' +
          '<a class="btn btn-outline-navy" href="' + b + 'index.html">Voltar à loja</a>' +
        '</div></div>'
    });
  }
};
