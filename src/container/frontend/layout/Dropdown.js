import MenuItems from './MenuItems.js';
import '../scss/dropdown.scss';
import theme from '../scss/ThemeStyles.scss';

const Dropdown = ({submenus, dropdown, depthlevel}) => {
    depthlevel = depthlevel + 1;
    const dropdownClass = depthlevel > 1 ? "dropdown-submenu":"";

    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? "show":""}`}>
            {
                submenus.map((submenu, index)=>(
                    <MenuItems items={submenu} key={index} depthlevel={depthlevel} />
                ))
            }
        </ul>
    )
};

export default Dropdown;