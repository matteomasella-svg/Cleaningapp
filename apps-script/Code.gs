/**
 * 2EMME Cleaning - Apps Script Backend
 * Versione pulita / riscritta
 * © 2026 2EMME RE & Consulting
 *
 * DOVE VA QUESTO FILE:
 * Google Sheet > Estensioni > Apps Script > Code.gs
 *
 * IMPORTANTE:
 * Qui NON devi inserire l'URL della Web App.
 * Questo file È il backend. L'URL /exec va invece nei file HTML mobile/admin.
 */

// =======================
// CONFIGURAZIONE BACKEND
// =======================

const SPREADSHEET_ID = '1chEViDrAke793wJZIILx_NVrnheOgRZSTAE6X0CBTFw';
const TZ = 'Europe/Rome';

const SHEETS = {
  DASHBOARD: 'Dashboard',
  TURNI: 'Turni',
  INTERVENTI: 'Interventi',
  SEGNALAZIONI: 'Segnalazioni',
  REGISTRO_LEGIONELLA: 'RegistroLegionella',
  SCORTE: 'Scorte',
  PRENOTAZIONI_SMOOBU: 'PrenotazioniSmoobu',
  COMPLIANCE: 'Compliance',
  CONFERME_TEAM: 'ConfermeTeam',
  CONFIG: 'Config',
  CHECKLIST_TEMPLATE: 'ChecklistTemplate',
  ALLOGGI: 'Alloggi',
  ADDETTI: 'Addetti'
};

const HEADERS = {
  Dashboard: ['KPI', 'Valore', 'UltimoAggiornamento'],
  Alloggi: ['AlloggioId', 'NomeAlloggio', 'NomeCommerciale', 'Indirizzo', 'CalendarioSmoobuId', 'Attivo', 'Note'],
  Addetti: ['AddettoId', 'Nome', 'Ruolo', 'Telefono', 'Email', 'Attivo'],
  Turni: ['TurnoId', 'DataTurno', 'OraInizio', 'OraFine', 'Alloggio', 'TipoIntervento', 'ProceduraLegionellaPrevista', 'Addetto1', 'Addetto2', 'TeamShift', 'PrenotazioneId', 'Ospite', 'NumeroPrenotazione', 'CheckIn', 'CheckOut', 'Canale', 'StatoTurno', 'ChecklistObbligatoria', 'ScorteStaffObbligatorie', 'ScorteOspitiObbligatorie', 'CreatoIl', 'AggiornatoIl', 'Note'],
  Interventi: ['InterventoId', 'TurnoId', 'DataOraInvio', 'Alloggio', 'TipoIntervento', 'Operatore', 'ChecklistExecutionMode', 'ChecklistCompiledBy', 'ChecklistConfirmedBy', 'TeamShift', 'NeedsCompilerLog', 'ChecklistPuliziaCompletata', 'ScorteStaffVerificate', 'ScorteOspitiVerificate', 'SicurezzaVerificata', 'LegionellaPrevista', 'LegionellaCompletata', 'StatoChiusura', 'Esito', 'NumeroSegnalazioni', 'PayloadJson'],
  Segnalazioni: ['SegnalazioneId', 'TurnoId', 'InterventoId', 'DataOra', 'Alloggio', 'Fase', 'VoceChecklist', 'Operatore', 'FlagMancante', 'FlagApertoSigilloRotto', 'FlagDanneggiato', 'FlagIncompleto', 'FlagScaduto', 'FlagQuantitaInsufficiente', 'FlagNonVerificabile', 'FlagFotoNecessaria', 'Priorita', 'Stato', 'PayloadJson'],
  RegistroLegionella: ['RegistroId', 'TurnoId', 'InterventoId', 'DataOra', 'Alloggio', 'Operatore', 'ChecklistCompiledBy', 'Ospite', 'NumeroPrenotazione', 'ProceduraPrevista', 'FlussaggioAcquaCalda5Min', 'RompigettoPuliti', 'SoffioneDocciaPulito', 'DecalcificazioneEseguita', 'DisinfezioneClorataEseguita', 'FinestreAperteDuranteFlussaggio', 'Esito', 'Segnalazioni', 'ProssimoControlloSuggerito', 'PayloadJson'],
  Scorte: ['ScortaId', 'DataOra', 'TurnoId', 'InterventoId', 'Alloggio', 'TipoScorta', 'Articolo', 'QuantitaStandard', 'QuantitaRilevata', 'OK', 'Mancante', 'ApertoSigilloRotto', 'Danneggiato', 'Incompleto', 'Scaduto', 'QuantitaInsufficiente', 'NonVerificabile', 'Operatore', 'Stato', 'PayloadJson'],
  PrenotazioniSmoobu: ['PrenotazioneId', 'CalendarioId', 'EventoId', 'Alloggio', 'Ospite', 'NumeroPrenotazione', 'Canale', 'TipoEvento', 'CheckIn', 'CheckOut', 'Notti', 'Adulti', 'Stato', 'Location', 'UltimoSync', 'HashEvento', 'DescrizioneSanificata'],
  Compliance: ['ComplianceId', 'Alloggio', 'Categoria', 'Attivita', 'Descrizione', 'Ricorrenza', 'DataUltimaEsecuzione', 'DataScadenza', 'Responsabile', 'Fornitore', 'Stato', 'Priorita', 'EsitoUltimoControllo', 'DocumentoUrl', 'FotoUrl', 'CreatoIl', 'AggiornatoIl', 'Note'],
  ConfermeTeam: ['ConfermaId', 'TurnoId', 'InterventoId', 'DataOra', 'Alloggio', 'AddettoConfermante', 'ChecklistEffettuataDaAltroAddetto', 'ChecklistCompiledBy', 'TipoConferma', 'Stato', 'PayloadJson'],
  Config: ['Chiave', 'Valore', 'Descrizione'],
  ChecklistTemplate: ['TemplateId', 'Fase', 'Ordine', 'Voce', 'Descrizione', 'Obbligatoria', 'Categoria', 'RichiedeScorteStaff', 'RichiedeScorteOspiti', 'RichiedeLegionella', 'ConsentiSegnalazione', 'FlagDisponibili', 'Attiva']
};

