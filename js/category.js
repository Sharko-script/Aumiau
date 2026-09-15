/* ============================================================
   Patas & Pelos Pet Shop — Páginas de categoria (category.js)
   Conteúdo exclusivo de cada animal / tipo de produto.
   ============================================================ */
window.PS = window.PS || {};

PS.CATEGORY_INFO = {
  cachorro: {
    titulo: 'Tudo para Cachorros', icon: 'dog', hue: 'gold',
    desc: 'Rações, petiscos, brinquedos, caminhas, coleiras, guias e higiene: o enxoval completo para cães de todos os portes e idades.',
    dicas: [
      { icon: 'racao', t: 'Ração na medida', d: 'Siga a porção indicada na embalagem conforme o peso e ajuste com o veterinário.' },
      { icon: 'guia', t: 'Passeios diários', d: 'Cães precisam de ao menos 30 minutos de passeio por dia para gastar energia.' },
      { icon: 'shampoo', t: 'Banho regular', d: 'Dê banho a cada 15–30 dias com shampoo próprio para cães.' },
      { icon: 'bolinha', t: 'Brinque todo dia', d: 'Brinquedos evitam estresse, ansiedade e móveis destruídos.' }
    ],
    promo: { t: 'Monte o enxoval do seu cão', p: 'Caminhas, comedouros e acessórios com até 20% OFF.', btn: 'Ver acessórios', link: 'acessorios.html' }
  },
  gato: {
    titulo: 'Tudo para Gatos', icon: 'cat', hue: 'purple',
    desc: 'Rações, sachês, areias, arranhadores, fontes de água e brinquedos para gatos felizes, ativos e saudáveis.',
    dicas: [
      { icon: 'fonte', t: 'Água sempre fresca', d: 'Gatos bebem mais água corrente: fontes ajudam a prevenir problemas urinários.' },
      { icon: 'arranhador', t: 'Arranhar é natural', d: 'Ofereça arranhadores de sisal e salve seu sofá das unhas afiadas.' },
      { icon: 'areia', t: 'Caixa sempre limpa', d: 'Limpe a caixa de areia todos os dias e troque a areia semanalmente.' },
      { icon: 'varinha', t: 'Caça diária', d: '15 minutos de brincadeira com varinha combatem o sedentarismo.' }
    ],
    promo: { t: 'Enriqueça o ambiente', p: 'Arranhadores, tocas e prateleiras para o seu gato escalar e descansar.', btn: 'Ver acessórios', link: 'acessorios.html' }
  },
  passaro: {
    titulo: 'Tudo para Pássaros', icon: 'bird', hue: 'teal',
    desc: 'Sementes selecionadas, gaiolas, poleiros, brinquedos e suplementos para calopsitas, periquitos, canários e mais.',
    dicas: [
      { icon: 'alpiste', t: 'Alimentação variada', d: 'Combine sementes com ração extrusada, frutas e legumes liberados.' },
      { icon: 'gaiola', t: 'Espaço para voar', d: 'A gaiola deve permitir que a ave abra as asas sem encostar nas grades.' },
      { icon: 'banheira', t: 'Banho de sol e água', d: 'Ofereça banhos e sol da manhã para penas saudáveis e bonitas.' },
      { icon: 'escada', t: 'Distração diária', d: 'Brinquedos evitam penas arrancadas por tédio e estresse.' }
    ],
    promo: { t: 'Lar novo para sua ave', p: 'Gaiolas completas com poleiros, comedouros e bebedouros.', btn: 'Ver gaiolas e acessórios', link: 'acessorios.html' }
  },
  peixe: {
    titulo: 'Tudo para Peixes', icon: 'fish', hue: 'blue',
    desc: 'Aquários completos, rações, filtros, condicionadores e decoração para um aquário saudável e cristalino.',
    dicas: [
      { icon: 'gota', t: 'Trate a água', d: 'Use condicionador a cada troca para neutralizar o cloro da torneira.' },
      { icon: 'filtro', t: 'Filtragem sempre', d: 'Mantenha o filtro ligado 24h para água cristalina e peixes saudáveis.' },
      { icon: 'pote', t: 'Comida na medida', d: 'Ofereça apenas o que os peixes comem em 2 minutos, 2x ao dia.' },
      { icon: 'termometro', t: 'Olho na temperatura', d: 'Peixes tropicais gostam de água entre 24°C e 28°C.' }
    ],
    promo: { t: 'Comece no aquarismo', p: 'Kit aquário 20L completo: o jeito mais fácil de começar.', btn: 'Ver aquários', link: 'acessorios.html' }
  },
  hamster: {
    titulo: 'Hamsters e Pequenos', icon: 'hamster', hue: 'pink',
    desc: 'Gaiolas completas, rodas, túneis, substratos e alimentos para hamsters, gerbils, topolinos e coelhos.',
    dicas: [
      { icon: 'roda', t: 'Exercício noturno', d: 'Hamsters correm quilômetros à noite: uma roda silenciosa é essencial.' },
      { icon: 'substrato', t: 'Forração fofa', d: 'Uma camada generosa de substrato permite cavar tocas naturais.' },
      { icon: 'feno', t: 'Dentes sempre', d: 'Dentes crescem sem parar: ofereça feno e brinquedos para roer.' },
      { icon: 'casinha', t: 'Um cantinho seu', d: 'Tocas e casinhas reduzem o estresse e melhoram o sono de dia.' }
    ],
    promo: { t: 'Diversão garantida', p: 'Rodas, túneis e bolas de exercício para noites agitadas.', btn: 'Ver brinquedos', link: 'brinquedos.html' }
  },
  alimentacao: {
    titulo: 'Alimentação', icon: 'racao', hue: 'green',
    desc: 'Rações premium, sachês, petiscos, sementes e suplementos para cada fase da vida do seu pet.',
    dicas: [
      { icon: 'racao', t: 'Leia o rótulo', d: 'Prefira rações com proteína de qualidade como primeiro ingrediente.' },
      { icon: 'sache', t: 'Úmida faz bem', d: 'Sachês aumentam a hidratação, ótimo para gatos e cães exigentes.' },
      { icon: 'osso', t: 'Petisco com regra', d: 'Petiscos devem somar no máximo 10% das calorias do dia.' },
      { icon: 'comedouro', t: 'Horários fixos', d: 'Refeições em horários regulares ajudam na digestão e na rotina.' }
    ],
    promo: { t: 'Petiscos com desconto', p: 'Ossinhos, bifinhos e snacks para agradar e adestrar.', btn: 'Ver ofertas', link: 'pages/busca.html?ofertas=1' }
  },
  brinquedos: {
    titulo: 'Brinquedos', icon: 'bolinha', hue: 'orange',
    desc: 'Bolinhas, cordas, pelúcias, varinhas, lasers e desafios para gastar energia e espantar o tédio.',
    dicas: [
      { icon: 'bolinha', t: 'Tamanho certo', d: 'Escolha brinquedos proporcionais ao porte para evitar engasgos.' },
      { icon: 'corda', t: 'Supervisione', d: 'Brinquedos com partes pequenas pedem supervisão durante a brincadeira.' },
      { icon: 'laser', t: 'Varie o rodízio', d: 'Alterne os brinquedos a cada semana para manter o interesse.' },
      { icon: 'pelucia', t: 'Descarte se rasgar', d: 'Brinquedos danificados com enchimento à mostra devem ser trocados.' }
    ],
    promo: { t: 'Hora da brincadeira', p: 'Os brinquedos mais amados pelos pets com preços especiais.', btn: 'Ver ofertas', link: 'pages/busca.html?ofertas=1' }
  },
  higiene: {
    titulo: 'Higiene e Banho', icon: 'shampoo', hue: 'teal',
    desc: 'Shampoos, areias, tapetes, escovas e cuidados para um pet limpo, cheiroso e saudável.',
    dicas: [
      { icon: 'shampoo', t: 'Produto de pet', d: 'Nunca use shampoo humano: o pH da pele dos animais é diferente.' },
      { icon: 'escova', t: 'Escove sempre', d: 'Escovação regular reduz pelos pela casa e evita nós doloridos.' },
      { icon: 'tapete', t: 'Higiene em casa', d: 'Tapetes higiênicos facilitam a rotina de filhotes e apartamentos.' },
      { icon: 'areia', t: 'Caixa em dia', d: 'Para gatos, a regra é uma caixa por gato, mais uma extra.' }
    ],
    promo: { t: 'Banho de rei', p: 'Shampoos, condicionadores e acessórios de banho e tosa.', btn: 'Ver ofertas', link: 'pages/busca.html?ofertas=1' }
  },
  acessorios: {
    titulo: 'Acessórios', icon: 'coleira', hue: 'navy',
    desc: 'Coleiras, guias, caminhas, comedouros, gaiolas, aquários e tudo para o conforto do seu pet.',
    dicas: [
      { icon: 'coleira', t: 'Identificação', d: 'Coleira com plaquinha de identificação é essencial em todos os passeios.' },
      { icon: 'caminha', t: 'Cama do tamanho', d: 'O pet deve caber esticado na caminha com folga para se virar.' },
      { icon: 'transporte', t: 'Transporte seguro', d: 'Caixas de transporte protegem no carro e nas visitas ao veterinário.' },
      { icon: 'comedouro', t: 'Água e comida', d: 'Potes separados, pesados e lavados diariamente evitam doenças.' }
    ],
    promo: { t: 'Conforto em casa', p: 'Caminhas, tocas e tapetes para o descanso perfeito.', btn: 'Ver ofertas', link: 'pages/busca.html?ofertas=1' }
  }
};

