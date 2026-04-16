export const initialNews = [
  {
    id: 'n_01',
    title: 'Еволюція React Native',
    description: 'У 2026 році архітектура Fabric стала стандартом. Розбираємось, як це впливає на продуктивність вашого коду.',
    image: 'https://picsum.photos/seed/tech1/800/450',
  },
  {
    id: 'n_02',
    title: 'Вечірня Житомирська Політехніка',
    description: 'Студенти презентували понад 20 інноваційних проєктів на весняному тех-форумі.',
    image: 'https://picsum.photos/seed/tech2/800/450',
  },
    {
    id: 'n_01', 
    title: 'Еволюція React Native',
    description: 'У 2026 році архітектура Fabric стала стандартом. Розбираємось, як це впливає на продуктивність вашого коду.',
    image: 'https://picsum.photos/seed/tech1/800/450',
  },
  {
    id: 'n_02',
    title: 'Вечірня Житомирська Політехніка',
    description: 'Студенти презентували понад 20 інноваційних проєктів на весняному тех-форумі.',
    image: 'https://picsum.photos/seed/tech2/800/450',
  },
];

export const generateMoreNews = (lastIdx, amount = 3) => {
  const categories = ["Гаджети", "Софт", "Наука", "Кар'єра"];
  return Array.from({ length: amount }).map((_, i) => {
    const newId = lastIdx + i + 1;
    return {
      id: `gen_${newId}`,
      title: `${categories[newId % categories.length]}: Огляд №${newId}`,
      description: `Автоматично згенерований контент для перевірки Infinite Scroll. Номер запису: ${newId}.`,
      image: `https://picsum.photos/seed/item${newId}/800/450`,
    };
  });
};