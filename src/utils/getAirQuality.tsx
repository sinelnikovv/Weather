export const getQuality = (
  value: number,
  levels: { limit: number; quality: string }[],
) => {
  for (const level of levels) {
    if (value < level.limit) {
      return level.quality;
    }
  }
  return "Very Poor";
};

export const aqiLevels = [
  { limit: 1, quality: "Good" },
  { limit: 2, quality: "Fair" },
  { limit: 3, quality: "Moderate" },
  { limit: 4, quality: "Poor" },
  { limit: 5, quality: "Very Poor" },
];

export const coLevels = [
  { limit: 4400, quality: "Good" },
  { limit: 9400, quality: "Fair" },
  { limit: 12400, quality: "Moderate" },
  { limit: 15400, quality: "Poor" },
];

export const so2Levels = [
  { limit: 20, quality: "Good" },
  { limit: 80, quality: "Fair" },
  { limit: 250, quality: "Moderate" },
  { limit: 350, quality: "Poor" },
];

export const no2Levels = [
  { limit: 40, quality: "Good" },
  { limit: 70, quality: "Fair" },
  { limit: 150, quality: "Moderate" },
  { limit: 200, quality: "Poor" },
];

export const pm10Levels = [
  { limit: 20, quality: "Good" },
  { limit: 50, quality: "Fair" },
  { limit: 100, quality: "Moderate" },
  { limit: 200, quality: "Poor" },
];

export const pm2_5Levels = [
  { limit: 10, quality: "Good" },
  { limit: 25, quality: "Fair" },
  { limit: 50, quality: "Moderate" },
  { limit: 75, quality: "Poor" },
];

export const ozoneLevels = [
  { limit: 60, quality: "Good" },
  { limit: 100, quality: "Fair" },
  { limit: 140, quality: "Moderate" },
  { limit: 180, quality: "Poor" },
];
