// Import des fonctions de chargement depuis le fichier charger.js.
import { chargerUtilisateurs, chargerUtilisateur } from './charger.js';

// Exemple d’utilisation : récupération de données et affichage dans la console.
(async () => {
  const utilisateurs = await chargerUtilisateurs(3);
  console.log('Utilisateurs chargés :', utilisateurs);

  const utilisateur = await chargerUtilisateur(999999);
  console.log('Résultat utilisateur :', utilisateur);
})();
