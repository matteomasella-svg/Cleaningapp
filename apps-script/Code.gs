const SPREADSHEET_ID = '1chEViDrAke793wJZIILx_NVrnheOgRZSTAE6X0CBTFw';
const TZ = 'Europe/Rome';

const SHEETS = {
  DASHBOARD: 'Dashboard',
  ALLOGGI: 'Alloggi',
  ADDETTI: 'Addetti',
  CHECKLIST_TEMPLATE: 'ChecklistTemplate',
  TURNI: 'Turni',
  INTERVENTI: 'Interventi',
  SEGNALAZIONI: 'Segnalazioni',
  REGISTRO_LEGIONELLA: 'RegistroLegionella',
  SCORTE: 'Scorte',
  PRENOTAZIONI_SMOOBU: 'PrenotazioniSmoobu',
  COMPLIANCE: 'Compliance',
  CONFERME_TEAM: 'ConfermeTeam',
  CONFIG: 'Config',
  MAGAZZINO_BASSANO: 'MagazzinoBassano',
  MOVIMENTI_MAGAZZINO: 'MovimentiMagazzino',
  REINTEGRI_MAGAZZINO: 'ReintegriMagazzino',
  SCORTE_ALLOGGI: 'ScorteAlloggi',
  INVENTARIO_CASA_ALLOGGI: 'InventarioCasaAlloggi',
  REMINDER_ADDETTI: 'ReminderAddetti'
};

