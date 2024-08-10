import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';
import BurgerMenuNav from "./BurgerMenuNav";
import Search from "./Search";
import TypeBar from "./TypeBar";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import ShoppingCart icon
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ListIcon from '@mui/icons-material/List';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';

const NavBar = observer(() => {
    const [openBrandBar, setOpenBrandBar] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openSearch, setOpenSearch] = React.useState(false);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [stateSearch, setStateSearch] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawerTop = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const toggleDrawerTopSearch = (anchor, openSearch) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setStateSearch({ ...stateSearch, [anchor]: openSearch });
    };

    const { user } = useContext(Context);
    const { cart } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token');
        cart.getCartFromLSmethod()
    }

    const totalCount = cart.items.reduce((sum, item) => sum + item.count, 0);

    return (
        <Navbar className='container' bg="primary" variant="primary">
            <BurgerMenuNav />

            <NavLink className='logo' to={SHOP_ROUTE}>
                <img src={logo} className="App-logo" alt="logo" />
                <div className='text'>
                    <span className={'main_text'}>
                        Pern React Shop
                    </span>
                </div>
            </NavLink>
            <Search />
            <a onClick={toggleDrawerTopSearch('top', true)} className='button SearchButton'>
                <SearchIcon />
            </a>

            {user.isAuth ?
                <div className='userNick'>
                    {user.user.email}
                </div>
                :
                <div className='userNick'>
                    Гість
                </div>
            }

            {user.isAuth ?
                <Nav className="ml-auto">
                    <div className='catalogButton Col button' onClick={toggleDrawerTop('top', true)}>
                        <ListIcon />
                        <div className='text'>
                            Каталог
                        </div>
                    </div>

                    {user.user.role === "ADMIN" ?
                        <a className='Col button admin' onClick={() => navigate(ADMIN_ROUTE)}>
                            <AdminPanelSettingsOutlinedIcon />
                            Адмін
                        </a>
                        :
                        ''
                    }
                    <div className="cart Row button" onClick={() => navigate(CART_ROUTE)}>
                        <div className='Col IconAndtext'>
                            <ShoppingCartIcon /> {/* Replace old icon with ShoppingCartIcon */}
                            Кошик
                        </div>
                        <div className='TotalCountNumber'>
                            {totalCount}
                        </div>
                    </div>
                    <a variant={"outline-light"} onClick={() => logOut()} className="Col button">
                        <LogoutOutlinedIcon />
                        Вийти
                    </a>
                </Nav>
                :
                <Nav className="ml-auto">
                    <div className='catalogButton Col button' onClick={toggleDrawerTop('top', true)}>
                        <ListIcon />
                        <div className='text'>
                            Каталог
                        </div>
                    </div>
                    <a variant={"outline-light"} className='button Col autorization' onClick={() => navigate(LOGIN_ROUTE)}>
                        <PermIdentityOutlinedIcon />
                        Авторизація
                    </a>
                    <div className="cart Row button" onClick={() => navigate(CART_ROUTE)}>
                        <div className='Col IconAndtext'>
                            <ShoppingCartIcon /> {/* Replace old icon with ShoppingCartIcon */}
                            Кошик
                        </div>
                        <div className='TotalCountNumber'>
                            {totalCount}
                        </div>
                    </div>
                </Nav>
            }
            {(['top']).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        className='DrawerTop'
                        anchor={'top'}
                        open={state['top']}
                        // onClose={toggleDrawerTop(anchor, false)}
                        onClose={toggleDrawerTop(anchor, false)}
                    >
                        <TypeBar onClose={() => toggleDrawerTop(anchor, false)}/>
                    </Drawer>
                </React.Fragment>
            ))}
            {(['top']).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        className='DrawerTop'
                        anchor={'top'}
                        open={stateSearch['top']}
                        onClose={toggleDrawerTopSearch(anchor, false)}
                    >
                        <Search className='visible' />
                    </Drawer>
                </React.Fragment>
            ))}
        </Navbar>
    );
});

export default NavBar;
