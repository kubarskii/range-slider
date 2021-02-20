import { ThemeType } from "../enums/theme.enum";

export const toggleDarkMode = (): void => {
  if (!document.documentElement.classList.contains(ThemeType.DARK)) {
    document.documentElement.classList.add(ThemeType.DARK);
  } else {
    document.documentElement.classList.remove(ThemeType.DARK);
  }
};