const HEADERS = {
  Dashboard: ['KPI', 'Valore', 'UltimoAggiornamento'],
  Alloggi: ['AlloggioId', 'NomeAlloggio', 'NomeCommerciale', 'Indirizzo', 'CalendarioSmoobuId', 'Attivo', 'TipoAlloggio', 'Note'],
  Addetti: ['AddettoId', 'Nome', 'Ruolo', 'Telefono', 'Email', 'PIN', 'Attivo'],
  ChecklistTemplate: ['TemplateId', 'Fase', 'Ordine', 'Voce', 'Descrizione', 'Obbligatoria', 'Categoria', 'RichiedeScorteStaff', 'RichiedeScorteOspiti', 'RichiedeLegionella', 'ConsentiSegnalazione', 'FlagDisponibili', 'Attiva'],
  Turni: ['TurnoId', 'DataTurno', 'OraInizio', 'OraFine', 'Alloggio', 'TipoIntervento', 'ProceduraLegionellaPrevista', 'Addetto1', 'Addetto2', 'TeamShift', 'PrenotazioneId', 'Ospite', 'NumeroPrenotazione', 'CheckIn', 'CheckOut', 'Canale', 'StatoTurno', 'ChecklistObbligatoria', 'ScorteStaffObbligatorie', 'ScorteOspitiObbligatorie', 'CreatoIl', 'AggiornatoIl', 'Note'],
  Interventi: ['InterventoId', 'TurnoId', 'DataOraInvio', 'Alloggio', 'TipoIntervento', 'Operatore', 'ChecklistExecutionMode', 'ChecklistCompiledBy', 'ChecklistConfirmedBy', 'TeamShift', 'NeedsCompilerLog', 'ChecklistPuliziaCompletata', 'ScorteStaffVerificate', 'ScorteOspitiVerificate', 'SicurezzaVerificata', 'LegionellaPrevista', 'LegionellaCompletata', 'StatoChiusura', 'Esito', 'NumeroSegnalazioni', 'PayloadJson'],
  Segnalazioni: ['SegnalazioneId', 'TurnoId', 'InterventoId', 'DataOra', 'Alloggio', 'Fase', 'VoceChecklist', 'Operatore', 'FlagMancante', 'FlagApertoSigilloRotto', 'FlagDanneggiato', 'FlagIncompleto', 'FlagScaduto', 'FlagQuantitaInsufficiente', 'FlagNonVerificabile', 'FlagFotoNecessaria', 'Priorita', 'Stato', 'PayloadJson'],
  RegistroLegionella: ['RegistroId', 'TurnoId', 'InterventoId', 'DataOra', 'Alloggio', 'Operatore', 'ChecklistCompiledBy', 'Ospite', 'NumeroPrenotazione', 'ProceduraPrevista', 'FlussaggioAcquaCalda5Min', 'RompigettoPuliti', 'SoffioneDocciaPulito', 'DecalcificazioneEseguita', 'DisinfezioneClorataEseguita', 'FinestreAperteDuranteFlussaggio', 'Esito', 'Segnalazioni', 'ProssimoControlloSuggerito', 'PayloadJson'],
  Scorte: ['ScortaId', 'DataOra', 'TurnoId', 'InterventoId', 'Alloggio', 'TipoScorta', 'Articolo', 'QuantitaStandard', 'QuantitaRilevata', 'OK', 'Mancante', 'ApertoSigilloRotto', 'Danneggiato', 'Incompleto', 'Scaduto', 'QuantitaInsufficiente', 'NonVerificabile', 'Operatore', 'Stato', 'PayloadJson'],
  PrenotazioniSmoobu: ['PrenotazioneId', 'CalendarioId', 'EventoId', 'Alloggio', 'Ospite', 'NumeroPrenotazione', 'Canale', 'TipoEvento', 'CheckIn', 'CheckOut', 'Notti', 'Adulti', 'Stato', 'Location', 'UltimoSync', 'HashEvento', 'DescrizioneSanificata'],
  Compliance: ['ComplianceId', 'Area', 'Voce', 'Riferimento', 'Standard2EMME', 'Obbligatorio', 'FrequenzaControlloAddetta', 'FrequenzaControlloSupervisore', 'StatiAmmessi', 'FotoSeAnomalia', 'NoFarmaci', 'AlloggiApplicabili', 'Note', 'FonteInterna', 'Stato', 'DataUltimaEsecuzione', 'DataScadenza', 'AggiornatoIl'],
  ConfermeTeam: ['ConfermaId', 'TurnoId', 'InterventoId', 'DataOra', 'Alloggio', 'AddettoConfermante', 'ChecklistEffettuataDaAltroAddetto', 'ChecklistCompiledBy', 'TipoConferma', 'Stato', 'PayloadJson'],
  Config: ['Chiave', 'Valore', 'Descrizione'],
  MagazzinoBassano: ['SKU', 'Articolo', 'Categoria', 'GiacenzaAttuale', 'Unita', 'Stato', 'Fonte', 'Note', 'UpdatedAt', 'UpdatedBy'],
  MovimentiMagazzino: ['Data', 'MovimentoId', 'Magazzino', 'AlloggioDestinazione', 'SKU', 'Articolo', 'Categoria', 'Quantita', 'Unita', 'TipoMovimento', 'Causale', 'TurnoId', 'InterventoId', 'Operatore'],
  ReintegriMagazzino: ['Data', 'ReintegroId', 'Stato', 'Priorita', 'Magazzino', 'Alloggio', 'SKU', 'Articolo', 'QuantitaMancante', 'Unita', 'MessaggioAddetto', 'TurnoId', 'InterventoId', 'Operatore'],
  ScorteAlloggi: ['Alloggio', 'TipoScorta', 'SKU', 'Articolo', 'QuantitaStandard', 'Unita', 'MotivoStandard', 'MagazzinoRifornimento', 'QuantitaPresenteUltimoControllo', 'QuantitaMancanteUltimoControllo', 'Stato', 'UltimoAggiornamento', 'Note'],
  InventarioCasaAlloggi: ['Alloggio', 'Categoria', 'Articolo', 'QuantitaStandard', 'QuantitaPresente', 'QuantitaMancante', 'Unita', 'Stato', 'Fonte', 'Note', 'UpdatedAt', 'UpdatedBy'],
  ReminderAddetti: ['ReminderId', 'DataCreazione', 'Autore', 'Destinatario', 'Alloggio', 'Titolo', 'Messaggio', 'Priorita', 'Scadenza', 'Stato', 'DataLettura', 'NoteAddetto']
};

function getSpreadsheet() { return SpreadsheetApp.openById(SPREADSHEET_ID); }
function nowText() { return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'); }
function todayText() { return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd'); }
function newId(prefix) { return prefix + '-' + Utilities.getUuid().slice(0, 8).toUpperCase(); }
function jsonResponse(data) { return ContentService.createTextOutput(JSON.stringify(data, null, 2)).setMimeType(ContentService.MimeType.JSON); }
function yes(value) { if (value === true) return 'SI'; if (String(value).toUpperCase() === 'SI') return 'SI'; if (String(value).toLowerCase() === 'true') return 'SI'; return ''; }
function parsePostBody(e) { if (!e || !e.postData || !e.postData.contents) return {}; return JSON.parse(e.postData.contents); }
function normalizeCell(value) { if (Object.prototype.toString.call(value) === '[object Date]') return Utilities.formatDate(value, TZ, 'yyyy-MM-dd HH:mm:ss'); return value; }

function ensureSheet(sheetName) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);
  const headers = HEADERS[sheetName];
  if (headers && headers.length) {
    const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    let mismatch = false;
    for (let i = 0; i < headers.length; i++) { if (current[i] !== headers[i]) { mismatch = true; break; } }
    if (mismatch) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setFontColor('#ffffff').setBackground('#111827');
      sheet.autoResizeColumns(1, headers.length);
    }
  }
  return sheet;
}

