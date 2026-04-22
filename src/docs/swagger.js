import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import swaggerUi from "swagger-ui-express";

export const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
});

registry.registerComponent("securitySchemes", "refreshToken", {
    type: "apiKey",
    in: "header",
    name: "x-refresh-token",
});

export const generateOpenAPIDocument = () => {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "Flow Task API",
            version: "1.0.0",
        },
        servers: [{ url: "/api" }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
                refreshToken: {
                    type: "apiKey",
                    in: "header",
                    name: "x-refresh-token",
                },
            },
        },
        security: [
            { bearerAuth: [], refreshToken: [] }
        ]
    });
};

export const setupSwagger = (app) => {
    const document = generateOpenAPIDocument();
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(document));
};