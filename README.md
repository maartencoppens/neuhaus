# Neuhaus AI

Neuhaus AI is een React + Vite applicatie waarmee een gebruiker op basis van smaakvoorkeuren een pralinebox samenstelt. De app gebruikt OpenRouter om voorkeuren te interpreteren en een korte uitleg te genereren voor de gekozen box.

## Functionaliteit

- Smaakvoorkeuren verzamelen via een chatflow
- Pralines matchen op basis van tags en smaakprofielen
- Een pralinebox samenstellen en aanpassen
- Een korte AI-uitleg genereren voor de gekozen box

## Installatie

1. Installeer de dependencies:

```bash
npm install
```

2. Kopieer de voorbeeldomgeving en vul de credentials in:

```bash
cp .env.example .env
```

3. Start de ontwikkelserver:

```bash
npm run dev
```

4. Open de lokale URL die Vite toont in je browser.

## Credentials

De app heeft één credential nodig:

- `VITE_OPENROUTER_API_KEY`: je OpenRouter API key

Deze key wordt gebruikt in `src/helpers/openrouter.js` voor twee AI-aanroepen:

- het omzetten van antwoorden naar vaste smaaktags
- het genereren van een korte toelichting bij de pralinebox

Voorbeeld:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Configurator

De configurator van deze app wordt beheerd met Zustand in `src/store/usePralineStore.js`.

De store bewaart onder andere:

- de chatberichten en antwoorden
- de huidige vraagindex in de flow
- de gegenereerde smaaklabels
- de samengestelde pralinebox
- de geselecteerde praline en het vervangscherm
- de gegenereerde uitleg van de box

De chatpagina schrijft de voorkeuren weg naar de store. Daarna gebruiken de box-overview en checkout dezelfde state om de selectie en samenstelling van de pralinebox consistent te houden.

## Projectstructuur

- `src/pages` - pagina's zoals Home, Chat, BoxOverview en Checkout
- `src/helpers` - logica voor pralinematching en OpenRouter-integratie
- `src/store` - Zustand state voor de pralinebox en voorkeuren
- `src/data` - lokale data en vraagflow
- `src/style` - globale en pagina-specifieke styling