const SMOOBU_CALENDARS = [
  { alloggio: 'Masotto Terrace View', calendarId: 'p5l54n483tgdd1m1sab84823hr628aal@import.calendar.google.com' },
  { alloggio: 'The NoLo Heritage', calendarId: 'b2l655umb7pteg0qipfd2fvh9kdlcfu0@import.calendar.google.com' },
  { alloggio: 'The NoLo Nest', calendarId: '47t9rhttt459anqg6ueudkufk98v9i75@import.calendar.google.com' },
  { alloggio: 'The NoLo Studio', calendarId: 'lc5a2sdpn7urqkvhbnvcu7b4jmqi3i2j@import.calendar.google.com' },
  { alloggio: 'The NoLo Suite', calendarId: '3u9918h52i0001phaqmmgs5f158ha2d2@import.calendar.google.com' }
];

const ALLOGGI = [
  ['MASOTTO', 'Masotto Terrace View', 'Masotto Terrace View - Bright & Quiet', 'Via Umberto Masotto, 4, 20133 Milano (MI)'],
  ['HERITAGE', 'The NoLo Heritage', 'The NoLo Heritage - Authentic & Charming', 'Via Termopili, 29, 20127 Milano (MI)'],
  ['NEST', 'The NoLo Nest', 'The NoLo Nest - Compact & Smart', 'Via Bassano del Grappa, 32, 20127 Milano (MI)'],
  ['STUDIO', 'The NoLo Studio', 'The NoLo Studio - Urban & Sleek', 'Via Giorgio Chavez, 1, 20131 Milano (MI)'],
  ['SUITE', 'The NoLo Suite', 'The NoLo Suite - Space & Comfort', 'Via Bassano del Grappa, 32, 20127 Milano (MI)']
];

const ADDETTI = [
  ['ADD-001', 'Maria Guadalupe Hernández de Alfaro', 'Addetta Pulizie'],
  ['ADD-002', 'Carmen Hernández', 'Addetta Pulizie'],
  ['ADM-001', 'Amministratore', 'Coordinatore']
];

// =======================
// UTILITY
// =======================

function ss_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function now_() {
  return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');
}

function today_() {
  return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
}

function id_(prefix) {
  return prefix + '-' + Utilities.getUuid().slice(0, 8).toUpperCase();
}

function toJson_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

function yes_(value) {
  return value === true || String(value).toUpperCase() === 'SI' || String(value).toLowerCase() === 'true' ? 'SI' : '';
}

function ensureSheet_(name) {
  const ss = ss_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);

  const headers = HEADERS[name];
  if (headers && headers.length) {
    const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const needsHeader = headers.some((h, i) => current[i] !== h);

    if (needsHeader) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setFontColor('#ffffff')
        .setBackground('#111827');
      sheet.autoResizeColumns(1, headers.length);
    }
  }

  return sheet;
}

function append_(sheetName, obj) {
  const sh = ensureSheet_(sheetName);
  const headers = HEADERS[sheetName];
  const row = headers.map(h => obj[h] !== undefined ? obj[h] : '');
  sh.appendRow(row);
  return obj;
}

function read_(sheetName) {
  const sh = ss_().getSheetByName(sheetName);
  if (!sh) return [];
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values.shift();
  return values
    .filter(row => row.some(cell => cell !== ''))
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      return obj;
    });
}

