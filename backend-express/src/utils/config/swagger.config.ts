import path from "path";
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc,{ Options }  from "swagger-jsdoc"

const options: Options  = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: ""
    },
  },
  // apis: [ path.resolve(__dirname, "../**/*.ts")], // 
  apis: [ `${process.cwd()}/src/**/*.ts` ]
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerUiApp: ReturnType <typeof swaggerUi.setup> = swaggerUi.setup(swaggerSpec)

export { swaggerUiApp}