export const setProperty = (prop, val, dom = document.documentElement) => {
    console.log('这里通过document修改prop',prop)
    dom.style.setProperty(prop, val);
};

export const mix = (color1, color2, weight = 0.5)=>{
    let color = '#';
    for (let i = 0; i <= 2; i++) {
        const c1 = parseInt(color1.substring(1 + i * 2, 3 + i * 2), 16);
        const c2 = parseInt(color2.substring(1 + i * 2, 3 + i * 2), 16);
        const c = Math.round(c1 * weight + c2 * (1 - weight));
        color += c.toString(16).padStart(2, '0');
    }
    return color;
};