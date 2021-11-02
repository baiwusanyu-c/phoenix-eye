module.exports = {
    // set your styleguidist configuration here
    title: '虚拟货币公共组件文档',
    components: 'src/components/**/common-components/*.vue',
    defaultExample: false,
    sections: [
        {
            name: '可拖拽弹窗组件',
            components: 'src/components/**/dialog/*.vue'
        },
        {
            name: '右键菜单公共组件',
            components: 'src/components/**/contextmenu/be-contextmenu*.vue'
        },
        {
            name: 'Svg图标组件',
            components: 'src/components/**/svg-icon/*.vue'
        },
        {
            name: '消息弹窗',
            components: 'src/components/**/msg-dialog/*.vue'
        },
        {
            name: '带建议输入框',
            components: 'src/components/**/input/*.vue'
        },
        {
            name: '载入 loading',
            components: 'src/components/**/loading/*.vue'
        },
        {
            name: '文本缩略',
            components: 'src/components/**/ellipsis/*.vue'
        },
    ],
    webpackConfig: {
        // custom config goes here
    },
    exampleMode: 'expand'
}
