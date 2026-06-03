import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import productReducer from './product/productSlice';
import reviewReducer from './review/reviewSlice';
import categoryReducer from './category/categorySlice';
import mediaReducer from './media/mediaSlice';
import walletReducer from './wallet/walletSlice';
import stripeReducer from './stripe/stripeSlice';
import addressReducer from './address/addressSlice';


export const store = configureStore({
    reducer: {
        //TODO: Les Slices
        auth: authReducer,
        user: userReducer,
        products: productReducer,
        reviews: reviewReducer,
        categories: categoryReducer,
        medias: mediaReducer,
        wallets: walletReducer,
        stripe: stripeReducer,
        addresses: addressReducer,
    }
});