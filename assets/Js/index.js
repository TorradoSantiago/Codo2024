const products = window.hardsoftCatalog || [];

const catalogGrid = document.getElementById("catalog-grid");
const productCount = document.getElementById("product-count");
const searchInput = document.getElementById("search-products");
const categoryFilters = document.getElementById("category-filters");
const currentYear = document.getElementById("current-year");

let activeCategory = "todos";

function getImagePath(product) {
    return `assets/images/tarjetas/${product.imageName}`;
}

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
                    <img src="${getImagePath(product)}" alt="${product.name}">
                    <div class="product-card-body">
                        <div class="product-topline">
                            <span>${product.category}</span>
                            <strong>${currencyFormatter.format(product.price)}</strong>
                        </div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>${product.audience}</p>
                        <p>${product.leadTime}</p>
                        <div class="product-tags">${tags}</div>
                        <a class="button primary" href="pages/contactos.html?product=${encodeURIComponent(product.name)}&service=armado">
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
