const fs = require("fs");
const path = require("path");

const root = process.cwd();
const targets = [".expo", "node_modules", "package-lock.json"];

console.log("🧹 Запуск очищення робочого простору...");

const clean = async () => {
  for (const item of targets) {
    const fullPath = path.join(root, item);
    if (fs.existsSync(fullPath)) {
      try {
        await fs.promises.rm(fullPath, { recursive: true, force: true });
        console.log(`✅ Видалено: ${item}`);
      } catch (e) {
        console.log(`⚠️ Не вдалося видалити ${item}: ${e.message}`);
      }
    }
  }
  console.log("\n✨ Готово. Тепер виконайте 'npm install' для чистої установки.");
};

clean();