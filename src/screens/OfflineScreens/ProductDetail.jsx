import ProductImg from '@components/Product/ProductImg';
import SimilarProduct from '@components/Product/SimilarProduct';
import PageLoader from '@components/Loader/PageLoader';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchMyProducts, fetchProducts } from '@store/product/productSlice';
import ProductInfos from '@components/Product/ProductInfos';
import { useAuthContext } from '@contexts/AuthContext';
import HeaderView from '@components/UI/HeaderView';

export default function ProductDetail() {

  //On récupr l'id passé en param
  const { slugAndId } = useParams();
  const id = slugAndId?.substring(slugAndId.length - 36);

  // On récupère les hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //On récup le userID du AuthContext
  const { userId } = useAuthContext();

  // On déclare nos states locaux et store
  const {
    current: product,
    myItems = [],
    items = [],
    loading,
    error
  } = useSelector(state => state.products);

  //On déclare nos constantes
  //Flag de confort pour savoir si c'est le Owner
  const isOwner = userId === product?.sellerId;

  //On exclu le produit actuel ET on filtre uniquement les produits disponibles
  const dressingProducts = (myItems || []).filter(p => p.id !== id && p.status === 'AVAILABLE');
  const suggestionsProducts = (items || []).filter(p => p.id !== id && p.status === 'AVAILABLE');

  // Méthode appel API du produit par son ID
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  // Méthode pour charger les données associées au produit
  useEffect(() => {
    // Exécution conditionnée par l'existence de l'ID produit uniquement
    if (product?.id) {
      if (product.sellerId) {
        // Optionnel : tu pourrais aussi filtrer directement côté API ici en ajoutant { status: 'AVAILABLE' }
        dispatch(fetchMyProducts(product.sellerId));
      }
      if (product.categoryId) {
        dispatch(fetchProducts({ categoryId: product.categoryId, status: 'AVAILABLE' }));
      }
    }
  }, [product?.id, product?.sellerId, product?.categoryId, dispatch]);

  //Loading et erreur
  if (loading || (!product && !error)) return <PageLoader />;

  if (error || !product) {
    return (
      <main className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-8">
        <p className="text-red text-xl font-inter mb-4">{error || "Produit introuvable"}</p>
        <button onClick={() => navigate(-1)} className="text-white hover:text-red transition-colors underline">
          Retour
        </button>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-black relative pb-12">
      
      <HeaderView 
        title="DÉTAIL DE L'ARTICLE" 
        subtitle="Consulte les informations de ce produit avant de l'ajouter à ton sac."
        heightClass="h-[200px]"
      />

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-[93px] justify-center items-start mt-12 px-8">

        <div className="flex flex-col w-full max-w-[595px]">
          <ProductImg product={product} />

          <SimilarProduct
            title={isOwner ? "Vos autres articles en ligne" : "Dressing du membre"}
            products={dressingProducts}
            limit={2}
          />
          <SimilarProduct
            title="Suggestions"
            products={suggestionsProducts}
            limit={4}
          />
        </div>

        <div className="w-full max-w-[653px] lg:sticky lg:top-12">
          <ProductInfos product={product} isOwner={isOwner} />
        </div>

      </div>
    </main>
  );
}