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

/* MenuState */
export interface MenuState {
    isCollapse: boolean;
    menuList: Menu.MenuOptions[];
}

export interface BreadcrumbState {
    breadcrumbList: {
        [key: string]: any
    }
}

export interface TabsState {
    tabsActive: string;
    tabsList: Menu.MenuOptions[]
}