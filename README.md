# JavaScript - Memory

## Webbsida

[GitHub Pages](https://jhn322.github.io/memory/)

[Netlify](https://jhn-memory.netlify.app/)

## Spelregler

- En spelare flippar ett kort och memorerar värdet. Samma spelare flippar ett nytt kort. Om de båda korten har lika värde erhåller spelaren paret - eller en viss poäng. Om de båda flippade korten inte är lika, vänds korten tillbaka och nästa spelare får försöka på nytt.

## Generera spelyta

Utgå från `<div id="game-area">` och lägger till antalet element dynamiskt med `document.createElement('div')`. Varje element i sig behöver representeras av ett värde, exempelvis av en array. För varje spelomgång behöver spelplanen "shufflas" (använd dig Math.random())

## Exempelbild

![From Memory Game - Vanilla JavaScript](https://github.com/chasacademy-sandra-larsson/js--memory-game/blob/main/memory-game.gif)
