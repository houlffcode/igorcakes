const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


/* =========================================================
   MONTE SEU BOLO
   ========================================================= */

(() => {

    const cakeForm = document.getElementById("cakeOrderForm");

    if (!cakeForm) {
        return;
    }


    /* =====================================================
       DADOS DO CARDÁPIO
       ===================================================== */

    const cakeSizes = {
        redondo: [
            {
                label: "10 fatias",
                price: 78
            },
            {
                label: "15 fatias",
                price: 90
            },
            {
                label: "20 fatias",
                price: 120
            },
            {
                label: "25 fatias",
                price: 135
            },
            {
                label: "30 fatias",
                price: 155
            },
            {
                label: "40 fatias",
                price: 197
            },
            {
                label: "50 fatias",
                price: 273
            }
        ],
        quadrado: [
            {
                label: "18 fatias",
                price: 90
            },
            {
                label: "32 fatias",
                price: 130
            },
            {
                label: "50 fatias",
                price: 190
            },
            {
                label: "75 fatias",
                price: 235
            }
        ]
    };


    const gourmetFillings = [
        "Brigadeiro gourmet",
        "Ninho trufado",
        "Ouro branco gourmet",
        "Brigadeiro trufado de maracujá",
        "Mousse de bombons gourmet",
        "Quatro leites",
        "Brigadeiro meio amargo",
        "Brigadeiro de nozes",
        "Strogonofe de nozes",
        "Pistache trufado",
        "Limão siciliano",
        "Ferrero Rocher",
        "Ninho com Nutella",
        "Kinder Bueno",
        "Mousse de Laka",
        "Mousse de chocolate trufado",
        "Prestígio",
        "Creme húngaro gourmet",
        "Doce de leite trufado"
    ];

    const fruitFillings = [
        "Mousse de chocolate trufado com morangos",
        "Mousse de ninho com morangos",
        "Nata gourmet com morango",
        "Nata gourmet com pêssego",
        "Nata gourmet com abacaxi",
        "Mousse de ninho com suspiro e morangos picados",
        "Coco trufado com abacaxi"
    ];


    const allFillings = [
        {
            group: "Recheios gourmets",
            items: gourmetFillings
        },
        {
            group: "Recheios com frutas",
            items: fruitFillings
        }
    ];


    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const cakeFormat = document.getElementById("cakeFormat");
    const cakeSize = document.getElementById("cakeSize");
    const cakeFillingOne = document.getElementById("cakeFillingOne");
    const cakeFillingTwo = document.getElementById("cakeFillingTwo");
    const cakeDecoration = document.getElementById("cakeDecoration");
    const cakeTopper = document.getElementById("cakeTopper");
    const cakeTheme = document.getElementById("cakeTheme");
    const cakeColors = document.getElementById("cakeColors");
    const cakeDecorationDetails = document.getElementById("cakeDecorationDetails");
    const cakeDelivery = document.getElementById("cakeDelivery");
    const cakeDate = document.getElementById("cakeDate");
    const cakeCity = document.getElementById("cakeCity");
    const cakeNeighborhood = document.getElementById("cakeNeighborhood");
    const customerName = document.getElementById("customerName");
    const guestCount = document.getElementById("guestCount");
    const cakeNotes = document.getElementById("cakeNotes");
    const fillingError = document.getElementById("fillingError");
    const dateError = document.getElementById("dateError");
    const cakeFormMessage = document.getElementById("cakeFormMessage");


    /* =====================================================
       CAMPOS DO RESUMO
       ===================================================== */

    const summaryFormat = document.getElementById("summaryFormat");
    const summarySize = document.getElementById("summarySize");
    const summaryMass = document.getElementById("summaryMass");
    const summaryFillings = document.getElementById("summaryFillings");
    const summaryDecoration = document.getElementById("summaryDecoration");
    const summaryTopper = document.getElementById("summaryTopper");
    const summaryDelivery = document.getElementById("summaryDelivery");
    const summaryTotal = document.getElementById("summaryTotal");
    const summaryConsultation = document.getElementById("summaryConsultation");


    /* =====================================================
       UTILIDADES
       ===================================================== */

    function formatCurrency(value) {
        return Number(value).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }


    function getSelectedMass() {
        const selectedMass = document.querySelector(
            'input[name="cakeMass"]:checked'
        );
        return selectedMass ? selectedMass.value : "";
    }


    function getOptionPrice(selectElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];

        if (!selectedOption) {
            return 0;
        }

        return Number(selectedOption.dataset.price || 0);
    }


    function capitalize(value) {
        if (!value) {
            return "";
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }


    function formatDate(dateValue) {
        if (!dateValue) {
            return "";
        }
        const [year, month, day] = dateValue.split("-");
        return `${day}/${month}/${year}`;
    }


    /* =====================================================
       DATA MÍNIMA: SETE DIAS
       ===================================================== */

    function configureMinimumDate() {
        const minimumDate = new Date();
        minimumDate.setDate(minimumDate.getDate() + 7);

        const year = minimumDate.getFullYear();
        const month = String(minimumDate.getMonth() + 1).padStart(2, "0");
        const day = String(minimumDate.getDate()).padStart(2, "0");

        cakeDate.min = `${year}-${month}-${day}`;
    }


    function validateDate() {
        dateError.textContent = "";

        if (!cakeDate.value) {
            return false;
        }

        const selectedDate = new Date(`${cakeDate.value}T12:00:00`);
        const minimumDate = new Date();
        minimumDate.setHours(0, 0, 0, 0);
        minimumDate.setDate(minimumDate.getDate() + 7);

        if (selectedDate < minimumDate) {
            dateError.textContent = "O pedido precisa ser realizado com pelo menos sete dias de antecedência.";
            return false;
        }

        return true;
    }


    /* =====================================================
       TAMANHOS
       ===================================================== */

    function updateCakeSizes() {
        const format = cakeFormat.value;
        cakeSize.innerHTML = "";

        if (!format || !cakeSizes[format]) {
            cakeSize.disabled = true;
            cakeSize.innerHTML = `
                <option value="">
                    Primeiro selecione o formato
                </option>
            `;
            updateSummary();
            return;
        }

        cakeSize.disabled = false;
        cakeSize.innerHTML = `
            <option value="">
                Selecione o tamanho
            </option>
        `;

        cakeSizes[format].forEach(size => {
            const option = document.createElement("option");
            option.value = size.label;
            option.dataset.price = size.price;
            option.textContent = `${size.label} — ${formatCurrency(size.price)}`;
            cakeSize.appendChild(option);
        });

        cakeSize.value = "";
        updateSummary();
    }


    /* =====================================================
       RECHEIOS
       ===================================================== */

    
        function populateFillings(selectElement) {
            selectElement.innerHTML = `
                <option value="">
                    Selecione um recheio
                </option>

                <option value="Sem recheio">
                    Sem recheio
                </option>
            `;


        allFillings.forEach(fillingGroup => {
            const group = document.createElement("optgroup");
            group.label = fillingGroup.group;

            fillingGroup.items.forEach(filling => {
                const option = document.createElement("option");
                option.value = filling;
                option.textContent = filling;
                group.appendChild(option);
            });

            selectElement.appendChild(group);
        });
    }


    function validateFillings() {
        fillingError.textContent = "";

        if (
            cakeFillingOne.value &&
            cakeFillingTwo.value &&
            cakeFillingOne.value === cakeFillingTwo.value
        ) {
            fillingError.textContent = "Escolha dois recheios diferentes.";
            return false;
        }
        return true;
    }


    /* =====================================================
       CÁLCULO
       ===================================================== */

    function calculateTotal() {
        const cakePrice = getOptionPrice(cakeSize);
        const topperPrice = getOptionPrice(cakeTopper);
        const deliveryPrice = getOptionPrice(cakeDelivery);

        return {
            cakePrice,
            topperPrice,
            deliveryPrice,
            total: cakePrice + topperPrice + deliveryPrice
        };
    }


    function requiresConsultation() {
        const decorationOption = cakeDecoration.options[cakeDecoration.selectedIndex];

        const decorationConsultation = decorationOption
            ? decorationOption.dataset.consultation === "true"
            : false;

        const deliveryConsultation = cakeDelivery.value === "Tele-entrega";

        return (
            decorationConsultation ||
            deliveryConsultation
        );
    }


    /* =====================================================
       RESUMO
       ===================================================== */

    function updateSummary() {
        const selectedMass = getSelectedMass();
        const prices = calculateTotal();

        summaryFormat.textContent = cakeFormat.value
            ? capitalize(cakeFormat.value)
            : "Não selecionado";

        summarySize.textContent = cakeSize.value
            ? `${cakeSize.value} — ${formatCurrency(prices.cakePrice)}`
            : "Não selecionado";

        summaryMass.textContent = selectedMass || "Não selecionada";

        if (cakeFillingOne.value || cakeFillingTwo.value) {
            summaryFillings.textContent = [
                cakeFillingOne.value,
                cakeFillingTwo.value
            ]
            .filter(Boolean)
            .join(" + ");
        } else {
            summaryFillings.textContent = "Não selecionados";
        }

        summaryDecoration.textContent = cakeDecoration.value || "Não selecionada";
        summaryTopper.textContent = cakeTopper.value || "Sem topo";
        summaryDelivery.textContent = cakeDelivery.value || "Não selecionado";
        summaryTotal.textContent = formatCurrency(prices.total);

        if (requiresConsultation()) {
            summaryConsultation.textContent = "Valor estimado. A decoração personalizada e/ou a tele-entrega dependem de orçamento.";
        } else {
            summaryConsultation.textContent = "Valor-base sujeito à confirmação da Igor Cakes.";
        }
    }


    /* =====================================================
       EVENTOS
       ===================================================== */

    cakeFormat.addEventListener("change", updateCakeSizes);
    cakeSize.addEventListener("change", updateSummary);
    cakeFillingOne.addEventListener("change", () => {
        validateFillings();
        updateSummary();
    });

    cakeFillingTwo.addEventListener("change", () => {
        validateFillings();
        updateSummary();
    });

    cakeDecoration.addEventListener("change", updateSummary);
    cakeTopper.addEventListener("change", updateSummary);
    cakeDelivery.addEventListener("change", updateSummary);
    cakeDate.addEventListener("change", validateDate);

    document.querySelectorAll('input[name="cakeMass"]').forEach(input => {
        input.addEventListener("change", updateSummary);
    });


    /* =====================================================
       ENVIO PARA O WHATSAPP
       ===================================================== */

    cakeForm.addEventListener("submit", event => {
        event.preventDefault();

        cakeFormMessage.textContent = "";

        const fillingsAreValid = validateFillings();
        const dateIsValid = validateDate();

        if (!cakeForm.checkValidity()) {
            cakeForm.reportValidity();
            cakeFormMessage.textContent = "Preencha todos os campos obrigatórios.";
            return;
        }

        if (!fillingsAreValid || !dateIsValid) {
            cakeFormMessage.textContent = "Revise os campos indicados antes de continuar.";
            return;
        }

        const selectedMass = getSelectedMass();
        const prices = calculateTotal();
        const consultation = requiresConsultation();

        const neighborhoodLine = cakeNeighborhood.value
            ? `\n🏘️ Bairro: ${cakeNeighborhood.value}`
            : "";

        const guestsLine = guestCount.value
            ? `\n👥 Número de convidados: ${guestCount.value}`
            : "";

        const colorsLine = cakeColors.value
            ? `\n🎨 Cores: ${cakeColors.value}`
            : "";

        const decorationDetailsLine = cakeDecorationDetails.value
            ? `\n📝 Detalhes: ${cakeDecorationDetails.value}`
            : "";

        const notesLine = cakeNotes.value
            ? `\n📌 Observações: ${cakeNotes.value}`
            : "";

        const deliveryPriceLine = cakeDelivery.value === "Tele-entrega"
            ? `${formatCurrency(prices.deliveryPrice)} como valor inicial, sujeito à confirmação`
            : "Sem taxa de entrega";

        const finalValueLine = consultation
            ? `${formatCurrency(prices.total)} + valores sob consulta`
            : formatCurrency(prices.total);

        const message = `
Olá, Igor Cakes! Gostaria de solicitar esta encomenda:

👤 *CLIENTE*
Nome: ${customerName.value}
${guestsLine}

🎂 *FORMATO E TAMANHO*
Formato: ${capitalize(cakeFormat.value)}
Tamanho: ${cakeSize.value}
Valor-base: ${formatCurrency(prices.cakePrice)}

🍰 *MASSA*
${selectedMass}

🥄 *RECHEIOS*
1. ${cakeFillingOne.value}
2. ${cakeFillingTwo.value}

🎨 *DECORAÇÃO*
Tipo: ${cakeDecoration.value}
Tema/ocasião: ${cakeTheme.value}${colorsLine}${decorationDetailsLine}

✨ *ADICIONAIS*
${cakeTopper.value} — ${formatCurrency(prices.topperPrice)}

🚚 *RECEBIMENTO*
${cakeDelivery.value}
Taxa considerada: ${deliveryPriceLine}
Cidade: ${cakeCity.value}${neighborhoodLine}

📅 *DATA DESEJADA*
${formatDate(cakeDate.value)}
${notesLine}

💰 *VALOR ESTIMADO*
${finalValueLine}

Estou ciente de que:
- O pedido depende de disponibilidade;
- A antecedência mínima é de 7 dias;
- A confirmação exige o pagamento de 50%;
- Decorações especiais e tele-entrega podem alterar o valor final;
- Posso enviar minhas imagens de referência nesta conversa.

Pode verificar a disponibilidade e confirmar o orçamento?
        `.trim();

        const whatsappNumber = "555196747499";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });


    /* =====================================================
       INICIALIZAÇÃO
       ===================================================== */

    populateFillings(cakeFillingOne);
    populateFillings(cakeFillingTwo);
    configureMinimumDate();
    updateSummary();

})();

