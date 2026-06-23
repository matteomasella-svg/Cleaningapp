# 2EMME Cleaning - Netlify Deploy

Questa versione è pronta per Netlify.

## Struttura corretta

```text
2emme-cleaning-netlify/
├── index.html
├── netlify.toml
├── config.json
├── mobile/
│   └── index.html
├── admin/
│   └── index.html
└── apps-script/
    └── Code.gs
```

## Su Netlify

Impostazioni:

```text
Build command: lascia vuoto
Publish directory: .
```

## URL dopo deploy

```text
https://TUO-SITO.netlify.app/
https://TUO-SITO.netlify.app/mobile/
https://TUO-SITO.netlify.app/admin/
```

## Backend

```text
https://script.google.com/macros/s/AKfycbwnXtCVV8BD_5xiItJqZ1YjKqTZCzqvUds2r_tzNVZeWqIJBRERcZtn2mZJKkgmdMHq/exec
```

## Test

```text
https://script.google.com/macros/s/AKfycbwnXtCVV8BD_5xiItJqZ1YjKqTZCzqvUds2r_tzNVZeWqIJBRERcZtn2mZJKkgmdMHq/exec?action=ping
```