PS.CAT_PAGES = [
  { key: 'cachorro', page: 'cachorros.html', label: 'Cachorros' },
  { key: 'gato', page: 'gatos.html', label: 'Gatos' },
  { key: 'passaro', page: 'passaros.html', label: 'Pássaros' },
  { key: 'peixe', page: 'peixes.html', label: 'Peixes' },
  { key: 'hamster', page: 'hamsters.html', label: 'Hamsters' },
  { key: 'alimentacao', page: 'alimentacao.html', label: 'Alimentação' },
  { key: 'brinquedos', page: 'brinquedos.html', label: 'Brinquedos' },
  { key: 'higiene', page: 'higiene.html', label: 'Higiene' },
  { key: 'acessorios', page: 'acessorios.html', label: 'Acessórios' }
];

PS.categoryUI = {
  init: function(){
    if(document.body.dataset.page !== 'categoria') return;
    var key = document.body.dataset.key;
    var kind = document.body.dataset.kind; /* animal | tipo */
    var info = PS.CATEGORY_INFO[key];
    var wrap = document.getElementById('catWrap');
    if(!info || !wrap) return;
    document.title = info.titulo + ' — Patas & Pelos Pet Shop';

    var b = PS.layout.base || '';
    var all = PS.PRODUCTS.filter(function(p){
      return kind === 'animal' ? p.animal === key : p.cat === key;
    });

    /* Facetas: subs (animal) ou animais (tipo) */
    var facets = [];
    all.forEach(function(p){
      var v = kind === 'animal' ? p.sub : p.animal;
      if(facets.indexOf(v) === -1) facets.push(v);
    });
    facets.sort();

    var chips = ['<button type="button" class="chip active" data-v="__all" aria-pressed="true">Todos</button>'].concat(
      facets.map(function(f){
        var label = kind === 'animal' ? f : PS.ANIMAIS[f];
        return '<button type="button" class="chip" data-v="' + PS.esc(f) + '" aria-pressed="false">' + PS.esc(label) + '</button>';
      })
    ).join('');

    var circles = PS.CAT_PAGES.filter(function(c){ return c.key !== key; }).map(function(c){
      var ci = PS.CATEGORY_INFO[c.key];
      return '<a class="pill" href="' + b + c.page + '"><span class="pill-media h-' + ci.hue + '">' + PS.icon(ci.icon) + '</span><span>' + c.label + '</span></a>';
    }).join('');

    var tips = info.dicas.map(function(d){
      return '<div class="tip-card">' + PS.icon(d.icon) + '<h3>' + d.t + '</h3><p>' + d.d + '</p></div>';
    }).join('');

    var rel = PS.CAT_PAGES.filter(function(c){ return c.key !== key; }).slice(0, 4).map(function(c){
      var ci = PS.CATEGORY_INFO[c.key];
      return '<a class="rel-cat" href="' + b + c.page + '">' + PS.icon(ci.icon) + ' ' + c.label + '</a>';
    }).join('');

    wrap.innerHTML =
      '<nav class="crumbs" aria-label="Caminho"><a href="' + b + 'index.html">Início</a>' + PS.icon('chev-right') +
      '<span aria-current="page">' + info.titulo + '</span></nav>' +
      '<header class="cat-hero"><div class="cat-tile h-' + info.hue + '">' + PS.icon(info.icon) + '</div>' +
        '<div class="cat-info"><h1>' + info.titulo + '</h1><p>' + info.desc + '</p>' +
        '<div class="cat-stats"><div><strong>' + all.length + '</strong><span>produtos</span></div>' +
        '<div><strong>4,8★</strong><span>avaliação média</span></div>' +
        '<div><strong>Grátis</strong><span>frete acima de R$149</span></div></div></div></header>' +
      '<div class="car-head"><div class="sec-head" style="margin:0"><div><span class="kicker">Explore</span><h2 style="font-size:22px">Outras categorias</h2></div></div>' +
        '<div class="car-btns"><button class="car-btn" data-car-prev aria-label="Anterior">' + PS.icon('chev-left') + '</button><button class="car-btn" data-car-next aria-label="Próximo">' + PS.icon('chev-right') + '</button></div></div>' +
      '<div class="car-scroll pill-row" style="margin-bottom:34px">' + circles + '</div>' +
      '<div class="toolbar"><div class="chips" id="catChips" role="group" aria-label="Filtrar produtos">' + chips + '</div>' +
        '<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><span class="result-count" id="catCount"></span>' +
        '<label class="sort-wrap">Ordenar <select class="input" id="catSort">' +
          '<option value="rel">Destaques</option><option value="vendidos">Mais vendidos</option>' +
          '<option value="novos">Novidades</option><option value="menor">Menor preço</option>' +
          '<option value="maior">Maior preço</option><option value="aval">Melhor avaliados</option>' +
        '</select></label></div></div>' +
      '<div class="grid-products" id="catGrid"></div>' +
      '<section class="section-sm" aria-label="Dicas"><div class="sec-head"><div><span class="kicker">Guia do tutor</span><h2>Dicas de cuidado</h2></div></div>' +
        '<div class="tips-grid">' + tips + '</div></section>' +
      '<section class="section-sm" aria-label="Destaque"><div class="promo-band"><div class="promo-icon">' + PS.icon('gift') + '</div>' +
        '<div class="promo-body"><h2>' + info.promo.t + '</h2><p>' + info.promo.p + '</p></div>' +
        '<a class="btn btn-primary btn-lg" href="' + b + info.promo.link + '">' + info.promo.btn + '</a></div></section>' +
      '<section class="section-sm" aria-label="Categorias relacionadas"><div class="sec-head"><div><span class="kicker">Continue explorando</span><h2>Categorias relacionadas</h2></div></div>' +
        '<div class="rel-cats">' + rel + '</div></section>';

    var grid = wrap.querySelector('#catGrid');
    var count = wrap.querySelector('#catCount');
    var sortSel = wrap.querySelector('#catSort');
    var active = '__all';

    var render = function(){
      var list = all.filter(function(p){
        if(active === '__all') return true;
        return (kind === 'animal' ? p.sub : p.animal) === active;
      });
      list = PS.ui.sortList(list, sortSel.value);
      count.textContent = list.length === 1 ? '1 produto' : list.length + ' produtos';
      grid.innerHTML = list.map(function(p, i){ return PS.ui.cardHTML(p, i); }).join('');
      PS.ui.reveal(grid);
      PS.fav.syncHearts();
    };

    wrap.querySelector('#catChips').addEventListener('click', function(e){
      var c = e.target.closest('.chip');
      if(!c) return;
      active = c.dataset.v;
      this.querySelectorAll('.chip').forEach(function(x){
        x.classList.toggle('active', x === c);
        x.setAttribute('aria-pressed', x === c);
      });
      render();
    });
    sortSel.addEventListener('change', render);
    render();
  }
};