function rewrite_(sheetName, rows) {
  const sh = ensureSheet_(sheetName);
  const headers = HEADERS[sheetName];

  if (sh.getLastRow() > 1) {
    sh.getRange(2, 1, sh.getLastRow() - 1, Math.max(sh.getLastColumn(), headers.length)).clearContent();
  }

  if (rows.length) {
    sh.getRange(2, 1, rows.length, headers.length)
      .setValues(rows.map(r => headers.map(h => r[h] !== undefined ? r[h] : '')));
  }
}

function parsePost_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  return JSON.parse(e.postData.contents);
}

// =======================
// SETUP
// =======================

function setup2emmeCleaning() {
  Object.keys(HEADERS).forEach(ensureSheet_);
  seedConfig_();
  seedAlloggi_();
  seedAddetti_();
  seedChecklist_();
  seedCompliance_();
  updateDashboard_();

  return {
    success: true,
    message: 'Setup completato',
    spreadsheetUrl: ss_().getUrl(),
    timestamp: now_()
  };
}

function seedConfig_() {
  rewrite_(SHEETS.CONFIG, [
    { Chiave: 'APP_NAME', Valore: '2EMME Cleaning', Descrizione: 'Nome app' },
    { Chiave: 'VERSION', Valore: '2.0.0', Descrizione: 'Versione schema' },
    { Chiave: 'SPREADSHEET_ID', Valore: SPREADSHEET_ID, Descrizione: 'ID database Google Sheet' }
  ]);
}

function seedAlloggi_() {
  const rows = ALLOGGI.map(a => {
    const cal = SMOOBU_CALENDARS.find(c => c.alloggio === a[1]);
    return {
      AlloggioId: a[0],
      NomeAlloggio: a[1],
      NomeCommerciale: a[2],
      Indirizzo: a[3],
      CalendarioSmoobuId: cal ? cal.calendarId : '',
      Attivo: 'SI',
      Note: ''
    };
  });
  rewrite_(SHEETS.ALLOGGI, rows);
}

function seedAddetti_() {
  const rows = ADDETTI.map(a => {
    return {
      AddettoId: a[0],
      Nome: a[1],
      Ruolo: a[2],
      Telefono: '',
      Email: '',
      Attivo: 'SI'
    };
  });
  rewrite_(SHEETS.ADDETTI, rows);
}

function seedChecklist_() {
  const flag = 'OK|Mancante|Aperto/Sigillo rotto|Danneggiato|Incompleto|Scaduto|Quantita insufficiente|Non verificabile|Foto necessaria';
  const items = [
    ['Fase 1 - Ingresso', 'Chiavi ospite', 'Verificare presenza chiavi ospite.', 'Sicurezza'],
    ['Fase 1 - Ingresso', 'Batteria Ring', 'Verificare/collegare batteria Ring se prevista.', 'Sicurezza'],
    ['Fase 2 - Sicurezza', 'Rilevatore fumo', 'Verificare presenza e funzionamento apparente.', 'Sicurezza'],
    ['Fase 2 - Sicurezza', 'Estintore', 'Verificare presenza, integrita e scadenza/manutenzione.', 'Sicurezza'],
    ['Fase 2 - Sicurezza', 'Kit primo soccorso', 'Verificare presente, integro, completo e non scaduto.', 'Sicurezza'],
    ['Fase 3 - Scorte staff', 'Box materiali pulizia', 'Verifica obbligatoria scorte staff.', 'ScorteStaff'],
    ['Fase 4 - Scorte ospiti', 'Box scorte ospiti', 'Verifica obbligatoria scorte ospiti.', 'ScorteOspiti'],
    ['Fase 5 - Bagno', 'Pulizia bagno', 'Pulizia e igienizzazione completa bagno.', 'Pulizia'],
    ['Fase 6 - Cucina', 'Pulizia cucina', 'Pulizia cucina, stoviglie, frigo, pensili, rifiuti.', 'Pulizia'],
    ['Fase 7 - Camera/Soggiorno', 'Letto e biancheria', 'Rifare letto e gestire biancheria sporca.', 'Pulizia'],
    ['Fase 8 - Alto contatto', 'Disinfezione alto contatto', 'Interruttori, maniglie, telecomandi, rubinetti, NUKI, tavoli.', 'Pulizia'],
    ['Fase 9 - Finali', 'Controlli finali', 'Luci, finestre, utenze, modem, NUKI, chiavi, profumazione.', 'Pulizia'],
    ['Legionella', 'Flussaggio acqua calda', 'Far scorrere acqua calda 5 minuti con finestre aperte.', 'Legionella'],
    ['Legionella', 'Rompigetto e soffione', 'Pulizia/decalcificazione/disinfezione se prevista.', 'Legionella']
  ];

  const rows = items.map((it, i) => {
    return {
      TemplateId: 'CHK-' + String(i + 1).padStart(3, '0'),
      Fase: it[0],
      Ordine: i + 1,
      Voce: it[1],
      Descrizione: it[2],
      Obbligatoria: 'SI',
      Categoria: it[3],
      RichiedeScorteStaff: it[3] === 'ScorteStaff' ? 'SI' : '',
      RichiedeScorteOspiti: it[3] === 'ScorteOspiti' ? 'SI' : '',
      RichiedeLegionella: it[3] === 'Legionella' ? 'SI' : '',
      ConsentiSegnalazione: 'SI',
      FlagDisponibili: flag,
      Attiva: 'SI'
    };
  });

  rewrite_(SHEETS.CHECKLIST_TEMPLATE, rows);
}

