// andres-web\backend\src\api\product\routes\update-stock.js
import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'POST',
      path: '/update-stock',
      handler: 'product.update-stock.updateStock', // 👈 más específico
      config: {
        auth: false,
      },
    },
  ],
};