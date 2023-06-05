// color design tokens export
export const tokensDarkObj = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually adjusted
  },
  primary: {
    // blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45", // manually adjusted
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    // yellow
    50: "#f0f0f0", // manually adjusted
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDarkObj) {
  const reversedTokens = {};
  Object.entries(tokensDarkObj).forEach(([key, val]) => { // [[gery,{}],[primary,{}]]
    const keys = Object.keys(val); // ["0","10","50"]
    const values = Object.values(val);//["#25325","#23534","#34656"]
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}

export const tokensLightObj = reverseTokens(tokensDarkObj);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDarkObj.primary,
              main: tokensDarkObj.primary[400],
              light: tokensDarkObj.primary[400],
            },
            secondary: {
              ...tokensDarkObj.secondary,
              main: tokensDarkObj.secondary[300],
            },
            neutral: {
              ...tokensDarkObj.grey,
              main: tokensDarkObj.grey[500],
            },
            background: {
              default: tokensDarkObj.primary[600],
              alt: tokensDarkObj.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLightObj.primary,
              main: tokensDarkObj.grey[50],
              light: tokensDarkObj.grey[100],
            },
            secondary: {
              ...tokensLightObj.secondary,
              main: tokensDarkObj.secondary[600],
              light: tokensDarkObj.secondary[700],
            },
            neutral: {
              ...tokensLightObj.grey,
              main: tokensDarkObj.grey[500],
            },
            background: {
              default: tokensDarkObj.grey[0],
              alt: tokensDarkObj.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