function seedCompliance_() {
  const activities = [
    ['Legionella', 'Prelievo annuale acqua / analisi legionella', 'Annuale', 12, 'Alta'],
    ['Legionella', 'Svuotamento caldaia / boiler', 'Semestrale', 6, 'Media'],
    ['Antincendio', 'Manutenzione estintori', 'Semestrale', 6, 'Alta'],
    ['Sicurezza', 'Controllo rilevatore CO/CO2', 'Trimestrale', 3, 'Alta'],
    ['Sicurezza', 'Controllo rilevatore fumo', 'Trimestrale', 3, 'Alta'],
    ['Sicurezza', 'Verifica kit primo soccorso', 'Mensile', 1, 'Media']
  ];

  const rows = [];
  ALLOGGI.forEach(a => {
    activities.forEach(t => {
      rows.push({
        ComplianceId: id_('CMP'),
        Alloggio: a[1],
        Categoria: t[0],
        Attivita: t[1],
        Descrizione: t[1] + ' - ' + a[1],
        Ricorrenza: t[2],
        DataUltimaEsecuzione: '',
        DataScadenza: addMonths_(new Date(), t[3]),
        Responsabile: 'Amministratore',
        Fornitore: '',
        Stato: 'Pianificato',
        Priorita: t[4],
        EsitoUltimoControllo: '',
        DocumentoUrl: '',
        FotoUrl: '',
        CreatoIl: now_(),
        AggiornatoIl: now_(),
        Note: ''
      });
    });
  });

  rewrite_(SHEETS.COMPLIANCE, rows);
}

function addMonths_(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return Utilities.formatDate(d, TZ, 'yyyy-MM-dd');
}

// =======================
// API GET
// =======================

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'ping';

    if (action === 'ping') {
      return toJson_({ success: true, app: '2EMME Cleaning', timestamp: now_() });
    }

    if (action === 'setup') {
      return toJson_(setup2emmeCleaning());
    }

    if (action === 'mobile') {
      return toJson_({
        success: true,
        turni: read_(SHEETS.TURNI),
        checklistTemplate: read_(SHEETS.CHECKLIST_TEMPLATE),
        alloggi: read_(SHEETS.ALLOGGI),
        addetti: read_(SHEETS.ADDETTI),
        timestamp: now_()
      });
    }

    if (action === 'dashboard') {
      updateDashboard_();
      return toJson_({
        success: true,
        dashboard: read_(SHEETS.DASHBOARD),
        turni: read_(SHEETS.TURNI),
        interventi: read_(SHEETS.INTERVENTI),
        segnalazioni: read_(SHEETS.SEGNALAZIONI),
        registroLegionella: read_(SHEETS.REGISTRO_LEGIONELLA),
        scorte: read_(SHEETS.SCORTE),
        prenotazioniSmoobu: read_(SHEETS.PRENOTAZIONI_SMOOBU),
        compliance: read_(SHEETS.COMPLIANCE),
        confermeTeam: read_(SHEETS.CONFERME_TEAM),
        timestamp: now_()
      });
    }

    if (action === 'syncSmoobu') {
      return toJson_(syncSmoobuCalendars());
    }

    if (action === 'sheet') {
      const sheet = e.parameter.sheet;
      return toJson_({ success: true, rows: read_(sheet), timestamp: now_() });
    }

    return toJson_({ success: false, error: 'Azione GET non riconosciuta: ' + action });
  } catch (err) {
    return toJson_({ success: false, error: err.message });
  }
}

// =======================
// API POST
// =======================

function doPost(e) {
  try {
    const data = parsePost_(e);
    const action = data.action;

    if (action === 'upsertTurno') return toJson_(saveTurno_(data));
    if (action === 'saveIntervento') return toJson_(saveIntervento_(data));
    if (action === 'saveSegnalazione') return toJson_(saveSegnalazione_(data));
    if (action === 'saveScorte') return toJson_(saveScorte_(data));
    if (action === 'saveRegistroLegionella') return toJson_(saveRegistroLegionella_(data));
    if (action === 'saveConfermaTeam') return toJson_(saveConfermaTeam_(data));
    if (action === 'closeCompliance') return toJson_(closeCompliance_(data));
    if (action === 'syncSmoobu') return toJson_(syncSmoobuCalendars());

    return toJson_({ success: false, error: 'Azione POST non riconosciuta: ' + action });
  } catch (err) {
    return toJson_({ success: false, error: err.message });
  }
}

