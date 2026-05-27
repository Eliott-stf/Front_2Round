import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import productReducer from './product/productSlice';
import reviewReducer from './review/reviewSlice';


export const store = configureStore({
    reducer: {
        //TODO: Les Slices
        auth: authReducer,
        user: userReducer,
        products: productReducer,
        reviews: reviewReducer,
    }
});