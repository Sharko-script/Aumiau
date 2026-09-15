/* ============================================================
   Patas & Pelos Pet Shop — Catálogo de produtos (products.js)
   Fonte única de dados: vitrines, categorias, busca e produto.
   ============================================================ */
window.PS = window.PS || {};

PS.ANIMAIS = {
  cachorro: 'Cachorros',
  gato: 'Gatos',
  passaro: 'Pássaros',
  peixe: 'Peixes',
  hamster: 'Hamsters e pequenos',
  todos: 'Todos os pets'
};

PS.ANIMAL_SINGULAR = {
  cachorro: 'cachorro', gato: 'gato', passaro: 'pássaro',
  peixe: 'peixe', hamster: 'hamster', todos: 'pet'
};

PS.CATS = {
  alimentacao: 'Alimentação',
  higiene: 'Higiene',
  brinquedos: 'Brinquedos',
  acessorios: 'Acessórios',
  saude: 'Saúde'
};

/* Campos: id, nome, animal, cat, sub, preco, antigo, aval, reviews,
   vendidos, novo (dias), selo, icon, hue, desc, detalhes[], tags */
PS.PRODUCTS = [
/* ------------------------------ CACHORROS ------------------------------ */
{id:'c-rac-01',nome:'Ração Premium para Cães Adultos 10kg',animal:'cachorro',cat:'alimentacao',sub:'Rações',preco:189.9,antigo:229.9,aval:4.9,reviews:1254,vendidos:5420,novo:90,selo:'Mais vendido',icon:'racao',hue:'blue',
 desc:'Ração super premium com frango, arroz integral e ômega 3 para cães adultos de todos os portes. Nutrição completa para energia, pelagem saudável e digestão equilibrada.',
 detalhes:['Proteína de alta digestibilidade','Com ômega 3 e 6 para pele e pelo','Sem corantes artificiais'],tags:'ração racao cachorro adulto frango premium seca croquete'},
{id:'c-rac-02',nome:'Ração para Filhotes Sabor Frango 3kg',animal:'cachorro',cat:'alimentacao',sub:'Rações',preco:89.9,antigo:null,aval:4.8,reviews:642,vendidos:2180,novo:45,selo:null,icon:'racao',hue:'teal',
 desc:'Formulação especial para filhotes até 12 meses, com DHA para o desenvolvimento do cérebro, cálcio para ossos fortes e grãos pequenos e crocantes.',
 detalhes:['Com DHA e cálcio','Grãos adaptados para filhotes','Fácil digestão'],tags:'ração racao filhote frango crescimento dha'},
{id:'c-pet-01',nome:'Petisco Ossinho Dental — 7 unidades',animal:'cachorro',cat:'alimentacao',sub:'Petiscos',preco:24.9,antigo:29.9,aval:4.7,reviews:918,vendidos:6310,novo:120,selo:'Oferta',icon:'osso',hue:'gold',
 desc:'Ossinhos mastigáveis que limpam os dentes, combatem o tártaro e o mau hálito enquanto o cão se diverte. Uso diário recomendado.',
 detalhes:['Ação anti-tártaro','Refresca o hálito','Pacote com 7 unidades'],tags:'petisco ossinho dental dente tártaro tártaro halito mastigar snack'},
{id:'c-bri-01',nome:'Bolinha Cravo Resistente para Cães',animal:'cachorro',cat:'brinquedos',sub:'Bolinhas',preco:19.9,antigo:null,aval:4.8,reviews:1503,vendidos:8920,novo:200,selo:null,icon:'bolinha',hue:'orange',
 desc:'Bolinha de borracha com cravos que massageiam a gengiva e ajudam na limpeza dos dentes. Super resistente para brincadeiras de buscar.',
 detalhes:['Borracha atóxica resistente','Massageia a gengiva','Ideal para buscar'],tags:'bolinha bola brinquedo buscar borracha cravo brincar'},
{id:'c-bri-02',nome:'Cabo de Guerra de Algodão',animal:'cachorro',cat:'brinquedos',sub:'Cordas',preco:29.9,antigo:39.9,aval:4.6,reviews:487,vendidos:1940,novo:60,selo:'Oferta',icon:'corda',hue:'green',
 desc:'Corda de algodão trançado com nós nas pontas, perfeita para brincadeiras de puxar e fortalecer o vínculo com o tutor.',
 detalhes:['Algodão trançado resistente','Estimula a interação','Ajuda a limpar os dentes'],tags:'corda guerra puxar algodão trançado trancado brincar'},
{id:'c-bri-03',nome:'Frisbee Flutuante para Cães',animal:'cachorro',cat:'brinquedos',sub:'Ar livre',preco:34.9,antigo:null,aval:4.7,reviews:356,vendidos:1210,novo:30,selo:null,icon:'frisbee',hue:'purple',
 desc:'Disco flutuante de bordas macias que não machuca a boca. Voo estável e preciso para brincadeiras no parque, na praia ou na piscina.',
 detalhes:['Flutua na água','Bordas macias e seguras','Voo estável'],tags:'frisbee disco voar praia piscina parque buscar ar livre'},
{id:'c-ace-01',nome:'Coleira de Nylon Ajustável',animal:'cachorro',cat:'acessorios',sub:'Coleiras e guias',preco:34.9,antigo:null,aval:4.7,reviews:763,vendidos:2870,novo:150,selo:null,icon:'coleira',hue:'navy',
 desc:'Coleira em nylon de alta resistência com fivela de liberação rápida e argola em metal para guia e plaquinha de identificação.',
 detalhes:['Nylon extra resistente','Fivela de liberação rápida','Ajuste em 5 tamanhos'],tags:'coleira nylon pescoço passeio identificação fivela'},
{id:'c-ace-02',nome:'Guia Retrátil 5 metros com Trava',animal:'cachorro',cat:'acessorios',sub:'Coleiras e guias',preco:79.9,antigo:99.9,aval:4.8,reviews:591,vendidos:2030,novo:75,selo:'Oferta',icon:'guia',hue:'blue',
 desc:'Guia retrátil com fita de 5 metros, botão de trava e empunhadura ergonômica. Liberdade com segurança em todos os passeios.',
 detalhes:['Fita de 5 metros','Trava de segurança','Empunhadura ergonômica'],tags:'guia retrátil retratil passeio trava fita coleira'},
{id:'c-ace-03',nome:'Caminha Nuvem Antiestresse',animal:'cachorro',cat:'acessorios',sub:'Caminhas',preco:149.9,antigo:189.9,aval:4.9,reviews:1102,vendidos:4150,novo:90,selo:'Mais vendido',icon:'caminha',hue:'pink',
 desc:'Caminha redonda com bordas elevadas e pelúcia extra macia que abraça o pet e reduz a ansiedade. Fundo antiderrapante e lavável na máquina.',
 detalhes:['Efeito calmante antiestresse','Pelúcia macia e lavável','Fundo antiderrapante'],tags:'caminha cama nuvem dormir antiestresse pelúcia pelucia redonda'},
{id:'c-ace-04',nome:'Comedouro Elevado em Inox',animal:'cachorro',cat:'acessorios',sub:'Comedouros',preco:59.9,antigo:null,aval:4.6,reviews:428,vendidos:1560,novo:50,selo:null,icon:'comedouro',hue:'teal',
 desc:'Suporte elevado com tigela em aço inox que melhora a postura na hora de comer e reduz o desconforto digestivo. Fácil de limpar.',
 detalhes:['Tigela em aço inox','Melhora a postura ao comer','Base estável antiderrapante'],tags:'comedouro elevado inox tigela comer pote ração suporte'},
{id:'c-ace-05',nome:'Roupinha Moletom para Cães',animal:'cachorro',cat:'acessorios',sub:'Roupas',preco:49.9,antigo:null,aval:4.5,reviews:312,vendidos:980,novo:20,selo:'Novo',icon:'roupa',hue:'orange',
 desc:'Moletom quentinho com abertura para a guia, ideal para os dias frios. Tecido macio que não pinica e não limita os movimentos.',
 detalhes:['Tecido macio e quentinho','Abertura para a guia','Do PP ao GG'],tags:'roupa roupinha moletom frio inverno vestir casaco'},
{id:'c-hig-01',nome:'Shampoo Neutro para Cães 500ml',animal:'cachorro',cat:'higiene',sub:'Banho',preco:39.9,antigo:null,aval:4.8,reviews:834,vendidos:3120,novo:110,selo:null,icon:'shampoo',hue:'green',
 desc:'Shampoo de pH neutro para uso frequente, com extratos naturais que limpam sem ressecar a pele. Perfume suave e delicioso.',
 detalhes:['pH neutro veterinário','Uso frequente liberado','Perfume suave'],tags:'shampoo banho neutro lavar pelo ph sabonete'},
{id:'c-hig-02',nome:'Tapete Higiênico — 30 unidades',animal:'cachorro',cat:'higiene',sub:'Higiene',preco:69.9,antigo:79.9,aval:4.7,reviews:2084,vendidos:9210,novo:180,selo:'Oferta',icon:'tapete',hue:'purple',
 desc:'Tapetes com gel superabsorvente e fita adesiva que fixa no chão. Barreira antivazamento e atrativo canino para adestramento.',
 detalhes:['Gel superabsorvente','Fita adesiva antiderrapante','Com atrativo canino'],tags:'tapete higiênico higienico xixi urina absorvente gel adestramento'},
{id:'c-hig-03',nome:'Shampoo Hipoalergênico de Aveia',animal:'cachorro',cat:'higiene',sub:'Banho',preco:46.9,antigo:null,aval:4.8,reviews:287,vendidos:1240,novo:28,selo:'Novo',icon:'shampoo',hue:'teal',
 desc:'Shampoo hipoalergênico com aveia coloidal, indicado para peles sensíveis e alérgicas. Hidrata, acalma coceiras e deixa o pelo sedoso.',
 detalhes:['Para peles sensíveis','Com aveia coloidal','Acalma coceiras'],tags:'shampoo hipoalergênico hipoalergenico aveia sensível alergia coceira'},
{id:'c-bri-04',nome:'Osso de Nylon Sabor Carne',animal:'cachorro',cat:'brinquedos',sub:'Mordedores',preco:27.9,antigo:null,aval:4.6,reviews:445,vendidos:1730,novo:40,selo:null,icon:'osso',hue:'gold',
 desc:'Mordedor de nylon atóxico com sabor carne que entretém por horas e ajuda a aliviar o estresse e a ansiedade de cães destruidores.',
 detalhes:['Nylon atóxico durável','Sabor carne irresistível','Alivia estresse e ansiedade'],tags:'osso nylon morder mordedor carne destruir ansiedade'},

/* ------------------------------- GATOS -------------------------------- */
{id:'g-rac-01',nome:'Ração para Gatos Castrados 3kg',animal:'gato',cat:'alimentacao',sub:'Rações',preco:99.9,antigo:119.9,aval:4.9,reviews:1876,vendidos:7840,novo:100,selo:'Mais vendido',icon:'racao',hue:'purple',
 desc:'Ração com baixo teor de gordura e pH urinário controlado, desenvolvida para as necessidades de gatos castrados. Controle de peso e saúde urinária.',
 detalhes:['Controle de peso','pH urinário equilibrado','Ômega 3 e 6'],tags:'ração racao gato castrado castrados urinário urinario peso light'},
{id:'g-rac-02',nome:'Sachês Sabor Frango — Kit 12un',animal:'gato',cat:'alimentacao',sub:'Sachês',preco:54.9,antigo:64.9,aval:4.8,reviews:1204,vendidos:5980,novo:85,selo:'Oferta',icon:'sache',hue:'pink',
 desc:'Alimento úmido em sachês com pedacinhos suculentos de frango ao molho. Aumenta a hidratação e é irresistível até para os gatos mais exigentes.',
 detalhes:['Aumenta a hidratação','Pedacinhos ao molho','Kit econômico com 12'],tags:'sachê sache úmido umido frango molho hidratação hidratacao envelope'},
{id:'g-hig-01',nome:'Areia Higiênica Biodegradável 4kg',animal:'gato',cat:'higiene',sub:'Areias',preco:29.9,antigo:null,aval:4.7,reviews:2310,vendidos:11230,novo:210,selo:null,icon:'areia',hue:'green',
 desc:'Areia de mandioca biodegradável que forma torrões firmes e pode ser descartada no vaso sanitário. Controle de odor por até 7 dias.',
 detalles:['Forma torrões firmes','Descartável no vaso','Controle de odor'],tags:'areia higiênica higienica gato torrão torrao odor vaso mandioca'},
{id:'g-ace-01',nome:'Arranhador Torre 3 Andares',animal:'gato',cat:'acessorios',sub:'Arranhadores',preco:199.9,antigo:249.9,aval:4.9,reviews:764,vendidos:2890,novo:70,selo:'Mais vendido',icon:'arranhador',hue:'gold',
 desc:'Torre com 3 andares, toca, redes e postes revestidos de sisal. O parquinho completo para arranhar, escalar, descansar e observar a casa do alto.',
 detalhes:['Postes em sisal natural','Toca + 2 plataformas','Base estável e segura'],tags:'arranhador torre sisal arranhar escalar toca andares gato'},
{id:'g-bri-01',nome:'Varinha com Penas Interativa',animal:'gato',cat:'brinquedos',sub:'Interativos',preco:16.9,antigo:null,aval:4.6,reviews:689,vendidos:3420,novo:130,selo:null,icon:'varinha',hue:'teal',
 desc:'Varinha com penas coloridas que desperta o instinto caçador do gato. Perfeita para gastar energia e fortalecer o vínculo com o tutor.',
 detalhes:['Estimula o instinto caçador','Penas coloridas','Combate o sedentarismo'],tags:'varinha pena pena caçar cacar interativo brincar instinto'},
{id:'g-bri-02',nome:'Ratinhos com Catnip — 3un',animal:'gato',cat:'brinquedos',sub:'Pelúcias',preco:21.9,antigo:null,aval:4.7,reviews:912,vendidos:4210,novo:140,selo:null,icon:'ratinho',hue:'pink',
 desc:'Trio de ratinhos de pelúcia recheados com catnip (erva do gato) de verdade. Diversão garantida até para os gatos mais tranquilos.',
 detalhes:['Com catnip natural','Pelúcia macia','Kit com 3 ratinhos'],tags:'ratinho rato catnip erva pelúcia pelucia brinquedo gato'},
{id:'g-ace-02',nome:'Fonte de Água Elétrica 2L',animal:'gato',cat:'acessorios',sub:'Fontes',preco:129.9,antigo:159.9,aval:4.8,reviews:1043,vendidos:3760,novo:55,selo:'Oferta',icon:'fonte',hue:'blue',
 desc:'Fonte com água corrente filtrada que estimula o gato a beber mais água. Filtro de carvão ativado, bomba silenciosa e 3 modos de fluxo.',
 detalles:['Estimula a hidratação','Filtro de carvão ativado','Bomba ultrassilenciosa'],tags:'fonte água agua beber hidratação hidratacao elétrica eletrica filtro'},
{id:'g-ace-03',nome:'Cama Iglu Aconchegante',animal:'gato',cat:'acessorios',sub:'Camas',preco:119.9,antigo:null,aval:4.8,reviews:537,vendidos:1980,novo:65,selo:null,icon:'iglu',hue:'purple',
 desc:'Caminha em formato de iglu com entrada redonda que cria um refúgio quentinho e seguro. Almofada removível e lavável.',
 detalles:['Refúgio aconchegante','Almofada removível','Lavável na máquina'],tags:'cama iglu dormir toca aconchego refúgio refugio redonda'},
{id:'g-hig-02',nome:'Escova Removedora de Pelos',animal:'gato',cat:'higiene',sub:'Escovação',preco:32.9,antigo:null,aval:4.5,reviews:623,vendidos:2540,novo:95,selo:null,icon:'escova',hue:'orange',
 desc:'Escova com cerdas de aço que remove o subpelo solto sem machucar. Reduz as bolas de pelo e a queda pela casa. Botão de autolimpeza.',
 detalhes:['Remove o subpelo solto','Botão de autolimpeza','Reduz bolas de pelo'],tags:'escova pelo escovar subpelo queda bola de pelo pentear'},
{id:'g-bri-03',nome:'Laser Interativo USB para Gatos',animal:'gato',cat:'brinquedos',sub:'Interativos',preco:45.9,antigo:null,aval:4.4,reviews:389,vendidos:1320,novo:25,selo:'Novo',icon:'laser',hue:'navy',
 desc:'Brinquedo automático com laser que se movimenta sozinho em padrões aleatórios. Mantém o gato ativo mesmo quando você não está em casa.',
 detalles:['Movimento automático','Recarregável via USB','Desliga sozinho em 15 min'],tags:'laser automático automatico usb interativo sozinho movimento'},
{id:'g-sau-01',nome:'Pasta de Malte para Bolas de Pelo',animal:'gato',cat:'saude',sub:'Suplementos',preco:42.9,antigo:null,aval:4.6,reviews:298,vendidos:1140,novo:35,selo:null,icon:'pote',hue:'gold',
 desc:'Pasta de malte saborosa que ajuda a eliminar as bolas de pelo pelo trato digestivo de forma natural. Uso 2 a 3 vezes por semana.',
 detalles:['Elimina bolas de pelo','Sabor que gatos adoram','Uso semanal'],tags:'malte pasta bola de pelo pelo digestivo suplemento'},

/* ------------------------------ PÁSSAROS ------------------------------ */
{id:'p-ali-01',nome:'Alpiste Premium 1kg',animal:'passaro',cat:'alimentacao',sub:'Sementes',preco:18.9,antigo:null,aval:4.7,reviews:456,vendidos:3890,novo:160,selo:null,icon:'alpiste',hue:'gold',
 desc:'Alpiste selecionado grão a grão, limpo e livre de impurezas. Alimento base para canários, periquitos e calopsitas.',
 detalles:['Grãos selecionados','Livre de impurezas','Para canários e periquitos'],tags:'alpiste semente canário canario periquito calopsita grão grao'},
{id:'p-ali-02',nome:'Mistura de Sementes para Calopsitas 1kg',animal:'passaro',cat:'alimentacao',sub:'Sementes',preco:22.9,antigo:27.9,aval:4.8,reviews:387,vendidos:2760,novo:90,selo:'Oferta',icon:'alpiste',hue:'green',
 desc:'Mix balanceado de painço, aveia, girassol e alpiste, com cálcio adicionado. Nutrição completa para calopsitas e psitacídeos.',
 detalles:['Mix balanceado','Com cálcio adicionado','Para calopsitas'],tags:'mistura semente calopsita painço painco girassol aveia mix'},
{id:'p-ace-01',nome:'Gaiola com Poleiros e Comedouros',animal:'passaro',cat:'acessorios',sub:'Gaiolas',preco:159.9,antigo:199.9,aval:4.7,reviews:214,vendidos:860,novo:80,selo:'Oferta',icon:'gaiola',hue:'blue',
 desc:'Gaiola espaçosa com pintura atóxica, 2 poleiros de madeira, 2 comedouros e bandeja removível para limpeza fácil. Ideal para calopsitas e periquitos.',
 detalles:['Pintura atóxica','2 poleiros + 2 comedouros','Bandeja removível'],tags:'gaiola viveiro calopsita periquito poleiro comedouro bandeja'},
{id:'p-ace-02',nome:'Bebedouro Externo para Gaiola',animal:'passaro',cat:'acessorios',sub:'Bebedouros',preco:14.9,antigo:null,aval:4.5,reviews:342,vendidos:1980,novo:170,selo:null,icon:'bebedouro',hue:'teal',
 desc:'Bebedouro de pressão que se fixa do lado de fora da gaiola, mantendo a água sempre limpa e fresca. Fácil de encher e higienizar.',
 detalles:['Água sempre limpa','Fixação externa','Fácil higienização'],tags:'bebedouro água agua gaiola pressão pressao externo beber'},
{id:'p-ace-03',nome:'Comedouro Inox com Gancho',animal:'passaro',cat:'acessorios',sub:'Comedouros',preco:19.9,antigo:null,aval:4.6,reviews:198,vendidos:1240,novo:60,selo:null,icon:'comedouro',hue:'orange',
 desc:'Comedouro em aço inox com gancho para fixar nas grades da gaiola. Não enferruja, não quebra e é super fácil de lavar.',
 detalhes:['Aço inox durável','Gancho para as grades','Fácil de lavar'],tags:'comedouro inox pote comer gancho grade tigela'},
{id:'p-bri-01',nome:'Brinquedo Escada de Corda',animal:'passaro',cat:'brinquedos',sub:'Poleiros e brinquedos',preco:25.9,antigo:null,aval:4.6,reviews:176,vendidos:940,novo:45,selo:null,icon:'escada',hue:'purple',
 desc:'Escada flexível de madeira e corda de algodão que estimula a escalada e o exercício. Pode ser moldada em diferentes formatos na gaiola.',
 detalhes:['Estimula o exercício','Formato moldável','Madeira + algodão'],tags:'escada corda escalar subir brincar madeira flexível flexivel'},
{id:'p-hig-01',nome:'Banheira para Pássaros',animal:'passaro',cat:'higiene',sub:'Banho',preco:27.9,antigo:null,aval:4.5,reviews:143,vendidos:720,novo:70,selo:null,icon:'banheira',hue:'teal',
 desc:'Banheirinha que se encaixa na porta da gaiola para o banho refrescante da ave. Ajuda a manter as penas limpas e saudáveis.',
 detalles:['Encaixe na porta','Penas limpas e saudáveis','Banho refrescante'],tags:'banheira banho pena pena água agua refrescar lavar'},
{id:'p-sau-01',nome:'Suplemento Vitamínico 30ml',animal:'passaro',cat:'saude',sub:'Suplementos',preco:34.9,antigo:null,aval:4.7,reviews:167,vendidos:680,novo:50,selo:null,icon:'gota',hue:'green',
 desc:'Complexo vitamínico líquido para pingar no bebedouro. Fortalece a imunidade, realça as cores das penas e ajuda na muda.',
 detalles:['Fortalece a imunidade','Realça as penas','Ajuda na muda'],tags:'vitamina vitamínico vitaminico suplemento imunidade pena muda gota'},

/* -------------------------------- PEIXES ------------------------------- */
{id:'f-ali-01',nome:'Ração em Flocos Tropicais 50g',animal:'peixe',cat:'alimentacao',sub:'Rações',preco:21.9,antigo:null,aval:4.7,reviews:523,vendidos:3120,novo:150,selo:null,icon:'pote',hue:'orange',
 desc:'Flocos nutritivos com spirulina para peixes tropicais de água doce. Realça as cores, não turva a água e tem alta digestibilidade.',
 detalhes:['Com spirulina','Realça as cores','Não turva a água'],tags:'ração racao floco flocos tropical spirulina beta peixe comida'},
{id:'f-ace-01',nome:'Aquário Completo 20L com LED',animal:'peixe',cat:'acessorios',sub:'Aquários',preco:249.9,antigo:299.9,aval:4.8,reviews:186,vendidos:640,novo:40,selo:'Premium',icon:'aquario',hue:'blue',
 desc:'Kit aquário de 20 litros com tampa, iluminação LED, filtro e termômetro. Pronto para montar: ideal para iniciantes no aquarismo.',
 detalles:['Kit completo pronto','Iluminação LED inclusa','Ideal para iniciantes'],tags:'aquário aquario 20l kit led completo iniciante vidro tanque'},
{id:'f-ace-02',nome:'Filtro Interno com Bomba',animal:'peixe',cat:'acessorios',sub:'Filtragem',preco:69.9,antigo:89.9,aval:4.6,reviews:243,vendidos:1180,novo:75,selo:'Oferta',icon:'filtro',hue:'teal',
 desc:'Filtro interno silencioso para aquários de até 60 litros, com filtragem mecânica e biológica. Água cristalina com manutenção simples.',
 detalles:['Para até 60 litros','Filtragem completa','Super silencioso'],tags:'filtro filtragem bomba interno silencioso cristalina água agua'},
{id:'f-sau-01',nome:'Condicionador de Água 120ml',animal:'peixe',cat:'saude',sub:'Tratamento',preco:29.9,antigo:null,aval:4.8,reviews:312,vendidos:1560,novo:90,selo:null,icon:'gota',hue:'blue',
 desc:'Condicionador que neutraliza o cloro e metais pesados da água da torneira em minutos, deixando-a segura para os peixes. Essencial a cada troca.',
 detalhes:['Neutraliza cloro','Age em minutos','Essencial a cada troca'],tags:'condicionador cloro água agua troca tratamento torneira anticloro'},
{id:'f-ace-03',nome:'Enfeite Castelo para Aquário',animal:'peixe',cat:'acessorios',sub:'Decoração',preco:39.9,antigo:null,aval:4.5,reviews:178,vendidos:890,novo:55,selo:null,icon:'castelo',hue:'purple',
 desc:'Castelinho de resina atóxica com esconderijos que servem de refúgio para os peixes. Decoração clássica que não altera o pH da água.',
 detalhes:['Resina atóxica','Com esconderijos','Não altera o pH'],tags:'enfeite castelo decoração decoracao refúgio refugio resina esconderijo'},
{id:'f-ace-04',nome:'Termômetro Digital com Ventosa',animal:'peixe',cat:'acessorios',sub:'Equipamentos',preco:24.9,antigo:null,aval:4.4,reviews:156,vendidos:740,novo:65,selo:null,icon:'termometro',hue:'navy',
 desc:'Termômetro digital de fixação externa com ventosa e leitura precisa. Monitorar a temperatura é essencial para a saúde dos peixes tropicais.',
 detalhes:['Leitura precisa','Fixação com ventosa','Essencial p/ tropicais'],tags:'termômetro termometro temperatura digital ventosa calor frio'},
{id:'f-ace-05',nome:'Luminária LED para Aquário',animal:'peixe',cat:'acessorios',sub:'Iluminação',preco:89.9,antigo:null,aval:4.7,reviews:134,vendidos:520,novo:30,selo:'Novo',icon:'lampada',hue:'gold',
 desc:'Luminária LED de encaixe na borda do aquário, com luz branca e azul (modo luar). Realça as cores dos peixes e ajuda as plantas.',
 detalhes:['Branca + azul luar','Encaixe universal','Baixo consumo'],tags:'luminária luminaria led luz iluminação iluminacao luar branco azul'},
{id:'f-ace-06',nome:'Redinha para Peixes',animal:'peixe',cat:'acessorios',sub:'Equipamentos',preco:12.9,antigo:null,aval:4.3,reviews:201,vendidos:1320,novo:190,selo:null,icon:'rede',hue:'green',
 desc:'Redinha de malha macia com cabo plástico para manejo seguro dos peixes na limpeza ou transferência. Não machuca as nadadeiras.',
 detalhes:['Malha macia e segura','Cabo resistente','Manejo delicado'],tags:'rede redinha pegar manejo transferir malha nadadeira'},

/* --------------------------- HAMSTERS E PEQUENOS ------------------------ */
{id:'h-ace-01',nome:'Gaiola 2 Andares Completa',animal:'hamster',cat:'acessorios',sub:'Gaiolas',preco:189.9,antigo:229.9,aval:4.8,reviews:287,vendidos:1040,novo:60,selo:'Mais vendido',icon:'gaiola',hue:'pink',
 desc:'Gaiola com 2 andares, túneis, roda, casinha, comedouro e bebedouro inclusos. O lar completo e divertido para hamsters e camundongos.',
 detalhes:['Kit completo incluso','Túneis e 2 andares','Fácil de limpar'],tags:'gaiola hamster andar túnel tunel roda completa camundongo viveiro'},
{id:'h-bri-01',nome:'Roda de Exercício Silenciosa',animal:'hamster',cat:'brinquedos',sub:'Exercício',preco:49.9,antigo:59.9,aval:4.7,reviews:356,vendidos:1680,novo:70,selo:'Oferta',icon:'roda',hue:'orange',
 desc:'Roda com rolamento silencioso e base estável: o hamster corre a noite toda sem incomodar seu sono. Superfície segura para as patinhas.',
 detalhes:['Rolamento silencioso','Base estável','Segura p/ patinhas'],tags:'roda exercício exercicio correr silencioso noite patinha girar'},
{id:'h-ali-01',nome:'Ração para Hamster 500g',animal:'hamster',cat:'alimentacao',sub:'Rações',preco:26.9,antigo:null,aval:4.7,reviews:289,vendidos:1840,novo:120,selo:null,icon:'racao',hue:'green',
 desc:'Mix de grãos, sementes e pellets extrusados com vitaminas para hamsters, topolinos e gerbils. Alimentação completa e crocante.',
 detalles:['Mix de grãos e pellets','Com vitaminas','Para hamsters e gerbils'],tags:'ração racao hamster grão grao semente pellet gerbil topolino'},
{id:'h-hig-01',nome:'Substrato de Maravalha 3kg',animal:'hamster',cat:'higiene',sub:'Forrações',preco:32.9,antigo:null,aval:4.6,reviews:234,vendidos:1290,novo:140,selo:null,icon:'substrato',hue:'gold',
 desc:'Maravalha de pinus tratada termicamente, sem pó e super absorvente. Forração confortável que controla odores e é segura para tocas.',
 detalles:['Sem pó, tratada','Super absorvente','Controla odores'],tags:'substrato maravalha forração forracao pinus cama odor absorvente serragem'},
{id:'h-bri-02',nome:'Túnel Modular — Kit 3 peças',animal:'hamster',cat:'brinquedos',sub:'Túneis',preco:44.9,antigo:null,aval:4.6,reviews:187,vendidos:920,novo:50,selo:null,icon:'tunel',hue:'purple',
 desc:'Túneis plásticos que se conectam entre si e à gaiola, criando labirintos para explorar. Estimula o comportamento natural de escavação.',
 detalles:['Peças conectáveis','Cria labirintos','Estimula a exploração'],tags:'túnel tunel labirinto conectar explorar modular plástico plastico'},
{id:'h-ace-02',nome:'Bebedouro 250ml com Suporte',animal:'hamster',cat:'acessorios',sub:'Bebedouros',preco:21.9,antigo:null,aval:4.5,reviews:312,vendidos:1760,novo:150,selo:null,icon:'bebedouro',hue:'blue',
 desc:'Bebedouro de bico com esfera dosadora e suporte para fixar na gaiola. Água limpa disponível o tempo todo, sem vazar na forração.',
 detalhes:['Bico dosador antivazamento','Suporte para gaiola','250ml de capacidade'],tags:'bebedouro água agua bico esfera gaiola vazar hamster'},
{id:'h-ace-03',nome:'Comedouro de Cerâmica',animal:'hamster',cat:'acessorios',sub:'Comedouros',preco:18.9,antigo:null,aval:4.6,reviews:145,vendidos:980,novo:80,selo:null,icon:'comedouro',hue:'pink',
 desc:'Comedouro pesado de cerâmica que o hamster não consegue virar. Esmaltado por dentro para limpeza fácil e máxima higiene.',
 detalles:['Não vira fácil','Cerâmica esmaltada','Fácil de lavar'],tags:'comedouro cerâmica ceramica pote comer pesado tigela'},
{id:'h-ace-04',nome:'Casinha de Madeira Natural',animal:'hamster',cat:'acessorios',sub:'Tocas',preco:39.9,antigo:null,aval:4.7,reviews:168,vendidos:740,novo:45,selo:null,icon:'casinha',hue:'orange',
 desc:'Cabaninha de madeira natural sem verniz, segura para roer e perfeita como esconderijo para dormir. Refúgio aconchegante e atóxico.',
 detalles:['Madeira natural sem verniz','Segura para roer','Refúgio p/ dormir'],tags:'casinha toca madeira esconderijo dormir roer cabana atóxico atoxico'},
{id:'h-bri-03',nome:'Bola de Exercício Transparente',animal:'hamster',cat:'brinquedos',sub:'Exercício',preco:34.9,antigo:null,aval:4.5,reviews:203,vendidos:1150,novo:90,selo:null,icon:'bolaex',hue:'teal',
 desc:'Bola transparente com ventilação para o hamster explorar a casa com segurança. Tampa de rosca firme e rolamento suave.',
 detalles:['Ventilação adequada','Tampa de rosca segura','Exploração protegida'],tags:'bola exercício exercicio transparente explorar ventilação ventilacao girar'},
{id:'h-ali-02',nome:'Feno Aromático de Capim 1kg',animal:'hamster',cat:'alimentacao',sub:'Fenos',preco:24.9,antigo:null,aval:4.6,reviews:176,vendidos:990,novo:70,selo:null,icon:'feno',hue:'green',
 desc:'Feno fresco e cheiroso de capim, rico em fibras para a digestão e para o desgaste natural dos dentes. Também serve de forração e toca.',
 detalles:['Rico em fibras','Desgaste natural dos dentes','Fresco e aromático'],tags:'feno capim fibra dente digestão digestao forração forracao coelho'},

/* ------------------------------ TODOS OS PETS --------------------------- */
{id:'t-ace-01',nome:'Caixa de Transporte com Grade',animal:'todos',cat:'acessorios',sub:'Transporte',preco:99.9,antigo:129.9,aval:4.7,reviews:445,vendidos:1890,novo:95,selo:'Oferta',icon:'transporte',hue:'navy',
 desc:'Caixa de transporte resistente com porta de grade metálica e travas de segurança. Ventilação lateral e alça ergonômica. Para cães e gatos.',
 detalhes:['Porta de grade metálica','Travas de segurança','Para cães e gatos'],tags:'caixa transporte viagem veterinário veterinario grade porta levar carro avião aviao'},
{id:'t-hig-01',nome:'Cortador de Unhas com Trava',animal:'todos',cat:'higiene',sub:'Cuidados',preco:22.9,antigo:null,aval:4.5,reviews:567,vendidos:2890,novo:130,selo:null,icon:'cortador',hue:'purple',
 desc:'Cortador com lâmina em aço inoxidável, trava de segurança e limitador que evita cortes profundos. Para cães, gatos e pequenos animais.',
 detalhes:['Lâmina em inox','Trava de segurança','Com limitador de corte'],tags:'cortador unha cortar garra lâmina lamina limitador cão cao gato'},
{id:'t-hig-02',nome:'Lenços Umedecidos — 50un',animal:'todos',cat:'higiene',sub:'Cuidados',preco:19.9,antigo:null,aval:4.6,reviews:834,vendidos:4760,novo:160,selo:null,icon:'lencos',hue:'teal',
 desc:'Lenços umedecidos hipoalergênicos para limpar patas, focinho, olhos e ouvidos no dia a dia e nos passeios. Sem álcool e sem perfume forte.',
 detalles:['Hipoalergênicos','Sem álcool','Para patas e focinho'],tags:'lenço lenco umedecido limpar pata focinho olho ouvido passeio wipes'},
{id:'t-sau-01',nome:'Antipulgas Pipeta 3 doses',animal:'todos',cat:'saude',sub:'Antiparasitários',preco:59.9,antigo:74.9,aval:4.8,reviews:692,vendidos:3240,novo:85,selo:'Oferta',icon:'pipeta',hue:'green',
 desc:'Antipulgas e carrapaticida de aplicação na nuca com proteção por 30 dias por dose. Elimina pulgas, carrapatos e piolhos. Para cães e gatos.',
 detalles:['Proteção por 30 dias','Pulgas e carrapatos','Fácil aplicação'],tags:'antipulga pulga carrapato pipeta nuca parasita proteção protecao'},
{id:'t-sau-02',nome:'Vitamina Pelo & Pele 60 caps',animal:'todos',cat:'saude',sub:'Suplementos',preco:44.9,antigo:null,aval:4.6,reviews:278,vendidos:1340,novo:60,selo:null,icon:'vitamina',hue:'orange',
 desc:'Suplemento com biotina, zinco e ômega 3 para pelagem brilhante, pele saudável e menos queda de pelo. Cápsulas palatáveis.',
 detalhes:['Biotina + zinco + ômega 3','Menos queda de pelo','Cápsulas palatáveis'],tags:'vitamina pelo pele biotina zinco ômega omega queda suplemento capsula'},
{id:'t-bri-01',nome:'Pelúcia com Apito',animal:'todos',cat:'brinquedos',sub:'Pelúcias',preco:36.9,antigo:null,aval:4.7,reviews:512,vendidos:2680,novo:75,selo:null,icon:'pelucia',hue:'pink',
 desc:'Bichinho de pelúcia fofinho com apito interno que desperta a curiosidade. Costura reforçada e enchimento antialérgico. Para cães e gatos.',
 detalhes:['Apito interno','Costura reforçada','Enchimento antialérgico'],tags:'pelúcia pelucia apito bicho fofinho morder brincar ursinho'},
{id:'t-hig-03',nome:'Kit Escova + Pente Profissional',animal:'todos',cat:'higiene',sub:'Escovação',preco:28.9,antigo:36.9,aval:4.5,reviews:346,vendidos:1580,novo:100,selo:'Oferta',icon:'escova',hue:'blue',
 desc:'Kit com escova de pinos com pontas arredondadas e pente de aço para desembaraçar. Essencial para pelos médios e longos.',
 detalles:['Escova + pente de aço','Pinos com pontas arredondadas','Para pelos médios e longos'],tags:'kit escova pente desembaraçar desembaracar pelo longo médio medio escovar'},
{id:'t-ace-02',nome:'Bandana Estampada Ajustável',animal:'todos',cat:'acessorios',sub:'Roupas',preco:15.9,antigo:null,aval:4.4,reviews:234,vendidos:1210,novo:40,selo:null,icon:'bandana',hue:'purple',
 desc:'Bandana estilosa com regulagem no pescoço para um passeio cheio de charme. Tecido leve e estampas exclusivas. Para cães e gatos.',
 detalles:['Regulagem no pescoço','Tecido leve','Estampas exclusivas'],tags:'bandana lenço lenco pescoço pescoco estilo passeio estampa'},
{id:'t-ace-03',nome:'Tapete Gelado Refrescante',animal:'todos',cat:'acessorios',sub:'Conforto',preco:79.9,antigo:99.9,aval:4.7,reviews:389,vendidos:1620,novo:25,selo:'Novo',icon:'tapetegel',hue:'teal',
 desc:'Tapete com gel refrescante que alivia o calor sem precisar de água ou energia. Alívio imediato nos dias quentes para cães e gatos.',
 detalles:['Gela sem energia','Alívio no calor','Fácil de limpar'],tags:'tapete gelado gel refrescante calor quente verão verao fresco'},
{id:'t-sau-03',nome:'Probiótico em Pó 30 sachês',animal:'todos',cat:'saude',sub:'Suplementos',preco:52.9,antigo:null,aval:4.7,reviews:198,vendidos:860,novo:35,selo:null,icon:'pote',hue:'navy',
 desc:'Probiótico em pó para misturar na ração: equilibra a flora intestinal, melhora as fezes e fortalece a imunidade. Para cães e gatos.',
 detalles:['Equilibra a flora intestinal','Melhora as fezes','Fortalece a imunidade'],tags:'probiótico probiotico pó po intestinal flora fezes digestão digestao imunidade'}
];

/* ------------------------------- Helpers -------------------------------- */
PS.prodById = function(id){
  return PS.PRODUCTS.find(function(p){ return p.id === id; }) || null;
};

PS.money = function(n){
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

PS.parcela = function(preco){
  var n = preco >= 200 ? 10 : (preco >= 100 ? 6 : 3);
  return { n: n, v: preco / n };
};

PS.desconto = function(p){
  if(!p.antigo || p.antigo <= p.preco) return 0;
  return Math.round((1 - p.preco / p.antigo) * 100);
};

PS.animalLabel = function(k){ return PS.ANIMAIS[k] || k; };
PS.catLabel = function(k){ return PS.CATS[k] || k; };
