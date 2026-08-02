# Memory Game

Een interactieve Memory Game gemaakt met HTML, CSS en JavaScript. Het doel van het spel is om alle gelijke kaartparen te vinden met zo weinig mogelijk zetten.

## Functionaliteiten

- Kaarten worden automatisch willekeurig geschud.
- Verschillende moeilijkheidsniveaus:
  - Makkelijk: 4 paren
  - Normaal: 6 paren
  - Moeilijk: 10 paren
  - Extreem moeilijk: 14 paren
- Teller voor het aantal zetten.
- Timer die start zodra de speler de eerste kaart omdraait.
- Beste score per moeilijkheidsniveau wordt opgeslagen in de browser.
- Geluidseffecten bij kaart omdraaien, juiste match en winst.
- Win-popup met eindresultaat.
- Mogelijkheid om het spel opnieuw te starten.
- Responsive design voor desktop, tablet en smartphone.

## Gebruikte technologieën

- HTML
- CSS
- JavaScript
- LocalStorage
- Audio-bestanden

## Bestandsstructuur

```text
Memory_game/
├── index.html
├── style.css
├── script.js
└── sound/
    ├── flip.mp3
    ├── match.mp3
    └── victory.mp3