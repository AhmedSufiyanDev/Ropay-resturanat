import { useState, useEffect, useRef } from "react";
import Dropdown from './Dropdown.js';
import { Link as RouterLink } from "react-router-dom";
import '../scss/dropdown.scss';
import theme from '../scss/ThemeStyles.scss';
const MenuItems = ({items, depthlevel}) => {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
         if (dropdown && ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
         }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", handler);
         document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };
    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return(
        <li
            className="menu-items"
            ref = {ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {items.submenu ? (<>
                <button type="button" aria-haspopup="menu" aria-expanded = { dropdown ? "true" : "false" }
                    onClick={
                        () => setDropdown((prev) => !prev)
                    }>
                        {
                            depthlevel > 0 ? 
                                <span className="dot-before"></span>
                                : 
                                null
                        }
                        {
                            items.title
                        } {
                            " "
                        } {
                            depthlevel > 0 ? 
                                <span className="dot-after"></span>
                                : 
                                null
                        }
                    </button> <Dropdown depthlevel={
                        depthlevel
                    } submenus={
                        items.submenu
                    } dropdown={
                        dropdown
                    } 
                    /></>
                ) : (<RouterLink  to={{pathname: items.url, query: (items.param >= 0) ? items?.param : ''}}  >{
                        items.title
                    }</RouterLink>
                )
            } </li>
    );

};
export default MenuItems;