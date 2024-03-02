interface Icon {
    name: string;
    src: string;
}

export const getIconData = (folderPath: string): Icon[] => {
    return [
        {
            name: "Burger Menu Circle",
            src: `/icons/SVG/${folderPath}/Icons_ES_Burger_Menu_Circle.svg`,
        },
        {
            name: "Burger Menu Square",
            src: `/icons/SVG/${folderPath}/Icons_ES_Burger_Menu_Square_Verticle.svg`,
        },
        {
            name: "Close Button Square",
            src: `/icons/SVG/${folderPath}/Icons_ES_Close_01.svg`,
        },
        {
            name: "Close Button Circle",
            src: `/icons/SVG/${folderPath}/Icons_ES_Close_02.svg`,
        },
        {
            name: "Close Button Square",
            src: `/icons/SVG/${folderPath}/Icons_ES_Close_03.svg`,
        },
        {
            name: "Dotted Menu Circles",
            src: `/icons/SVG/${folderPath}/Icons_ES_Dottled_Menu_Circle_Horizontal_Hollow_01.svg`,
        },
    ];
};
