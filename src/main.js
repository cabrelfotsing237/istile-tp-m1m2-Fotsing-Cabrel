import { chargerUtilisateurs, chargerUtilisateur } from './charger.js';

(async () => {
  const utilisateurs = await chargerUtilisateurs(3);
  console.log('Utilisateurs chargés :', utilisateurs);

  const utilisateur = await chargerUtilisateur(999999);
  console.log('Résultat utilisateur :', utilisateur);
})();
