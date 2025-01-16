export const mockSpringSets = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    setNumber: `К-${i + 1}`,
    controlDate: new Date(2024, 0, i + 1).toISOString().split("T")[0],
    duration: Math.floor(Math.random() * 120) + 30, // от 30 до 150 минут
    status: ["Используется", "На ремонте", "Заменен"][Math.floor(Math.random() * 3)],
    actualChanges: Math.floor(Math.random() * 5),
    theoreticalReplacements: Math.floor(Math.random() * 10),
  }));
  