/* ============================================================
   Patas & Pelos Pet Shop — Login, cadastro e perfil (auth.js)
   Contas de demonstração salvas no navegador (localStorage).
   ============================================================ */
window.PS = window.PS || {};

PS.auth = {
  users: [],

  load: function(){
    try { this.users = JSON.parse(localStorage.getItem('pp_users_v1')) || []; }
    catch(e){ this.users = []; }
  },
  save: function(){
    localStorage.setItem('pp_users_v1', JSON.stringify(this.users));
  },
  current: function(){
    var email = localStorage.getItem('pp_session_v1') || sessionStorage.getItem('pp_session_v1');
    if(!email) return null;
    return this.users.find(function(u){ return u.email === email; }) || null;
  },
  login: function(email, senha, lembrar){
    email = email.trim().toLowerCase();
    var u = this.users.find(function(x){ return x.email === email && x.senha === senha; });
    if(!u) return null;
    sessionStorage.removeItem('pp_session_v1');
    localStorage.removeItem('pp_session_v1');
    if(lembrar) localStorage.setItem('pp_session_v1', email);
    else sessionStorage.setItem('pp_session_v1', email);
    return u;
  },
  logout: function(){
    localStorage.removeItem('pp_session_v1');
    sessionStorage.removeItem('pp_session_v1');
  },
  register: function(data){
    data.email = data.email.trim().toLowerCase();
    if(this.users.some(function(u){ return u.email === data.email; })) return 'exists';
    data.enderecos = [];
    this.users.push(data);
    this.save();
    sessionStorage.setItem('pp_session_v1', data.email);
    return 'ok';
  },
  emailOk: function(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
  },
  addresses: function(){
    var u = this.current();
    return u ? (u.enderecos || []) : [];
  },
  saveAddress: function(addr, idx){
    var u = this.current();
    if(!u) return;
    u.enderecos = u.enderecos || [];
    if(typeof idx === 'number' && u.enderecos[idx]) u.enderecos[idx] = addr;
    else u.enderecos.push(addr);
    this.save();
  },
  deleteAddress: function(idx){
    var u = this.current();
    if(!u || !u.enderecos) return;
    u.enderecos.splice(idx, 1);
    this.save();
  },
  updateProfile: function(nome, tel){
    var u = this.current();
    if(!u) return;
    u.nome = nome;
    u.tel = tel;
    this.save();
  },
  orders: function(){
    var u = this.current();
    if(!u) return [];
    try {
      return (JSON.parse(localStorage.getItem('pp_orders_v1')) || []).filter(function(o){ return o.email === u.email; });
    } catch(e){ return []; }
  }
};

