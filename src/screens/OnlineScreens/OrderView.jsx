import React from 'react';
import HeaderView from '@components/UI/HeaderView';
import OrderList from '@components/Order/OrderList';

export default function OrderView() {
    return (
        <main className="w-full min-h-screen bg-black flex flex-col">
            <HeaderView
                title="MES COMMANDES"
                subtitle="Historique de vos achats"
                heightClass="h-[200px]"
            />

            <section className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12">
                <OrderList />
            </section>
        </main>
    );
}