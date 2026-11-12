# FOTSING KENGNI Cabrel Herman

Ce projet consiste à créer un petit annuaire des étudiants de l'ISTILE.  
Il remplace les tableaux papier par une interface simple et rapide à consulter.  
Le site permet de retrouver les informations essentielles des étudiants en quelques clics.

## Installation

```bash
npm install
```

## Lancer le projet

Comme le projet utilise des modules ES et un fichier JSON importé, il doit être servi via un serveur local.

```bash
python3 -m http.server 8001
```

Ensuite, ouvrez dans le navigateur :

```text
http://localhost:8001/index.html
```

## Note

Ne pas ouvrir directement le fichier HTML avec `file:///...` car les imports ES peuvent ne pas fonctionner correctement dans ce mode.
