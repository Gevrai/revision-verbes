# revision-verbes
Simple web app pour réviser les conjugaisons de verbes à la manière de flash cards.

Utilise l'API de [verbe.cc](http://verbe.cc) pour la recherche des conjugaisons. Voir [bretttolbert/verbecc-svc](https://github.com/bretttolbert/verbecc-svc) pour plus d'informations.

Déployé sur heroku à [verbes.herokuapp.com](https://verbes.herokuapp.com/)

# Version locale

```
git clone https://github.com/Gevrai/revision-verbes
cd revision-verbes
npm start
firefox localhost:8000
```

# TODO

  - Améliorer UI
    * Light/Dark mode toggle ?
    * Tester sur plus d'appareils
  - Ajouter fonction pour choisir certains temps de verbes à étudier seulement.
  - Créer une API personnelle n'utilisant plus [verbe.cc](http://verbe.cc)
