import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slicer/userSlicer';
import productReducer from './slicer/productSlicer';

export default configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    }
});