PS.authUI = {
  init: function(){
    PS.auth.load();
    PS.layout.syncUser();
    var page = document.body.dataset.page;
    if(page === 'login') this.loginPage();
    else if(page === 'cadastro') this.cadastroPage();
    else if(page === 'perfil') this.perfilPage();
  },

  setErr: function(input, msg){
    var field = input.closest('.field');
    if(!field) return !msg;
    var err = field.querySelector('.err');
    if(msg){ field.classList.add('invalid'); if(err) err.textContent = msg; }
    else { field.classList.remove('invalid'); if(err) err.textContent = ''; }
    return !msg;
  },

  nextUrl: function(fallback){
    var b = PS.layout.base || '';
    var next = new URLSearchParams(window.location.search).get('next');
    if(next === 'carrinho.html') return b + 'pages/carrinho.html';
    return b + 'pages/' + (fallback || 'perfil.html');
  },

  /* ------------------------------- Login ------------------------------- */
  loginPage: function(){
    if(PS.auth.current()){ window.location.href = this.nextUrl('perfil.html'); return; }
    var self = this;
    var form = document.getElementById('loginForm');
    var email = document.getElementById('lEmail');
    var senha = document.getElementById('lSenha');

    document.querySelectorAll('.pass-eye').forEach(function(btn){
      btn.addEventListener('click', function(){
        var inp = document.getElementById(btn.dataset.for);
        var show = inp.type === 'password';
        inp.type = show ? 'text' : 'password';
        btn.innerHTML = PS.icon(show ? 'eye-off' : 'eye');
        btn.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
      });
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var ok = true;
      ok = self.setErr(email, !email.value.trim() ? 'Informe seu e-mail.' : (!PS.auth.emailOk(email.value) ? 'E-mail inválido.' : null)) && ok;
      ok = self.setErr(senha, senha.value.length < 4 ? 'Informe sua senha (mín. 4 caracteres).' : null) && ok;
      if(!ok) return;
      var lembrar = document.getElementById('lRemember').checked;
      var u = PS.auth.login(email.value, senha.value, lembrar);
      if(!u){
        self.setErr(senha, 'E-mail ou senha incorretos.');
        PS.toast('E-mail ou senha incorretos.', 'error');
        return;
      }
      PS.layout.syncUser();
      PS.toast('Bem-vindo(a) de volta, ' + PS.esc(u.nome.split(' ')[0]) + '!');
      setTimeout(function(){ window.location.href = self.nextUrl('perfil.html'); }, 700);
    });

    document.getElementById('btnDemo').addEventListener('click', function(){
      if(!PS.auth.users.some(function(u){ return u.email === 'demo@petshop.com'; })){
        PS.auth.users.push({ nome: 'Tutor Demo', email: 'demo@petshop.com', senha: 'demo123', tel: '(31) 99999-0000', enderecos: [] });
        PS.auth.save();
      }
      email.value = 'demo@petshop.com';
      senha.value = 'demo123';
      document.getElementById('lRemember').checked = true;
      form.requestSubmit();
    });
    document.getElementById('btnForgot').addEventListener('click', function(){
      if(!PS.auth.emailOk(email.value)){
        self.setErr(email, 'Digite seu e-mail acima para recuperar a senha.');
        email.focus();
        return;
      }
      PS.modal.open({
        title: 'Recuperar senha',
        body: '<p>Enviamos um link de redefinição para <strong>' + PS.esc(email.value.trim()) + '</strong>. Verifique sua caixa de entrada (e o spam).</p>' +
          '<button class="btn btn-primary btn-block" data-close-modal>Entendi</button>'
      });
    });
  },

  /* ------------------------------ Cadastro ------------------------------ */
  cadastroPage: function(){
    if(PS.auth.current()){ window.location.href = this.nextUrl('perfil.html'); return; }
    var self = this;
    var form = document.getElementById('regForm');
    var nome = document.getElementById('rNome');
    var email = document.getElementById('rEmail');
    var tel = document.getElementById('rTel');
    var s1 = document.getElementById('rSenha');
    var s2 = document.getElementById('rSenha2');

    tel.addEventListener('input', function(){
      var v = this.value.replace(/\D/g, '').slice(0, 11);
      if(v.length > 6) this.value = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      else if(v.length > 2) this.value = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else this.value = v;
    });
    document.querySelectorAll('.pass-eye').forEach(function(btn){
      btn.addEventListener('click', function(){
        var inp = document.getElementById(btn.dataset.for);
        var show = inp.type === 'password';
        inp.type = show ? 'text' : 'password';
        btn.innerHTML = PS.icon(show ? 'eye-off' : 'eye');
      });
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var ok = true;
      ok = self.setErr(nome, nome.value.trim().length < 3 ? 'Informe seu nome completo.' : null) && ok;
      ok = self.setErr(email, !PS.auth.emailOk(email.value) ? 'Informe um e-mail válido.' : null) && ok;
      ok = self.setErr(tel, tel.value.replace(/\D/g, '').length < 10 ? 'Informe um telefone válido com DDD.' : null) && ok;
      ok = self.setErr(s1, s1.value.length < 6 ? 'A senha precisa de ao menos 6 caracteres.' : null) && ok;
      ok = self.setErr(s2, s2.value !== s1.value ? 'As senhas não conferem.' : null) && ok;
      if(!ok) return;
      var r = PS.auth.register({ nome: nome.value.trim(), email: email.value, senha: s1.value, tel: tel.value });
      if(r === 'exists'){
        self.setErr(email, 'Este e-mail já está cadastrado. Faça login.');
        PS.toast('E-mail já cadastrado.', 'error');
        return;
      }
      PS.layout.syncUser();
      PS.toast('Conta criada com sucesso! Bem-vindo(a)!');
      setTimeout(function(){ window.location.href = self.nextUrl('perfil.html'); }, 700);
    });
  },

  /* -------------------------------- Perfil ------------------------------- */
  perfilPage: function(){
    var wrap = document.getElementById('profileWrap');
    if(!wrap) return;
    var b = PS.layout.base || '';
    var user = PS.auth.current();
    if(!user){
      wrap.innerHTML = '<div class="empty-state">' +
        '<div class="e-icon">' + PS.icon('user') + '</div>' +
        '<h2>Você ainda não entrou</h2>' +
        '<p>Entre na sua conta para ver pedidos, endereços e favoritos.</p>' +
        '<a class="btn btn-primary" href="' + b + 'pages/login.html">Entrar</a> ' +
        '<a class="btn btn-outline-navy" href="' + b + 'pages/cadastro.html">Criar conta</a></div>';
      return;
    }
    var self = this;
    var initials = user.nome.trim().split(/\s+/).map(function(w){ return w[0]; }).slice(0, 2).join('').toUpperCase();
    var orders = PS.auth.orders();

    wrap.innerHTML =
      '<div class="profile-head"><div class="avatar">' + PS.esc(initials) + '</div>' +
        '<div><h1>' + PS.esc(user.nome) + '</h1><p>' + PS.esc(user.email) + (user.tel ? ' • ' + PS.esc(user.tel) : '') + '</p></div>' +
        '<button class="btn btn-outline-navy btn-sm" id="btnLogout">' + PS.icon('logout') + ' Sair</button></div>' +
      '<div class="profile-grid">' +
        '<div class="stat-card">' + PS.icon('box') + '<div><strong>' + orders.length + '</strong><span>pedidos realizados</span></div></div>' +
        '<div class="stat-card">' + PS.icon('heart') + '<div><strong>' + PS.fav.ids.length + '</strong><span>produtos favoritados</span></div></div>' +
        '<div class="stat-card">' + PS.icon('pin') + '<div><strong>' + PS.auth.addresses().length + '</strong><span>endereços salvos</span></div></div>' +
      '</div>' +
      '<div class="tabs" role="tablist">' +
        '<button class="tab-btn active" data-tab="tOrders" role="tab" aria-selected="true">Meus pedidos</button>' +
        '<button class="tab-btn" data-tab="tAddr" role="tab" aria-selected="false">Endereços</button>' +
        '<button class="tab-btn" data-tab="tData" role="tab" aria-selected="false">Meus dados</button>' +
      '</div>' +
      '<div class="tab-panel active" id="tOrders"><div class="panel" id="ordersPanel"></div></div>' +
      '<div class="tab-panel" id="tAddr"><div class="panel" id="addrPanel"></div></div>' +
      '<div class="tab-panel" id="tData"><div class="panel"><h2>Meus dados</h2>' +
        '<form id="dataForm"><div class="form-row">' +
          '<div class="field"><label for="dNome">Nome completo</label><input class="input" id="dNome" value="' + PS.esc(user.nome) + '"><span class="err"></span></div>' +
          '<div class="field"><label for="dTel">Telefone</label><input class="input" id="dTel" value="' + PS.esc(user.tel || '') + '"><span class="err"></span></div>' +
        '</div><button class="btn btn-dark" type="submit">Salvar alterações</button></form></div></div>';

    document.getElementById('btnLogout').addEventListener('click', function(){
      PS.auth.logout();
      PS.layout.syncUser();
      PS.toast('Você saiu da conta. Até logo!', 'info');
      setTimeout(function(){ window.location.href = b + 'index.html'; }, 700);
    });

    wrap.querySelectorAll('.tab-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        wrap.querySelectorAll('.tab-btn').forEach(function(x){
          x.classList.toggle('active', x === btn);
          x.setAttribute('aria-selected', x === btn);
        });
        wrap.querySelectorAll('.tab-panel').forEach(function(p){
          p.classList.toggle('active', p.id === btn.dataset.tab);
        });
      });
    });

    this.renderOrders();
    this.renderAddresses();

    document.getElementById('dataForm').addEventListener('submit', function(e){
      e.preventDefault();
      var n = document.getElementById('dNome');
      var t = document.getElementById('dTel');
      var ok = true;
      ok = self.setErr(n, n.value.trim().length < 3 ? 'Informe seu nome.' : null) && ok;
      ok = self.setErr(t, t.value.replace(/\D/g, '').length < 10 ? 'Telefone inválido.' : null) && ok;
      if(!ok) return;
      PS.auth.updateProfile(n.value.trim(), t.value.trim());
      PS.layout.syncUser();
      PS.toast('Dados atualizados!');
      self.perfilPage();
    });
  },

  renderOrders: function(){
    var panel = document.getElementById('ordersPanel');
    if(!panel) return;
    var b = PS.layout.base || '';
    var orders = PS.auth.orders();
    if(!orders.length){
      panel.innerHTML = '<h2>Meus pedidos</h2><p style="color:var(--muted);font-weight:600;margin-bottom:16px">Você ainda não fez nenhum pedido.</p>' +
        '<a class="btn btn-primary" href="' + b + 'pages/busca.html?ofertas=1">Ver ofertas</a>';
      return;
    }
    panel.innerHTML = '<h2>Meus pedidos</h2>' + orders.map(function(o){
      var date = new Date(o.data).toLocaleDateString('pt-BR');
      var items = o.itens.map(function(i){ return i.qty + '× ' + PS.esc(i.nome); }).join(' • ');
      return '<div class="order-card"><div class="order-top"><strong>Pedido ' + o.id + ' • ' + date + '</strong>' +
        '<span class="order-status">' + PS.esc(o.status) + '</span></div>' +
        '<div class="order-items">' + items + '</div>' +
        '<div class="order-foot"><span style="font-size:13px;color:var(--muted);font-weight:700">' + PS.esc(o.pagamento) + '</span>' +
        '<span style="display:flex;gap:10px;align-items:center"><strong>' + PS.money(o.total) + '</strong>' +
        '<button class="btn btn-dark btn-sm" data-reorder="' + o.id + '">Comprar novamente</button></span></div></div>';
    }).join('');
    panel.querySelectorAll('[data-reorder]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var o = orders.find(function(x){ return x.id === btn.dataset.reorder; });
        if(!o) return;
        o.itens.forEach(function(i){ if(PS.prodById(i.id)) PS.cart.add(i.id, i.qty); });
        PS.cartUI.openDrawer();
      });
    });
  },

  renderAddresses: function(){
    var panel = document.getElementById('addrPanel');
    if(!panel) return;
    var self = this;
    var addrs = PS.auth.addresses();
    panel.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">' +
        '<h2 style="margin:0">Endereços</h2>' +
        '<button class="btn btn-dark btn-sm" id="btnAddAddr">' + PS.icon('plus') + ' Novo endereço</button></div>' +
      (addrs.length
        ? '<div class="addr-grid">' + addrs.map(function(a, i){
            return '<div class="addr-card' + (i === 0 ? ' main' : '') + '">' + (i === 0 ? '<span class="addr-tag">Principal</span>' : '') +
              '<strong>' + PS.esc(a.rotulo) + '</strong><p>' + PS.esc(a.rua) + ', ' + PS.esc(a.numero) + (a.compl ? ' — ' + PS.esc(a.compl) : '') +
              '<br>' + PS.esc(a.cidade) + '/' + PS.esc(a.uf) + ' • CEP ' + PS.esc(a.cep) + '</p>' +
              '<div class="addr-actions"><button class="btn btn-outline-navy" data-edit-addr="' + i + '">Editar</button>' +
              '<button class="btn btn-danger-ghost" data-del-addr="' + i + '">Excluir</button></div></div>';
          }).join('') + '</div>'
        : '<p style="color:var(--muted);font-weight:600">Nenhum endereço salvo. Adicione um para agilizar suas compras.</p>');

    document.getElementById('btnAddAddr').addEventListener('click', function(){ self.addrModal(-1); });
    panel.querySelectorAll('[data-edit-addr]').forEach(function(btn){
      btn.addEventListener('click', function(){ self.addrModal(parseInt(btn.dataset.editAddr, 10)); });
    });
    panel.querySelectorAll('[data-del-addr]').forEach(function(btn){
      btn.addEventListener('click', function(){
        PS.auth.deleteAddress(parseInt(btn.dataset.delAddr, 10));
        PS.toast('Endereço excluído.', 'info');
        self.perfilPage();
      });
    });
  },

  addrModal: function(idx){
    var self = this;
    var a = (idx > -1 && PS.auth.addresses()[idx]) || { rotulo: '', rua: '', numero: '', compl: '', cidade: '', uf: '', cep: '' };
    PS.modal.open({
      title: idx > -1 ? 'Editar endereço' : 'Novo endereço',
      body: '<div class="field"><label for="aRot">Rótulo (ex: Casa, Trabalho)</label><input class="input" id="aRot" value="' + PS.esc(a.rotulo) + '"></div>' +
        '<div class="field"><label for="aRua">Rua / Avenida</label><input class="input" id="aRua" value="' + PS.esc(a.rua) + '"></div>' +
        '<div class="form-row"><div class="field"><label for="aNum">Número</label><input class="input" id="aNum" value="' + PS.esc(a.numero) + '"></div>' +
        '<div class="field"><label for="aCompl">Complemento</label><input class="input" id="aCompl" value="' + PS.esc(a.compl) + '"></div></div>' +
        '<div class="form-row"><div class="field"><label for="aCid">Cidade</label><input class="input" id="aCid" value="' + PS.esc(a.cidade) + '"></div>' +
        '<div class="field"><label for="aUf">UF</label><input class="input" id="aUf" maxlength="2" value="' + PS.esc(a.uf) + '"></div></div>' +
        '<div class="field"><label for="aCep">CEP</label><input class="input" id="aCep" maxlength="9" inputmode="numeric" value="' + PS.esc(a.cep) + '"></div>' +
        '<button class="btn btn-primary btn-block" id="btnSaveAddr">Salvar endereço</button>',
      onOpen: function(scope){
        scope.querySelector('#aCep').addEventListener('input', function(){
          var v = this.value.replace(/\D/g, '').slice(0, 8);
          this.value = v.length > 5 ? v.slice(0, 5) + '-' + v.slice(5) : v;
        });
        scope.querySelector('#btnSaveAddr').addEventListener('click', function(){
          var v = function(id){ return scope.querySelector('#' + id).value.trim(); };
          if(v('aRot').length < 2){ PS.toast('Dê um nome ao endereço (ex: Casa).', 'error'); return; }
          if(v('aRua').length < 3 || !v('aNum')){ PS.toast('Informe rua e número.', 'error'); return; }
          if(v('aCid').length < 2 || v('aUf').length !== 2){ PS.toast('Informe cidade e UF.', 'error'); return; }
          if(v('aCep').replace(/\D/g, '').length < 8){ PS.toast('CEP inválido.', 'error'); return; }
          PS.auth.saveAddress({ rotulo: v('aRot'), rua: v('aRua'), numero: v('aNum'), compl: v('aCompl'), cidade: v('aCid'), uf: v('aUf').toUpperCase(), cep: v('aCep') }, idx > -1 ? idx : undefined);
          PS.modal.close();
          PS.toast('Endereço salvo!');
          self.perfilPage();
        });
      }
    });
  }
};
