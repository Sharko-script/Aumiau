# 🐾 Patas & Pelos Pet Shop

Site completo e funcional de pet shop, feito com **HTML + CSS + JavaScript puro** (sem dependências).

## ✨ O que tem

- Página inicial com hero, busca, categorias, ofertas, mais vendidos, blog e depoimentos
- 10 páginas de categoria (cachorros, gatos, pássaros, peixes, hamsters, acessórios, alimentação, higiene, brinquedos)
- Busca com sugestões ao vivo + filtros (animal, categoria, preço, ofertas) e ordenação
- Página de produto com avaliações, relacionados e vistos recentemente
- Carrinho lateral + página do carrinho (cupom, frete por CEP) + checkout com cartão/Pix
- Favoritos, login, cadastro e perfil (pedidos, endereços, dados) — tudo salvo no navegador
- Blog com 6 artigos, central de ajuda, newsletter, menu mobile e layout 100% responsivo

## 📁 Estrutura

```
├── index.html            # página inicial
├── cachorros.html ...    # páginas de categoria
├── pages/                # produto, busca, carrinho, favoritos, login, cadastro, perfil, ajuda
├── css/                  # style.css, components.css, responsive.css
├── js/                   # products.js, layout.js, cart.js, favorites.js, search.js, auth.js, product.js, category.js, main.js
└── assets/images/        # fotos do site
```

## 🚀 Como rodar

**Opção 1 — abrir direto:** dê dois cliques no `index.html` (funciona sem servidor).

**Opção 2 — servidor local (recomendado):**
```bash
cd petshop
python -m http.server 8000
```
Depois abra `http://localhost:8000` no navegador.

## 🌐 Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta (o `index.html` deve ficar na raiz).
2. Em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`.
3. Pronto! O site entra no ar em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## 🔑 Para testar

- **Conta demo:** `demo@petshop.com` / `demo123` (ou botão "Entrar com conta demo")
- **Cupom:** `BEMVINDO10` (10% OFF)

Feito com HTML + CSS + JS. 🐶🐱
