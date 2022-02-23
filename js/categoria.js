function Menu() {
    document.querySelector('.headerMenu').style.opacity = 0;
    document.querySelector('.menuModal').style.left = 0;
}
function MenuClose() {
    document.querySelector('.headerMenu').style.opacity = 1;
    document.querySelector('.menuModal').style.left = '-101vh';
}