function saveTurno_(d) {
  const row = {
    TurnoId: d.TurnoId || d.turnoId || id_('TURN'),
    DataTurno: d.DataTurno || d.dataTurno || today_(),
    OraInizio: d.OraInizio || d.oraInizio || '',
    OraFine: d.OraFine || d.oraFine || '',
    Alloggio: d.Alloggio || d.alloggio || '',
    TipoIntervento: d.TipoIntervento || d.tipoIntervento || 'Pulizia',
    ProceduraLegionellaPrevista: yes_(d.ProceduraLegionellaPrevista || d.legionellaPrevista),
    Addetto1: d.Addetto1 || d.addetto1 || '',
    Addetto2: d.Addetto2 || d.addetto2 || '',
    TeamShift: yes_(d.TeamShift || d.teamShift || !!(d.Addetto2 || d.addetto2)),
    PrenotazioneId: d.PrenotazioneId || d.prenotazioneId || '',
    Ospite: d.Ospite || d.ospite || '',
    NumeroPrenotazione: d.NumeroPrenotazione || d.numeroPrenotazione || '',
    CheckIn: d.CheckIn || d.checkIn || '',
    CheckOut: d.CheckOut || d.checkOut || '',
    Canale: d.Canale || d.canale || '',
    StatoTurno: d.StatoTurno || d.statoTurno || 'Pianificato',
    ChecklistObbligatoria: 'SI',
    ScorteStaffObbligatorie: 'SI',
    ScorteOspitiObbligatorie: 'SI',
    CreatoIl: now_(),
    AggiornatoIl: now_(),
    Note: d.Note || d.note || ''
  };
  append_(SHEETS.TURNI, row);
  updateDashboard_();
  return { success: true, turnoId: row.TurnoId };
}

function saveIntervento_(d) {
  const missing = [];
  if (!d.TurnoId && !d.turnoId) missing.push('TurnoId');
  if (!d.Alloggio && !d.alloggio) missing.push('Alloggio');
  if (!d.Operatore && !d.operatore) missing.push('Operatore');
  if (!yes_(d.ChecklistPuliziaCompletata || d.checklistPuliziaCompletata)) missing.push('ChecklistPuliziaCompletata');
  if (!yes_(d.ScorteStaffVerificate || d.scorteStaffVerificate)) missing.push('ScorteStaffVerificate');
  if (!yes_(d.ScorteOspitiVerificate || d.scorteOspitiVerificate)) missing.push('ScorteOspitiVerificate');
  if (!yes_(d.SicurezzaVerificata || d.sicurezzaVerificata)) missing.push('SicurezzaVerificata');

  const legPrev = yes_(d.LegionellaPrevista || d.legionellaPrevista);
  const legDone = yes_(d.LegionellaCompletata || d.legionellaCompletata);
  if (legPrev && !legDone) missing.push('LegionellaCompletata');

  const row = {
    InterventoId: d.InterventoId || d.interventoId || id_('INT'),
    TurnoId: d.TurnoId || d.turnoId || '',
    DataOraInvio: now_(),
    Alloggio: d.Alloggio || d.alloggio || '',
    TipoIntervento: d.TipoIntervento || d.tipoIntervento || '',
    Operatore: d.Operatore || d.operatore || '',
    ChecklistExecutionMode: d.ChecklistExecutionMode || d.checklistExecutionMode || 'Compilo io',
    ChecklistCompiledBy: d.ChecklistCompiledBy || d.checklistCompiledBy || d.Operatore || d.operatore || '',
    ChecklistConfirmedBy: d.ChecklistConfirmedBy || d.checklistConfirmedBy || '',
    TeamShift: yes_(d.TeamShift || d.teamShift),
    NeedsCompilerLog: yes_(d.NeedsCompilerLog || d.needsCompilerLog),
    ChecklistPuliziaCompletata: yes_(d.ChecklistPuliziaCompletata || d.checklistPuliziaCompletata),
    ScorteStaffVerificate: yes_(d.ScorteStaffVerificate || d.scorteStaffVerificate),
    ScorteOspitiVerificate: yes_(d.ScorteOspitiVerificate || d.scorteOspitiVerificate),
    SicurezzaVerificata: yes_(d.SicurezzaVerificata || d.sicurezzaVerificata),
    LegionellaPrevista: legPrev,
    LegionellaCompletata: legDone,
    StatoChiusura: missing.length ? 'Bloccato' : 'Chiuso',
    Esito: missing.length ? 'Non chiudibile: ' + missing.join(', ') : 'OK',
    NumeroSegnalazioni: d.NumeroSegnalazioni || d.numeroSegnalazioni || 0,
    PayloadJson: JSON.stringify(d)
  };

  append_(SHEETS.INTERVENTI, row);
  updateDashboard_();
  return { success: missing.length === 0, interventoId: row.InterventoId, missing, stato: row.StatoChiusura };
}

