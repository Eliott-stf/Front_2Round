import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAttributes,
    createAttribute,
    updateAttribute,
    deleteAttribute,
    clearAttributeError
} from '@store/attribute/attributeSlice';
import PageLoader from '@components/Loader/PageLoader';
import HeaderAdmin from '@components/Admin/UI/HeaderAdmin';
import AttributeList from '@components/Admin/Attribute/AttributeList';
import AttributeForm from '@components/Admin/Attribute/AttributeForm';

const AdminAttributes = () => {
    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos state
    const { items: attributes, loading, error } = useSelector((state) => state.attributes);
    const [type, setType] = useState('size_glove');
    const [value, setValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        dispatch(fetchAttributes());
        return () => {
            dispatch(clearAttributeError());
        };
    }, [dispatch]);

    //on déclare nos const de confort
    const listAttributes = attributes || [];

    //Méthode pour réinitialiser le formulaire
    const resetForm = () => {
        setType('size_glove');
        setValue('');
        setIsEditing(false);
        setEditId(null);
        dispatch(clearAttributeError());
    };

    //Méthode pour charger un attribut en mode édition
    const handleStartEdit = (attr) => {
        setType(attr.type);
        setValue(attr.value);
        setIsEditing(true);
        setEditId(attr.id);
        setDeleteConfirmId(null);
        dispatch(clearAttributeError());
    };

    //Méthode pour soumettre le formulaire (création ou modification)
    const handleSubmit = (e) => {
        e.preventDefault();

        //Vérif que les champs requis sont saisis
        if (!value.trim()) return;

        const payload = {
            type,
            value: value.trim()
        };

        if (isEditing) {
            dispatch(updateAttribute({ id: editId, data: payload })).then((res) => {
                if (!res.error) {
                    resetForm();
                    dispatch(fetchAttributes());
                }
            });
        } else {
            dispatch(createAttribute(payload)).then((res) => {
                if (!res.error) {
                    resetForm();
                    dispatch(fetchAttributes());
                }
            });
        }
    };

    //Méthode pour supprimer un attribut
    const handleDelete = (id) => {
        dispatch(deleteAttribute(id)).then(() => {
            setDeleteConfirmId(null);
            dispatch(fetchAttributes());
        });
    };

    //loading et erreur
    if (loading && listAttributes.length === 0) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-6 md:gap-8">
            <HeaderAdmin
                title="Attributs de Taille"
                subtitle="Gérer les valeurs d'attributs de taille utilisables sur le catalogue."
            />

            {/* Layout responsive mobile-first : colonnes empilées par défaut, grille sur grand écran */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                {/* Liste des attributs (2/3 de large sur desktop, premier sur mobile) */}
                <div className="lg:col-span-2 bg-[#111] border border-[#222] rounded-lg p-4 md:p-6 order-2 lg:order-1">
                    <h3 className="font-bebas text-xl md:text-2xl tracking-wider text-white mb-4 md:mb-6">Valeurs existantes</h3>

                    <AttributeList
                        attributes={listAttributes}
                        onEdit={handleStartEdit}
                        onDelete={handleDelete}
                        deleteConfirmId={deleteConfirmId}
                        setDeleteConfirmId={setDeleteConfirmId}
                    />
                </div>

                {/* Formulaire (1/3 de large sur desktop, second sur mobile) */}
                <div className="bg-[#111] border border-[#222] rounded-lg p-4 md:p-6 flex flex-col gap-4 md:gap-6 h-fit lg:sticky lg:top-24 order-1 lg:order-2">
                    <div>
                        <h3 className="font-bebas text-xl md:text-2xl tracking-wider text-white">
                            {isEditing ? 'Modifier l\'attribut' : 'Créer un attribut'}
                        </h3>
                        <p className="font-inter text-xs text-[#888] mt-1">
                            {isEditing ? 'Éditez la valeur de taille sélectionnée.' : 'Ajoutez une nouvelle option de taille.'}
                        </p>
                    </div>

                    {error && (
                        <div className="text-red font-inter text-sm text-center bg-red/10 border border-red/20 py-3 px-4 rounded-lg break-words">
                            {error}
                        </div>
                    )}

                    <AttributeForm
                        type={type}
                        setType={setType}
                        value={value}
                        setValue={setValue}
                        isEditing={isEditing}
                        onSubmit={handleSubmit}
                        onCancel={resetForm}
                        loading={loading}
                    />
                </div>

            </div>
        </div>
    );
};

export default AdminAttributes;
