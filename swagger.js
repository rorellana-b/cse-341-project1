const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "User Contacts API",
    description: "API for managing user contacts",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