function saveSegnalazione_(d) {
  const row = {
    SegnalazioneId: d.SegnalazioneId || d.segnalazioneId || id_('SEG'),
    TurnoId: d.TurnoId || d.turnoId || '',
    InterventoId: d.InterventoId || d.interventoId || '',
    DataOra: now_(),
    Alloggio: d.Alloggio || d.alloggio || '',
    Fase: d.Fase || d.fase || '',
    VoceChecklist: d.VoceChecklist || d.voceChecklist || '',
    Operatore: d.Operatore || d.operatore || '',
    FlagMancante: yes_(d.FlagMancante || d.mancante),
    FlagApertoSigilloRotto: yes_(d.FlagApertoSigilloRotto || d.apertoSigilloRotto),
    FlagDanneggiato: yes_(d.FlagDanneggiato || d.danneggiato),
    FlagIncompleto: yes_(d.FlagIncompleto || d.incompleto),
    FlagScaduto: yes_(d.FlagScaduto || d.scaduto),
    FlagQuantitaInsufficiente: yes_(d.FlagQuantitaInsufficiente || d.quantitaInsufficiente),
    FlagNonVerificabile: yes_(d.FlagNonVerificabile || d.nonVerificabile),
    FlagFotoNecessaria: yes_(d.FlagFotoNecessaria || d.fotoNecessaria),
    Priorita: d.Priorita || d.priorita || 'Media',
    Stato: d.Stato || d.stato || 'Aperta',
    PayloadJson: JSON.stringify(d)
  };
  append_(SHEETS.SEGNALAZIONI, row);
  updateDashboard_();
  return { success: true, segnalazioneId: row.SegnalazioneId };
}

function saveScorte_(d) {
  const items = d.items || d.scorte || [];
  if (!Array.isArray(items) || items.length === 0) return { success: false, error: 'Nessuna scorta ricevuta' };

  items.forEach(item => {
    append_(SHEETS.SCORTE, {
      ScortaId: item.ScortaId || item.scortaId || id_('SCO'),
      DataOra: now_(),
      TurnoId: d.TurnoId || d.turnoId || '',
      InterventoId: d.InterventoId || d.interventoId || '',
      Alloggio: d.Alloggio || d.alloggio || item.Alloggio || item.alloggio || '',
      TipoScorta: item.TipoScorta || item.tipoScorta || d.TipoScorta || d.tipoScorta || '',
      Articolo: item.Articolo || item.articolo || '',
      QuantitaStandard: item.QuantitaStandard || item.quantitaStandard || '',
      QuantitaRilevata: item.QuantitaRilevata || item.quantitaRilevata || '',
      OK: yes_(item.OK || item.ok),
      Mancante: yes_(item.Mancante || item.mancante),
      ApertoSigilloRotto: yes_(item.ApertoSigilloRotto || item.apertoSigilloRotto),
      Danneggiato: yes_(item.Danneggiato || item.danneggiato),
      Incompleto: yes_(item.Incompleto || item.incompleto),
      Scaduto: yes_(item.Scaduto || item.scaduto),
      QuantitaInsufficiente: yes_(item.QuantitaInsufficiente || item.quantitaInsufficiente),
      NonVerificabile: yes_(item.NonVerificabile || item.nonVerificabile),
      Operatore: d.Operatore || d.operatore || '',
      Stato: item.Stato || item.stato || 'Verificata',
      PayloadJson: JSON.stringify(item)
    });
  });

  updateDashboard_();
  return { success: true, inserted: items.length };
}

