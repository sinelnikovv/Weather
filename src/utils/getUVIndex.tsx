export const getUVIndex = (
  value: number,
  levels: { limit: number; quality: string }[],
) => {
  for (const level of levels) {
    if (value < level.limit) {
      return level.quality;
    }
  }
  return "Moderate";
};

export const UVIndexes = [
  { limit: 3, quality: "Low" },
  { limit: 6, quality: "Moderate" },
  { limit: 8, quality: "High" },
  { limit: 11, quality: "Very high" },
];
