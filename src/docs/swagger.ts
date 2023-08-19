import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";

const getOptions = (file: string) => {
  const docFile = yaml.load(
    fs.readFileSync(`src/docs/${file}.yaml`, "utf8")
  ) as unknown as JSON;

  return [swaggerUi.serve, swaggerUi.setup(docFile)];
};

const swagger = (app: Express) => {
  app.use("/docs-core", ...getOptions("core"));
};

export { swagger };
