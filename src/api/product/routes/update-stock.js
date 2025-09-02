// src/api/product/routes/update-stock.js
export default {
  routes: [
    {
      method: 'POST',
      path: '/update-stock',
      handler: 'product.updateStock',
      config: {
        auth: false, // cambiar a true si exigís autenticación
      },
    },
  ],
};