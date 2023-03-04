
// 使用暗色主题(记录选择到cookie中)
function useDarkTheme(useDark) {
    if (useDark) {
        addDarkTheme();
    } else {
        addLightTheme();
    }
}
// 添加暗色主题
function addDarkTheme() {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.id = "theme-css-dark";  // 加上id方便后面好查找到进行删除
    link.rel = 'stylesheet';
    link.href = 'darkPageStyle.css';
    document.getElementsByTagName("head")[0].appendChild(link);
}
// 删除暗色主题
function removeDarkTheme() {
    $('#theme-css-dark').remove();

}
// 添加亮色主题
function addLightTheme() {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.id = "theme-css-light";  // 加上id方便后面好查找到进行删除
    link.rel = 'stylesheet';
    link.href = 'lightPageStyle.css';
    document.getElementsByTagName("head")[0].appendChild(link);
}