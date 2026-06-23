# 2EMME Cleaning™

**Mobile Housekeeping & Safety Platform**  
Sistema operativo interno per gestione pulizie, checklist, scorte, registro legionella, segnalazioni, compliance e pianificazione interventi per gli alloggi gestiti da **2EMME RE & Consulting**.

---

## Panoramica

**2EMME Cleaning™** è una piattaforma operativa per coordinare il lavoro delle addette alle pulizie e del property manager.

Il sistema è composto da:

1. **Mobile App per addetti**
   - interventi assegnati;
   - checklist guidata per fasi;
   - verifica obbligatoria scorte staff;
   - verifica obbligatoria scorte ospiti;
   - segnalazioni rapide con flag;
   - gestione turni in coppia;
   - registro legionella quando previsto.

2. **Dashboard Desktop Amministratore**
   - pianificazione turni;
   - assegnazione addetti;
   - lettura interventi;
   - controllo segnalazioni;
   - registro legionella;
   - scorte;
   - compliance e manutenzioni;
   - sincronizzazione Smoobu;
   - KPI operativi.

3. **Google Sheet come database**
   - fogli strutturati per turni, interventi, registro legionella, compliance, scorte, segnalazioni, prenotazioni Smoobu e conferme team.

4. **Google Apps Script come backend**
   - API `doGet`;
   - API `doPost`;
   - sincronizzazione calendari Smoobu;
   - validazione chiusura interventi;
   - aggiornamento dashboard;
   - trigger automatici.

---

## Obiettivo del progetto

L’obiettivo è trasformare la gestione delle pulizie da processo manuale a processo strutturato, tracciabile e verificabile.

Il sistema deve garantire:

- pulizie documentate;
- scorte sempre verificate;
- registro legionella separato;
- segnalazioni immediate;
- controllo degli alloggi da mobile;
- vista amministrativa desktop;
- storico completo su Google Sheet;
- riduzione contestazioni;
- migliore controllo qualità;
- supporto alle compliance periodiche.

---

## Architettura

```text
+---------------------------+
| Mobile App Addetti        |
| HTML / JS mobile-first    |
+-------------+-------------+
              |
              | doPost / doGet
              v
+---------------------------+
| Google Apps Script        |
| Backend API               |
+-------------+-------------+
              |
              | read/write
              v
+---------------------------+
| Google Sheet Database     |
| 2EMME Cleaning            |
+-------------+-------------+
              ^
              | read/write
+-------------+-------------+
| Dashboard Desktop Admin   |
| HTML / JS desktop-first   |
+---------------------------+

External input:
+---------------------------+
| Smoobu Google Calendars   |
| import.calendar.google    |
+---------------------------+
              |
              v
+---------------------------+
| syncSmoobuCalendars()     |
+---------------------------+
```

---

## File principali del repository

```text
2emme-cleaning/
├── README.md
├── apps-script/
│   └── Code.gs
├── mobile/
│   ├── index.html
│   └── assets/
├── admin/
│   ├── index.html
│   └── assets/
├── sheet/
│   └── 2EMME_Cleaning_Google_Sheet_Template.xlsx
└── docs/
    ├── setup.md
    ├── privacy.md
    └── data-model.md
```

---

## Google Sheet database

Google Sheet nativo operativo:

```text
2EMME Cleaning - Database Operativo
```

URL:

```text
https://docs.google.com/spreadsheets/d/1chEViDrAke793wJZIILx_NVrnheOgRZSTAE6X0CBTFw
```

Fogli previsti:

- `Dashboard`
- `Turni`
- `Interventi`
- `Segnalazioni`
- `RegistroLegionella`
- `Scorte`
- `PrenotazioniSmoobu`
- `Compliance`
- `ConfermeTeam`
- `Config`
- `ChecklistTemplate`
- `Alloggi`
- `Addetti`

---

## Apps Script backend

File principale:

```text
apps-script/Code.gs
```

Funzioni principali:

