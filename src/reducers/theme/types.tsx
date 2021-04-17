export type ThemeListType = Array<{ id: number; name: string }>;

export type ThemeState = {
  selectedTheme: string | undefined;
  theme: { [name: string]: string };
  themesList: ThemeListType;
};

export type UserThemeType = {
  id: number;
  data: { [name: string]: string };
};
