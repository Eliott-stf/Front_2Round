import ProductImg from '@components/Product/ProductImg';
import SimilarProduct from '@components/Product/SimilarProduct';
import PageLoader from '@components/Loader/PageLoader';
import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchMyProducts, fetchProducts } from '@store/product/productSlice';
import ProductInfos from '@components/Product/ProductInfos';
import { useAuthContext } from '@contexts/AuthContext';
import HeaderView from '@components/UI/HeaderView';
import { slugify } from '@/utils/slugify';
import { API_ROOT } from '@constants/apiConstant';

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
    <main className="w-full min-h-screen bg-black relative pb-12 overflow-x-hidden">

      <HeaderView
        title="DÉTAIL DE L'ARTICLE"
        subtitle="Consulte les informations de ce produit avant de l'ajouter à ton sac."
        heightClass="h-[120px] md:h-[200px]"
      />

      <div className="max-w-[1300px] mx-auto flex flex-col gap-12 mt-6 md:mt-12 px-4 md:px-8">

        {/* Top Section: Image and Details */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[93px] justify-center items-center lg:items-start w-full">

          {/* Left Column: Image and Pack Info */}
          <div className="flex flex-col w-full max-w-[595px] mx-auto lg:mx-0">
            <ProductImg product={product} />

            {product.isPack && product.subProducts?.length > 0 && (
              <div className="mt-6 md:mt-10 bg-[#111] border border-[#222] p-4 md:p-6 rounded-2xl flex flex-col gap-4 md:gap-5">
                <h3 className="font-bebas text-xl md:text-2xl text-white tracking-wider uppercase">
                  Articles inclus dans ce lot
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.subProducts.map(subProd => {
                    const subImg = subProd.medias?.[0]?.path;
                    const subUrl = subImg
                      ? (subImg.startsWith('http') ? subImg : `${API_ROOT}${subImg}`)
                      : '/images/placeholder.jpg';
                    return (
                      <Link
                        key={subProd.id}
                        to={`/product/${slugify(subProd.title)}-${subProd.id}`}
                        className="flex items-center gap-4 bg-black border border-[#222] p-3 hover:border-white transition-all rounded-xl hover:scale-[1.02]"
                      >
                        <img
                          src={subUrl}
                          alt={subProd.title}
                          className="w-14 h-14 object-cover bg-[#111] rounded"
                        />
                        <div className="flex flex-col min-w-0 font-inter">
                          <span className="text-white text-xs font-bold truncate uppercase">{subProd.title}</span>
                          <span className="text-[10px] text-gray-light uppercase mt-0.5">{subProd.size} - {subProd.condition}</span>
                          <span className="text-white text-xs font-semibold mt-1">{subProd.price}€</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Info & CTA Panel */}
          <div className="w-full max-w-[653px] mx-auto lg:mx-0 lg:sticky lg:top-12">
            <ProductInfos product={product} isOwner={isOwner} />
          </div>

        </div>

        {/* Bottom Section: Dressing and Suggestions */}
        <div className="flex flex-col w-full max-w-full">
          <SimilarProduct
            title={isOwner ? "Vos autres articles en ligne" : "Dressing du membre"}
            products={dressingProducts}
            limit={10}
          />
          <SimilarProduct
            title="Suggestions"
            products={suggestionsProducts}
            limit={10}
          />
        </div>

      </div>
    </main>
  );
}