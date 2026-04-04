const products = (window.hardsoftCatalog || []).map((product) => ({
    ...product,
    image: `assets/images/tarjetas/${product.imageName}`
}));

const catalogGrid = document.getElementById("catalog-grid");
const productCount = document.getElementById("product-count");
const searchInput = document.getElementById("search-products");
const categoryFilters = document.getElementById("category-filters");
const currentYear = document.getElementById("current-year");

let activeCategory = "all";

const categoryLabels = {
    all: "All",
    workstations: "Workstations",
    creators: "Creators",
    office: "Office",
    gaming: "Gaming",
    teams: "Teams"
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
});

function renderCategories() {
    if (!categoryFilters) {
        return;
    }

    const categories = ["all", ...new Set(products.map((product) => product.category))];

    categoryFilters.innerHTML = categories
        .map((category) => `
                <button
                    type="button"
                    class="${category === activeCategory ? "is-active" : ""}"
                    data-category="${category}"
                >
                    ${categoryLabels[category] || category}
                </button>
            `)
        .join("");

    categoryFilters.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.category || "all";
            renderCategories();
            renderProducts();
        });
    });
}

function getFilteredProducts() {
    const query = (searchInput?.value || "").trim().toLowerCase();

    return products.filter((product) => {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory;
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
                            <span>${categoryLabels[product.category] || product.category}</span>
                            <strong>${currencyFormatter.format(product.price)}</strong>
                        </div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-tags">${tags}</div>
                        <a class="button primary" href="pages/contact.html?product=${encodeURIComponent(product.name)}">
                            Request a proposal
                        </a>
                    </div>
                </article>
            `;
        })
        .join("");

    if (!filteredProducts.length) {
        catalogGrid.innerHTML = `
            <article class="surface-panel" style="padding: 2rem;">
                <h3 style="font-family: 'Sora', sans-serif; font-size: 1.25rem;">No results found</h3>
                <p style="margin-top: 0.75rem; color: var(--muted);">
                    Try a different keyword or return to the "All" view.
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