function appendRow(sheetName, obj) {
  const sheet = ensureSheet(sheetName);
  const headers = HEADERS[sheetName];
  const row = headers.map(function(key) { return obj[key] !== undefined ? obj[key] : ''; });
  sheet.appendRow(row);
  return obj;
}

function readSheet(sheetName) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values.shift();
  return values.filter(function(row) { return row.some(function(cell) { return cell !== ''; }); }).map(function(row) {
    const obj = {};
    headers.forEach(function(header, index) { obj[header] = normalizeCell(row[index]); });
    return obj;
  });
}

function rewriteSheet(sheetName, rows) {
  const sheet = ensureSheet(sheetName);
  const headers = HEADERS[sheetName];
  if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.max(sheet.getLastColumn(), headers.length)).clearContent();
  if (rows.length) {
    const values = rows.map(function(obj) { return headers.map(function(header) { return obj[header] !== undefined ? obj[header] : ''; }); });
    sheet.getRange(2, 1, values.length, headers.length).setValues(values);
  }
}

function setup2emmeCleaning() { Object.keys(HEADERS).forEach(function(sheetName) { ensureSheet(sheetName); }); updateDashboard(); return { success: true, message: 'Setup tabelle completato', spreadsheetUrl: getSpreadsheet().getUrl(), timestamp: nowText() }; }

function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const action = params.action || 'ping';
    if (action === 'ping') return jsonResponse({ success: true, app: '2EMME Cleaning', timestamp: nowText() });
    if (action === 'setup') return jsonResponse(setup2emmeCleaning());
    if (action === 'dashboard' || action === 'adminData') return jsonResponse(getAdminData());
    if (action === 'mobile') return jsonResponse(getMobileData(params.user || params.addetto || ''));
    if (action === 'sheet') return jsonResponse({ success: true, sheet: params.sheet || '', rows: readSheet(params.sheet || ''), timestamp: nowText() });
    return jsonResponse({ success: false, error: 'Azione GET non riconosciuta: ' + action });
  } catch (err) { return jsonResponse({ success: false, error: err.message, stack: err.stack }); }
}

function doPost(e) {
  try {
    const body = parsePostBody(e);
    const action = body.action || '';
    if (action === 'upsertTurno') return jsonResponse(saveTurno(body));
    if (action === 'saveIntervento') return jsonResponse(saveIntervento(body));
    if (action === 'completeIntervention') return jsonResponse(completeIntervention(body));
    if (action === 'saveSegnalazione') return jsonResponse(saveSegnalazione(body));
    if (action === 'saveScorte') return jsonResponse(saveScorte(body));
    if (action === 'saveRegistroLegionella') return jsonResponse(saveRegistroLegionella(body));
    if (action === 'saveConfermaTeam') return jsonResponse(saveConfermaTeam(body));
    if (action === 'closeCompliance') return jsonResponse(closeCompliance(body));
    if (action === 'saveReminder') return jsonResponse(saveReminder(body));
    if (action === 'markReminderRead') return jsonResponse(markReminderRead(body));
    if (action === 'updateWarehouseItem') return jsonResponse(updateWarehouseItem(body));
    if (action === 'addWarehouseMovement') return jsonResponse(addWarehouseMovement(body));
    if (action === 'updateInventoryItem') return jsonResponse(updateInventoryItem(body));
    return jsonResponse({ success: false, error: 'Azione POST non riconosciuta: ' + action });
  } catch (err) { return jsonResponse({ success: false, error: err.message, stack: err.stack }); }
}

