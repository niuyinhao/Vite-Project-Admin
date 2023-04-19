import { setThemeConfig } from "@/redux/modules/global/action";
import { Switch } from "antd"
import { connect } from 'react-redux'
const SwitchDark = (props: any) => {
    const { setThemeConfig, themeConfig } = props
    const onChange = (checked: boolean) => {
        setThemeConfig({ ...themeConfig, isDark: checked })
    }
    return (
        <Switch
            className="dark"
            defaultChecked={themeConfig.isDark}
            checkedChildren={<>🌞</>}
            unCheckedChildren={<>🌛</>}
            onChange={onChange}
        />
    )
}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setThemeConfig }

export default connect(mapStateToProps, mapDispatchToProps)(SwitchDark)