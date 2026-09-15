/* ============================================================
   Patas & Pelos Pet Shop — Página do produto (product.js)
   ============================================================ */
window.PS = window.PS || {};

PS.recents = {
  get: function(){
    try { return (JSON.parse(localStorage.getItem('pp_recents_v1')) || []).filter(function(id){ return PS.prodById(id); }); }
    catch(e){ return []; }
  },
  push: function(id){
    var r = this.get().filter(function(x){ return x !== id; });
    r.unshift(id);
    localStorage.setItem('pp_recents_v1', JSON.stringify(r.slice(0, 8)));
  }
};

var REVIEW_POOL = [
  { nome: 'Mariana S.', nota: 5, texto: 'Chegou rapidinho e muito bem embalado. Meu pet adorou, recomendo demais!' },
  { nome: 'Carlos H.', nota: 5, texto: 'Qualidade excelente, exatamente como nas fotos. Virei cliente fiel da loja.' },
  { nome: 'Fernanda L.', nota: 4, texto: 'Muito bom! Só achei a entrega um pouquinho demorada, mas o produto é ótimo.' },
  { nome: 'João P.', nota: 5, texto: 'Melhor custo-benefício que encontrei. Já é a terceira vez que compro.' },
  { nome: 'Patrícia M.', nota: 5, texto: 'Meu pet se adaptou na hora. Atendimento da loja também é nota dez.' },
  { nome: 'Rafael T.', nota: 4, texto: 'Bom produto, cumpre o que promete. Recomendo para quem está em dúvida.' }
];

