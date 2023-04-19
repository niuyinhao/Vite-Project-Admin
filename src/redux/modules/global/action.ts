import * as types from '@/redux/mution-types';
import { ThemeConfigProp } from '@/redux/interface/index';
export const setToken = (token: string) => ({
    type: types.SET_TOKEN,
    token
})
// * setAssemblySize
export const setAssemblySize = (assemblySize: string) => ({
    type: types.SET_ASSEMBLY_SIZE,
    assemblySize
});

// * setLanguage
export const setLanguage = (language: string) => ({
    type: types.SET_LANGUAGE,
    language
});

// * setThemeConfig
export const setThemeConfig = (themeConfig: ThemeConfigProp) => ({
    type: types.SET_THEME_CONFIG,
    themeConfig
});
