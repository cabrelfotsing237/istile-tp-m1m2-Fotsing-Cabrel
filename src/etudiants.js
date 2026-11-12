// Import du fichier JSON contenant les étudiants.
import etudiants from '../data/etudiants.json' with { type: 'json' };

// Transforme la liste brute en objets plus simples à afficher dans l'interface.
export function afficherEtudiants(liste = etudiants) {
  return liste.map((etudiant) => ({
    id: etudiant.id,
    nomComplet: `${etudiant.prenom} ${etudiant.nom}`,
    email: etudiant.email,
    filiere: etudiant.filiere,
    niveau: etudiant.niveau,
    note: etudiant.note
  }));
}

// Liste complète des étudiants prêts à être affichés.
export const tousLesEtudiants = afficherEtudiants();

// Génère le rendu HTML des étudiants dans le conteneur du DOM.
export function renderEtudiants(container, liste = tousLesEtudiants) {
  if (!container) return;

  const sixPremiers = liste.slice(0, 6);

  container.innerHTML = sixPremiers
    .map(
      (etudiant) => `
        <article class="etudiant">
          <h3>${etudiant.nomComplet}</h3>
          <p><strong>Email :</strong> ${etudiant.email}</p>
          <p><strong>Filière :</strong> ${etudiant.filiere}</p>
          <p><strong>Niveau :</strong> ${etudiant.niveau}</p>
          <p><strong>Note :</strong> ${etudiant.note}</p>
        </article>
      `
    )
    .join('');
}

/**
 * Calcule la moyenne générale des notes d'une liste d'étudiants.
 * @param {Array} liste - Liste des étudiants.
 * @returns {number} La moyenne arrondie à 2 décimales.
 */
export function moyenneGenerale(liste) {
  if (!Array.isArray(liste) || liste.length === 0) return 0;

  const total = liste.reduce((somme, etudiant) => somme + Number(etudiant.note || 0), 0);
  return Number((total / liste.length).toFixed(2));
}

/**
 * Filtre les étudiants admis : note >= 10.
 * @param {Array} liste - Liste des étudiants.
 * @returns {Array} Nouvelle liste des étudiants admis.
 */
export function admis(liste) {
  return liste.filter((etudiant) => Number(etudiant.note) >= 10);
}

/**
 * Formate les noms sous la forme "NOM prénom".
 * Le nom est mis en majuscules.
 * @param {Array} liste - Liste des étudiants.
 * @returns {Array} Tableau de chaînes formatées.
 */
export function nomsFormates(liste) {
  return liste.map((etudiant) => `${etudiant.nom.toUpperCase()} ${etudiant.prenom}`);
}

/**
 * Compte le nombre d'étudiants par filière.
 * @param {Array} liste - Liste des étudiants.
 * @returns {Object} Objet de type { "Informatique": 4, ... }.
 */
export function effectifParFiliere(liste) {
  return liste.reduce((compteur, etudiant) => {
    const filiere = etudiant.filiere;
    compteur[filiere] = (compteur[filiere] || 0) + 1;
    return compteur;
  }, {});
}

/**
 * Calcule la moyenne des notes par filière.
 * @param {Array} liste - Liste des étudiants.
 * @returns {Object} Objet de type { "Informatique": 12.5, ... }.
 */
export function moyenneParFiliere(liste) {
  const groupes = {};

  liste.forEach((etudiant) => {
    const filiere = etudiant.filiere;

    if (!groupes[filiere]) {
      groupes[filiere] = [];
    }

    groupes[filiere].push(Number(etudiant.note || 0));
  });

  const resultat = {};

  for (const filiere in groupes) {
    const total = groupes[filiere].reduce((somme, note) => somme + note, 0);
    resultat[filiere] = Number((total / groupes[filiere].length).toFixed(2));
  }

  return resultat;
}

/**
 * Classe les étudiants par note décroissante.
 * @param {Array} liste - Liste des étudiants.
 * @returns {Array} Nouvelle liste triée.
 */
export function classementParNote(liste) {
  return [...liste].sort((a, b) => Number(b.note) - Number(a.note));
}

/**
 * Met à jour la note d'un étudiant donné.
 * La fonction crée une nouvelle liste ; elle ne modifie pas la liste originale.
 * @param {Array} liste - Liste des étudiants.
 * @param {number} id - Identifiant de l'étudiant à modifier.
 * @param {number} note - Nouvelle note.
 * @returns {Array} Nouvelle liste avec la note mise à jour.
 */
export function majNote(liste, id, note) {
  return liste.map((etudiant) =>
    etudiant.id === id
      ? { ...etudiant, note: Number(note) }
      : { ...etudiant }
  );
}
