const products = [
    {
        name: "Atlas Workstation",
        category: "workstations",
        price: 1280000,
        image: "assets/images/tarjetas/prod1.png",
        description: "Equipo para analisis, dashboards y multitarea intensiva con foco en estabilidad.",
        tags: ["Analisis", "SQL", "BI"]
    },
    {
        name: "Pulse Creator",
        category: "creadores",
        price: 1490000,
        image: "assets/images/tarjetas/prod2.png",
        description: "Pensada para diseno, edicion liviana y trabajo diario con varias aplicaciones abiertas.",
        tags: ["Diseno", "Contenido", "Edicion"]
    },
    {
        name: "Vertex Office Pro",
        category: "oficina",
        price: 890000,
        image: "assets/images/tarjetas/prod3.png",
        description: "Configuracion solida para equipos administrativos, ventas y operaciones.",
        tags: ["Oficina", "Ventas", "CRM"]
    },
    {
        name: "Flux Gaming",
        category: "gaming",
        price: 1710000,
        image: "assets/images/tarjetas/prod4.png",
        description: "Rendimiento visual y buena refrigeracion para largas sesiones y streaming.",
        tags: ["Gaming", "Streaming", "RGB"]
    },
    {
        name: "Signal Hybrid",
        category: "equipos",
        price: 1170000,
        image: "assets/images/tarjetas/prod5.png",
        description: "Una base flexible para quienes combinan oficina, visualizacion y uso profesional.",
        tags: ["Hibrido", "Trabajo", "Escalable"]
    },
    {
        name: "Nova Compact",
        category: "oficina",
        price: 760000,
        image: "assets/images/tarjetas/prod6.png",
        description: "Formato mas compacto para escritorios chicos sin resignar velocidad.",
        tags: ["Compacto", "Productividad", "Silencioso"]
    },
    {
        name: "Forge Dev Kit",
        category: "workstations",
        price: 1390000,
        image: "assets/images/tarjetas/prod7.png",
        description: "Preparada para desarrollo, maquinas virtuales y cargas de trabajo tecnicas.",
        tags: ["Desarrollo", "Docker", "Testing"]
    },
    {
        name: "Orbit Team Pack",
        category: "equipos",
        price: 980000,
        image: "assets/images/tarjetas/prod8.png",
        description: "Set base para equipar varias estaciones con una logica comun y facil soporte.",
        tags: ["Equipos", "Operacion", "Escala"]
    }
];

const catalogGrid = document.getElementById("catalog-grid");
const productCount = document.getElementById("product-count");
const searchInput = document.getElementById("search-products");
const categoryFilters = document.getElementById("category-filters");
const currentYear = document.getElementById("current-year");

let activeCategory = "todos";

const currencyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
});

function renderCategories() {
    if (!categoryFilters) {
        return;
    }

    const categories = ["todos", ...new Set(products.map((product) => product.category))];

    categoryFilters.innerHTML = categories
        .map((category) => {
            const label = category === "todos"
                ? "Todos"
                : category.charAt(0).toUpperCase() + category.slice(1);

            return `
                <button
                    type="button"
                    class="${category === activeCategory ? "is-active" : ""}"
                    data-category="${category}"
                >
                    ${label}
                </button>
            `;
        })
        .join("");

    categoryFilters.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.category || "todos";
            renderCategories();
            renderProducts();
        });
    });
}

function getFilteredProducts() {
    const query = (searchInput?.value || "").trim().toLowerCase();

    return products.filter((product) => {
        const matchesCategory = activeCategory === "todos" || product.category === activeCategory;
        const matchesQuery = [product.name, product.category, product.description, product.tags.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(query);

        return matchesCategory && matchesQuery;
    });
}

function renderProducts() {
    if (!catalogGrid || !productCount) {
        return;
    }

    const filteredProducts = getFilteredProducts();

    productCount.textContent = String(filteredProducts.length);

    catalogGrid.innerHTML = filteredProducts
        .map((product) => {
            const tags = product.tags.map((tag) => `<span>${tag}</span>`).join("");

            return `
                <article class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-card-body">
                        <div class="product-topline">
                            <span>${product.category}</span>
                            <strong>${currencyFormatter.format(product.price)}</strong>
                        </div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-tags">${tags}</div>
                        <a class="button primary" href="pages/contactos.html?product=${encodeURIComponent(product.name)}">
                            Solicitar propuesta
                        </a>
                    </div>
                </article>
            `;
        })
        .join("");

    if (!filteredProducts.length) {
        catalogGrid.innerHTML = `
            <article class="surface-panel" style="padding: 2rem;">
                <h3 style="font-family: 'Sora', sans-serif; font-size: 1.25rem;">No encontramos resultados</h3>
                <p style="margin-top: 0.75rem; color: var(--muted);">
                    Prueba con otra palabra o vuelve al filtro "Todos".
                </p>
            </article>
        `;
    }
}

if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
}

if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

renderCategories();
renderProducts();
