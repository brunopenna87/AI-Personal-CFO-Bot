// ======================================================
// CONFIGURAÇÕES (Preencha com seus dados)
// ======================================================
const GEMINI_API_KEY = ''; 
const TELEGRAM_BOT_TOKEN = ''; 
const TELEGRAM_CHAT_ID = '';
function RelatorioCompleto() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dash = ss.getSheetByName("DASHBOARD");
  const custos = ss.getSheetByName("Custo Fixo");

  // --- A. LEITURA DE MERCADO ---
  var eur_brl = dash.getRange("L1").getValue() || 0;
  var usd_brl = dash.getRange("L2").getValue() || 0;
  var ibov = dash.getRange("L3").getValue() || "N/A";
  var sp500 = dash.getRange("L4").getValue() || "N/A";
  var btc = dash.getRange("L5").getValue() || 0;

  // --- B. PATRIMÔNIO (COLUNA P) ---
  var pBrasilEur = dash.getRange("P1").getValue() || 0;
  var pCriptoEur = dash.getRange("P2").getValue() || 0;
  var pEuropaEur = dash.getRange("P3").getValue() || 0;
  var pReservaEur = dash.getRange("P4").getValue() || 0;
  var totalHojeEur = dash.getRange("P5").getValue() || 0;
  var totalOntemEur = dash.getRange("P6").getValue(); 

  // Conversão para Real (Para o relatório)
  var pBrasilBrl = pBrasilEur * eur_brl;

  // Lógica de Variação
  if (totalOntemEur === "" || totalOntemEur === 0 || typeof totalOntemEur !== 'number') {
    totalOntemEur = totalHojeEur;
  }
  var variacaoValor = totalHojeEur - totalOntemEur;
  var variacaoPercent = totalOntemEur > 0 ? (variacaoValor / totalOntemEur) * 100 : 0;
  var sinal = variacaoValor >= 0 ? "+" : ""; 

  // --- C. CONTAS (Próximos 5 Dias) ---
  const hoje = new Date();
  const diaHoje = hoje.getDate();
  let contasAlerta = "";
  try {
    const dadosCustos = custos.getRange("A2:D20").getValues(); 
    for (let i = 0; i < dadosCustos.length; i++) {
      let linha = dadosCustos[i];
      if (typeof linha[3] === 'number' && linha[3] >= diaHoje && linha[3] <= (diaHoje + 5)) {
        contasAlerta += `🚨 *${linha[1]}*: €${linha[2]} (Vence dia ${linha[3]})\n`;
      }
    }
  } catch (e) { contasAlerta = ""; }
  if (contasAlerta === "") contasAlerta = "✅ Contas em dia para os próximos 5 dias.";

  // --- D. NOTÍCIAS ---
  const noticias = buscarNoticias();

  // --- E. CÉREBRO DA IA ---
  const prompt = `
    Aja como meu CFO Pessoal. Hoje é ${hoje.toLocaleDateString('pt-BR')}.
    
    PATRIMÔNIO TOTAL: € ${totalHojeEur.toFixed(2)}
    VARIAÇÃO: ${sinal}€ ${variacaoValor.toFixed(2)} (${sinal}${variacaoPercent.toFixed(2)}%)
    
    DIVISÃO DA CARTEIRA:
    - Brasil: R$ ${pBrasilBrl.toFixed(2)} (Equivalente a € ${pBrasilEur.toFixed(2)})
    - Cripto: € ${pCriptoEur.toFixed(2)}
    - Europa: € ${pEuropaEur.toFixed(2)}
    - Reserva/Caixa: € ${pReservaEur.toFixed(2)}
    
    MERCADO:
    - S&P 500: ${sp500} | Ibovespa: ${ibov} | BTC: $${Number(btc).toFixed(0)}
    - Câmbio: Euro R$ ${eur_brl.toFixed(2)} | Dólar R$ ${usd_brl.toFixed(2)}
    
    NOTÍCIAS:
    ${noticias}
    
    CONTAS:
    ${contasAlerta}
    
    MISSÃO: Gere a resposta EXATAMENTE neste layout:
    
    👋 *Relatório do CFO* 💼
    
    💰 *PATRIMÓNIO TOTAL: € ${totalHojeEur.toFixed(2)}*
    Variação: *${sinal}€ ${variacaoValor.toFixed(2)}* (${sinal}${variacaoPercent.toFixed(2)}%)
    
    🧱 *ALOCAÇÃO DETALHADA*
    🇧🇷 *Brasil:* R$ ${pBrasilBrl.toFixed(2)}
    ₿ *Cripto:* € ${pCriptoEur.toFixed(2)}
    🇪🇺 *Europa:* € ${pEuropaEur.toFixed(2)}
    🛡️ *Reserva:* € ${pReservaEur.toFixed(2)}
    
    📊 *MERCADO GLOBAL*
    🇺🇸 *S&P 500:* ${sp500} pts | 🇧🇷 *Ibov:* ${ibov} pts
    ₿ *BTC:* U$ ${Number(btc).toFixed(0)}
    🇪🇺 *Euro:* R$ ${eur_brl.toFixed(2)} | 🇺🇸 *Dólar:* R$ ${usd_brl.toFixed(2)}
    
    📰 *MANCHETES*
    (Liste as 2 mais importantes).
    
    🧠 *INSIGHT ESTRATÉGICO*
    (Analise as notícias e o impacto no património, considerando os 74% de exposição ao Brasil. Seja crítico e direto).

    🔔 *FINANCEIRO*
    ${contasAlerta}
  `;

  const respostaIA = chamarGemini(prompt);
  enviarTelegram(respostaIA);
}

// ======================================================
// 3. FUNÇÕES TÉCNICAS (IGUAIS ANTERIORES)
// ======================================================
function SalvarFechamento() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DASHBOARD");
  sheet.getRange("P6").setValue(sheet.getRange("P5").getValue());
}

function chamarGemini(texto) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const options = { "method": "post", "contentType": "application/json", "payload": JSON.stringify({ "contents": [{ "parts": [{ "text": texto }] }] }), "muteHttpExceptions": true };
  try {
    const r = UrlFetchApp.fetch(url, options);
    const j = JSON.parse(r.getContentText());
    return j.candidates[0].content.parts[0].text;
  } catch (e) { return "⚠️ Erro IA."; }
}

function buscarNoticias() {
  try {
    const xml = UrlFetchApp.fetch("https://news.google.com/rss/search?q=mercado+financeiro+brasil+investimentos&hl=pt-BR&gl=BR&ceid=BR:pt-419").getContentText();
    const items = XmlService.parse(xml).getRootElement().getChild("channel").getChildren("item");
    let t = "";
    for (let i = 0; i < 3; i++) if (items[i]) t += "- " + items[i].getChild("title").getText() + "\n";
    return t;
  } catch (e) { return "Sem notícias."; }
}

function enviarTelegram(texto) {
  UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, { 'method': 'post', 'contentType': 'application/json', 'payload': JSON.stringify({ 'chat_id': TELEGRAM_CHAT_ID, 'text': texto }) });
}
