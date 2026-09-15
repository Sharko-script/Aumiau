/* ============================================================
   Patas & Pelos Pet Shop — UI compartilhada + home (main.js)
   ============================================================ */
window.PS = window.PS || {};

/* ------------------------- Conteúdo: artigos -------------------------- */
PS.ARTICLES = [
  { id: 'racao-ideal', cat: 'Alimentação', img: 'assets/images/artigo-racao.webp',
    alt: 'Cachorro comendo ração em uma tigela',
    titulo: 'Como escolher a ração ideal para o seu pet', tempo: '6 min de leitura',
    resumo: 'Proteína, idade, porte e necessidades especiais: entenda o rótulo e acerte na escolha.',
    link: 'alimentacao.html', linkLabel: 'Ver produtos de alimentação',
    corpo: [
      'A ração é a base da saúde do seu pet, e a escolha certa faz diferença no pelo, na energia e até no humor. O primeiro passo é respeitar a espécie, a idade e o porte: filhotes, adultos, idosos e animais castrados têm necessidades nutricionais diferentes.',
      'No rótulo, observe os primeiros ingredientes: uma boa ração traz uma fonte de proteína animal de qualidade (frango, carne, peixe) entre os primeiros itens. Evite produtos com excesso de corantes e subprodutos genéricos.',
      'Considere também necessidades especiais: controle de peso, sensibilidade digestiva, saúde urinária e peles sensíveis pedem fórmulas específicas. Em caso de dúvida, o veterinário é sempre a melhor fonte de indicação.',
      '<strong>Dica de ouro:</strong> ao trocar de ração, faça a transição gradual em 7 dias, misturando a ração antiga com a nova em proporções crescentes. Isso evita desconforto digestivo e rejeição.'
    ]},
  { id: 'hamster', cat: 'Pequenos animais', img: 'assets/images/artigo-hamster.jpg',
    alt: 'Hamster comendo dentro da gaiola',
    titulo: 'Como cuidar de um hamster: guia completo', tempo: '5 min de leitura',
    resumo: 'Gaiola, roda, alimentação e rotina: tudo para o seu hamster viver feliz e saudável.',
    link: 'hamsters.html', linkLabel: 'Ver produtos para hamsters',
    corpo: [
      'Hamsters são noturnos, curiosos e adoram cavar. O lar ideal é uma gaiola espaçosa com uma camada generosa de substrato, que permite o comportamento natural de fazer tocas e túneis.',
      'A roda de exercício é item obrigatório: na natureza, eles percorrem quilômetros por noite. Prefira modelos silenciosos e de tamanho adequado para não forçar a coluna do animal.',
      'Na alimentação, ofereça ração própria para hamsters como base, complementada com pequenas porções de frutas, legumes e feno. Água fresca deve estar sempre disponível no bebedouro.',
      '<strong>Atenção:</strong> hamsters sírios devem viver sozinhos, pois são territoriais. Limpe os cantos da gaiola semanalmente e faça a troca total do substrato a cada 2–3 semanas.'
    ]},
  { id: 'gaiola', cat: 'Pássaros', img: 'assets/images/artigo-gaiola.jpg',
    alt: 'Periquitos em uma gaiola com poleiros',
    titulo: 'Como escolher a gaiola ideal para pássaros', tempo: '4 min de leitura',
    resumo: 'Tamanho, barras, poleiros e posição: o checklist da gaiola perfeita.',
    link: 'passaros.html', linkLabel: 'Ver produtos para pássaros',
    corpo: [
      'A regra de ouro é simples: quanto maior, melhor. A gaiola deve permitir que a ave abra totalmente as asas sem tocar nas grades e faça pequenos voos internos. Calopsitas e periquitos agradecem modelos largos.',
      'Verifique o espaçamento entre as barras (estreito o bastante para a cabeça não passar) e prefira pintura atóxica e bandeja removível, que facilita muito a limpeza diária.',
      'O interior importa tanto quanto o tamanho: poleiros de madeira em alturas variadas, comedouros, bebedouro e pelo menos um brinquedo para distração. Evite superlotar para não roubar espaço de voo.',
      '<strong>Posição:</strong> deixe a gaiola em local claro e arejado, longe de correntes de vento, cozinha (fumaça) e sol direto o dia todo. Cobrir parcialmente à noite ajuda no descanso.'
    ]},
  { id: 'gatos', cat: 'Gatos', img: 'assets/images/artigo-gatos.jpg',
    alt: 'Gato bebendo água em uma fonte elétrica',
    titulo: 'Cuidados essenciais com gatos: água, areia e diversão', tempo: '5 min de leitura',
    resumo: 'Três pilares simples que previnem a maioria dos problemas de saúde e comportamento.',
    link: 'gatos.html', linkLabel: 'Ver produtos para gatos',
    corpo: [
      'Gatos descendem de animais do deserto e naturalmente bebem pouca água — por isso problemas urinários são comuns. Fontes com água corrente estimulam a hidratação, assim como sachês na dieta.',
      'A caixa de areia é questão de higiene e de comportamento: a regra é uma caixa por gato, mais uma extra. Limpeza diária e areia de qualidade evitam que o gato procure outros cantos da casa.',
      'Arranhar é necessidade, não rebeldia. Um arranhador firme de sisal, posicionado perto do local de descanso, protege seus móveis e mantém as unhas saudáveis.',
      '<strong>Enriquecimento:</strong> 15 minutos diários de brincadeira com varinha, ratinhos e circuitos mantêm o gato ativo, no peso ideal e longe do estresse.'
    ]},
  { id: 'brinquedos', cat: 'Cachorros', img: 'assets/images/artigo-brinquedos.jpg',
    alt: 'Filhote brincando com brinquedo de corda',
    titulo: 'Brinquedos para cães: qual o melhor para cada idade?', tempo: '4 min de leitura',
    resumo: 'Filhotes, adultos e idosos brincam de jeitos diferentes. Saiba escolher.',
    link: 'brinquedos.html', linkLabel: 'Ver brinquedos',
    corpo: [
      'Filhotes estão na fase de descobrir o mundo pela boca e aliviar o incômodo da troca de dentes. Mordedores macios, cordas e pelúcias são os favoritos — sempre em tamanho seguro.',
      'Cães adultos precisam gastar energia: bolinhas para buscar, cabos de guerra e frisbees são ideais para o gasto físico, enquanto brinquedos recheáveis desafiam a mente.',
      'Na terceira idade, prefira brinquedos macios e de enriquecimento leve, que estimulam sem exigir esforço das articulações. Manter o idoso ativo preserva a mobilidade.',
      '<strong>Segurança:</strong> supervisione as brincadeiras, escolha o tamanho certo para o porte e descarte brinquedos rasgados com enchimento à mostra.'
    ]},
  { id: 'banho', cat: 'Higiene', img: 'assets/images/artigo-banho.jpg',
    alt: 'Cachorro tomando banho com espuma de shampoo',
    titulo: 'Higiene dos animais: banho, escovação e cuidados', tempo: '6 min de leitura',
    resumo: 'Frequência de banhos, produtos certos e a rotina de higiene completa.',
    link: 'higiene.html', linkLabel: 'Ver produtos de higiene',
    corpo: [
      'A frequência ideal de banho varia: cães em geral a cada 15–30 dias, sempre com shampoo próprio para pets — o pH da pele animal é diferente do nosso, e produtos humanos podem causar alergias.',
      'A escovação é tão importante quanto o banho: remove pelos mortos, evita nós, espalha a oleosidade natural e é um momento de carinho. Pelos longos pedem escovação quase diária.',
      'Não esqueça dos detalhes: limpeza de ouvidos com produto específico, corte regular das unhas e higiene dental com pasta e escova veterinárias previnem os problemas mais comuns.',
      '<strong>Gatos e pequenos:</strong> gatos se limpam sozinhos e raramente precisam de banho; pássaros adoram banheiras; hamsters nunca devem ser molhados — para eles, existe banho de pó próprio.'
    ]}
];

