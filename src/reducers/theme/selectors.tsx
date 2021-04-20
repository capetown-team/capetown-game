import { AppState } from '@/reducers';

export const selectedThemeSelector = (state: AppState) =>
  state.theme.selectedTheme;
export const themeSelector = (state: AppState) => state.theme.theme;
export const themesListSelector = (state: AppState) => state.theme.themesList;
