import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Blog API',
        version: '1.0.0',
        description: 'API документация для Blog Back',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./router/*.js'], 
  };
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