PS.TESTIS = [
  { nome: 'Camila R.', pet: 'mãe da Mel (golden)', texto: 'A caminha nuvem chegou em 2 dias e a Mel não sai mais dela. Qualidade incrível, superou minhas expectativas!' },
  { nome: 'Diego F.', pet: 'pai do Thor e da Luna', texto: 'Preço melhor que o do bairro, entrega rápida e ainda ganhei desconto no primeiro pedido. Cliente fiel!' },
  { nome: 'Beatriz M.', pet: 'mãe do Frajola', texto: 'O arranhador salvou meu sofá! Montagem fácil e material muito firme. Meu gato amou desde o primeiro dia.' },
  { nome: 'Thiago A.', pet: 'pai do Piu (calopsita)', texto: 'Comprei a gaiola completa e veio tudo certinho: poleiros, comedouros e até brinde. Recomendo demais.' },
  { nome: 'Larissa P.', pet: 'mãe do Nemo (betta)', texto: 'Meu primeiro aquário e deu tudo certo seguindo as dicas do blog da loja. Água cristalina até hoje!' },
  { nome: 'Marcos V.', pet: 'pai da Amora (hamster)', texto: 'A roda silenciosa é realmente silenciosa! Durmo tranquilo e a Amora corre a noite toda. Perfeita.' }
];

