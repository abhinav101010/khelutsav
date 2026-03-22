import { createContext, useContext, useState } from "react";
import { light, dark } from "../theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const T = isDark ? dark : light;
  return (
    <ThemeContext.Provider value={{ T, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);