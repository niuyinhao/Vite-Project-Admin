//主题切换
import { ThemeConfigProp } from '@/redux/interface/index'
import darkTheme from '@/styles/theme/theme-dark.less'
import defaultTheme from '@/styles/theme/theme-default.less'
const useThem = (themConfig: ThemeConfigProp) => {
    const { weakOrGray, isDark } = themConfig;
    const body = document.documentElement as HTMLElement;
    if (!weakOrGray) body.setAttribute("style", "");
    if (weakOrGray === "weak") body.setAttribute("style", "filter: invert(80%)");
    if (weakOrGray === "gray") body.setAttribute("style", "filter: grayscale(1)");

    let head = document.getElementsByTagName("head")[0];
    const getStyle = head.getElementsByTagName("style");

    let styleDom = document.createElement("style");
    styleDom.innerHTML = isDark ? darkTheme : defaultTheme;
    head.appendChild(styleDom);
}


export default useThem