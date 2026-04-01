import MenuItems from './MenuItems.js';
import { APP_DOMAIN_PREFIX } from '../../../environment/index.js';
import '../scss/dropdown.scss';
import theme from '../scss/ThemeStyles.scss';

const menuItems = [
    // {
    //     title: 'HOME',
    //     url: '/',
    // },
    // {
    //     title: 'Explore',
    //     url: '/explore',
    //     submenu: [
    //         {
    //             title: 'ABOUT-US',
    //             url: '/about-us',
    //         },
    //         {
    //             title: 'PRESENT SETUP',
    //             submenu: [
    //                 {
    //                     title: 'WAPDA',
    //                     url: '/present',
    //                 },
    //                 {
    //                     title: 'MoWR',
    //                     url: '/present',

    //                 },

    //             ]
    //         },
    //         {
    //             title: 'WAPDA AS AN ORGANIZATION',
    //             submenu: [
    //                 {
    //                     title: 'Water Wing',
    //                     url: '/wapda-page',
    //                     param:0,

    //                 },
    //                 {
    //                     title: 'Power Wing',
    //                     url: '/wapda-page',
    //                     param:1,
    //                 },
    //                 {
    //                     title: 'Finance Wing',
    //                     url: '/wapda-page',
    //                     param:2,
    //                 },
    //                 {
    //                     title: 'Administration',
    //                     url: '/wapda-page',
    //                     param:3
    //                 }
    //             ]
    //         },
    //         {
    //           title:'WAPDA ARTICLES',
    //           submenu:[
    //             {
    //                 title:'Kalabagh Dam',
    //                 url:'/Kalabagh-dam'
    //             },
    //             {
    //                 title:'Research Paper',
    //                 url:'/research-paper'
    //             },
    //             {
    //                 title:'E-Library',
    //                 url:'/library'
    //             }
    //           ]
    //         },
    //         {
    //           title:'WAPDA REGULATION',
    //           url:'/wapda-regulations'
    //         },
    //         {
    //             title: 'ORGANOGRAM',
    //             url: '/organo-page',
    //         }
    //     ]
    // },
    // {
    //     title: 'Start',
    //     url: '/start',
    // },
];
const Navbar = () => {
    return (
        <nav>
            <ul className="menus">
                {
                    menuItems.map((menu, index) => {
                        const depthlevel = 0;
                        return <MenuItems items={menu} key={index} depthlevel={depthlevel} />
                    })
                }
            </ul>
        </nav>
    )
}

export default Navbar;