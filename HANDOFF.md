# Reprise du projet HOC

## Brief du propriétaire

HOC = House of Customs, garage de mécanique, wraps et installation de pièces custom. Site en anglais, échanges avec propriétaire en français québécois. Identité sombre, professionnelle, orange accent, visuels automobile/atelier. Beaucoup de CTA « Get a quote », dont un fixe sur mobile. L'accueil utilise la photo d'atelier comme fond complet du hero avec texte superposé.

Ne pas réintroduire les numéros décoratifs de sections ou les slogans énumérés avec des slashs. L'utilisateur a demandé leur suppression partout. Ne pas réintroduire les options « Interior color » ou « Wheel color » : il les trouvait laides. Conserver la personnalisation du volant.

## Déjà fait et publié

Accueil garage, services, boutique avec filtres et panier de soumission, configurateurs Porsche 911 et Golf R Mk7. Aperçus avant/arrière et volants cuir, carbone et Alcantara. Couleur de carrosserie, dessins de jantes, front lip, diffuseur et embouts d'échappement. Le rendu efface le canvas avant chaque changement d'angle pour éviter les superpositions. Les feux rouges ne doivent pas changer lors du changement de wrap.

## Demande active NON terminée

Créer un seul configurateur avec un sélecteur de véhicule. Quand le client choisit sa marque/modèle/génération, la bonne auto et les bonnes options doivent apparaître.

Modèles demandés : Audi A3, S3, RS3 ; Volkswagen Golf GTI et Golf R ; Porsche Macan, 911, Panamera et Cayenne.

Première intention de générations pour les nouveaux visuels (choix de travail, pas une validation utilisateur) : A3/S3/RS3 berlines 8V facelift, Golf GTI Mk7, Macan 95B facelift, Panamera 971 et Cayenne 9Y0. Les modèles exacts, moteurs, années et marchés doivent être distingués avant d'afficher une compatibilité de tune.

Ajouter des tunes avec prix et puissance/couple stock et après tune, à partir de https://www.getunitronic.com/ . Les recherches sont commencées dans UNITRONIC-RESEARCH.md. Rien de cela n'est encore intégré ni publié. Ne pas confondre mention de marque dans le footer Unitronic et disponibilité d'un logiciel pour ce modèle. Ne pas appliquer les chiffres d'un moteur à tous les véhicules portant le même nom.

## Visuel de travail récupéré

`work-in-progress/audi-s3-preview-sheet.png` : 1536×1024, quatre panneaux égaux. Haut gauche : avant ; haut droite : arrière ; bas gauche : avant custom ; bas droite : arrière custom. Carrosserie bleue pour recoloration sélective, fond studio sombre. Planche générée conceptuelle, contrôler les badges et détails avant utilisation. Les six autres nouvelles planches demandées ne sont pas présentes dans cet export. Ne pas affirmer qu'elles sont prêtes.

## Structure suggérée pour la suite

1. Créer `vehicles` et `tunes` comme données séparées. Identifiants stables par génération/moteur, URLs sources et date de vérification.
2. Ajouter le sélecteur commun sans casser les deux configurateurs existants ; idéalement mutualiser progressivement leur logique.
3. Préparer les images spécifiques des sept modèles supplémentaires, sans réutiliser une Golf pour représenter une Audi.
4. Ne proposer que les modifications ayant un aperçu réellement disponible. Si un pack change plusieurs pièces simultanément, le nommer comme un pack.
5. Ajouter les tunes vérifiées dans le configurateur et la boutique. Préciser devise, carburant, moteur, millésimes, matériel requis et périmètre du prix. Les données constructeur ne garantissent pas le résultat d'une voiture donnée.
6. Conserver le choix du véhicule, les pièces et la tune dans le récapitulatif de soumission.
7. Brancher une vraie réception des demandes : adresse HOC et service d'envoi encore inconnus. Ne pas simuler un succès d'envoi. Prévoir un backend si stockage ou envoi direct.
8. Remplacer le catalogue de concepts par les vraies références, prix et photos fournisseur quand disponibles. Ne pas inventer de partenariat APR/Unitronic ou de statut revendeur.

## Vérification utile

Tester chaque véhicule et chaque angle, les changements rapides de véhicule, la persistance des choix pertinents, les couleurs sans teinter les feux, la soumission incluant le build, les filtres du shop et le mobile 390 px sans débordement.

## Prompt à donner au prochain outil

« Lis README.md, HANDOFF.md et UNITRONIC-RESEARCH.md. Préserve le branding HOC et les fonctions publiées. Continue la demande active : un configurateur commun avec Audi A3/S3/RS3, VW Golf GTI/R, Porsche Macan/911/Panamera/Cayenne, et des tunes dont prix et specs sont vérifiés sur Unitronic. Ne prétends pas que les nouveaux modèles ou tunes sont déjà implémentés. Utilise les images locales, distingue génération/moteur et devise, et relie tous les choix au récapitulatif de soumission. »
