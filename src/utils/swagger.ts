import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';
import { config } from "@/constants/index"




const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Paritie Backend Test",
        version: "1.0.0",
        description: "API documentation",
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
    servers: [
        {
            url: `http://localhost:${config.PORT}`,
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, "../routes/**/*.ts")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
