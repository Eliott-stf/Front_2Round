import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchBankAccounts } from '@store/bankAccount/bankAccountSlice';
import HeaderView from '@components/UI/HeaderView';
import WalletBalance from '@components/Wallet/WalletBalance';
import { fetchMyWallet } from '@store/wallet/walletSlice';
import BankAccountsList from '@components/Wallet/BankAccount';
import TransactionHistory from '@components/Wallet/TransactionHistory';

export default function WalletView() {

    // On récupère les hooks
    const dispatch = useDispatch();

    // On récupère nos datas Redux
    const { current: wallet, loading: walletLoading } = useSelector((state) => state.wallets);
    const { items: bankAccounts, loading: bankLoading } = useSelector((state) => state.bankAccounts);

    // On gère le cycle de vie
    useEffect(() => {
        dispatch(fetchMyWallet());
        dispatch(fetchBankAccounts());
    }, [dispatch]);

    // Affichage conditionnel (Loading)
    if (walletLoading || bankLoading) {
        return (
            <main className="w-full min-h-screen bg-black flex flex-col items-center justify-center">
                <span className="text-[#737373] font-inter tracking-widest uppercase text-sm">Chargement du portefeuille...</span>
            </main>
        );
    }

    // On déclare nos constantes de confort
    const transactions = wallet?.transactions || [];
    const balance = wallet?.balance || 0;

    return (
        <main className="w-full min-h-screen bg-black flex flex-col pb-20">
            <HeaderView
                title="MON PORTEFEUILLE"
                subtitle="Gérez vos fonds et comptes"
                heightClass="h-[120px] md:h-[200px]"
            />

            <section className="w-full max-w-[1200px] mx-auto px-6 py-10 flex flex-col gap-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-1 flex flex-col gap-8">
                        <WalletBalance balance={balance} />
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <BankAccountsList accounts={bankAccounts} />
                        <TransactionHistory transactions={transactions} />
                    </div>
                </div>

            </section>
        </main>
    );
}