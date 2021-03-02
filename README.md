# Kalkulačka půjček pro První vlaštovku
## O kalkulačce
Kalkulačka je napsaná v Reactu a umožňuje uživateli vybrat si vlastnosti půjčky a podle nich půjčku spočítat. Zároveň je možné přímo z kalkulačky nabídku na půjčku odeslat na server. 

## Deployment

### Produkční prostředí
Je potřeba nastavit adresu API, na kterou budou posílány nabídky a hCaptcha sitekey. To lze udělat vytvořením souboru `.env.production` v kořenovém adresáři projektu. Jeho obsah by měl vypadat nějak takhle:
```
REACT_APP_API_URL=/api
REACT_APP_HCAPTCHA_SITEKEY=10000000-ffff-ffff-ffff-000000000001
```

### Build
`npm run build`

Buildne aplikaci pro produkční prostředí do adresáře `build`.

Více v React [dokumentaci](https://facebook.github.io/create-react-app/docs/deployment).

## Development
Aplikace bude zkoušet posílat nabídky na `/api`, kde očekává server, který je ale v jiném repositáři. Pro testování serveru je potřeba změnit `REACT_APP_API_URL` vytvořením souboru `.env.development.local` a nastevením adresy v něm.

### Spuštění
`npm start`

Spustí aplikaci ve vývojovém režimu.