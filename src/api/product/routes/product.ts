/**
 * product router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::product.product", {
  config: {
    updateStock: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
