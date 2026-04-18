const fs = require("fs");
const path = require("path");

const root = process.cwd();
const essentialDirs = ["app", "components", "context", "constants", "hooks"];

console.log("🔍 Запуск перевірки архітектури проекту...\n");

const verifyArchitecture = () => {
  let missingCount = 0;

  essentialDirs.forEach((dir) => {
    const dirPath = path.join(root, dir);
    if (fs.existsSync(dirPath)) {
      const stats = fs.statSync(dirPath);
      if (stats.isDirectory()) {
        console.log(`✅ [${dir.toUpperCase()}] — Директорія знайдена.`);
      }
    } else {
      console.log(`⚠️  [${dir.toUpperCase()}] — Директорія відсутня!`);
      missingCount++;
    }
  });

  console.log("\n-------------------------------------------");
  if (missingCount === 0) {
    console.log("✨ Структура проекту відповідає стандартам розробки.");
  } else {
    console.log(`❌ Помилка: відсутні ${missingCount} критичні директорії.`);
  }
};

verifyArchitecture();