/* --------------------------- UI compartilhada -------------------------- */
PS.ui = {
  stars: function(nota, cls){
    var full = Math.round(nota);
    var s = '';
    for(var i = 1; i <= 5; i++)
      s += PS.icon('star', 'fill' + (i <= full ? ' on' : ''));
    return '<span class="stars ' + (cls || '') + '" role="img" aria-label="Nota ' + String(nota).replace('.', ',') + ' de 5">' + s + '</span>';
  },

  cardHTML: function(p, i){
    var b = PS.layout.base || '';
    var desc = PS.desconto(p);
    var parc = PS.parcela(p.preco);
    var badge = desc ? '<span class="p-badge">-' + desc + '%</span>'
      : (p.selo ? '<span class="p-badge ' + (p.selo === 'Novo' ? 'novo' : 'tag') + '">' + p.selo + '</span>' : '');
    return '<article class="p-card reveal" style="transition-delay:' + ((i || 0) % 8) * 45 + 'ms">' +
      '<a class="p-media h-' + p.hue + '" href="' + b + 'pages/produto.html?id=' + p.id + '" aria-label="' + PS.esc(p.nome) + '">' +
        badge + PS.icon(p.icon, 'p-icon') +
      '</a>' +
      '<button class="p-fav" data-fav="' + p.id + '" aria-label="Adicionar aos favoritos" aria-pressed="false">' + PS.icon('heart') + '</button>' +
      '<div class="p-body"><span class="p-cat">' + PS.animalLabel(p.animal) + ' • ' + PS.esc(p.sub) + '</span>' +
        '<h3 class="p-name"><a href="' + b + 'pages/produto.html?id=' + p.id + '">' + PS.esc(p.nome) + '</a></h3>' +
        '<div class="p-rating">' + PS.ui.stars(p.aval) + '<span>' + String(p.aval).replace('.', ',') + ' (' + p.reviews + ')</span></div>' +
        '<div class="p-price">' + (p.antigo ? '<span class="old">' + PS.money(p.antigo) + '</span>' : '') +
          '<strong>' + PS.money(p.preco) + '</strong>' +
          '<span class="parc">em até ' + parc.n + 'x de ' + PS.money(parc.v) + '</span></div>' +
        '<button class="btn btn-primary btn-block" data-add="' + p.id + '">Adicionar</button>' +
      '</div></article>';
  },

  sortList: function(list, mode){
    var arr = list.slice();
    if(mode === 'menor') arr.sort(function(a, b){ return a.preco - b.preco; });
    else if(mode === 'maior') arr.sort(function(a, b){ return b.preco - a.preco; });
    else if(mode === 'aval') arr.sort(function(a, b){ return b.aval - a.aval || b.reviews - a.reviews; });
    else if(mode === 'novos') arr.sort(function(a, b){ return a.novo - b.novo; });
    else arr.sort(function(a, b){ return b.vendidos - a.vendidos; });
    return arr;
  },

  /* Animações de entrada */
  _io: null,
  reveal: function(scope){
    scope = scope || document;
    if(!this._io){
      this._io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting){ en.target.classList.add('in'); PS.ui._io.unobserve(en.target); }
        });
      }, { threshold: 0.08 });
    }
    var self = this;
    scope.querySelectorAll('.reveal:not(.in)').forEach(function(el){ self._io.observe(el); });
  },

  /* Carrosséis (botões anterior/próximo) */
  carousels: function(){
    var update = function(sc){
      var head = sc.previousElementSibling;
      if(!head || !head.classList.contains('car-head')) return;
      var prev = head.querySelector('[data-car-prev]');
      var next = head.querySelector('[data-car-next]');
      if(prev) prev.disabled = sc.scrollLeft <= 4;
      if(next) next.disabled = sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 4;
    };
    document.querySelectorAll('.car-scroll').forEach(function(sc){
      sc.addEventListener('scroll', function(){ update(sc); }, { passive: true });
      update(sc);
    });
    document.querySelectorAll('[data-car-prev],[data-car-next]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var head = btn.closest('.car-head');
        var sc = head && head.nextElementSibling;
        if(!sc || !sc.classList.contains('car-scroll')) return;
        var dir = btn.hasAttribute('data-car-next') ? 1 : -1;
        sc.scrollBy({ left: dir * sc.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
    window.addEventListener('resize', function(){
      document.querySelectorAll('.car-scroll').forEach(update);
    });
  },

  /* Newsletter */
  newsletter: function(){
    document.querySelectorAll('.news-form').forEach(function(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var email = input.value.trim().toLowerCase();
        if(!PS.auth.emailOk(email)){ PS.toast('Informe um e-mail válido.', 'error'); input.focus(); return; }
        var list = [];
        try { list = JSON.parse(localStorage.getItem('pp_news_v1')) || []; } catch(err){}
        if(list.indexOf(email) === -1){ list.push(email); localStorage.setItem('pp_news_v1', JSON.stringify(list)); }
        input.value = '';
        PS.toast('Inscrição feita! Use o cupom BEMVINDO10.');
      });
    });
  },

  /* Copiar cupom */
  copyBtns: function(){
    document.querySelectorAll('[data-copy]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var text = btn.dataset.copy;
        var done = function(){ PS.toast('Cupom ' + text + ' copiado!'); };
        if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
        else done();
      });
    });
  },

  /* Modais informativos */
  infoModals: function(){
    document.addEventListener('click', function(e){
      if(e.target.closest('[data-open-sobre]')) PS.info.sobre();
      else if(e.target.closest('[data-open-contato]')) PS.info.contato();
      else if(e.target.closest('[data-open-privacidade]')) PS.info.privacidade();
      else if(e.target.closest('[data-open-termos]')) PS.info.termos();
      var art = e.target.closest('[data-article]');
      if(art) PS.info.artigo(art.dataset.article);
    });
  }
};

