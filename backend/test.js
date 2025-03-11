const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "public/uploads/1741663370751-lovekitty.jpeg");

fs.access(filePath, fs.constants.R_OK, (err) => {
  if (err) {
    console.error("Error: No se puede leer el archivo. Puede ser un problema de permisos o ruta incorrecta.");
  } else {
    console.log("✅ El archivo es accesible por Node.js.");
  }
});
