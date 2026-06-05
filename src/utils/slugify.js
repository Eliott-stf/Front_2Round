/**
 * Convertit une chaîne de caractères en slug propre pour le SEO
 * @param {string} text Texte à slugifier
 * @returns {string} Le slug formaté
 */
export const slugify = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        // Supprime les accents
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Remplace les caractères non-alphanumériques par des tirets
        .replace(/[^a-z0-9]+/g, '-') 
        // Enlève les tirets en début et fin de chaîne
        .replace(/(^-|-$)+/g, ''); 
};
