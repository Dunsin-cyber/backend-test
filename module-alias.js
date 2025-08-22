const moduleAlias = require("module-alias");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "dist" : "src";

moduleAlias.addAlias("@", path.join(__dirname, basePath));
