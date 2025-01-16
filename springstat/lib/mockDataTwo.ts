export const mockData = Array.from({ length: 2 }, (_, i) => ({
  id: i + 1,
  inspectionResult: ["Пройдено", "Отклонение", "Брак"][Math.floor(Math.random() * 3)], // Генерация результата контроля
  operator: `Оператор ${i + 1}`,
  springType: ["Внутренняя", "Наружная"][i % 2],
  height: parseFloat((Math.random() * 100).toFixed(2)), // Преобразование в число
  outerDiameter: parseFloat((Math.random() * 50).toFixed(2)),
  innerDiameter: parseFloat((Math.random() * 40).toFixed(2)),
  perpendicularityDeviation: parseFloat((Math.random() * 1).toFixed(3)),
  wireDiameter: parseFloat((Math.random() * 10).toFixed(2)),
  controlDate: new Date(2024, 0, i + 1).toISOString().split("T")[0], // Дата остается строкой
}));
