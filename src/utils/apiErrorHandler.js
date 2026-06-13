/**
 * Extrait le message d'erreur d'une réponse de l'API (Wretch/NestJS).
 * Si plusieurs erreurs de validation sont renvoyées par class-validator,
 * on récupère la première pour l'afficher à l'utilisateur.
 * 
 * @param {Error} error - L'erreur renvoyée par le catch
 * @param {string} defaultMessage - Le message par défaut si l'erreur n'est pas parsable
 * @returns {string} Le message d'erreur formaté
 */
export const handleApiError = (error, defaultMessage = "Une erreur est survenue") => {
    console.error("API error caught:", error);
    
    // Si l'erreur est renvoyée sous forme de string JSON par Wretch
    if (error?.message && typeof error.message === 'string') {
        try {
            const parsed = JSON.parse(error.message);
            if (parsed.message) {
                // NestJS renvoie un tableau pour les erreurs de validation
                return Array.isArray(parsed.message) ? parsed.message[0] : parsed.message;
            }
        } catch (e) {
            // L'erreur n'est pas un JSON valide, on l'ignore 
        }
        
        // Si c'est un message texte natif HTTP mais pas trop générique
        if (error.message !== "Bad Request" && error.message !== "Conflict") {
            return error.message;
        }
    }
    
    // Si Wretch a déjà parsé l'erreur dans l'objet json
    if (error?.json?.message) {
        const msg = error.json.message;
        return Array.isArray(msg) ? msg[0] : msg;
    }
    
    return defaultMessage;
};
