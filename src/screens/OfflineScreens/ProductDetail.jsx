// src/screens/OnlineScreens/ProductDetail.jsx
import ProductImg from '@components/Product/ProductImg';
import SimilarProduct from '@components/Product/SimilarProduct';
import PageLoader from '@components/Loader/PageLoader';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchMyProducts, fetchProducts } from '@store/product/productSlice';
import ProductInfos from '@components/Product/ProductInfos';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { 
    current: product, 
    myItems = [], 
    items = [], 
    loading, 
    error 
  } = useSelector(state => state.products);

  useEffect(() => {
    if (id) {
      console.log("1. Fetch produit principal ID:", id);
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      console.log("2. Produit reçu:", product);
      if (product.sellerId) {
        console.log("3. Fetch dressing sellerId:", product.sellerId);
        dispatch(fetchMyProducts(product.sellerId));
      }
      if (product.categoryId) {
        console.log("4. Fetch suggestions categoryId:", product.categoryId);
        dispatch(fetchProducts({ categoryId: product.categoryId }));
      }
    }
  }, [product, dispatch]);

  console.log("5. Store myItems (Brut):", myItems);
  console.log("6. Store items (Brut):", items);

  if (loading && !product) return <PageLoader />;
  
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

  // Sécurisation avec chaînage optionnel au cas où le state ne renvoie pas un tableau valide
  const dressingProducts = (myItems || []).filter(p => p.id !== id);
  const suggestionsProducts = (items || []).filter(p => p.id !== id);

  console.log("7. dressingProducts (Filtré):", dressingProducts);
  console.log("8. suggestionsProducts (Filtré):", suggestionsProducts);

  return (
    <main className="w-full min-h-screen bg-black relative py-12 px-8">
      
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-12 left-[183px] text-white hover:text-red transition-colors z-20"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-[93px] justify-center items-start mt-[100px]">
        
        <div className="flex flex-col w-full max-w-[595px]">
          <ProductImg product={product} />
          
          <SimilarProduct 
            title="Dressing du membre" 
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
          <ProductInfos product={product} />
        </div>

      </div>
    </main>
  );
}