/* ------------------------------ Modais -------------------------------- */
PS.info = {
  sobre: function(){
    PS.modal.open({
      title: 'Sobre a Patas & Pelos',
      body: '<p>A <strong>Patas &amp; Pelos</strong> nasceu em 2019 com um propósito simples: oferecer tudo que o seu pet precisa em um só lugar, com curadoria de qualidade e preço justo.</p>' +
        '<p>Hoje atendemos tutores de cães, gatos, pássaros, peixes e pequenos animais em todo o Brasil, com mais de <strong>60 produtos selecionados</strong>, entrega rápida e suporte de quem entende de pet de verdade.</p>' +
        '<h3>Nossos compromissos</h3>' +
        '<ul class="check-list"><li>' + PS.icon('check-circle') + ' Produtos testados e aprovados pela nossa equipe</li>' +
        '<li>' + PS.icon('check-circle') + ' Troca fácil em até 7 dias, sem burocracia</li>' +
        '<li>' + PS.icon('check-circle') + ' Atendimento de segunda a sábado, 8h às 22h</li></ul>'
    });
  },
  contato: function(){
    PS.modal.open({
      title: 'Fale conosco',
      body: '<ul class="contact-list">' +
        '<li>' + PS.icon('phone') + ' (31) 98888-7777 (WhatsApp)</li>' +
        '<li>' + PS.icon('mail') + ' oi@patasepelos.com.br</li>' +
        '<li>' + PS.icon('clock') + ' Seg a sábado, das 8h às 22h</li>' +
        '<li>' + PS.icon('pin') + ' Rua dos Ipês, 123 — Centro, Belo Horizonte/MG</li></ul>' +
        '<h3>Envie sua mensagem</h3>' +
        '<div class="field"><label for="cNome">Seu nome</label><input class="input" id="cNome" maxlength="60"></div>' +
        '<div class="field"><label for="cEmail">Seu e-mail</label><input class="input" id="cEmail" type="email"></div>' +
        '<div class="field"><label for="cMsg">Mensagem</label><textarea class="input" id="cMsg" maxlength="600"></textarea></div>' +
        '<button class="btn btn-primary btn-block" id="btnSendMsg">' + PS.icon('send') + ' Enviar mensagem</button>',
      onOpen: function(scope){
        scope.querySelector('#btnSendMsg').addEventListener('click', function(){
          var nome = scope.querySelector('#cNome').value.trim();
          var email = scope.querySelector('#cEmail').value.trim();
          var msg = scope.querySelector('#cMsg').value.trim();
          if(nome.length < 2){ PS.toast('Informe seu nome.', 'error'); return; }
          if(!PS.auth.emailOk(email)){ PS.toast('Informe um e-mail válido.', 'error'); return; }
          if(msg.length < 4){ PS.toast('Escreva sua mensagem.', 'error'); return; }
          var box = [];
          try { box = JSON.parse(localStorage.getItem('pp_msgs_v1')) || []; } catch(err){}
          box.push({ nome: nome, email: email, msg: msg, data: new Date().toISOString() });
          localStorage.setItem('pp_msgs_v1', JSON.stringify(box));
          PS.modal.close();
          PS.toast('Mensagem enviada! Respondemos em até 1 dia útil.');
        });
      }
    });
  },
  privacidade: function(){
    PS.modal.open({
      title: 'Política de Privacidade',
      body: '<p>Respeitamos seus dados. Usamos e-mail, nome e endereço apenas para processar pedidos, enviar novidades (quando você autoriza) e melhorar sua experiência.</p>' +
        '<h3>Seus direitos</h3><p>Você pode solicitar a correção ou exclusão dos seus dados a qualquer momento pelo e-mail <strong>oi@patasepelos.com.br</strong>.</p>' +
        '<h3>Compartilhamento</h3><p>Não vendemos seus dados. Compartilhamos apenas o essencial com transportadoras e meios de pagamento para concluir seu pedido.</p>' +
        '<h3>Cookies</h3><p>Usamos apenas armazenamento local do navegador para carrinho, favoritos e login. Nada de rastreadores de terceiros.</p>'
    });
  },
  termos: function(){
    PS.modal.open({
      title: 'Termos de Uso',
      body: '<h3>1. A loja</h3><p>A Patas &amp; Pelos comercializa produtos para animais de estimação. Preços e disponibilidade podem variar sem aviso prévio.</p>' +
        '<h3>2. Pedidos</h3><p>O pedido é confirmado após a aprovação do pagamento. O prazo de entrega é estimado e conta em dias úteis após a confirmação.</p>' +
        '<h3>3. Trocas</h3><p>Você tem 7 dias após o recebimento para solicitar troca ou devolução de produtos lacrados, conforme o Código de Defesa do Consumidor.</p>' +
        '<h3>4. Conta</h3><p>Você é responsável por manter sua senha em sigilo e pelos pedidos feitos na sua conta.</p>'
    });
  },
  artigo: function(id){
    var a = PS.ARTICLES.find(function(x){ return x.id === id; });
    if(!a) return;
    var b = PS.layout.base || '';
    PS.modal.open({
      title: a.titulo,
      wide: true,
      body: '<div class="article-hero"><img src="' + b + a.img + '" alt="' + PS.esc(a.alt) + '" loading="lazy"></div>' +
        '<div class="article-meta"><span class="art-cat">' + a.cat + '</span><span>' + PS.icon('clock') + ' ' + a.tempo + '</span></div>' +
        '<div class="article-body">' + a.corpo.map(function(par){
          return par.charAt(0) === '<' && par.charAt(1) === 's' ? '<p>' + par + '</p>' : '<p>' + par + '</p>';
        }).join('') + '</div>' +
        '<div style="margin-top:8px"><a class="btn btn-primary" href="' + b + a.link + '">' + a.linkLabel + '</a></div>'
    });
  }
};

