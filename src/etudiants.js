import etudiants from '../data/etudiants.json' with { type: 'json' };

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

export const tousLesEtudiants = afficherEtudiants();

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

export function moyenneGenerale(liste) {
  if (!Array.isArray(liste) || liste.length === 0) return 0;

  const total = liste.reduce((somme, etudiant) => somme + Number(etudiant.note || 0), 0);
  return Number((total / liste.length).toFixed(2));
}

export function admis(liste) {
  return liste.filter((etudiant) => Number(etudiant.note) >= 10);
}

export function nomsFormates(liste) {
  return liste.map((etudiant) => `${etudiant.nom.toUpperCase()} ${etudiant.prenom}`);
}

export function effectifParFiliere(liste) {
  return liste.reduce((compteur, etudiant) => {
    const filiere = etudiant.filiere;
    compteur[filiere] = (compteur[filiere] || 0) + 1;
    return compteur;
  }, {});
}

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

export function classementParNote(liste) {
  return [...liste].sort((a, b) => Number(b.note) - Number(a.note));
}

export function majNote(liste, id, note) {
  return liste.map((etudiant) =>
    etudiant.id === id
      ? { ...etudiant, note: Number(note) }
      : { ...etudiant }
  );
}