function seedReviews(id){
  var h = 0;
  for(var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  var out = [];
  for(var k = 0; k < 3; k++) out.push(REVIEW_POOL[(h + k * 2) % REVIEW_POOL.length]);
  return out;
}

function userReviews(id){
  try {
    var all = JSON.parse(localStorage.getItem('pp_reviews_v1')) || {};
    return all[id] || [];
  } catch(e){ return []; }
}

PS.productUI = {
  init: function(){
    if(document.body.dataset.page !== 'produto') return;
    var id = new URLSearchParams(window.location.search).get('id');
    var p = PS.prodById(id);
    var wrap = document.getElementById('pdWrap');
    var b = PS.layout.base || '';
    if(!p){
      wrap.innerHTML = '<div class="empty-state" style="margin-top:34px">' +
        '<div class="e-icon">' + PS.icon('box') + '</div>' +
        '<h2>Produto não encontrado</h2><p>Este produto não existe ou foi removido.</p>' +
        '<a class="btn btn-primary" href="' + b + 'pages/busca.html?ofertas=1">Ver ofertas</a></div>';
      return;
    }
    document.title = p.nome + ' — Patas & Pelos Pet Shop';
    PS.recents.push(p.id);
    this.render(wrap, p, b);
  },

  render: function(wrap, p, b){
    var self = this;
    var desc = PS.desconto(p);
    var parc = PS.parcela(p.preco);
    var badge = desc ? '<span class="p-badge">-' + desc + '%</span>'
      : (p.selo ? '<span class="p-badge tag">' + p.selo + '</span>' : '');

    var related = PS.PRODUCTS
      .filter(function(x){ return x.id !== p.id && (x.animal === p.animal || x.cat === p.cat); })
      .sort(function(a, x){
        var sa = (a.animal === p.animal ? 2 : 0) + (a.cat === p.cat ? 1 : 0);
        var sb = (x.animal === p.animal ? 2 : 0) + (x.cat === p.cat ? 1 : 0);
        return sb - sa || x.vendidos - a.vendidos;
      }).slice(0, 4);

    var recents = PS.recents.get().filter(function(id){ return id !== p.id; }).slice(0, 4)
      .map(function(id){ return PS.prodById(id); }).filter(Boolean);

    wrap.innerHTML =
      '<nav class="crumbs" aria-label="Caminho"><a href="' + b + 'index.html">Início</a>' + PS.icon('chev-right') +
      '<a href="' + b + 'pages/busca.html?animal=' + (p.animal === 'todos' ? 'todos' : p.animal) + '">' + PS.animalLabel(p.animal) + '</a>' + PS.icon('chev-right') +
      '<span aria-current="page">' + PS.esc(p.nome) + '</span></nav>' +
      '<div class="pd-grid">' +
        '<div class="pd-media h-' + p.hue + '">' + badge +
          PS.icon(p.icon, 'p-icon') +
          '<button class="p-fav" data-fav="' + p.id + '" aria-label="Adicionar aos favoritos">' + PS.icon('heart') + '</button>' +
        '</div>' +
        '<div class="pd-info"><span class="p-cat">' + PS.animalLabel(p.animal) + ' • ' + PS.esc(p.sub) + '</span>' +
          '<h1>' + PS.esc(p.nome) + '</h1>' +
          '<div class="pd-rating">' + PS.ui.stars(p.aval) + '<strong>' + String(p.aval).replace('.', ',') + '</strong><a href="#avaliacoes">' + p.reviews + ' avaliações</a></div>' +
          '<div class="pd-price">' +
            (p.antigo ? '<span class="old">' + PS.money(p.antigo) + '</span>' : '') +
            '<strong>' + PS.money(p.preco) + '</strong>' +
            '<span class="parc">em até ' + parc.n + 'x de ' + PS.money(parc.v) + ' sem juros</span>' +
            '<span class="pix">' + PS.money(p.preco * 0.95) + ' no Pix (5% off aplicado no checkout)</span>' +
          '</div>' +
          '<p class="pd-desc">' + PS.esc(p.desc) + '</p>' +
          '<div class="pd-actions"><span class="qty"><button class="qty-btn" id="qMinus" aria-label="Diminuir quantidade">' + PS.icon('minus') + '</button><input id="pdQty" value="1" readonly aria-label="Quantidade"><button class="qty-btn" id="qPlus" aria-label="Aumentar quantidade">' + PS.icon('plus') + '</button></span>' +
          '<button class="btn btn-dark btn-lg" id="btnPdAdd">' + PS.icon('cart') + ' Adicionar</button></div>' +
          '<div class="pd-buyrow"><button class="btn btn-primary btn-block btn-lg" id="btnPdBuy">Comprar agora</button></div>' +
          '<div class="pd-mini"><div>' + PS.icon('truck') + ' Frete grátis acima de R$149</div><div>' + PS.icon('refresh') + ' Troca fácil em 7 dias</div><div>' + PS.icon('shield') + ' Compra protegida</div></div>' +
          '<div class="pd-meta"><span>SKU: <strong>' + p.id.toUpperCase() + '</strong></span>' +
          '<span>Categoria: <strong>' + PS.catLabel(p.cat) + '</strong></span>' +
          '<span>Indicado para: <strong>' + PS.animalLabel(p.animal) + '</strong></span></div>' +
          '<button class="pd-share" id="btnShare">' + PS.icon('share') + ' Compartilhar produto</button>' +
        '</div>' +
      '</div>' +
      '<div class="tabs" role="tablist">' +
        '<button class="tab-btn active" data-tab="tDesc" role="tab" aria-selected="true">Descrição</button>' +
        '<button class="tab-btn" data-tab="tDet" role="tab" aria-selected="false">Detalhes</button>' +
        '<button class="tab-btn" data-tab="tRev" role="tab" aria-selected="false" id="tabRev">Avaliações (' + p.reviews + ')</button>' +
      '</div>' +
      '<div class="tab-panel active" id="tDesc"><div class="panel"><h2>Sobre este produto</h2>' +
        '<p style="color:var(--muted);margin-bottom:14px">' + PS.esc(p.desc) + '</p>' +
        '<ul class="check-list">' + p.detalhes.map(function(d){ return '<li>' + PS.icon('check-circle') + ' ' + PS.esc(d) + '</li>'; }).join('') + '</ul></div></div>' +
      '<div class="tab-panel" id="tDet"><table class="spec"><tbody>' +
        '<tr><th>SKU</th><td>' + p.id.toUpperCase() + '</td></tr>' +
        '<tr><th>Indicado para</th><td>' + PS.animalLabel(p.animal) + '</td></tr>' +
        '<tr><th>Categoria</th><td>' + PS.catLabel(p.cat) + ' — ' + PS.esc(p.sub) + '</td></tr>' +
        '<tr><th>Linha</th><td>Patas &amp; Pelos Selection</td></tr>' +
        '<tr><th>Garantia</th><td>7 dias para troca + garantia contra defeitos</td></tr>' +
      '</tbody></table></div>' +
      '<div class="tab-panel" id="tRev"><div id="avaliacoes">' +
        '<div class="rev-summary"><div class="rev-avg">' + String(p.aval).replace('.', ',') + '<small>' + p.reviews + ' avaliações</small></div>' + PS.ui.stars(p.aval, 'lg') + '</div>' +
        '<div id="revList"></div>' +
        '<form class="rev-form" id="revForm"><h3>Deixe sua avaliação</h3>' +
          '<div class="field"><label for="rvNome">Seu nome</label><input class="input" id="rvNome" maxlength="40"><span class="err"></span></div>' +
          '<div class="field"><label>Sua nota</label><div class="star-input" role="radiogroup" aria-label="Nota de 1 a 5">' +
            [5, 4, 3, 2, 1].map(function(n){ return '<input type="radio" name="rvNota" id="rv' + n + '" value="' + n + '"' + (n === 5 ? ' checked' : '') + '><label for="rv' + n + '" title="' + n + ' estrelas">' + PS.icon('star', 'fill') + '</label>'; }).join('') +
          '</div></div>' +
          '<div class="field"><label for="rvTexto">Seu comentário</label><textarea class="input" id="rvTexto" maxlength="500" placeholder="Conte o que você (e seu pet) acharam..."></textarea><span class="err"></span></div>' +
          '<button class="btn btn-primary" type="submit">Publicar avaliação</button></form>' +
      '</div></div>' +
      '<section class="section-sm" aria-label="Produtos relacionados"><div class="sec-head"><div><span class="kicker">Combine com</span><h2>Produtos relacionados</h2></div></div>' +
        '<div class="grid-products">' + related.map(function(r, i){ return PS.ui.cardHTML(r, i); }).join('') + '</div></section>' +
      (recents.length ? '<section class="section-sm" aria-label="Vistos recentemente"><div class="sec-head"><div><span class="kicker">Histórico</span><h2>Vistos recentemente</h2></div><button class="sec-link" id="btnClearRec">Limpar ' + PS.icon('trash') + '</button></div>' +
        '<div class="grid-products">' + recents.map(function(r, i){ return PS.ui.cardHTML(r, i); }).join('') + '</div></section>' : '');

    /* Abas */
    wrap.querySelectorAll('.tab-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        wrap.querySelectorAll('.tab-btn').forEach(function(x){
          x.classList.toggle('active', x === btn);
          x.setAttribute('aria-selected', x === btn);
        });
        wrap.querySelectorAll('.tab-panel').forEach(function(t){
          t.classList.toggle('active', t.id === btn.dataset.tab);
        });
      });
    });

    /* Quantidade */
    var qty = wrap.querySelector('#pdQty');
    wrap.querySelector('#qMinus').addEventListener('click', function(){ qty.value = Math.max(1, parseInt(qty.value, 10) - 1); });
    wrap.querySelector('#qPlus').addEventListener('click', function(){ qty.value = Math.min(99, parseInt(qty.value, 10) + 1); });

    wrap.querySelector('#btnPdAdd').addEventListener('click', function(){
      PS.cart.add(p.id, parseInt(qty.value, 10));
      PS.cartUI.openDrawer();
    });
    wrap.querySelector('#btnPdBuy').addEventListener('click', function(){
      PS.cart.add(p.id, parseInt(qty.value, 10));
      window.location.href = b + 'pages/carrinho.html';
    });
    wrap.querySelector('#btnShare').addEventListener('click', function(){
      var url = window.location.href;
      var data = { title: p.nome, text: p.nome + ' — Patas & Pelos Pet Shop', url: url };
      if(navigator.share){ navigator.share(data).catch(function(){}); }
      else if(navigator.clipboard){
        navigator.clipboard.writeText(url).then(function(){ PS.toast('Link copiado!'); });
      } else { PS.toast('Copie o link da barra de endereços.', 'info'); }
    });

    var clr = wrap.querySelector('#btnClearRec');
    if(clr) clr.addEventListener('click', function(){
      localStorage.removeItem('pp_recents_v1');
      self.render(wrap, p, b);
      PS.ui.reveal(wrap);
      PS.fav.syncHearts();
    });

    /* Avaliações */
    var renderRevs = function(){
      var all = userReviews(p.id).concat(seedReviews(p.id));
      wrap.querySelector('#revList').innerHTML = all.map(function(r){
        var ini = r.nome.trim().split(/\s+/).map(function(w){ return w[0]; }).slice(0, 2).join('').toUpperCase();
        return '<div class="rev-item"><div class="rev-head"><div class="avatar">' + PS.esc(ini) + '</div>' +
          '<div><strong>' + PS.esc(r.nome) + '</strong>' + PS.ui.stars(r.nota) + '</div></div><p>' + PS.esc(r.texto) + '</p></div>';
      }).join('');
    };
    renderRevs();

    var user = PS.auth.current();
    if(user) wrap.querySelector('#rvNome').value = user.nome;
    wrap.querySelector('#revForm').addEventListener('submit', function(e){
      e.preventDefault();
      var nome = wrap.querySelector('#rvNome');
      var texto = wrap.querySelector('#rvTexto');
      var ok = true;
      ok = PS.authUI.setErr(nome, nome.value.trim().length < 2 ? 'Informe seu nome.' : null) && ok;
      ok = PS.authUI.setErr(texto, texto.value.trim().length < 4 ? 'Escreva um comentário.' : null) && ok;
      if(!ok) return;
      var nota = parseInt((wrap.querySelector('input[name="rvNota"]:checked') || {}).value || '5', 10);
      var all = {};
      try { all = JSON.parse(localStorage.getItem('pp_reviews_v1')) || {}; } catch(err){}
      all[p.id] = all[p.id] || [];
      all[p.id].unshift({ nome: nome.value.trim(), nota: nota, texto: texto.value.trim() });
      localStorage.setItem('pp_reviews_v1', JSON.stringify(all));
      texto.value = '';
      renderRevs();
      PS.toast('Avaliação publicada. Obrigado!');
    });

    PS.ui.reveal(wrap);
    PS.fav.syncHearts();
  }
};
