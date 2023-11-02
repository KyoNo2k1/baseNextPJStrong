import {ThemeConfig} from "antd";

export const APP_THEME = {
    color: {
        PRIMARYCOLOR: '#006884'
    },
    theme: {
        light: {
            token: {
                fontFamily : '',
                colorPrimary: '#006884',
            },
            components: {
                Button: {
                    borderRadius: 4,
                    padding: 16,
                    controlHeight: 40,
                },
                Notification : {
                  colorBgElevated : 'lightgreen'
                },
            }
        } as ThemeConfig

    }
}