function getAdminData() {
  updateDashboard();
  return {
    success: true,
    dashboard: readSheet(SHEETS.DASHBOARD),
    alloggi: readSheet(SHEETS.ALLOGGI),
    addetti: readSheet(SHEETS.ADDETTI),
    turni: readSheet(SHEETS.TURNI),
    interventi: readSheet(SHEETS.INTERVENTI),
    segnalazioni: readSheet(SHEETS.SEGNALAZIONI),
    registroLegionella: readSheet(SHEETS.REGISTRO_LEGIONELLA),
    scorte: readSheet(SHEETS.SCORTE),
    prenotazioniSmoobu: readSheet(SHEETS.PRENOTAZIONI_SMOOBU),
    compliance: readSheet(SHEETS.COMPLIANCE),
    confermeTeam: readSheet(SHEETS.CONFERME_TEAM),
    magazzinoBassano: readSheet(SHEETS.MAGAZZINO_BASSANO),
    movimentiMagazzino: readSheet(SHEETS.MOVIMENTI_MAGAZZINO),
    reintegriMagazzino: readSheet(SHEETS.REINTEGRI_MAGAZZINO),
    scorteAlloggi: readSheet(SHEETS.SCORTE_ALLOGGI),
    inventarioCasaAlloggi: readSheet(SHEETS.INVENTARIO_CASA_ALLOGGI),
    reminderAddetti: readSheet(SHEETS.REMINDER_ADDETTI),
    timestamp: nowText()
  };
}

function getMobileData(user) {
  const reminders = readSheet(SHEETS.REMINDER_ADDETTI).filter(function(r) {
    const dest = String(r.Destinatario || '').toLowerCase();
    const stato = String(r.Stato || '').toLowerCase();
    return stato !== 'letto' && (dest === 'tutti' || !dest || dest === String(user || '').toLowerCase());
  });
  return { success: true, turni: readSheet(SHEETS.TURNI), checklistTemplate: readSheet(SHEETS.CHECKLIST_TEMPLATE), alloggi: readSheet(SHEETS.ALLOGGI), addetti: readSheet(SHEETS.ADDETTI), scorteAlloggi: readSheet(SHEETS.SCORTE_ALLOGGI), inventarioCasaAlloggi: readSheet(SHEETS.INVENTARIO_CASA_ALLOGGI), reminderAddetti: reminders, timestamp: nowText() };
}

function saveTurno(data) {
  const addetto2 = data.Addetto2 || data.addetto2 || '';
  const row = { TurnoId: data.TurnoId || data.turnoId || newId('TURN'), DataTurno: data.DataTurno || data.dataTurno || todayText(), OraInizio: data.OraInizio || data.oraInizio || '', OraFine: data.OraFine || data.oraFine || '', Alloggio: data.Alloggio || data.alloggio || '', TipoIntervento: data.TipoIntervento || data.tipoIntervento || 'Pulizia', ProceduraLegionellaPrevista: yes(data.ProceduraLegionellaPrevista || data.legionellaPrevista), Addetto1: data.Addetto1 || data.addetto1 || '', Addetto2: addetto2, TeamShift: yes(data.TeamShift || data.teamShift || addetto2 !== ''), PrenotazioneId: data.PrenotazioneId || data.prenotazioneId || '', Ospite: data.Ospite || data.ospite || '', NumeroPrenotazione: data.NumeroPrenotazione || data.numeroPrenotazione || '', CheckIn: data.CheckIn || data.checkIn || '', CheckOut: data.CheckOut || data.checkOut || '', Canale: data.Canale || data.canale || '', StatoTurno: data.StatoTurno || data.statoTurno || 'Pianificato', ChecklistObbligatoria: 'SI', ScorteStaffObbligatorie: 'SI', ScorteOspitiObbligatorie: 'SI', CreatoIl: data.CreatoIl || nowText(), AggiornatoIl: nowText(), Note: data.Note || data.note || '' };
  appendRow(SHEETS.TURNI, row); updateDashboard(); return { success: true, turnoId: row.TurnoId };
}

