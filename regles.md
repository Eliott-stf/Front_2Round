# RÈGLES DE CODAGE & ARCHITECTURE (2ROUND)

**⚠️ Ce document doit être lu et appliqué de manière stricte avant CHAQUE nouvelle implémentation.**

---

## 1. COMMENTAIRES OBLIGATOIRES
Il est **strictement interdit** de coder sans commentaires. Chaque fichier, composant, ou fonction doit être documenté avec des commentaires `//`.
Les commentaires doivent utiliser le wording spécifique suivant pour conserver la cohérence avec le reste du projet :

- **Hooks** : `//on récup le hook`
- **States & Variables d'état** : `//on déclare nos state`
- **Constantes locales / de confort** : `//on déclare nos const de confort` ou `//on déclere nos const`
- **Méthodes / Appels API** : `//Méthode pour récup les donne de L'API`
- **Gestion du chargement et des erreurs** : `//loading et erreur`
- **Conditions / Sécurité** : `//Vérif....` (ex: `//Vérif que l'utilisateur est bien connecté`)

## 2. GESTION DES CONSTANTES
Toutes les constantes globales (listes, données statiques, menus, configurations de texte, rôles, etc.) doivent être stockées dans **`AppConstant`** (`src/constants/appConstant.js`).
Aucune constante globale ne doit traîner "en dur" dans les composants.

## 3. CHEMINS D'API
Si un chemin racine ou une constante d'API doit être défini, utiliser **`API_ROOT`** (depuis `apiConstant` ou le fichier de configuration d'API équivalent).

## 4. PHASE DE RÉFLEXION LOGIQUE & ARCHITECTURE
Avant d'écrire la moindre ligne de code pour une nouvelle fonctionnalité, **une réflexion logique poussée est OBLIGATOIRE**.
Il faut passer au peigne fin :
- Toutes les routes possibles.
- La logique métier et les cas extrêmes (Edge cases).
- La sécurité (ex: *"Est-ce qu'un admin a le droit de se bannir lui-même ?" -> NON -> Gérer cette logique*).

**L'implémentation bête et méchante est interdite.** Chaque étape du code doit être justifiée par une réflexion préalable sur la sécurité, l'UX et la cohérence de l'architecture.

## 5. FACTORISATION ET COMPOSANTS
Il faut **factoriser au maximum** le code et créer des composants de manière intelligente.
La vue principale (le fichier "Screen" ou "View") doit servir uniquement d'**orchestrateur**.
- Par exemple, pour afficher une liste d'utilisateurs, la vue orchestre les données et appelle un composant de liste (ex: `UserList.jsx`), qui lui-même appelle un composant enfant pour chaque itération (ex: `UserCard.jsx` ou `UserRow.jsx`).
- Les composants enfants doivent être rangés dans des sous-dossiers pertinents (ex: `src/components/Admin/User/`).

## 6. BASE DE DONNÉES & MIGRATIONS
- **Interdiction formelle** de modifier le schéma Prisma (`schema.prisma`) ou d'exécuter des migrations sans en avoir parlé explicitement avec l'utilisateur au préalable.

## 7. GESTION DES SLICES REDUX
- **Avant de rajouter une méthode** (thunk, reducer, action) dans un Slice Redux, il faut impérativement vérifier s'il n'y a pas déjà une méthode existante qui réalise la même action ou qui retourne les mêmes données.

## 8. NETTOYAGE DU CODE MORT / INUTILE
- **Après chaque modification ou refactorisation**, il faut impérativement vérifier si des variables, fonctions, constantes ou imports ne sont plus utilisés nulle part dans le fichier ou le projet. Si c'est le cas, il faut obligatoirement les supprimer pour éviter d'encombrer le codebase.

## 9. FORMATAGE DES DATES
- **Tout formatage de DATE** doit obligatoirement être défini dans un fichier utilitaire unique : `src/utils/formateDate.js` (ou importé via `@utils/formateDate`).
- **Aucune méthode de formatage de date** ne doit être implémentée directement à l'intérieur d'un composant `.jsx`.
- **Avant d'implémenter** une nouvelle méthode de formatage de date, il est impératif de vérifier si elle n'a pas déjà été créée dans `formateDate.js`. Si c'est le cas, il faut la réutiliser. Sinon, on peut y ajouter la nouvelle méthode et l'exporter.


