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
import conversationReducer from './conversation/conversationSlice';
import messageReducer from './message/messageSlice';
import orderReducer from './order/orderSlice';
import txReducer from './tx/txSlice';
import bankAccountReducer from './bankAccount/bankAccountSlice';
import adminReducer from './admin/adminSlice';
import reportReducer from './report/reportSlice';
import factureReducer from './facture/factureSlice';

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
        conversations: conversationReducer,
        messages: messageReducer,
        orders: orderReducer,
        tx: txReducer,
        bankAccounts: bankAccountReducer,
        admin: adminReducer,
        reports: reportReducer,
        facture: factureReducer
    }
});