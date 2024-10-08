import React from 'react';
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
// import { useHistory } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from "../utils/consts";

import { useContext } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";

import { addToBasket } from "../http/userAPI";

// import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

import Stack from '@mui/material/Stack';

import Rating from '@mui/material/Rating';


const DeviceItem = observer(({ device }) => {
    // const history = useHistory()
    const navigate = useNavigate();
    // navigate('/home');
    const { cart } = useContext(Context)
    const { user } = useContext(Context)

    const findItem = cart.items.find((obj) => obj.id === device.id)

    const onClickAddToCart = () => {
        cart.addItem(
            // cart.items,
            // cart.setItems,
            // cart.setTotalPrice,
            device,
            user,
            // type, // Add type property

        );
        // addToBasket(user.user.id, device.id );
    }



    return (
        // <Col md={3} className='deviceItem'
        <div className='deviceItem Col'
        // onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
        // onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
        >
            <Card
                className='Col'
                // style={{ width: 150, cursor: 'pointer' }}
                style={{ cursor: 'pointer' }}
                border={"light"}
                onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
            >
                <div className='wrapper'>
                    <Image
                        // width={150}
                        // height={160}
                        src={process.env.REACT_APP_API_URL + device.img}
                    />
                </div>
                {/* <Image width={150} height={150} src={device.img} /> */}
                <div
                    className="name text-black-50 mt-1 d-flex justify-content-between align-items-center"
                >
                    <div>{device.name}</div>
                    {/* <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star} />
                    </div> */}
                </div>
            </Card>
            <div className='rating Row' >
                {/* <div>{device.rating}</div> */}
                <Stack
                    className='ratingStack'
                    spacing={1}
                >
                    <Rating
                        name="size-large"
                        defaultValue={device.rating}
                        size="large"
                        readOnly
                    />
                </Stack>
            </div >

            <div className='priceAndBasket Col' >
                <span className='price'>{device.price + ' ₴'}</span>
                <Button
                    variant={"outline-dark"}
                    onClick={
                        () => onClickAddToCart()
                    }
                >
                    {cart.items.find((obj) => obj.id === device.id)
                        ?
                        <DoneOutlinedIcon style={{ color: 'white' }} />
                        :
                        // <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        //     <path d="M30.4458 20.6762H9.51021L10.5614 18.5352L28.027 18.5035C28.6176 18.5035 29.1239 18.0816 29.2294 17.498L31.6481 3.95938C31.7114 3.6043 31.6165 3.23867 31.3844 2.96094C31.2698 2.82425 31.1267 2.71415 30.9652 2.63826C30.8038 2.56238 30.6277 2.52253 30.4493 2.52148L8.23052 2.44766L8.04068 1.55469C7.92115 0.985156 7.40786 0.570312 6.82427 0.570312H1.39263C1.06349 0.570313 0.747832 0.701062 0.515096 0.933797C0.282361 1.16653 0.151611 1.48219 0.151611 1.81133C0.151611 2.14047 0.282361 2.45612 0.515096 2.68886C0.747832 2.92159 1.06349 3.05234 1.39263 3.05234H5.8188L6.64849 6.99688L8.69107 16.8863L6.06138 21.1789C5.92482 21.3632 5.84256 21.5821 5.82392 21.8107C5.80528 22.0394 5.851 22.2687 5.95591 22.4727C6.16685 22.891 6.59224 23.1547 7.06333 23.1547H9.27114C8.80047 23.7798 8.54624 24.5413 8.54693 25.3238C8.54693 27.3137 10.1641 28.9309 12.154 28.9309C14.1438 28.9309 15.761 27.3137 15.761 25.3238C15.761 24.5398 15.5008 23.777 15.0368 23.1547H20.7004C20.2298 23.7798 19.9755 24.5413 19.9762 25.3238C19.9762 27.3137 21.5934 28.9309 23.5833 28.9309C25.5731 28.9309 27.1903 27.3137 27.1903 25.3238C27.1903 24.5398 26.9301 23.777 26.4661 23.1547H30.4493C31.1313 23.1547 31.6903 22.5992 31.6903 21.9137C31.6882 21.5849 31.5563 21.2702 31.3231 21.0384C31.0899 20.8066 30.7746 20.6764 30.4458 20.6762ZM8.74732 4.89453L28.9903 4.96133L27.0075 16.0637L11.1063 16.0918L8.74732 4.89453ZM12.154 26.4348C11.5422 26.4348 11.043 25.9355 11.043 25.3238C11.043 24.7121 11.5422 24.2129 12.154 24.2129C12.7657 24.2129 13.2649 24.7121 13.2649 25.3238C13.2649 25.6185 13.1479 25.901 12.9395 26.1094C12.7312 26.3177 12.4486 26.4348 12.154 26.4348ZM23.5833 26.4348C22.9715 26.4348 22.4723 25.9355 22.4723 25.3238C22.4723 24.7121 22.9715 24.2129 23.5833 24.2129C24.195 24.2129 24.6942 24.7121 24.6942 25.3238C24.6942 25.6185 24.5772 25.901 24.3688 26.1094C24.1605 26.3177 23.8779 26.4348 23.5833 26.4348Z" fill="black" />
                        // </svg>
                        // <svg width="33" height="33" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <LocalMallOutlinedIcon style={{ color: 'white' }} />

                    }
                </Button>
            </div>
            {/* </Col > */}
        </div >
    );
});

export default DeviceItem;
