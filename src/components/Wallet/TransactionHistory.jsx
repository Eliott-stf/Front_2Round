import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatTransactionDate } from '@/utils/formateDate';

export default function TransactionHistory({ transactions }) {

    // On déclare nos constantes pour le confort
    const hasTransactions = transactions && transactions.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full bg-[#111111] border border-[#2f2f2f] rounded-xl overflow-hidden flex flex-col"
        >
            <div className="p-6 border-b border-[#2f2f2f]">
                <h3 className="font-bebas text-white text-2xl tracking-wider uppercase">
                    Historique des transactions
                </h3>
            </div>

            <div className="flex flex-col">
                {!hasTransactions ? (
                    <div className="p-8 text-center text-[#737373] font-inter text-sm">
                        Aucune transaction pour le moment.
                    </div>
                ) : (
                    transactions.map((tx, index) => {
                        const isCredit = tx.type === 'CREDIT';
                        const date = formatTransactionDate(tx.createdAt);

                        return (
                            <div
                                key={tx.id}
                                className={`flex items-center justify-between p-6 ${index !== transactions.length - 1 ? 'border-b border-[#2f2f2f]' : ''} hover:bg-[#1a1a1a] transition-colors`}
                            >
                                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0 pr-2 md:pr-4">
                                    <div className={`p-2 md:p-3 shrink-0 rounded-full ${isCredit ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red/10 text-red'}`}>
                                        {isCredit ? <ArrowDownRight className="w-4 h-4 md:w-5 md:h-5" /> : <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-inter text-white text-xs md:text-sm font-medium truncate">
                                            {tx.description}
                                        </span>
                                        <span className="font-inter text-[#737373] text-[10px] md:text-xs mt-0.5 md:mt-1 truncate">
                                            {date}
                                        </span>
                                    </div>
                                </div>

                                <span className={`font-bebas text-lg md:text-2xl tracking-wider shrink-0 whitespace-nowrap ${isCredit ? 'text-emerald-500' : 'text-white'}`}>
                                    {isCredit ? '+' : '-'}{tx.amount} €
                                </span>
                            </div>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
}