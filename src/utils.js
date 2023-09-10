const modInt = (score) => Math.floor((score - 10) / 2);
const modStr = (mod) => mod >= 0 ? `+${mod}` : mod;
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
}
const toggleDarkMode = (darkMode) =>
{
    darkMode.checked ? document.querySelector("#main").classList.add("dark-mode") : document.querySelector("#main").classList.remove("dark-mode");
}

export default {modInt, modStr, setupTooltip, toggleDarkMode};