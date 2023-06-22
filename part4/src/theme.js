import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    white: "#ffffff",
    red: "#d73a4a",
    lightGrey: "#cccccc",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    platformSpecific: Platform.select({
      web: "Sans-serif",
      android: "Arial",
      ios: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    semibold: "500",
    bold: "700",
  },
  backgroundColors: {
    header: "#24292e",
  },
};

export default theme;
