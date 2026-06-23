# 2EMME Cleaning - File riscritti da capo

Questa cartella contiene i file puliti e semplificati.

## 1. Apps Script backend

File:

```text
apps-script/Code.gs
```

Dove va:

```text
Google Sheet > Estensioni > Apps Script > Code.gs
```

In questo file NON devi incollare l'URL /exec.

## 2. Mobile app

File:

```text
mobile/index.html
```

Qui l'URL del backend è già inserito in alto:

```js
const BACKEND_URL = "https://script.google.com/macros/s/AKfycbwnXtCVV8BD_5xiItJqZ1YjKqTZCzqvUds2r_tzNVZeWqIJBRERcZtn2mZJKkgmdMHq/exec";
```

## 3. Dashboard admin

File:

```text
admin/index.html
```

Qui l'URL del backend è già inserito in alto:

```js
const BACKEND_URL = "https://script.google.com/macros/s/AKfycbwnXtCVV8BD_5xiItJqZ1YjKqTZCzqvUds2r_tzNVZeWqIJBRERcZtn2mZJKkgmdMHq/exec";
```

## 4. Config opzionale

File:

```text
config.json
```

Serve solo per repository/documentazione. Non devi incollarlo dentro Apps Script.

## Google Sheet

```text
https://docs.google.com/spreadsheets/d/1chEViDrAke793wJZIILx_NVrnheOgRZSTAE6X0CBTFw/edit
```

## Backend Apps Script

```text
https://script.google.com/macros/s/AKfycbwnXtCVV8BD_5xiItJqZ1YjKqTZCzqvUds2r_tzNVZeWqIJBRERcZtn2mZJKkgmdMHq/exec
```

## Test

```text
https://script.google.com/macros/s/AKfycbwnXtCVV8BD_5xiItJqZ1YjKqTZCzqvUds2r_tzNVZeWqIJBRERcZtn2mZJKkgmdMHq/exec?action=ping
https://script.google.com/macros/s/AKfycbwnXtCVV8BD_5xiItJqZ1YjKqTZCzqvUds2r_tzNVZeWqIJBRERcZtn2mZJKkgmdMHq/exec?action=mobile
https://script.google.com/macros/s/AKfycbwnXtCVV8BD_5xiItJqZ1YjKqTZCzqvUds2r_tzNVZeWqIJBRERcZtn2mZJKkgmdMHq/exec?action=dashboard
https://script.google.com/macros/s/AKfycbwnXtCVV8BD_5xiItJqZ1YjKqTZCzqvUds2r_tzNVZeWqIJBRERcZtn2mZJKkgmdMHq/exec?action=syncSmoobu
```
