import path from "path";
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc, { Options } from "swagger-jsdoc"

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: ""
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // apis: [ path.resolve(__dirname, "../**/*.ts")], // 
  apis: [`${process.cwd()}/src/**/*.ts`]
};
const swaggerSpec = swaggerJsdoc(options);

const swaggerUiApp: ReturnType<typeof swaggerUi.setup> = swaggerUi.setup(swaggerSpec)

export { swaggerUiApp }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlByaXRhbSBEZWJuYXRoIiwiZW1haWwiOiJkZWJuYXRocHJpdGFtMDgwMkBnbWFpbC5jb20iLCJjcmVhdGVkX2F0IjoiMjAyNi0wNS0yOVQwNTo1MzozMS42NDNaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDUtMjlUMDU6NTM6MzEuNjQzWiIsImlzX2RlbGV0ZWQiOmZhbHNlLCJpYXQiOjE3ODAwMzcxMTgsImV4cCI6MTc4MDA5NzExOH0.ntf19Eul-R0c9XBdqIiiNrZePVdLMKNj5_aLEq9UtH4