function saveIntervento(data) {
  const missing = [];
  const turnoId = data.TurnoId || data.turnoId || data.shiftId || '';
  const alloggio = data.Alloggio || data.alloggio || data.apartment || '';
  const operatore = data.Operatore || data.operatore || data.operator || data.user || '';
  const legionellaPrevista = yes(data.LegionellaPrevista || data.legionellaPrevista);
  const legionellaCompletata = yes(data.LegionellaCompletata || data.legionellaCompletata || !legionellaPrevista);
  if (!turnoId) missing.push('TurnoId'); if (!alloggio) missing.push('Alloggio'); if (!operatore) missing.push('Operatore'); if (legionellaPrevista && !legionellaCompletata) missing.push('LegionellaCompletata');
  const row = { InterventoId: data.InterventoId || data.interventoId || newId('INT'), TurnoId: turnoId, DataOraInvio: nowText(), Alloggio: alloggio, TipoIntervento: data.TipoIntervento || data.tipoIntervento || 'Pulizia', Operatore: operatore, ChecklistExecutionMode: data.ChecklistExecutionMode || data.checklistExecutionMode || 'Compilo io', ChecklistCompiledBy: data.ChecklistCompiledBy || data.checklistCompiledBy || operatore, ChecklistConfirmedBy: data.ChecklistConfirmedBy || data.checklistConfirmedBy || '', TeamShift: yes(data.TeamShift || data.teamShift), NeedsCompilerLog: yes(data.NeedsCompilerLog || data.needsCompilerLog), ChecklistPuliziaCompletata: yes(true), ScorteStaffVerificate: yes(true), ScorteOspitiVerificate: yes(true), SicurezzaVerificata: yes(true), LegionellaPrevista: legionellaPrevista, LegionellaCompletata: legionellaCompletata, StatoChiusura: missing.length ? 'Bloccato' : 'Chiuso', Esito: missing.length ? 'Non chiudibile: ' + missing.join(', ') : data.Esito || data.esito || 'OK', NumeroSegnalazioni: data.NumeroSegnalazioni || data.numeroSegnalazioni || 0, PayloadJson: JSON.stringify(data) };
  appendRow(SHEETS.INTERVENTI, row); updateDashboard(); return { success: missing.length === 0, interventoId: row.InterventoId, statoChiusura: row.StatoChiusura, missing: missing };
}

function completeIntervention(data) {
  const result = saveIntervento(data); const interventoId = result.interventoId; const turnoId = data.TurnoId || data.turnoId || data.shiftId || ''; const alloggio = data.Alloggio || data.alloggio || data.apartment || ''; const operatore = data.Operatore || data.operatore || data.operator || data.user || ''; const shortages = data.stockShortages || data.scorteMancanti || [];
  shortages.forEach(function(item) {
    const qty = Number(item.missing || item.QuantitaMancante || item.quantitaMancante || 0); const sku = item.sku || item.SKU || ''; const articolo = item.item || item.Articolo || item.articolo || ''; const unita = item.unit || item.Unita || item.unita || '';
    appendRow(SHEETS.SCORTE_ALLOGGI, { Alloggio: alloggio, TipoScorta: item.phase || item.TipoScorta || '', SKU: sku, Articolo: articolo, QuantitaStandard: item.standard || item.QuantitaStandard || '', Unita: unita, MotivoStandard: alloggio === 'Masotto Terrace View' ? 'Standard maggiorato alloggio remoto' : 'Standard alloggio', MagazzinoRifornimento: 'Magazzino Bassano', QuantitaPresenteUltimoControllo: item.present || item.QuantitaPresente || 0, QuantitaMancanteUltimoControllo: qty, Stato: qty > 0 ? 'Reintegro richiesto' : 'OK', UltimoAggiornamento: nowText(), Note: JSON.stringify(item) });
    if (qty > 0) { appendRow(SHEETS.REINTEGRI_MAGAZZINO, { Data: nowText(), ReintegroId: newId('REI'), Stato: 'Aperto', Priorita: 'Alta', Magazzino: 'Magazzino Bassano', Alloggio: alloggio, SKU: sku, Articolo: articolo, QuantitaMancante: qty, Unita: unita, MessaggioAddetto: 'Recarsi al Magazzino Bassano e reintegrare ' + articolo + ' (' + qty + ' ' + unita + ')', TurnoId: turnoId, InterventoId: interventoId, Operatore: operatore }); appendWarehouseMovement({ sku: sku, articolo: articolo, quantita: qty, unita: unita, tipoMovimento: 'Scarico', causale: 'Reintegro alloggio', alloggio: alloggio, turnoId: turnoId, interventoId: interventoId, operatore: operatore }); decrementWarehouse(sku, qty, operatore); }
  });
  updateDashboard(); return { success: result.success, interventoId: interventoId, shortages: shortages.length, message: 'Intervento salvato con scorte/reintegri' };
}