function saveRegistroLegionella_(d) {
  const row = {
    RegistroId: d.RegistroId || d.registroId || id_('LEG'),
    TurnoId: d.TurnoId || d.turnoId || '',
    InterventoId: d.InterventoId || d.interventoId || '',
    DataOra: now_(),
    Alloggio: d.Alloggio || d.alloggio || '',
    Operatore: d.Operatore || d.operatore || '',
    ChecklistCompiledBy: d.ChecklistCompiledBy || d.checklistCompiledBy || d.Operatore || d.operatore || '',
    Ospite: d.Ospite || d.ospite || '',
    NumeroPrenotazione: d.NumeroPrenotazione || d.numeroPrenotazione || '',
    ProceduraPrevista: yes_(d.ProceduraPrevista || d.proceduraPrevista),
    FlussaggioAcquaCalda5Min: yes_(d.FlussaggioAcquaCalda5Min || d.flussaggioAcquaCalda5Min),
    RompigettoPuliti: yes_(d.RompigettoPuliti || d.rompigettoPuliti),
    SoffioneDocciaPulito: yes_(d.SoffioneDocciaPulito || d.soffioneDocciaPulito),
    DecalcificazioneEseguita: yes_(d.DecalcificazioneEseguita || d.decalcificazioneEseguita),
    DisinfezioneClorataEseguita: yes_(d.DisinfezioneClorataEseguita || d.disinfezioneClorataEseguita),
    FinestreAperteDuranteFlussaggio: yes_(d.FinestreAperteDuranteFlussaggio || d.finestreAperteDuranteFlussaggio),
    Esito: d.Esito || d.esito || 'OK',
    Segnalazioni: d.Segnalazioni || d.segnalazioni || '',
    ProssimoControlloSuggerito: addMonths_(new Date(), 1),
    PayloadJson: JSON.stringify(d)
  };
  append_(SHEETS.REGISTRO_LEGIONELLA, row);
  updateDashboard_();
  return { success: true, registroId: row.RegistroId };
}

function saveConfermaTeam_(d) {
  const row = {
    ConfermaId: d.ConfermaId || d.confermaId || id_('TEAM'),
    TurnoId: d.TurnoId || d.turnoId || '',
    InterventoId: d.InterventoId || d.interventoId || '',
    DataOra: now_(),
    Alloggio: d.Alloggio || d.alloggio || '',
    AddettoConfermante: d.AddettoConfermante || d.addettoConfermante || '',
    ChecklistEffettuataDaAltroAddetto: yes_(d.ChecklistEffettuataDaAltroAddetto || d.checklistEffettuataDaAltroAddetto),
    ChecklistCompiledBy: d.ChecklistCompiledBy || d.checklistCompiledBy || '',
    TipoConferma: d.TipoConferma || d.tipoConferma || 'Effettuata da altro addetto',
    Stato: d.Stato || d.stato || 'Confermata',
    PayloadJson: JSON.stringify(d)
  };
  append_(SHEETS.CONFERME_TEAM, row);
  updateDashboard_();
  return { success: true, confermaId: row.ConfermaId };
}

function closeCompliance_(d) {
  const id = d.ComplianceId || d.complianceId;
  if (!id) return { success: false, error: 'ComplianceId mancante' };

  const rows = read_(SHEETS.COMPLIANCE);
  let found = false;

  rows.forEach(r => {
    if (String(r.ComplianceId) === String(id)) {
      found = true;
      r.DataUltimaEsecuzione = today_();
      r.DataScadenza = addMonths_(new Date(), ricorrenzaMesi_(r.Ricorrenza));
      r.Stato = 'Completato';
      r.EsitoUltimoControllo = d.Esito || d.esito || 'OK';
      r.AggiornatoIl = now_();
      r.Note = d.Note || d.note || r.Note || '';
    }
  });

  rewrite_(SHEETS.COMPLIANCE, rows);
  updateDashboard_();
  return { success: found, complianceId: id };
}

function ricorrenzaMesi_(r) {
  r = String(r || '').toLowerCase();
  if (r.includes('ann')) return 12;
  if (r.includes('semes')) return 6;
  if (r.includes('trimes')) return 3;
  if (r.includes('mens')) return 1;
  return 6;
}

// =======================
// SMOOBU
// =======================