/* =========================================================
   EXPANDIR E MINIMIZAR O MONTADOR
   ========================================================= */

(() => {

    const cakeBuilderSection =
        document.getElementById("monte-seu-bolo");

    const cakeBuilderToggle =
        document.getElementById("cakeBuilderToggle");

    const cakeBuilderContent =
        document.getElementById("cakeBuilderContent");

    const cakeBuilderMinimize =
        document.getElementById("cakeBuilderMinimize");

    if (
        !cakeBuilderSection ||
        !cakeBuilderToggle ||
        !cakeBuilderContent ||
        !cakeBuilderMinimize
    ) {
        return;
    }

    const toggleText =
        cakeBuilderToggle.querySelector(
            ".cake-builder-toggle-text"
        );

    const toggleIcon =
        cakeBuilderToggle.querySelector(
            ".cake-builder-toggle-icon"
        );


    function expandCakeBuilder() {

        cakeBuilderContent.hidden = false;

        cakeBuilderContent.classList.remove(
            "is-opening"
        );

        /*
         * Força o navegador a reiniciar a animação
         * sempre que o montador for aberto.
         */
        void cakeBuilderContent.offsetWidth;

        cakeBuilderContent.classList.add(
            "is-opening"
        );

        cakeBuilderToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        toggleText.textContent =
            "Minimizar montador";

        toggleIcon.textContent =
            "−";

        window.setTimeout(() => {

            cakeBuilderContent.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    function minimizeCakeBuilder() {

        cakeBuilderContent.hidden = true;

        cakeBuilderContent.classList.remove(
            "is-opening"
        );

        cakeBuilderToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        toggleText.textContent =
            "Começar agora";

        toggleIcon.textContent =
            "+";

        cakeBuilderSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        window.setTimeout(() => {

            cakeBuilderToggle.focus({
                preventScroll: true
            });

        }, 350);

    }


    cakeBuilderToggle.addEventListener(
        "click",
        () => {
            const isExpanded =
                cakeBuilderToggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            if (isExpanded) {
                minimizeCakeBuilder();
            } else {
                expandCakeBuilder();
            }

        }
    );


    cakeBuilderMinimize.addEventListener(
        "click",
        minimizeCakeBuilder
    );

})();
