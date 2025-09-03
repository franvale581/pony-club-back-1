export default {
  routes: [
    {
      method: "POST",
      path: "/products/update-stock",
      handler: "api::product.product.updateStock",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