function saveSegnalazione(data) { const row = { SegnalazioneId: data.SegnalazioneId || data.segnalazioneId || newId('SEG'), TurnoId: data.TurnoId || data.turnoId || '', InterventoId: data.InterventoId || data.interventoId || '', DataOra: nowText(), Alloggio: data.Alloggio || data.alloggio || '', Fase: data.Fase || data.fase || '', VoceChecklist: data.VoceChecklist || data.voceChecklist || data.item || '', Operatore: data.Operatore || data.operatore || data.user || '', FlagMancante: yes(data.FlagMancante || data.mancante), FlagApertoSigilloRotto: yes(data.FlagApertoSigilloRotto || data.apertoSigilloRotto), FlagDanneggiato: yes(data.FlagDanneggiato || data.danneggiato), FlagIncompleto: yes(data.FlagIncompleto || data.incompleto), FlagScaduto: yes(data.FlagScaduto || data.scaduto), FlagQuantitaInsufficiente: yes(data.FlagQuantitaInsufficiente || data.quantitaInsufficiente), FlagNonVerificabile: yes(data.FlagNonVerificabile || data.nonVerificabile), FlagFotoNecessaria: yes(data.FlagFotoNecessaria || data.fotoNecessaria), Priorita: data.Priorita || data.priorita || 'Media', Stato: data.Stato || data.stato || 'Aperta', PayloadJson: JSON.stringify(data) }; appendRow(SHEETS.SEGNALAZIONI, row); updateDashboard(); return { success: true, segnalazioneId: row.SegnalazioneId }; }
function saveScorte(data) { return { success: true, inserted: 0, message: 'Scorte gestite da completeIntervention/ScorteAlloggi' }; }
function saveRegistroLegionella(data) { const row = { RegistroId: data.RegistroId || data.registroId || newId('LEG'), TurnoId: data.TurnoId || data.turnoId || '', InterventoId: data.InterventoId || data.interventoId || '', DataOra: nowText(), Alloggio: data.Alloggio || data.alloggio || '', Operatore: data.Operatore || data.operatore || '', ChecklistCompiledBy: data.ChecklistCompiledBy || data.checklistCompiledBy || data.Operatore || data.operatore || '', Ospite: data.Ospite || data.ospite || '', NumeroPrenotazione: data.NumeroPrenotazione || data.numeroPrenotazione || '', ProceduraPrevista: yes(data.ProceduraPrevista || data.proceduraPrevista), FlussaggioAcquaCalda5Min: yes(data.FlussaggioAcquaCalda5Min || data.flussaggioAcquaCalda5Min), RompigettoPuliti: yes(data.RompigettoPuliti || data.rompigettoPuliti), SoffioneDocciaPulito: yes(data.SoffioneDocciaPulito || data.soffioneDocciaPulito), DecalcificazioneEseguita: yes(data.DecalcificazioneEseguita || data.decalcificazioneEseguita), DisinfezioneClorataEseguita: yes(data.DisinfezioneClorataEseguita || data.disinfezioneClorataEseguita), FinestreAperteDuranteFlussaggio: yes(data.FinestreAperteDuranteFlussaggio || data.finestreAperteDuranteFlussaggio), Esito: data.Esito || data.esito || 'OK', Segnalazioni: data.Segnalazioni || data.segnalazioni || '', ProssimoControlloSuggerito: todayText(), PayloadJson: JSON.stringify(data) }; appendRow(SHEETS.REGISTRO_LEGIONELLA, row); updateDashboard(); return { success: true, registroId: row.RegistroId }; }
function saveConfermaTeam(data) { const row = { ConfermaId: data.ConfermaId || data.confermaId || newId('TEAM'), TurnoId: data.TurnoId || data.turnoId || '', InterventoId: data.InterventoId || data.interventoId || '', DataOra: nowText(), Alloggio: data.Alloggio || data.alloggio || '', AddettoConfermante: data.AddettoConfermante || data.addettoConfermante || '', ChecklistEffettuataDaAltroAddetto: yes(data.ChecklistEffettuataDaAltroAddetto || data.checklistEffettuataDaAltroAddetto), ChecklistCompiledBy: data.ChecklistCompiledBy || data.checklistCompiledBy || '', TipoConferma: data.TipoConferma || data.tipoConferma || 'Effettuata da altro addetto', Stato: data.Stato || data.stato || 'Confermata', PayloadJson: JSON.stringify(data) }; appendRow(SHEETS.CONFERME_TEAM, row); updateDashboard(); return { success: true, confermaId: row.ConfermaId }; }
function closeCompliance(data) { const id = data.ComplianceId || data.complianceId || ''; if (!id) return { success: false, error: 'ComplianceId mancante' }; const rows = readSheet(SHEETS.COMPLIANCE); let found = false; rows.forEach(function(row) { if (String(row.ComplianceId || row.Id || '') === String(id)) { found = true; row.Stato = 'Completato'; row.DataUltimaEsecuzione = todayText(); row.AggiornatoIl = nowText(); row.Note = data.Note || data.note || row.Note || ''; } }); rewriteSheet(SHEETS.COMPLIANCE, rows); updateDashboard(); return { success: found, complianceId: id }; }
function saveReminder(data) { const row = { ReminderId: data.ReminderId || data.reminderId || newId('REM'), DataCreazione: nowText(), Autore: data.Autore || data.autore || 'Amministratore', Destinatario: data.Destinatario || data.destinatario || data.to || 'Tutti', Alloggio: data.Alloggio || data.alloggio || data.apartment || '', Titolo: data.Titolo || data.titolo || data.title || '', Messaggio: data.Messaggio || data.messaggio || data.message || '', Priorita: data.Priorita || data.priorita || data.priority || 'Normale', Scadenza: data.Scadenza || data.scadenza || data.dueDate || '', Stato: data.Stato || data.stato || 'Non letto', DataLettura: '', NoteAddetto: '' }; appendRow(SHEETS.REMINDER_ADDETTI, row); updateDashboard(); return { success: true, reminderId: row.ReminderId }; }
function markReminderRead(data) { const id = data.ReminderId || data.reminderId || ''; const rows = readSheet(SHEETS.REMINDER_ADDETTI); let found = false; rows.forEach(function(row) { if (String(row.ReminderId) === String(id)) { found = true; row.Stato = 'Letto'; row.DataLettura = nowText(); row.NoteAddetto = data.NoteAddetto || data.noteAddetto || row.NoteAddetto || ''; } }); rewriteSheet(SHEETS.REMINDER_ADDETTI, rows); updateDashboard(); return { success: found, reminderId: id }; }
function updateWarehouseItem(data) { const sku = data.SKU || data.sku || ''; if (!sku) return { success: false, error: 'SKU mancante' }; const rows = readSheet(SHEETS.MAGAZZINO_BASSANO); let found = false; rows.forEach(function(row) { if (String(row.SKU) === String(sku)) { found = true; row.Articolo = data.Articolo || data.articolo || row.Articolo || ''; row.Categoria = data.Categoria || data.categoria || row.Categoria || ''; if (data.GiacenzaAttuale !== undefined || data.giacenzaAttuale !== undefined) row.GiacenzaAttuale = data.GiacenzaAttuale !== undefined ? data.GiacenzaAttuale : data.giacenzaAttuale; row.Unita = data.Unita || data.unita || row.Unita || ''; row.Stato = data.Stato || data.stato || row.Stato || ''; row.Note = data.Note || data.note || row.Note || ''; row.UpdatedAt = nowText(); row.UpdatedBy = data.Operatore || data.operatore || 'Admin'; } }); if (!found) rows.push({ SKU: sku, Articolo: data.Articolo || data.articolo || '', Categoria: data.Categoria || data.categoria || '', GiacenzaAttuale: data.GiacenzaAttuale || data.giacenzaAttuale || 0, Unita: data.Unita || data.unita || 'pz', Stato: data.Stato || data.stato || 'Da verificare', Fonte: 'Dashboard Admin', Note: data.Note || data.note || '', UpdatedAt: nowText(), UpdatedBy: data.Operatore || data.operatore || 'Admin' }); rewriteSheet(SHEETS.MAGAZZINO_BASSANO, rows); updateDashboard(); return { success: true, sku: sku, created: !found }; }
function addWarehouseMovement(data) { appendWarehouseMovement(data); if (String(data.tipoMovimento || data.TipoMovimento || '').toLowerCase() === 'scarico') decrementWarehouse(data.sku || data.SKU || '', Number(data.quantita || data.Quantita || 0), data.operatore || data.Operatore || 'Admin'); updateDashboard(); return { success: true }; }
function appendWarehouseMovement(data) { appendRow(SHEETS.MOVIMENTI_MAGAZZINO, { Data: nowText(), MovimentoId: data.MovimentoId || data.movimentoId || newId('MOV'), Magazzino: 'Magazzino Bassano', AlloggioDestinazione: data.AlloggioDestinazione || data.alloggio || data.apartment || '', SKU: data.SKU || data.sku || '', Articolo: data.Articolo || data.articolo || data.item || '', Categoria: data.Categoria || data.categoria || '', Quantita: data.Quantita || data.quantita || 0, Unita: data.Unita || data.unita || '', TipoMovimento: data.TipoMovimento || data.tipoMovimento || 'Scarico', Causale: data.Causale || data.causale || '', TurnoId: data.TurnoId || data.turnoId || '', InterventoId: data.InterventoId || data.interventoId || '', Operatore: data.Operatore || data.operatore || '' }); }
function decrementWarehouse(sku, qty, operator) { if (!sku || !qty) return; const rows = readSheet(SHEETS.MAGAZZINO_BASSANO); rows.forEach(function(row) { if (String(row.SKU) === String(sku)) { row.GiacenzaAttuale = Math.max(Number(row.GiacenzaAttuale || 0) - Number(qty), 0); row.Stato = Number(row.GiacenzaAttuale) <= 0 ? 'Mancante / da acquistare' : row.Stato; row.UpdatedAt = nowText(); row.UpdatedBy = operator || 'Sistema'; } }); rewriteSheet(SHEETS.MAGAZZINO_BASSANO, rows); }
function updateInventoryItem(data) { const alloggio = data.Alloggio || data.alloggio || ''; const articolo = data.Articolo || data.articolo || ''; if (!alloggio || !articolo) return { success: false, error: 'Alloggio e Articolo obbligatori' }; const rows = readSheet(SHEETS.INVENTARIO_CASA_ALLOGGI); let found = false; rows.forEach(function(row) { if (String(row.Alloggio) === String(alloggio) && String(row.Articolo) === String(articolo)) { found = true; row.Categoria = data.Categoria || data.categoria || row.Categoria || ''; row.QuantitaStandard = data.QuantitaStandard !== undefined ? data.QuantitaStandard : (data.quantitaStandard !== undefined ? data.quantitaStandard : row.QuantitaStandard); row.QuantitaPresente = data.QuantitaPresente !== undefined ? data.QuantitaPresente : (data.quantitaPresente !== undefined ? data.quantitaPresente : row.QuantitaPresente); row.QuantitaMancante = Math.max(Number(row.QuantitaStandard || 0) - Number(row.QuantitaPresente || 0), 0); row.Unita = data.Unita || data.unita || row.Unita || 'pz'; row.Stato = Number(row.QuantitaMancante || 0) > 0 ? 'Mancante' : 'Presente'; row.Note = data.Note || data.note || row.Note || ''; row.UpdatedAt = nowText(); row.UpdatedBy = data.Operatore || data.operatore || 'Admin'; } }); if (!found) rows.push({ Alloggio: alloggio, Categoria: data.Categoria || data.categoria || '', Articolo: articolo, QuantitaStandard: data.QuantitaStandard || data.quantitaStandard || 1, QuantitaPresente: data.QuantitaPresente || data.quantitaPresente || 0, QuantitaMancante: Math.max(Number(data.QuantitaStandard || data.quantitaStandard || 1) - Number(data.QuantitaPresente || data.quantitaPresente || 0), 0), Unita: data.Unita || data.unita || 'pz', Stato: 'Da verificare', Fonte: 'Dashboard Admin', Note: data.Note || data.note || '', UpdatedAt: nowText(), UpdatedBy: data.Operatore || data.operatore || 'Admin' }); rewriteSheet(SHEETS.INVENTARIO_CASA_ALLOGGI, rows); updateDashboard(); return { success: true, created: !found }; }
function updateDashboard() { const rows = [ { KPI: 'Turni totali', Valore: readSheet(SHEETS.TURNI).length, UltimoAggiornamento: nowText() }, { KPI: 'Interventi registrati', Valore: readSheet(SHEETS.INTERVENTI).length, UltimoAggiornamento: nowText() }, { KPI: 'Segnalazioni totali', Valore: readSheet(SHEETS.SEGNALAZIONI).length, UltimoAggiornamento: nowText() }, { KPI: 'Registri legionella', Valore: readSheet(SHEETS.REGISTRO_LEGIONELLA).length, UltimoAggiornamento: nowText() }, { KPI: 'Compliance totali', Valore: readSheet(SHEETS.COMPLIANCE).length, UltimoAggiornamento: nowText() }, { KPI: 'Prenotazioni Smoobu', Valore: readSheet(SHEETS.PRENOTAZIONI_SMOOBU).length, UltimoAggiornamento: nowText() }, { KPI: 'Magazzino Bassano righe', Valore: readSheet(SHEETS.MAGAZZINO_BASSANO).length, UltimoAggiornamento: nowText() }, { KPI: 'Reintegri aperti', Valore: readSheet(SHEETS.REINTEGRI_MAGAZZINO).filter(function(r) { return String(r.Stato || '').toLowerCase() !== 'chiuso'; }).length, UltimoAggiornamento: nowText() }, { KPI: 'Reminder non letti', Valore: readSheet(SHEETS.REMINDER_ADDETTI).filter(function(r) { return String(r.Stato || '').toLowerCase() !== 'letto'; }).length, UltimoAggiornamento: nowText() } ]; rewriteSheet(SHEETS.DASHBOARD, rows); }
function testSetup() { Logger.log(JSON.stringify(setup2emmeCleaning(), null, 2)); }
