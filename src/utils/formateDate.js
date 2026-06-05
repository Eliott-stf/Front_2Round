// src/utils/formateDate.js
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

//on déclere nos const

/**
 * Formate une date en temps relatif (ex: "il y a 2 heures")
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function getRelativeTime(date) {
    if (!date) return '';
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
}

/**
 * Formate une date en format heure:minute (ex: "14:30")
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function formatTimeHHMM(date) {
    if (!date) return '';
    return format(new Date(date), "HH:mm");
}

/**
 * Formate une date en format long en français (ex: "12 mai 2026")
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function formatLongDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
/**
 * Formate une date en format français court (ex: "12/05/2026")
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function formatDateLocaleFR(date) {
    if (!date) return 'Date inconnue';
    return new Date(date).toLocaleDateString('fr-FR');
}

/**
 * Formate une date et heure numérique en français (ex: "12/05/2026 14:30")
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function formatDateTimeNumeric(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formate une date de transaction avec l'heure (ex: "12 mai 2026, 14:30")
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function formatTransactionDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formate une date et heure au format complet (ex: "12 mai 2026 à 14:30")
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function formatFullDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
