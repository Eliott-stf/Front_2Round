import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessView({ onClose }) {
    return (
        <div className="p-10 flex flex-col items-center justify-center h-full text-center">
            <motion.div
                className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
            >
                <CheckCircle className="w-10 h-10 text-emerald-400" />
            </motion.div>
            <h3 className="font-bebas text-4xl text-white mb-2">Paiement réussi !</h3>
            <p className="font-inter text-sm text-gray-500 mb-8">
                Votre commande a été confirmée avec succès.
            </p>
            <motion.button
                onClick={onClose}
                className="px-8 py-3 bg-white text-black font-bebas text-xl tracking-wider rounded-xl transition-colors hover:bg-[#e5e5e5]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Fermer
            </motion.button>
        </div>
    );
}