import { mix, setProperty } from '@/Utils/theme.js'
export default {
    namespaced: true,
    state: {
        primary: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
        headerBgColor: '#242f42',
        headerTextColor: '#fff',
    },
    actions: {},
    mutations: {
        initTheme(state) {
            console.log("initTheme进来了")
            const datas = ['primary', 'success', 'warning', 'danger', 'info'];
            // datas.forEach(x=>{
            //     console.log(x)
            // });
            datas.forEach(type => {
                const color = localStorage.getItem(`theme-${type}`) || '';
                if (color) {
                    console.log("这个能进来了吗")
                    // state.setPropertyColor(color, type); // 设置主题色
                    this[type] = color;
                    setProperty(`--el-color-${type}`, color);
                    console.log(`--el-color-${type}`, type)
                    localStorage.setItem(`theme-${type}`, color);
                    // this.setThemeLight(type);
                    const mm=[3, 5, 7, 8, 9];
                    mm.forEach((v) => {
                        setProperty(`--el-color-${type}-light-${v}`, mix('#ffffff', this[type], v / 10));
                    });
                    setProperty(`--el-color-${type}-dark-2`, mix('#ffffff', this[type], 0.2));
                }
            });
            const headerBgColor = localStorage.getItem('header-bg-color');
            // headerBgColor && this.setHeaderBgColor(headerBgColor);
            this.headerBgColor = headerBgColor;
            setProperty('--header-bg-color', headerBgColor);
            localStorage.setItem(`header-bg-color`, headerBgColor);
            const headerTextColor = localStorage.getItem('header-text-color');
            // headerTextColor && this.setHeaderTextColor(headerTextColor);
            this.headerTextColor = headerTextColor;
            setProperty('--header-text-color', headerTextColor);
            localStorage.setItem(`header-text-color`, headerTextColor);
        },
        resetTheme() {
            ['primary', 'success', 'warning', 'danger', 'info'].forEach((type) => {
                this.setPropertyColor('', type); // 重置主题色
            });
        },
        setPropertyColor(color, type = 'primary') {
            this[type] = color;
            setProperty(`--el-color-${type}`, color);
            console.log(`--el-color-${type}`, type)
            localStorage.setItem(`theme-${type}`, color);
            this.setThemeLight(type);
        },
        setThemeLight(type = 'primary') {
            [3, 5, 7, 8, 9].forEach((v) => {
                setProperty(`--el-color-${type}-light-${v}`, mix('#ffffff', this[type], v / 10));
            });
            setProperty(`--el-color-${type}-dark-2`, mix('#ffffff', this[type], 0.2));
        },
        setHeaderBgColor(color) {
            this.headerBgColor = color;
            setProperty('--header-bg-color', color);
            localStorage.setItem(`header-bg-color`, color);
        },
        setHeaderTextColor(color) {
            this.headerTextColor = color;
            setProperty('--header-text-color', color);
            localStorage.setItem(`header-text-color`, color);
        }
    }
}