| Funzione | Scopo |
|---|---|
| `setup2emmeCleaning()` | crea/normalizza fogli e intestazioni |
| `syncSmoobuCalendars()` | importa prenotazioni dai calendari Smoobu |
| `createDefaultCompliancePlan()` | crea compliance periodiche |
| `doGet(e)` | API lettura |
| `doPost(e)` | API scrittura |
| `createTriggers()` | crea trigger automatici |
| `saveIntervento_()` | salva intervento e valida chiusura |
| `saveRegistroLegionella_()` | salva registro legionella |
| `saveSegnalazione_()` | salva segnalazione |
| `saveScorte_()` | salva verifiche scorte |
| `saveConfermaTeam_()` | salva conferma “effettuata da altro addetto” |

---

## Mobile App addetti

La mobile app è pensata per utilizzo da smartphone durante l’intervento.

Funzioni:

- login addetto;
- elenco interventi assegnati;
- dettaglio ospite/prenotazione;
- checklist per fasi;
- scorte staff obbligatorie;
- scorte ospite obbligatorie;
- procedura legionella se prevista;
- segnalazioni rapide;
- foto opzionale o obbligatoria dove prevista;
- conferma “effettuata da altro addetto” nei turni in coppia;
- blocco chiusura se mancano step obbligatori.

---

## Dashboard Desktop amministratore

La dashboard desktop è dedicata al property manager/coordinatore.

Funzioni:

- vista KPI;
- pianificazione turni;
- assegnazione addette;
- verifica interventi chiusi;
- controllo interventi bloccati;
- gestione registro legionella;
- gestione segnalazioni;
- gestione compliance;
- gestione scorte;
- sincronizzazione Smoobu;
- controllo turni in coppia.

---

## Moduli principali

### Turni

Gestisce gli interventi programmati per ogni alloggio.

Campi principali:

- ID turno;
- data;
- ora inizio/fine;
- alloggio;
- tipo intervento;
- procedura legionella prevista;
- addetto 1;
- addetto 2;
- turno in coppia;
- ospite;
- prenotazione;
- check-in/check-out;
- stato turno.

---

### Interventi

Registra la chiusura operativa dell’intervento.

Include:

- chi ha compilato la checklist;
- chi ha confermato se la checklist è stata effettuata da altro addetto;
- esito finale;
- scorte staff verificate;
- scorte ospiti verificate;
- sicurezza verificata;
- legionella completata se prevista;
- stato chiusura;
- payload JSON completo.

---

### Segnalazioni

Ogni voce della checklist può generare una segnalazione.

Flag disponibili:

- mancante;
- aperto / sigillo rotto;
- danneggiato;
- incompleto;
- scaduto;
- quantità insufficiente;
- non verificabile;
- foto necessaria.

Non sono previsti campi testo lunghi per l’addetta: il sistema usa flag rapidi per velocizzare l’operatività mobile.

---

### Scorte

La verifica scorte è obbligatoria a ogni intervento.

Sono previste due macro-categorie:

- **Scorte materiali staff**
- **Scorte ospiti**

La chiusura dell’intervento è bloccata se una delle due verifiche non viene eseguita.

---

### Registro Legionella

Modulo separato dalla checklist.

Registra:

- alloggio;
- operatore;
- ospite;
- numero prenotazione;
- flussaggio acqua calda;
- pulizia rompigetto;
- pulizia soffione doccia;
- decalcificazione;
- disinfezione clorata;
- finestre aperte durante flussaggio;
- esito;
- prossima verifica suggerita.

---

### Compliance

Modulo amministrativo per pianificare e tracciare le attività periodiche.

Include:

- prelievo annuale acqua / analisi legionella;
- svuotamento caldaia / boiler;
- manutenzione estintori;
- controllo rilevatori CO / CO2;
- controllo rilevatori fumo;
- verifica kit primo soccorso;
- altre attività di sicurezza.

---

### Smoobu Calendar Sync

Sincronizza prenotazioni e blocchi dai calendari Google importati da Smoobu.

Calendari mappati:

| Alloggio | Calendar ID |
|---|---|
| Masotto Terrace View | `p5l54n483tgdd1m1sab84823hr628aal@import.calendar.google.com` |
| The NoLo Heritage | `b2l655umb7pteg0qipfd2fvh9kdlcfu0@import.calendar.google.com` |
| The NoLo Nest | `47t9rhttt459anqg6ueudkufk98v9i75@import.calendar.google.com` |
| The NoLo Studio | `lc5a2sdpn7urqkvhbnvcu7b4jmqi3i2j@import.calendar.google.com` |
| The NoLo Suite | `3u9918h52i0001phaqmmgs5f158ha2d2@import.calendar.google.com` |

