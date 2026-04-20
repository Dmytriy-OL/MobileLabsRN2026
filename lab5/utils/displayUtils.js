/**
 * Утиліти для відображення даних у зручному для користувача форматі
 */

// Форматування ціни (додаємо пробіли між розрядами та символ валюти)
export const formatCurrency = (amount) => {
  if (!amount) return '0 ₴';
  
  // Видаляємо всі нецифрові символи, якщо вони прийшли рядком
  const numericValue = typeof amount === 'string' 
    ? parseFloat(amount.replace(/[^\d.]/g, '')) 
    : amount;

  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(numericValue);
};

// Форматування назв (обрізання занадто довгих заголовків)
export const truncateText = (text, limit = 20) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};