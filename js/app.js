/* ============================================================
   AUMIAU / PATAS & PELOS
   app.js - melhorias gerais e compatibilidade
   ============================================================ */

(function () {
    "use strict";

    /* ---------------------------------------------------------
       Aguarda o carregamento completo do site
    --------------------------------------------------------- */
    document.addEventListener("DOMContentLoaded", function () {

        console.log("🐾 Aumiau: JavaScript carregado!");

        /* =====================================================
           1. BOTÃO VOLTAR AO TOPO
        ===================================================== */

        criarBotaoTopo();


        /* =====================================================
           2. BARRA DE PROGRESSO DA PÁGINA
        ===================================================== */

        criarBarraProgresso();


        /* =====================================================
           3. ROLAGEM SUAVE
        ===================================================== */

        ativarRolagemSuave();


        /* =====================================================
           4. ATALHO "/" PARA PESQUISA
        ===================================================== */

        ativarAtalhoPesquisa();


        /* =====================================================
           5. ESC FECHA ELEMENTOS ABERTOS
        ===================================================== */

        ativarTeclaEscape();


        /* =====================================================
           6. DETECTAR INTERNET
        ===================================================== */

        detectarConexao();


        /* =====================================================
           7. LINKS COM HASH
        ===================================================== */

        corrigirLinksInternos();


        /* =====================================================
           8. ANIMAÇÃO DOS ELEMENTOS
        ===================================================== */

        animarElementos();


        /* =====================================================
           9. PROTEÇÃO CONTRA IMAGENS QUEBRADAS
        ===================================================== */

        protegerImagens();


        /* =====================================================
           10. BOTÕES DE PRODUTO
        ===================================================== */

        ativarBotoesProduto();


        /* =====================================================
           11. CONTADOR DO CARRINHO
        ===================================================== */

        atualizarContadores();


        console.log("✅ Aumiau: recursos extras inicializados!");
    });


    /* =========================================================
       BOTÃO VOLTAR AO TOPO
    ========================================================= */

    function criarBotaoTopo() {

        if (document.getElementById("btnVoltarTopo")) {
            return;
        }

        var botao = document.createElement("button");

        botao.id = "btnVoltarTopo";
        botao.type = "button";
        botao.setAttribute("aria-label", "Voltar ao topo");
        botao.innerHTML = "↑";

        botao.style.cssText = `
            position: fixed;
            right: 22px;
            bottom: 22px;
            width: 48px;
            height: 48px;
            border: 0;
            border-radius: 50%;
            background: #16324F;
            color: #FFFFFF;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transform: translateY(15px);
            transition: all .25s ease;
            box-shadow: 0 8px 25px rgba(0,0,0,.18);
        `;

        document.body.appendChild(botao);

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                botao.style.opacity = "1";
                botao.style.visibility = "visible";
                botao.style.transform = "translateY(0)";

            } else {

                botao.style.opacity = "0";
                botao.style.visibility = "hidden";
                botao.style.transform = "translateY(15px)";
            }

        }, { passive: true });


        botao.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =========================================================
       BARRA DE PROGRESSO
    ========================================================= */

    function criarBarraProgresso() {

        if (document.getElementById("aumiauProgress")) {
            return;
        }

        var barra = document.createElement("div");

        barra.id = "aumiauProgress";

        barra.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: #F2A93B;
            z-index: 10000;
            transition: width .1s linear;
        `;

        document.body.appendChild(barra);


        function atualizar() {

            var altura =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (altura <= 0) {
                barra.style.width = "0%";
                return;
            }

            var porcentagem =
                (window.scrollY / altura) * 100;

            barra.style.width =
                Math.min(100, Math.max(0, porcentagem)) + "%";
        }


        window.addEventListener(
            "scroll",
            atualizar,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            atualizar
        );

        atualizar();
    }


    /* =========================================================
       ROLAGEM SUAVE
    ========================================================= */

    function ativarRolagemSuave() {

        document.addEventListener("click", function (event) {

            var link = event.target.closest("a[href^='#']");

            if (!link) {
                return;
            }

            var href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            var destino = document.querySelector(href);

            if (!destino) {
                return;
            }

            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }


    /* =========================================================
       ATALHO "/" PARA PESQUISA
    ========================================================= */

    function ativarAtalhoPesquisa() {

        document.addEventListener("keydown", function (event) {

            if (event.key !== "/") {
                return;
            }

            var tag = document.activeElement.tagName;

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            ) {
                return;
            }

            var pesquisa =
                document.getElementById("buscaInput") ||
                document.getElementById("buscaPageInput");

            if (!pesquisa) {
                return;
            }

            event.preventDefault();

            pesquisa.focus();
            pesquisa.select();
        });
    }


    /* =========================================================
       TECLA ESC
    ========================================================= */

    function ativarTeclaEscape() {

        document.addEventListener("keydown", function (event) {

            if (event.key !== "Escape") {
                return;
            }

            /* Fecha sugestões de pesquisa */

            var sugestoes =
                document.getElementById("searchSug");

            if (sugestoes) {
                sugestoes.classList.remove("show");
            }


            /* Fecha modal usando a estrutura existente */

            if (
                window.PS &&
                PS.modal &&
                typeof PS.modal.close === "function"
            ) {
                try {
                    PS.modal.close();
                } catch (erro) {
                    console.warn(
                        "Não foi possível fechar o modal:",
                        erro
                    );
                }
            }
        });
    }


    /* =========================================================
       DETECTAR CONEXÃO
    ========================================================= */

    function detectarConexao() {

        window.addEventListener("offline", function () {

            mostrarAviso(
                "Você está sem conexão com a internet.",
                "warning"
            );

        });


        window.addEventListener("online", function () {

            mostrarAviso(
                "Conexão restabelecida!",
                "success"
            );

        });
    }


    /* =========================================================
       AVISO
    ========================================================= */

    function mostrarAviso(mensagem, tipo) {

        /* Se o sistema original já possui toast,
           utiliza ele. */

        if (
            window.PS &&
            typeof PS.toast === "function"
        ) {

            try {

                PS.toast(
                    mensagem,
                    tipo === "warning"
                        ? "error"
                        : "success"
                );

                return;

            } catch (erro) {
                console.warn(erro);
            }
        }


        /* Toast próprio como fallback */

        var antigo =
            document.getElementById("aumiauToast");

        if (antigo) {
            antigo.remove();
        }


        var toast = document.createElement("div");

        toast.id = "aumiauToast";
        toast.textContent = mensagem;

        toast.style.cssText = `
            position: fixed;
            left: 50%;
            bottom: 25px;
            transform: translateX(-50%);
            background: #16324F;
            color: #FFFFFF;
            padding: 13px 20px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 8px 30px rgba(0,0,0,.2);
        `;

        document.body.appendChild(toast);


        setTimeout(function () {

            toast.style.opacity = "0";
            toast.style.transition = "opacity .3s";

            setTimeout(function () {
                toast.remove();
            }, 300);

        }, 3000);
    }


    /* =========================================================
       LINKS INTERNOS
    ========================================================= */

    function corrigirLinksInternos() {

        document.querySelectorAll("a").forEach(function (link) {

            var href = link.getAttribute("href");

            if (!href) {
                return;
            }

            /*
             * Não modifica:
             * - links externos
             * - telefone
             * - email
             * - javascript
             * - âncoras
             */

            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("javascript:") ||
                href.startsWith("#")
            ) {
                return;
            }

        });
    }


    /* =========================================================
       ANIMAÇÃO DOS ELEMENTOS
    ========================================================= */

    function animarElementos() {

        var elementos =
            document.querySelectorAll(
                ".p-card, .art-card, .t-card, .benefit, .pill"
            );

        if (!elementos.length) {
            return;
        }


        /* Caso o navegador não tenha IntersectionObserver */

        if (!("IntersectionObserver" in window)) {

            elementos.forEach(function (elemento) {

                elemento.style.opacity = "1";
                elemento.style.transform = "none";

            });

            return;
        }


        var observer =
            new IntersectionObserver(
                function (entradas) {

                    entradas.forEach(function (entrada) {

                        if (!entrada.isIntersecting) {
                            return;
                        }

                        entrada.target.classList.add(
                            "aumiau-visible"
                        );

                        observer.unobserve(
                            entrada.target
                        );
                    });

                },
                {
                    threshold: 0.08
                }
            );


        elementos.forEach(function (elemento) {

            elemento.style.transition =
                "opacity .5s ease, transform .5s ease";

            elemento.style.opacity = "0";
            elemento.style.transform =
                "translateY(18px)";

            observer.observe(elemento);
        });


        if (!document.getElementById("aumiauAnimationStyle")) {

            var style =
                document.createElement("style");

            style.id = "aumiauAnimationStyle";

            style.textContent = `
                .aumiau-visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `;

            document.head.appendChild(style);
        }
    }


    /* =========================================================
       PROTEÇÃO CONTRA IMAGENS QUEBRADAS
    ========================================================= */

    function protegerImagens() {

        document.querySelectorAll("img").forEach(function (img) {

            img.addEventListener("error", function () {

                if (img.dataset.fallbackUsed) {
                    return;
                }

                img.dataset.fallbackUsed = "true";

                img.style.display = "none";

                var pai = img.parentElement;

                if (!pai) {
                    return;
                }

                if (
                    pai.querySelector(
                        ".aumiau-img-placeholder"
                    )
                ) {
                    return;
                }

                var placeholder =
                    document.createElement("div");

                placeholder.className =
                    "aumiau-img-placeholder";

                placeholder.textContent = "🐾";

                placeholder.style.cssText = `
                    min-height: 160px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 45px;
                    background: #F2F4F7;
                `;

                pai.appendChild(placeholder);
            });
        });
    }


    /* =========================================================
       BOTÕES DE PRODUTO
    ========================================================= */

    function ativarBotoesProduto() {

        document.addEventListener(
            "click",
            function (event) {

                var botao =
                    event.target.closest(
                        "[data-add]"
                    );

                if (!botao) {
                    return;
                }

                var id =
                    botao.getAttribute("data-add");

                if (!id) {
                    return;
                }


                /*
                 * O cart.js do projeto já possui
                 * a função PS.cart.add().
                 *
                 * Portanto não criamos outro carrinho.
                 */

                if (
                    window.PS &&
                    PS.cart &&
                    typeof PS.cart.add === "function"
                ) {

                    /*
                     * O cart.js original já pode ter
                     * um listener para esse botão.
                     *
                     * Aqui apenas damos feedback visual.
                     */

                    botao.classList.add(
                        "aumiau-added"
                    );

                    var textoOriginal =
                        botao.innerHTML;

                    botao.innerHTML =
                        "✓ Adicionado";

                    botao.disabled = true;


                    setTimeout(function () {

                        botao.innerHTML =
                            textoOriginal;

                        botao.disabled = false;

                        botao.classList.remove(
                            "aumiau-added"
                        );

                    }, 900);
                }
            }
        );
    }


    /* =========================================================
       ATUALIZAR CONTADORES
    ========================================================= */

    function atualizarContadores() {

        /*
         * O projeto original já controla:
         *
         * cartCount
         * favCount
         *
         * através do layout.js.
         *
         * Aqui apenas verificamos se eles existem.
         */

        if (!window.PS) {
            return;
        }


        try {

            if (
                PS.cart &&
                typeof PS.cart.list === "function"
            ) {

                var itens =
                    PS.cart.list();

                var quantidade = 0;

                itens.forEach(function (item) {

                    quantidade +=
                        Number(item.qty || 0);

                });

                var contador =
                    document.getElementById(
                        "cartCount"
                    );

                if (contador) {

                    contador.textContent =
                        quantidade;

                    contador.hidden =
                        quantidade === 0;
                }
            }


            if (
                PS.fav &&
                Array.isArray(PS.fav.ids)
            ) {

                var favoritos =
                    document.getElementById(
                        "favCount"
                    );

                if (favoritos) {

                    favoritos.textContent =
                        PS.fav.ids.length;

                    favoritos.hidden =
                        PS.fav.ids.length === 0;
                }
            }

        } catch (erro) {

            console.warn(
                "Aumiau: não foi possível atualizar contadores.",
                erro
            );
        }
    }

})();
