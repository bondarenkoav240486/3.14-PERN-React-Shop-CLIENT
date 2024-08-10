import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';

import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import logo from '../assets/logo.svg';
// import logo2 from '../assets/house-icon.jpg';
import TypeBar from "./TypeBar";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

import Drawer from '@mui/material/Drawer';
import BrandBar from "./BrandBar";
// import { useNavigate } from 'react-router-dom';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';





const BurgerMenuNav = observer(() => {
    const { device } = useContext(Context)
    const { user } = useContext(Context);
    const { cart } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        // fetchDevices(null, null, 1, 8).then(data => {
        //     device.setDevices(data.rows)
        //     device.setTotalCount(data.count)
        // })
    }, [])
    const [open, setOpen] = React.useState(false);
    const [openBrandBar, setOpenBrandBar] = React.useState(false);
    const [openBurgerCheckbox, setOpenBurgerCheckbox] = React.useState(false);


    const totalCount = cart.items.reduce((sum, item) => sum + item.count, 0);

    const icons = [
        // <MusicNoteIcon />,
        // <LibraryMusicIcon />,
        <InboxIcon />,
        <MailIcon />
    ];
    const menuItems = [
        { text: 'Головна', href: CART_ROUTE, icon: icons[0] },
        { text: 'Список пісень', href: CART_ROUTE, icon: icons[1] },
        { text: user.user.email, href: '', icon: icons[1] },
        { text: 'cart ' + totalCount, href: CART_ROUTE, icon: icons[1] },
        // { text: 'Список альбомів', href: '/albums', icon: icons[3] },
        // { text: 'Завантажити пісню', href: CART_ROUTE, icon: icons[2] },
    ];





    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const toggleDrawerBrandBar = (newOpen) => () => {
        setOpenBrandBar(newOpen);
    };
    const toggleBurgerCheckbox = (newOpen) => () => {
        setOpenBurgerCheckbox(newOpen);
    };

    useEffect(() => {
        openBurgerCheckbox ? setIsChecked(true) : setIsChecked(false)
    }, [openBurgerCheckbox])

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token');
        cart.getCartFromLSmethod()
    }

    return (
        <div className='BurgerMenuNav'>
            <MenuIcon
                onClick={toggleBurgerCheckbox(true)}
            />
            <Drawer
                className='Drawerburgmenu'
                open={openBurgerCheckbox}
                onClose={toggleBurgerCheckbox(false)}>
                {user.isAuth ?
                    // <Nav className="ml-auto" style={{ color: 'white' }}>
                    <Nav className="ml-auto"
                    // style={{ color: 'white' }}
                    >
                        <div>
                            <IconButton >
                                <ChevronLeftIcon
                                    onClick={toggleBurgerCheckbox(false)}
                                />
                            </IconButton>
                        </div>
                        <List>
                            {menuItems.map(({ text, href, icon }, index) => (
                                <ListItem button key={href} onClick={() => navigate(href)}>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                            {user.user.role === "ADMIN" ?
                                // <Button
                                <ListItem
                                    button
                                    variant={"outline-light"}
                                    // onClick={() => history.push(ADMIN_ROUTE)}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Адмін панель'} />
                                    {/* </Button> */}
                                </ListItem>
                                :
                                ''
                            }
                            <ListItem
                                button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                                className="ml-2"
                            >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Вийти'} />
                            </ListItem>
                        </List>

                    </Nav>
                    :
                    <Nav className="ml-auto"
                    // style={{ color: 'white' }}
                    >
                        <div>
                            <IconButton >
                                <ChevronLeftIcon
                                    onClick={toggleBurgerCheckbox(false)}
                                />
                            </IconButton>
                        </div>
                        <div
                            variant={"outline-light"}
                            //  onClick={() => history.push(LOGIN_ROUTE)}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Авторизація
                            {/* </Button> */}
                        </div>
                    </Nav>
                }
                {/* <Button */}
                <div
                    className='catalogButton'
                    onClick={toggleDrawer(true)}
                >
                    КАТАЛОГ
                    {/* </Button> */}
                </div>
                {/* <Button */}
                <div
                    onClick={toggleDrawerBrandBar(true)}
                    className='buttonDrawerBrandBar'
                >
                    БРЕНДИ
                    {/* </Button> */}
                </div>
            </Drawer>

            <Drawer open={open} onClose={toggleDrawer(false)}>
                <TypeBar />
            </Drawer>
            <Drawer open={openBrandBar}
                onClose={
                    () => setOpenBrandBar(false)
                }
            >
                <BrandBar />
            </Drawer>
        </div>
    );
});
export default BurgerMenuNav;




{/* <svg width="33" height="33" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z" stroke="#0E86D4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z" stroke="#0E86D4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669" stroke="#0E86D4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
</svg> */}