const setupTooltip = () =>
{
    document.addEventListener('mousemove', fn);
    let tooltip = document.querySelectorAll('.tooltip');
    function fn(e) {
        for (let i = tooltip.length; i--;)
        {
            e.pageX > window.innerWidth / 2
                ? tooltip[i].style.left = (e.pageX - parseInt(getComputedStyle(tooltip[i]).width) - 4 * parseInt(getComputedStyle(tooltip[i]).marginRight)) + 'px'
                : tooltip[i].style.left = e.pageX + 'px';
            e.pageY > window.innerHeight / 2
                ? tooltip[i].style.top = (e.pageY - parseInt(getComputedStyle(tooltip[i]).height) - 4 * parseInt(getComputedStyle(tooltip[i]).marginBottom)) + 'px'
                : tooltip[i].style.top = e.pageY + 'px';
        }
    }
    console.log("tooltip imported");
}

export default setupTooltip;