function syncSmoobuCalendars() {
  const start = new Date();
  start.setDate(start.getDate() - 60);
  const end = new Date();
  end.setDate(end.getDate() + 365);

  const rows = [];

  SMOOBU_CALENDARS.forEach(map => {
    const cal = CalendarApp.getCalendarById(map.calendarId);
    if (!cal) {
      rows.push({
        PrenotazioneId: id_('SMOOBU-ERR'),
        CalendarioId: map.calendarId,
        EventoId: '',
        Alloggio: map.alloggio,
        Ospite: '',
        NumeroPrenotazione: 'Calendario non accessibile',
        Canale: '',
        TipoEvento: 'Errore',
        CheckIn: '',
        CheckOut: '',
        Notti: '',
        Adulti: '',
        Stato: 'Errore',
        Location: '',
        UltimoSync: now_(),
        HashEvento: '',
        DescrizioneSanificata: ''
      });
      return;
    }

    cal.getEvents(start, end).forEach(ev => {
      const title = ev.getTitle() || '';
      const desc = sanitizeSmoobu_(ev.getDescription() || '');
      const type = title.match(/^Check-in/i) ? 'Check-in' :
        title.match(/^Check-out/i) ? 'Check-out' :
        (desc + title).match(/Blocked/i) ? 'Blocco' : 'Prenotazione';

      const hash = Utilities.base64EncodeWebSafe(
        Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, map.calendarId + title + desc + ev.getStartTime().toISOString())
      );

      rows.push({
        PrenotazioneId: 'SMOOBU-' + hash.slice(0, 10),
        CalendarioId: map.calendarId,
        EventoId: ev.getId(),
        Alloggio: map.alloggio,
        Ospite: type === 'Blocco' ? '' : guestFromTitle_(title, map.alloggio),
        NumeroPrenotazione: type === 'Blocco' ? 'Blocco Smoobu' : 'Non presente nel Calendar',
        Canale: matchText_(desc, /Portal:\s*([^C]+)/i),
        TipoEvento: type,
        CheckIn: parseDateText_(matchText_(desc, /Check-in:\s*([^C]+)/i)) || Utilities.formatDate(ev.getStartTime(), TZ, 'yyyy-MM-dd HH:mm'),
        CheckOut: parseDateText_(matchText_(desc, /Check-out:\s*([^N]+)/i)) || Utilities.formatDate(ev.getEndTime(), TZ, 'yyyy-MM-dd HH:mm'),
        Notti: matchText_(desc, /Nights:\s*(\d+)/i),
        Adulti: matchText_(desc, /Adults:\s*(\d+)/i),
        Stato: type === 'Blocco' ? 'Bloccato' : 'Attiva',
        Location: ev.getLocation() || '',
        UltimoSync: now_(),
        HashEvento: hash,
        DescrizioneSanificata: desc
      });
    });
  });

  const unique = {};
  rows.forEach(r => unique[r.HashEvento || r.PrenotazioneId] = r);
  rewrite_(SHEETS.PRENOTAZIONI_SMOOBU, Object.keys(unique).map(k => unique[k]));
  updateDashboard_();

  return { success: true, synced: Object.keys(unique).length, timestamp: now_() };
}

function sanitizeSmoobu_(text) {
  return String(text)
    .replace(/Email:\s*\S+/gi, '')
    .replace(/Price:\s*[\d.,]+/gi, '')
    .replace(/Notes?:\s*.*$/gis, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchText_(text, re) {
  const m = String(text).match(re);
  return m ? m[1].trim() : '';
}

function parseDateText_(raw) {
  if (!raw) return '';
  const m = raw.match(/(\d{2})\.(\d{2})\.(\d{4}),?\s*(\d{2}:\d{2})?/);
  if (!m) return raw.trim();
  return m[3] + '-' + m[2] + '-' + m[1] + ' ' + (m[4] || '00:00');
}

function guestFromTitle_(title, alloggio) {
  let s = String(title || '').replace(/^Check-in\s+/i, '').replace(/^Check-out\s+/i, '');
  s = s.replace(alloggio, '').split(',')[0].trim();
  if (s.match(/^The NoLo|^Masotto/i)) return '';
  return s;
}

// =======================
// DASHBOARD / TRIGGER
// =======================

function updateDashboard_() {
  const turni = read_(SHEETS.TURNI);
  const interventi = read_(SHEETS.INTERVENTI);
  const segnalazioni = read_(SHEETS.SEGNALAZIONI);
  const registro = read_(SHEETS.REGISTRO_LEGIONELLA);
  const compliance = read_(SHEETS.COMPLIANCE);
  const prenotazioni = read_(SHEETS.PRENOTAZIONI_SMOOBU);

  const rows = [
    { KPI: 'Turni totali', Valore: turni.length, UltimoAggiornamento: now_() },
    { KPI: 'Interventi registrati', Valore: interventi.length, UltimoAggiornamento: now_() },
    { KPI: 'Segnalazioni', Valore: segnalazioni.length, UltimoAggiornamento: now_() },
    { KPI: 'Registri legionella', Valore: registro.length, UltimoAggiornamento: now_() },
    { KPI: 'Compliance totali', Valore: compliance.length, UltimoAggiornamento: now_() },
    { KPI: 'Prenotazioni Smoobu', Valore: prenotazioni.length, UltimoAggiornamento: now_() }
  ];

  rewrite_(SHEETS.DASHBOARD, rows);
}

function createTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('syncSmoobuCalendars')
    .timeBased()
    .everyHours(6)
    .create();

  ScriptApp.newTrigger('updateDashboardTrigger')
    .timeBased()
    .everyHours(1)
    .create();

  return { success: true, message: 'Trigger creati' };
}

function updateDashboardTrigger() {
  updateDashboard_();
}

function testSetup() {
  Logger.log(JSON.stringify(setup2emmeCleaning(), null, 2));
}

function testSyncSmoobu() {
  Logger.log(JSON.stringify(syncSmoobuCalendars(), null, 2));
}
