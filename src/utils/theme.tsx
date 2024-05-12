export const colors = {
  white: "#fff",
  white20: "rgba(255, 255, 255, 0.2)",
  greyDark: "#EBEBF560",
  grey: "#EBEBF530",
  greyLight: "#EBEBF518",
  purple20: "rgba(72, 49, 157, 0.2)",
  blue: "#48319D",
  purple: "rgb(72, 49, 157)",
};

export const gradient = {
  searchGradient: {
    colors: ["#2E335A", "#1C1B33", "#2E335A"],
    start: { x: 0.5, y: 2 },
    end: { x: 0.5, y: -1 },
  },
  rangeGradient: {
    colors: ["#0e00fe", "#ff0000"],
    start: { x: 0, y: 0 },
    locations: [0.35, 1],
    end: { x: 1, y: 0 },
  },
  emptyGradient: {
    colors: ["transparent", "transparent"],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  },
  bgGradient: {
    colors: ["rgb(46,51,90)", "rgb(28,27,51)"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  bottomSheetGradient: {
    colors: ["rgba(86, 46, 90, 0.3)", "rgba(28, 27, 51, 0.3)"],
    start: { x: 0, y: 0.6 },
    end: { x: 1, y: -1 },
  },
};
