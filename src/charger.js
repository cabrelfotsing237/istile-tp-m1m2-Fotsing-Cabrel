// Charge plusieurs utilisateurs depuis l'API DummyJSON.
export async function chargerUtilisateurs(limit = 5, base = "https://dummyjson.com") {
  try {
    const reponse = await fetch(`${base}/users?limit=${limit}`);

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP: ${reponse.status}`);
    }

    const donnees = await reponse.json();
    return donnees.users;
  } catch (erreur) {
    console.error("Erreur lors du chargement des utilisateurs:", erreur);
    return [];
  }
}

// Charge un seul utilisateur selon son identifiant.
export async function chargerUtilisateur(id, base = "https://dummyjson.com") {
  try {
    const reponse = await fetch(`${base}/users/${id}`);

    if (!reponse.ok) {
      throw new Error(`Utilisateur introuvable (id: ${id})`);
    }

    const donnees = await reponse.json();
    return donnees;
  } catch (erreur) {
    console.error("Erreur lors du chargement de l'utilisateur:", erreur);
    return null;
  }
}
