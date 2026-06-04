import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '@store/product/productSlice';
import { fetchCategories } from '@store/category/categorySlice';
import { ChevronDown } from 'lucide-react';
import {
    CATALOGUE_PRICES,
    PRODUCT_CONDITIONS,
    SIZES_CLOTHING,
    SIZES_GLOVES,
    SIZES_SHOES
} from '@constants/appConstant';

export default function CatalogueFilters() {

    // On récupère les hooks
    const dispatch = useDispatch();

    // On récupère nos datas Redux
    const { filters } = useSelector((state) => state.products);
    const { items: categories = [] } = useSelector((state) => state.categories || { items: [] });

    // Charger les catégories au montage si elles sont vides
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    // On déclare nos méthodes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        if (name === 'categoryId') {
            dispatch(setFilters({ [name]: value, size: '' }));
        } else if (name === 'price') {
            // Récupération des valeurs min et max définies dans appConstant
            const selectedPrice = CATALOGUE_PRICES.find(p => p.value === value);
            if (selectedPrice) {
                dispatch(setFilters({ 
                    price: value, // Conservation pour l'affichage UI
                    minPrice: selectedPrice.minPrice, 
                    maxPrice: selectedPrice.maxPrice 
                }));
            } else {
                dispatch(setFilters({ price: '', minPrice: '', maxPrice: '' }));
            }
        } else {
            dispatch(setFilters({ [name]: value }));
        }
    };

    const handleClearFilters = () => {
        dispatch(resetFilters());
    };

    const categoryOptions = useMemo(() => {
        return categories.map((cat) => ({
            value: cat.id,
            label: cat.name
        }));
    }, [categories]);

    const sizeOptions = useMemo(() => {
        if (!filters.categoryId) return [];

        const selectedCategory = categories.find(cat => cat.id === filters.categoryId);
        if (!selectedCategory) return SIZES_CLOTHING;

        const categoryName = selectedCategory.name.toLowerCase();

        if (categoryName.includes('gant')) return SIZES_GLOVES;
        if (categoryName.includes('chaussure')) return SIZES_SHOES;
        
        return SIZES_CLOTHING;
    }, [filters.categoryId, categories]);

    const FilterSelect = ({ label, name, options, value, disabled = false }) => (
        <div className={`relative group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <select
                name={name}
                value={value || ''}
                onChange={handleFilterChange}
                disabled={disabled}
                className={`appearance-none bg-transparent border border-[#555555] text-white font-bebas text-lg tracking-widest rounded-full pl-6 pr-10 py-1.5 outline-none transition-colors ${disabled ? 'pointer-events-none' : 'cursor-pointer hover:border-white'}`}
            >
                <option value="" className="bg-[#111] text-white">{label}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#111] text-white">
                        {opt.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none group-hover:text-red transition-colors" />
        </div>
    );

    return (
        <div className="w-full border-b border-t border-[#2f2f2f] relative bg-black">
            <div className="absolute inset-0 bg-pattern-overlay pointer-events-none z-0"></div>

            <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col gap-6 relative z-10">

                <div className="flex flex-wrap items-center gap-4">
                    <FilterSelect
                        label="CATÉGORIE"
                        name="categoryId"
                        value={filters.categoryId}
                        options={categoryOptions}
                    />

                    <FilterSelect
                        label="TAILLE"
                        name="size"
                        value={filters.size}
                        options={sizeOptions}
                        disabled={!filters.categoryId}
                    />

                    <FilterSelect
                        label="ÉTAT"
                        name="condition"
                        value={filters.condition}
                        options={PRODUCT_CONDITIONS}
                    />

                    <FilterSelect
                        label="PRIX"
                        name="price"
                        value={filters.price}
                        options={CATALOGUE_PRICES}
                    />
                </div>

                <button
                    onClick={handleClearFilters}
                    className="text-red font-inter text-xs tracking-widest uppercase hover:text-white transition-colors w-fit outline-none"
                >
                    Effacer les filtres.
                </button>
            </div>
        </div>
    );
}