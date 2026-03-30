const products = window.hardsoftCatalog || [];

const productsGrid = document.getElementById("products-grid");
const productCount = document.getElementById("product-count");
const searchInput = document.getElementById("search-products");
const categoryFilters = document.getElementById("category-filters");
const footerYear = document.getElementById("current-year");
const totalProducts = document.getElementById("total-products");
const totalCategories = document.getElementById("category-total");
const averageTicket = document.getElementById("average-ticket");

let activeCategory = "todos";

const categoryLabels = {
    todos: "Todos",
    workstations: "Workstations",
    creadores: "Creadores",
    oficina: "Oficina",
    gaming: "Gaming",
    equipos: "Equipos"
};

const currencyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
});

function getCategoryLabel(category) {
    return categoryLabels[category] || category;
}

function getImagePath(product) {
    return `../assets/images/tarjetas/${product.imageName}`;
}

function renderHeaderStats() {
    if (totalProducts) {
        totalProducts.textContent = String(products.length);
    }

    if (totalCategories) {
        totalCategories.textContent = String(new Set(products.map((product) => product.category)).size);
    }

    if (averageTicket && products.length > 0) {
        const totalValue = products.reduce((sum, product) => sum + product.price, 0);
        averageTicket.textContent = currencyFormatter.format(Math.round(totalValue / products.length));
    }
}

function renderCategories() {
    if (!categoryFilters) {
        return;
    }

    const categories = ["todos", ...new Set(products.map((product) => product.category))];

    categoryFilters.innerHTML = categories
        .map((category) => `
            <button
                type="button"
                class="${category === activeCategory ? "is-active" : ""}"
                data-category="${category}"
            >
                ${getCategoryLabel(category)}
            </button>
        `)
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
        const matchesQuery = [
            product.name,
            product.category,
            product.description,
            product.summary,
            product.audience,
            product.tags.join(" "),
            product.includes.join(" ")
        ]
            .join(" ")
            .toLowerCase()
            .includes(query);

        return matchesCategory && matchesQuery;
    });
}

function renderProducts() {
    if (!productsGrid || !productCount) {
        return;
    }

    const filteredProducts = getFilteredProducts();

    productCount.textContent = String(filteredProducts.length);

    if (!filteredProducts.length) {
        productsGrid.innerHTML = `
            <article class="surface-panel empty-state">
                <h3>No encontramos configuraciones para ese filtro.</h3>
                <p>Prueba otra palabra o vuelve a la vista completa del catalogo.</p>
            </article>
        `;
        return;
    }

    productsGrid.innerHTML = filteredProducts
        .map((product) => {
            const tags = product.tags.map((tag) => `<span>${tag}</span>`).join("");
            const includes = product.includes.map((item) => `<li>${item}</li>`).join("");

            return `
                <article class="surface-panel product-showcase" id="${product.slug}">
                    <div class="product-media">
                        <div class="product-media-topline">
                            <span>${getCategoryLabel(product.category)}</span>
                            <strong>${product.leadTime}</strong>
                        </div>
                        <img src="${getImagePath(product)}" alt="${product.name}">
                        <p>${product.audience}</p>
                    </div>

                    <div class="product-content">
                        <div class="product-header">
                            <div>
                                <h3>${product.name}</h3>
                                <p>${product.description}</p>
                            </div>
                            <strong>${currencyFormatter.format(product.price)}</strong>
                        </div>

                        <p class="product-summary">${product.summary}</p>
                        <div class="product-tags">${tags}</div>

                        <div class="product-includes">
                            <h4>Que resuelve mejor</h4>
                            <ul>${includes}</ul>
                        </div>

                        <div class="product-actions">
                            <a class="button primary" href="contactos.html?product=${encodeURIComponent(product.name)}&service=armado">
                                Solicitar propuesta
                            </a>
                            <a class="button secondary" href="../index.html#servicios">Ver servicios</a>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");
}

if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
}

if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
}

renderHeaderStats();
renderCategories();
renderProducts();
