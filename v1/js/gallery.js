/**
 * Inicialización de la app.
 */
document.addEventListener('DOMContentLoaded', function () {

    /**
     * Elementos html usados en el código.
     */
    let htmlElements = {
        productContainer: document.getElementById('productContainer'),
        productTemplate: document.getElementById('productTemplate')
    }

    /**
     * Función para adquirir todos los productos de un grupo definido.
     *
     * @param {number} groupId - Id del grupo de productos.
     * @returns Una promesa fetch para suscibirse.
     */
    function getAllProductsByGroup(groupId) {
        return fetch('data/photos.json')
            .then(response => response.json())
            .then(data => data.filter(photo => photo.albumId === groupId));
    }

    /**
     * Función para renderizar un producto.
     *
     * @param {Product} product
     */
    function paintProduct(product) {
        let productToRender, thumbnail, title;

        productToRender = htmlElements.productTemplate.cloneNode(true);
        productToRender.setAttribute("id", "product" + product.id);

        thumbnail = productToRender.querySelector('img:first-child');
        thumbnail.setAttribute("src", product.thumbnailUrl);

        title = productToRender.querySelector('h3:first-child');
        title.textContent = product.title;

        // Store product data as a data attribute
        productToRender.dataset.product = JSON.stringify(product);

        htmlElements.productContainer.appendChild(productToRender);
    }

    /**
     * Se adquieren y pintan los productos.
     * @async
     */
    getAllProductsByGroup(2)
        .then(function (products) {
            products.forEach(function (product) {
                paintProduct(product);
            });
        })
        .catch(error => console.error('Error loading gallery:', error));
});