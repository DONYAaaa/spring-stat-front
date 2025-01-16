export const mockSpringPairs = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    setId: Math.floor(Math.random() * 10) + 1, // ID комплекта (случайный)
    innerSpring: `S-${Math.floor(Math.random() * 100)}`,
    outerSpring: `S-${Math.floor(Math.random() * 100)}`,
    wedgeSpring: `S-${Math.floor(Math.random() * 100)}`,
  }));
  