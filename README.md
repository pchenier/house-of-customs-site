# HOC — House of Customs

Export autonome du site et dossier de reprise, 27 septembre 2026.

## Lancer le site

Python 3 suffit, aucune installation de dépendances :

```bash
python3 -m http.server 8000 --directory dist
```

Puis ouvrir http://localhost:8000 . Sur Windows, utiliser `python` si nécessaire.
Servir par HTTP plutôt que d'ouvrir directement les fichiers HTML : les aperçus canvas chargent des images locales.

## Héberger ailleurs

Publier le contenu du dossier `dist` sur un hébergement statique. Pas de build, de framework, de serveur applicatif ou de clé API nécessaire. Le dossier `.openai` est uniquement la configuration de l'hébergement Sites d'origine ; il n'est pas requis ailleurs.

## Fichiers principaux

- `dist/index.html` : accueil garage avec photo plein hero, services et choix du build.
- `dist/porsche-911.html` et `dist/golf-r.html` : configurateurs actuellement fonctionnels.
- `dist/configurator.js` et `dist/golf-configurator.js` : rendu canvas, couleurs, angles, pièces et volants.
- `dist/shop.html` et `dist/shop.js` : catalogue de concepts, filtres, panier de soumission.
- `dist/garage.js` : dialogue de demande, récapitulatif, panier temporaire et téléchargement TXT.
- `dist/garage.css` : identité actuelle et mise en page responsive. Les anciens styles sont aussi chargés ; conserver leur ordre jusqu'à une consolidation volontaire.
- `dist/*.png`, `dist/*.ttf` : images et polices locales nécessaires.
- `HANDOFF.md` : état précis et prochaines tâches.
- `UNITRONIC-RESEARCH.md` : recherches commencées et liens officiels.
- `work-in-progress/audi-s3-preview-sheet.png` : planche générée non intégrée et non validée pour une fidélité automobile exacte.

## État de l'export

Source publiée : commit `453ea60cbd233a62046ce5c7b7613fd651cbed4e`.
Site d'origine : https://house-of-customs-hoc.doctorpoe.chatgpt.site

L'export reprend les fichiers de ce commit, sans historique Git, jeton ou identifiants de connexion. Les notes et la planche de travail sont ajoutées séparément. Les PNG sont conservés dans leur qualité d'origine.

## Limites existantes

Ce site n'est pas encore une boutique transactionnelle. Les articles sont des options de design, pas un inventaire réel. Aucun paiement, stock, prix de vente ou envoi de courriel n'est branché. Les demandes se téléchargent en TXT et ne sont pas transmises. Le panier est un brouillon temporaire dans sessionStorage. Les aperçus sont 2D, pas des modèles 3D à 360°.
