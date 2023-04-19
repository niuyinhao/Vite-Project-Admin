import { SizeType } from "antd/es/config-provider/SizeContext";

export interface ThemeConfigProp {
    primary: string;
    isDark: boolean;
    weakOrGray: string;
    breadcrumb: boolean;
    tabs: boolean;
    footer: boolean;
}
export interface GlobalState {
    token: string;
    userInfo: any;
    assemblySize: SizeType;
    language: string;
    themeConfig: ThemeConfigProp
}