---

## Flussi operativi

### Flusso standard addetta

```text
1. Login mobile
2. Seleziona intervento
3. Verifica dati ospite/prenotazione
4. Completa checklist pulizia
5. Verifica sicurezza
6. Verifica scorte materiali staff
7. Verifica scorte ospiti
8. Esegue procedura legionella se prevista
9. Segnala eventuali problemi con flag
10. Chiude intervento
11. Invio dati al Google Sheet
```

---

### Flusso turno in coppia

```text
1. Il turno è assegnato a due addette
2. Una sola addetta compila la checklist completa
3. L’altra seleziona “Effettuata da altro addetto”
4. Il sistema registra chi ha compilato e chi ha confermato
5. L’amministratore vede eventuali incongruenze
```

---

### Flusso amministratore

```text
1. Apre dashboard desktop
2. Controlla KPI
3. Pianifica turni
4. Assegna addette
5. Verifica segnalazioni aperte
6. Controlla registro legionella
7. Controlla compliance in scadenza
8. Chiude o segnala manutenzioni
```

---

## Checklist e blocco chiusura intervento

La chiusura dell’intervento deve essere consentita solo se:

- checklist pulizia completata;
- sicurezza verificata;
- scorte materiali staff verificate;
- scorte ospite verificate;
- procedura legionella completata se prevista;
- eventuali segnalazioni hanno almeno un flag selezionato;
- nei turni in coppia è chiaro chi ha compilato e chi ha confermato.

Se manca uno di questi elementi, lo stato intervento diventa:

```text
Bloccato
```

In caso positivo:

```text
Chiuso
```

---

## Setup rapido

### 1. Preparare Google Sheet

Aprire il Google Sheet:

```text
https://docs.google.com/spreadsheets/d/1chEViDrAke793wJZIILx_NVrnheOgRZSTAE6X0CBTFw
```

### 2. Aprire Apps Script

Da Google Sheet:

```text
Estensioni > Apps Script
```

### 3. Incollare lo script

Copiare il contenuto di:

```text
apps-script/Code.gs
```

dentro l’editor Apps Script.

### 4. Eseguire setup

Dall’editor Apps Script eseguire:

```javascript
setup2emmeCleaning()
```

### 5. Sincronizzare Smoobu

Eseguire:

```javascript
syncSmoobuCalendars()
```

### 6. Creare trigger

Eseguire:

```javascript
createTriggers()
```

---

## Deploy Apps Script

Passaggi:

1. Aprire Apps Script.
2. Cliccare su `Deploy`.
3. Selezionare `New deployment`.
4. Tipo: `Web app`.
5. Execute as: `Me`.
6. Who has access: `Anyone with the link`.
7. Cliccare `Deploy`.
8. Copiare il Web App URL.

Il Web App URL dovrà essere configurato dentro:

- mobile app;
- dashboard admin;
- eventuali automazioni esterne.

---

## Esempi API

### GET ping

```text
GET <WEB_APP_URL>?action=ping
```

Risposta:

```json
{
  "success": true,
  "app": "2EMME Cleaning",
  "timestamp": "2026-06-23 18:00:00"
}
```

---

### GET dati mobile

```text
GET <WEB_APP_URL>?action=mobile
```

Restituisce:

- turni;
- checklist template;
- alloggi;
- addetti.

---

### GET dashboard

```text
GET <WEB_APP_URL>?action=dashboard
```

Restituisce:

- KPI;
- turni;
- segnalazioni;
- registro legionella;
- compliance.

---

### POST intervento

```json
{
  "action": "saveIntervento",
  "TurnoId": "TURN-001",
  "Alloggio": "Masotto Terrace View",
  "Operatore": "Maria Guadalupe Hernández de Alfaro",
  "ChecklistPuliziaCompletata": true,
  "ScorteStaffVerificate": true,
  "ScorteOspitiVerificate": true,
  "SicurezzaVerificata": true,
  "LegionellaPrevista": true,
  "LegionellaCompletata": true,
  "TeamShift": true,
  "ChecklistExecutionMode": "Compilo io",
  "ChecklistCompiledBy": "Maria Guadalupe Hernández de Alfaro"
}
```

