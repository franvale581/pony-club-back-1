// src/api/product/routes/update-stock.js
export default {
  routes: [
    {
      method: 'POST',
      path: '/products/update-stock', // <-- prefijo /products
      handler: 'product.updateStock',
      config: { auth: false },
    },
  ],
};