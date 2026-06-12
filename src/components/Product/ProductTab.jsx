import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts } from '@store/product/productSlice';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '@components/Loader/ProductCardSkeleton';
import { useAuthContext } from '@contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createConversation } from '@store/conversation/conversationSlice';
import { sendMessage } from '@store/message/messageSlice';
import { openCTAModal } from '@store/auth/authSlice';

export default function ProductTab({ targetUserId }) {
    //On récupère le hook
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId: authId } = useAuthContext();

    //On déclare nos states
    const { myItems = [], loading, error } = useSelector(state => state.products);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [suggestedPrice, setSuggestedPrice] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        //On vérifie que l'ID a bien ete transmit
        if (targetUserId) {
            //Appel a l'API par le Slice
            dispatch(fetchMyProducts(targetUserId));
        }
    }, [targetUserId, dispatch]);

    const isOwnProfile = targetUserId === authId;
    const hasAvailableProducts = myItems.some(p => p.status === 'AVAILABLE');

    const handleToggleSelect = (productId) => {
        setSelectedIds(prev => 
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleStartLotRequest = async () => {
        if (selectedIds.length < 2) return;
        setIsSubmitting(true);
        try {
            // 1. Initialiser la conversation sur le premier produit sélectionné
            const firstProductId = selectedIds[0];
            const conversation = await dispatch(createConversation({ productId: firstProductId })).unwrap();

            // 2. Envoyer le message technique pour le lot avec ou sans offre de prix
            const finalOfferPrice = parseFloat(suggestedPrice);
            let textContent = '';
            if (finalOfferPrice && finalOfferPrice > 0) {
                textContent = `Bonjour ! Je souhaite créer un lot avec ces articles pour un prix proposé de ${finalOfferPrice}€. [REQUEST_LOT:${selectedIds.join(',')}|price:${finalOfferPrice}]`;
            } else {
                textContent = `Bonjour ! Je souhaite créer un lot avec ces articles. [REQUEST_LOT:${selectedIds.join(',')}]`;
            }

            await dispatch(sendMessage({ conversationId: conversation.id, content: textContent })).unwrap();

            // 3. Rediriger l'acheteur vers la messagerie
            navigate('/messages', {
                state: { activeConversationId: conversation.id }
            });
        } catch (err) {
            console.error("Erreur lors de la création de la demande de lot :", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    //Chargement + erreur + Product
    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-8 mt-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <ProductCardSkeleton key={idx} />
                ))}
            </div>
        );
    }
    if (error) return <p className="text-center py-4 text-red font-inter text-sm">Erreur : {error}</p>;
    if (!myItems || myItems.length === 0) return (
        <p className="text-center font-inter text-gray py-8 tracking-widest uppercase text-sm">
            Aucun article en vente
        </p>
    );

    const selectedProducts = myItems.filter(p => selectedIds.includes(p.id));
    const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);

    return (
        <div className="flex flex-col gap-6">
            {/* Bouton pour activer/désactiver le mode lot */}
            {!isOwnProfile && hasAvailableProducts && (
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => {
                            if (!authId) {
                                dispatch(openCTAModal());
                                return;
                            }
                            setIsSelectionMode(!isSelectionMode);
                            setSelectedIds([]);
                            setSuggestedPrice('');
                        }}
                        className={`px-6 py-2.5 rounded-xl font-inter text-sm uppercase tracking-wider transition-all duration-300 ${
                            isSelectionMode
                                ? 'bg-gray-dark border border-[#333] text-white hover:bg-[#222]'
                                : 'bg-red text-white hover:bg-[#cc0000] hover:scale-[1.02]'
                        }`}
                    >
                        {isSelectionMode ? 'Annuler la sélection' : 'Acheter en lot / Créer un lot'}
                    </button>
                </div>
            )}

            {/* Grille de produits */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-8">
                {myItems.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        selectable={isSelectionMode && product.status === 'AVAILABLE'}
                        selected={selectedIds.includes(product.id)}
                        onSelect={handleToggleSelect}
                    />
                ))}
            </div>

            {/* Barre flottante en bas lors de la sélection */}
            {isSelectionMode && selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-[650px] bg-black/90 border border-[#222] backdrop-blur-md px-5 py-4 rounded-2xl flex items-center justify-between shadow-2xl animate-fade-in gap-4">
                    <div className="flex flex-col shrink-0">
                        <span className="font-inter text-white font-bold text-sm">
                            {selectedIds.length} {selectedIds.length > 1 ? 'articles' : 'article'}
                        </span>
                        <span className="font-inter text-gray text-xs mt-0.5">
                            Total : <strong className="text-white">{totalPrice}€</strong>
                        </span>
                    </div>

                    {/* Proposer un prix */}
                    <div className="flex items-center gap-2 bg-[#111] border border-[#222] px-3 py-1.5 rounded-xl">
                        <span className="text-gray text-[10px] uppercase font-semibold font-inter tracking-wider">Offre (€)</span>
                        <input
                            type="number"
                            min="1"
                            placeholder={totalPrice}
                            value={suggestedPrice}
                            onChange={(e) => setSuggestedPrice(e.target.value)}
                            className="w-14 bg-transparent text-white font-bebas text-lg focus:outline-none text-center [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />
                    </div>

                    <div className="flex gap-2 shrink-0">
                        <button
                            onClick={() => {
                                setIsSelectionMode(false);
                                setSelectedIds([]);
                                setSuggestedPrice('');
                            }}
                            className="px-3 py-2 border border-[#333] hover:border-white rounded-lg text-white font-inter text-xs uppercase tracking-wider transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            disabled={selectedIds.length < 2 || isSubmitting}
                            onClick={handleStartLotRequest}
                            className={`px-4 py-2 rounded-lg font-bebas text-lg tracking-wider uppercase transition-all ${
                                selectedIds.length < 2
                                    ? 'bg-gray-dark text-gray-light cursor-not-allowed'
                                    : isSubmitting
                                    ? 'bg-red/50 text-white cursor-wait'
                                    : 'bg-red text-white hover:bg-[#cc0000] hover:scale-105 cursor-pointer'
                            }`}
                        >
                            {selectedIds.length < 2 
                                ? 'Min. 2 articles' 
                                : isSubmitting 
                                ? 'Envoi...' 
                                : 'Créer le lot'
                            }
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}