/* -------------------------------- Home -------------------------------- */
PS.home = {
  init: function(){
    if(document.body.dataset.page !== 'home') return;
    var b = PS.layout.base || '';

    /* Pílulas de categorias */
    var pills = document.getElementById('pillRow');
    if(pills){
      pills.innerHTML = PS.CAT_PAGES.map(function(c){
        var ci = PS.CATEGORY_INFO[c.key];
        return '<a class="pill" href="' + b + c.page + '"><span class="pill-media h-' + ci.hue + '">' + PS.icon(ci.icon) + '</span><span>' + c.label + '</span></a>';
      }).join('');
    }

    /* Ofertas da semana */
    var ofertas = PS.PRODUCTS.filter(function(p){ return p.antigo; })
      .sort(function(a, x){ return PS.desconto(x) - PS.desconto(a); }).slice(0, 4);
    var gridOf = document.getElementById('gridOfertas');
    if(gridOf){
      gridOf.innerHTML = ofertas.map(function(p, i){ return PS.ui.cardHTML(p, i); }).join('');
    }

    /* Mais vendidos com filtros */
    var gridV = document.getElementById('gridVendidos');
    if(gridV){
      var animals = [['todos', 'Todos'], ['cachorro', 'Cachorro'], ['gato', 'Gato'], ['passaro', 'Pássaro'], ['peixe', 'Peixe'], ['hamster', 'Hamster']];
      var chipsBox = document.getElementById('homeChips');
      var sortSel = document.getElementById('homeSort');
      var animal = 'todos';
      chipsBox.innerHTML = animals.map(function(a){
        return '<button type="button" class="chip' + (a[0] === 'todos' ? ' active' : '') + '" data-v="' + a[0] + '" aria-pressed="' + (a[0] === 'todos') + '">' + a[1] + '</button>';
      }).join('');
      var render = function(){
        var list = PS.PRODUCTS.filter(function(p){
          return animal === 'todos' || p.animal === animal || p.animal === 'todos';
        });
        list = PS.ui.sortList(list, sortSel.value).slice(0, 8);
        gridV.innerHTML = list.map(function(p, i){ return PS.ui.cardHTML(p, i); }).join('');
        PS.ui.reveal(gridV);
        PS.fav.syncHearts();
      };
      chipsBox.addEventListener('click', function(e){
        var c = e.target.closest('.chip');
        if(!c) return;
        animal = c.dataset.v;
        chipsBox.querySelectorAll('.chip').forEach(function(x){
          x.classList.toggle('active', x === c);
          x.setAttribute('aria-pressed', x === c);
        });
        render();
      });
      sortSel.addEventListener('change', render);
      render();
    }

    /* Artigo em destaque + grade */
    var feat = document.getElementById('artFeatured');
    if(feat){
      var a0 = PS.ARTICLES[0];
      feat.innerHTML = '<div class="art-media"><img src="' + b + a0.img + '" alt="' + PS.esc(a0.alt) + '" loading="lazy"></div>' +
        '<div class="art-body"><span class="art-cat">' + a0.cat + '</span><h3>' + a0.titulo + '</h3><p>' + a0.resumo + '</p>' +
        '<div class="art-meta">' + PS.icon('clock') + ' ' + a0.tempo + '</div>' +
        '<div class="art-read"><button class="btn btn-dark" data-article="' + a0.id + '">Ler mais</button></div></div>';
      document.getElementById('artGrid').innerHTML = PS.ARTICLES.slice(1).map(function(a){
        return '<article class="art-card reveal"><div class="art-media"><img src="' + b + a.img + '" alt="' + PS.esc(a.alt) + '" loading="lazy"></div>' +
          '<div class="art-body"><span class="art-cat">' + a.cat + '</span><h3>' + a.titulo + '</h3><p>' + a.resumo + '</p>' +
          '<div class="art-meta">' + PS.icon('clock') + ' ' + a.tempo + '</div>' +
          '<div class="art-read"><button class="btn btn-ghost btn-sm" data-article="' + a.id + '">Ler mais ' + PS.icon('arrow-right') + '</button></div></div></article>';
      }).join('');
    }

    /* Depoimentos */
    var tRow = document.getElementById('testRow');
    if(tRow){
      tRow.innerHTML = PS.TESTIS.map(function(t){
        var ini = t.nome.trim().split(/\s+/).map(function(w){ return w[0]; }).join('').toUpperCase();
        return '<div class="t-card">' + PS.ui.stars(5) + '<p>&ldquo;' + t.texto + '&rdquo;</p>' +
          '<div class="t-person"><div class="avatar">' + ini + '</div><div><strong>' + t.nome + '</strong><span>' + t.pet + '</span></div></div></div>';
      }).join('');
    }

    /* Vistos recentemente */
    var recIds = PS.recents.get().slice(0, 4);
    var recSec = document.getElementById('recentSec');
    if(recSec && recIds.length){
      recSec.hidden = false;
      document.getElementById('recentGrid').innerHTML = recIds.map(function(id){ return PS.prodById(id); })
        .filter(Boolean).map(function(p, i){ return PS.ui.cardHTML(p, i); }).join('');
      PS.fav.syncHearts();
    }
  }
};

/* ------------------------------ Inicialização -------------------------- */
document.addEventListener('DOMContentLoaded', function(){
  PS.layout.init();
  PS.cartUI.init();
  PS.favUI.init();
  PS.authUI.init();
  PS.searchUI.init();
  PS.productUI.init();
  PS.categoryUI.init();
  PS.home.init();
  PS.ui.carousels();
  PS.ui.reveal(document);
  PS.ui.newsletter();
  PS.ui.copyBtns();
  PS.ui.infoModals();
  PS.fav.syncHearts();
});
