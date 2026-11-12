# Réponses

1. Pour /users/1 : la méthode est `GET`. Le type de contenu de la réponse est `application/json; charset=utf-8`. Deux champs du JSON sont `id` et `firstName` (ou `lastName`, `email`, etc.).

2. Pour /users/999999 : le code obtenu est `404 Not Found`. L’interface doit afficher un message du type « Utilisateur introuvable » et ne pas laisser l’utilisateur continuer une action qui dépend de cet élément.

3. Côté client : (a), (d). Côté serveur : (b), (c), (e).

4. - `201` : ressource créée avec succès → afficher un message de confirmation / redirection.
   - `401` : non autorisé / pas connecté → afficher un message d’authentification ou de session expirée.
   - `404` : ressource introuvable → afficher un message « introuvable » ou une page d’erreur.
   - `500` : erreur serveur → afficher un message générique de réessai plus tard.