---

### POST conferma team

```json
{
  "action": "saveConfermaTeam",
  "TurnoId": "TURN-001",
  "Alloggio": "Masotto Terrace View",
  "AddettoConfermante": "Carmen Hernández",
  "ChecklistEffettuataDaAltroAddetto": true,
  "ChecklistCompiledBy": "Maria Guadalupe Hernández de Alfaro",
  "TipoConferma": "Effettuata da altro addetto"
}
```

---

### POST registro legionella

```json
{
  "action": "saveRegistroLegionella",
  "TurnoId": "TURN-001",
  "InterventoId": "INT-001",
  "Alloggio": "Masotto Terrace View",
  "Operatore": "Maria Guadalupe Hernández de Alfaro",
  "ProceduraPrevista": true,
  "FlussaggioAcquaCalda5Min": true,
  "RompigettoPuliti": true,
  "SoffioneDocciaPulito": true,
  "DecalcificazioneEseguita": true,
  "DisinfezioneClorataEseguita": true,
  "FinestreAperteDuranteFlussaggio": true,
  "Esito": "OK"
}
```

---

## Sicurezza e privacy

Il sistema può trattare:

- nominativi ospiti;
- dati prenotazione;
- dati addette;
- indirizzi alloggi;
- registri operativi;
- segnalazioni;
- eventuali foto;
- scadenze sicurezza.

Regole consigliate:

- non esporre email ospiti alle addette se non necessario;
- non esporre prezzi prenotazione;
- non esporre note pagamento;
- usare Google Drive/Sheet con permessi limitati;
- evitare Web App pubbliche senza token in produzione;
- cambiare il valore `WEBHOOK_SECRET` nel foglio `Config`;
- implementare un controllo token nelle chiamate `doPost`;
- non salvare PIN o credenziali nel codice frontend;
- conservare foto e documenti in cartelle Drive con accesso ristretto;
- definire tempi di conservazione dati;
- aggiornare il registro trattamenti privacy.

---

## Limitazioni attuali

- L’autenticazione addetti lato frontend è basilare e non sostituisce un login sicuro.
- Google Sheet è adatto a una prima versione operativa, non a volumi elevati.
- Le foto non sono ancora caricate automaticamente su Drive nella versione base.
- Le notifiche WhatsApp sono da collegare tramite servizio esterno o link manuale.
- Il numero prenotazione non è presente nei calendari Smoobu importati; quando assente viene indicato come `Non presente nel Calendar`.
- La Web App Apps Script, se pubblica, deve essere protetta con token o restrizioni.

---

## Roadmap

### Versione 1.0

- Mobile app addette
- Dashboard admin
- Google Sheet database
- Apps Script backend
- Registro legionella
- Compliance
- Scorte
- Segnalazioni
- Smoobu sync

### Versione 1.1

- Upload foto su Google Drive
- Firma digitale addetta
- PDF report intervento
- Notifiche WhatsApp automatiche
- Alert email admin
- Ruoli e permessi più granulari

### Versione 1.2

- Generazione automatica turni da check-out Smoobu
- Dashboard KPI avanzata
- SLA pulizie
- Storico per alloggio
- Esportazione registro legionella PDF
- Archivio documentale compliance

### Versione 2.0

- Backend dedicato
- Database SQL
- Login sicuro
- PWA installabile
- Multi-property management
- API PMS/channel manager

---

## Copyright

```text
© 2026 2EMME RE & Consulting
2EMME Cleaning™
Housekeeping • Inventory • Safety • Compliance
Tutti i diritti riservati.
```

Il progetto è destinato a uso interno di 2EMME RE & Consulting.  
La distribuzione, copia o riutilizzo da parte di terzi richiede autorizzazione scritta.

---

## Maintainer

**2EMME RE & Consulting**  
Responsabile operativo: Matteo Masella  
Progetto: **2EMME Cleaning™**
