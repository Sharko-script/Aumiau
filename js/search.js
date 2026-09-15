/* ============================================================
   Patas & Pelos Pet Shop — Busca e filtros (search.js)
   ============================================================ */
window.PS = window.PS || {};

PS.search = {
  norm: function(s){
    return String(s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  },

  query: function(q){
    var terms = this.norm(q).split(/\s+/).filter(function(t){ return t.length > 1; });
    if(!terms.length) return PS.PRODUCTS.slice();
    var scored = PS.PRODUCTS.map(function(p){
      var nome = PS.search.norm(p.nome);
      var tags = PS.search.norm(p.tags + ' ' + p.sub + ' ' + PS.catLabel(p.cat) + ' ' + PS.ANIMAIS[p.animal] + ' ' + PS.ANIMAL_SINGULAR[p.animal]);
      var score = 0;
      terms.forEach(function(t){
        if(nome.indexOf(t) > -1) score += 3;
        if(tags.indexOf(t) > -1) score += 2;
      });
      return { p: p, s: score };
    }).filter(function(r){ return r.s > 0; });
    scored.sort(function(a, b){ return b.s - a.s || b.p.vendidos - a.p.vendidos; });
    return scored.map(function(r){ return r.p; });
  }
};

PS.searchUI = {
  init: function(){
    this.initStrip();
    if(document.body.dataset.page === 'busca') this.initPage();
  },

  /* -------- Faixa de busca da home (sugestões ao vivo) -------- */
  initStrip: function(){
    var input = document.getElementById('buscaInput');
    if(!input) return;
    var b = PS.layout.base || '';
    var box = document.getElementById('searchSug');
    var clear = document.getElementById('searchClear');
    var timer = null;

    var go = function(){
      var q = input.value.trim();
      window.location.href = b + 'pages/busca.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    };
    document.getElementById('buscaForm').addEventListener('submit', function(e){
      e.preventDefault();
      go();
    });
    document.querySelectorAll('.qchip').forEach(function(c){
      c.addEventListener('click', function(){
        window.location.href = b + 'pages/busca.html?q=' + encodeURIComponent(c.dataset.q);
      });
    });

    input.addEventListener('input', function(){
      var q = input.value.trim();
      clear.classList.toggle('show', q.length > 0);
      clearTimeout(timer);
      if(q.length < 2){ box.classList.remove('show'); box.innerHTML = ''; return; }
      box.classList.add('show');
      box.innerHTML = '<div class="sug-loading">Buscando...</div>';
      timer = setTimeout(function(){
        var res = PS.search.query(q).slice(0, 6);
        if(!res.length){
          box.innerHTML = '<div class="sug-empty">Nenhum produto para &ldquo;' + PS.esc(q) + '&rdquo;</div>';
          return;
        }
        box.innerHTML = res.map(function(p){
          return '<button type="button" class="sug-item" data-id="' + p.id + '">' +
            '<span class="sug-thumb h-' + p.hue + '">' + PS.icon(p.icon) + '</span>' +
            '<span><strong>' + PS.esc(p.nome) + '</strong><span>' + PS.animalLabel(p.animal) + ' • ' + PS.esc(p.sub) + '</span></span>' +
            '<span class="sug-price">' + PS.money(p.preco) + '</span></button>';
        }).join('') + '<button type="button" class="sug-all">Ver todos os resultados</button>';
        box.querySelectorAll('.sug-item').forEach(function(it){
          it.addEventListener('click', function(){
            window.location.href = b + 'pages/produto.html?id=' + it.dataset.id;
          });
        });
        box.querySelector('.sug-all').addEventListener('click', go);
      }, 200);
    });

    input.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ box.classList.remove('show'); input.blur(); }
    });
    document.addEventListener('click', function(e){
      if(!e.target.closest('.search-box')) box.classList.remove('show');
    });
    clear.addEventListener('click', function(){
      input.value = '';
      clear.classList.remove('show');
      box.classList.remove('show');
      input.focus();
    });
  },

  /* ------------------- Página de resultados ------------------- */
  initPage: function(){
    var params = new URLSearchParams(window.location.search);
    var state = {
      q: params.get('q') || '',
      animal: params.get('animal') || 'todos',
      cat: params.get('cat') || 'todas',
      preco: params.get('preco') || 'any',
      ofertas: params.get('ofertas') === '1',
      sort: params.get('sort') || 'rel'
    };
    if(state.ofertas && !state.q && !params.get('animal') && !params.get('cat')){
      document.querySelectorAll('[data-nav="ofertas"]').forEach(function(a){ a.classList.add('active'); });
    }

    var input = document.getElementById('buscaPageInput');
    var grid = document.getElementById('buscaGrid');
    var count = document.getElementById('buscaCount');
    var title = document.getElementById('buscaTitle');
    input.value = state.q;

    /* Chips de animal */
    var animals = [['todos', 'Todos'], ['cachorro', 'Cachorro'], ['gato', 'Gato'], ['passaro', 'Pássaro'], ['peixe', 'Peixe'], ['hamster', 'Hamster']];
    document.getElementById('fAnimals').innerHTML = animals.map(function(a){
      return '<button type="button" class="chip' + (state.animal === a[0] ? ' active' : '') + '" data-v="' + a[0] + '" aria-pressed="' + (state.animal === a[0]) + '">' + a[1] + '</button>';
    }).join('');

    var catSel = document.getElementById('fCat');
    catSel.innerHTML = '<option value="todas">Todas as categorias</option>' +
      Object.keys(PS.CATS).map(function(k){
        return '<option value="' + k + '"' + (state.cat === k ? ' selected' : '') + '>' + PS.CATS[k] + '</option>';
      }).join('');

    var prices = [['any', 'Qualquer preço'], ['p1', 'Até R$50'], ['p2', 'R$50 – R$100'], ['p3', 'R$100 – R$200'], ['p4', 'Acima de R$200']];
    document.getElementById('fPrice').innerHTML = prices.map(function(pr){
      return '<button type="button" class="chip' + (state.preco === pr[0] ? ' active' : '') + '" data-v="' + pr[0] + '" aria-pressed="' + (state.preco === pr[0]) + '">' + pr[1] + '</button>';
    }).join('');

    var sortSel = document.getElementById('fSort');
    sortSel.value = state.sort;
    var offChip = document.getElementById('fOfertas');
    offChip.classList.toggle('active', state.ofertas);
    offChip.setAttribute('aria-pressed', state.ofertas);

    var inRange = function(p){
      if(state.preco === 'p1') return p.preco <= 50;
      if(state.preco === 'p2') return p.preco > 50 && p.preco <= 100;
      if(state.preco === 'p3') return p.preco > 100 && p.preco <= 200;
      if(state.preco === 'p4') return p.preco > 200;
      return true;
    };

    var render = function(){
      var list = PS.search.query(state.q).filter(function(p){
        if(state.animal !== 'todos' && p.animal !== state.animal && p.animal !== 'todos') return false;
        if(state.cat !== 'todas' && p.cat !== state.cat) return false;
        if(state.ofertas && !p.antigo) return false;
        return inRange(p);
      });
      list = PS.ui.sortList(list, state.sort);

      if(state.q) title.innerHTML = 'Resultados para &ldquo;' + PS.esc(state.q) + '&rdquo;';
      else if(state.ofertas && state.animal === 'todos' && state.cat === 'todas') title.textContent = 'Ofertas da semana';
      else title.textContent = 'Todos os produtos';

      count.textContent = list.length === 1 ? '1 produto encontrado' : list.length + ' produtos encontrados';

      if(!list.length){
        var b = PS.layout.base || '';
        grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">' +
          '<div class="e-icon">' + PS.icon('search') + '</div>' +
          '<h2>Nada por aqui... ainda</h2>' +
          '<p>Não encontramos produtos com esses filtros. Tente outra palavra ou limpe os filtros.</p>' +
          '<button class="btn btn-primary" id="btnClearEmpty">Limpar busca e filtros</button> ' +
          '<a class="btn btn-outline-navy" href="' + b + 'index.html">Página inicial</a></div>';
        document.getElementById('btnClearEmpty').addEventListener('click', clearAll);
        return;
      }
      grid.innerHTML = list.map(function(p, i){ return PS.ui.cardHTML(p, i); }).join('');
      PS.ui.reveal(grid);
      PS.fav.syncHearts();
    };

    var clearAll = function(){
      state = { q: '', animal: 'todos', cat: 'todas', preco: 'any', ofertas: false, sort: 'rel' };
      input.value = '';
      document.querySelectorAll('#fAnimals .chip').forEach(function(c){
        c.classList.toggle('active', c.dataset.v === 'todos');
      });
      catSel.value = 'todas';
      document.querySelectorAll('#fPrice .chip').forEach(function(c){
        c.classList.toggle('active', c.dataset.v === 'any');
      });
      sortSel.value = 'rel';
      offChip.classList.remove('active');
      render();
    };

    document.getElementById('buscaForm').addEventListener('submit', function(e){
      e.preventDefault();
      state.q = input.value.trim();
      render();
    });
    document.getElementById('fAnimals').addEventListener('click', function(e){
      var c = e.target.closest('.chip');
      if(!c) return;
      state.animal = c.dataset.v;
      this.querySelectorAll('.chip').forEach(function(x){
        x.classList.toggle('active', x === c);
        x.setAttribute('aria-pressed', x === c);
      });
      render();
    });
    catSel.addEventListener('change', function(){ state.cat = this.value; render(); });
    document.getElementById('fPrice').addEventListener('click', function(e){
      var c = e.target.closest('.chip');
      if(!c) return;
      state.preco = c.dataset.v;
      this.querySelectorAll('.chip').forEach(function(x){
        x.classList.toggle('active', x === c);
        x.setAttribute('aria-pressed', x === c);
      });
      render();
    });
    sortSel.addEventListener('change', function(){ state.sort = this.value; render(); });
    offChip.addEventListener('click', function(){
      state.ofertas = !state.ofertas;
      offChip.classList.toggle('active', state.ofertas);
      offChip.setAttribute('aria-pressed', state.ofertas);
      render();
    });
    document.getElementById('btnClearFilters').addEventListener('click', clearAll);

    render();
  }
};
