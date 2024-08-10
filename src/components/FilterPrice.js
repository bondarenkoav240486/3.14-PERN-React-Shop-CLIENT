// import React, { useState, useContext } from 'react';
// import { Context } from "../index";
// import { observer } from "mobx-react-lite";
// // import { getFilterPriceDevices } from "../http/deviceAPI";
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// function valuetext(value) {
//     return `${value}°C`;
// }

// const FilterPrice = observer(() => {
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const { device } = useContext(Context);

//     function valuetext(value) {
//         return `${value * 1000}°C`;
//     }

//     const [value, setValue] = React.useState([0, 100000]);
//     const handleChange = (event, newValue) => {
//         console.log(value[0] * 1000, value[1] * 1000)
//         setValue(newValue);
//     };

//     // const navigate = useNavigate();

//     // const handleFilter = () => {
//     //     getFilterPriceDevices(minPrice, maxPrice)
//     //         .then(data => {
//     //             // setProducts(data);
//     //             device.setDevices(data)
//     //             console.log(data)
//     //         }
//     //         )
//     // }
//     // const handleFilter = () => {
//     //     getFilterPriceDevices(value[0] * 1000, value[1] * 1000)
//     //         .then(data => {
//     //             // setProducts(data);
//     //             device.setDevices(data)
//     //             console.log(data)
//     //         }
//     //         )
//     // }

//     return (
//         <div className='Search Col'>
//             {/* <input
//                 type="number"
//                 placeholder="Мінімальна ціна"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//             />
//             <input
//                 type="number"
//                 placeholder="Максимальна ціна"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//             /> */}

//             <Box sx={{ width: 300 }}>
//                 <Slider
//                     // getAriaLabel={() => ' range'}
//                     value={value}
//                     onChange={handleChange}
//                 // valueLabelDisplay="auto"
//                 // getAriaValueText={valuetext}
//                 />
//             </Box>
//             <button onClick={handleFilter}>Пошук</button>
//         </div>
//     );
// })

// export default FilterPrice;
