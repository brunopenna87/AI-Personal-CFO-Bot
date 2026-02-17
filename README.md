# 🤖 AI Personal CFO Bot (Gemini 2.5 Flash + Telegram)

[English Version Below]

---

## 🇧🇷 Sobre o Projeto
Este é um assistente financeiro inteligente que transforma o seu Google Sheets em um **CFO (Chief Financial Officer) pessoal**. Ele utiliza a inteligência do **Google Gemini 2.5 Flash** para analisar seu patrimônio, monitorar o mercado global (Ibovespa, S&P 500, Crypto) e enviar relatórios estratégicos diretamente para o seu **Telegram**.

### ✨ Funcionalidades
* 📈 **Análise de Patrimônio:** Acompanha variações diárias em Euros e Reais.
* 🌍 **Visão Global:** Monitora câmbio (EUR/BRL, USD/BRL) e bolsas de valores.
* 🧠 **Insights de IA:** Análise crítica de notícias reais e como elas afetam sua carteira.
* 🔔 **Gestão de Contas:** Alertas automáticos de vencimentos próximos.
* ⏰ **Relatórios Automáticos:** Receba atualizações 2x por dia sem abrir a planilha.

---

## 🚀 Como Colocar o Seu Robô a Funcionar (Passo a Passo)

Não precisa saber programar! Basta seguir estes **5 passos mágicos**:

### 1️⃣ O Tabuleiro (A Planilha)
* **Clique aqui:** [Fazer Cópia da Planilha Template](https://docs.google.com/spreadsheets/d/1Q9jxHPIaBHi4JPYhEJc03zDT_n5on9r2PppdPwK10nY/copy)
* Clique no botão azul **"Fazer uma cópia"**.

### 2️⃣ A Chave Mágica (Google Gemini)
* Vá ao site [Google AI Studio](https://aistudio.google.com/app/apikey).
* Clique em **"Create API Key"**.
* Copie esse código comprido e guarde-o. Esta é a "inteligência" do seu robô.

### 3️⃣ O Telefone do Robô (Telegram)
* No Telegram, procure pelo `@BotFather` e envie `/start`.
* Envie `/newbot`, escolha um nome e guarde o **Token** (código com números e letras).
* Para saber o seu ID, procure por `@userinfobot` no Telegram, envie `/start` e copie o número que ele te der (**Id**).

### 4️⃣ Juntar Tudo (Apps Script)
* Na sua planilha, clique em **Extensões** > **Apps Script**.
* No menu da esquerda, clique no **"+"** ao lado de "Arquivos" e crie um chamado `Config`. Cole lá isto:
    ```javascript
    const GEMINI_API_KEY = 'COLA_AQUI_A_TUA_CHAVE_DO_GEMINI';
    const TELEGRAM_BOT_TOKEN = 'COLA_AQUI_O_TOKEN_DO_TELEGRAM';
    const TELEGRAM_CHAT_ID = 'COLA_AQUI_O_TEU_ID_DO_USERINFO';
    ```
* No arquivo `Código.gs` (ou `Code.gs`), apague tudo e cole o código do arquivo `CFO_Logic.gs` que está aqui neste GitHub.
* Clique no **Disquete (Salvar)**.

### 5️⃣ Ligar o Despertador (Agendar)
* No menu da esquerda do Apps Script, clique no **Relógio (Acionadores)**.
* Clique em **"+ Adicionar Acionador"**.
* Escolha a função `RelatorioCompleto`, selecione **"Baseado no tempo"** e escolha a hora que quer receber o relatório.

---

## 🇺🇸 About the Project
An intelligent financial assistant that turns your Google Sheets into a personal CFO. Powered by **Google Gemini 2.5 Flash**, it analyzes your net worth, monitors global markets, and sends strategic reports directly to your **Telegram**.

### ✨ Key Features
* 📈 **Net Worth Analysis:** Tracks daily variations in EUR and BRL.
* 🌍 **Global View:** Monitors exchange rates and stock markets.
* 🧠 **AI Insights:** Critical analysis of real-time news and its impact on your portfolio.
* 🔔 **Bill Management:** Automatic alerts for upcoming due dates.
* ⏰ **Auto Reports:** Scheduled updates twice a day.

---

## 🚀 How to Setup (Step-by-Step)

You don't need to be a coder! Just follow these **5 magic steps**:

### 1️⃣ The Board (The Spreadsheet)
* **Click here:** [Make a copy of the Template](https://docs.google.com/spreadsheets/d/1Q9jxHPIaBHi4JPYhEJc03zDT_n5on9r2PppdPwK10nY/copy)
* Click the blue **"Make a copy"** button.

### 2️⃣ The Magic Key (Google Gemini)
* Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
* Click **"Create API Key"**.
* Copy that long code. This is your robot's "brain".

### 3️⃣ The Robot's Phone (Telegram)
* On Telegram, search for `@BotFather` and send `/start`.
* Send `/newbot`, choose a name, and save the **Token**.
* To find your ID, search for `@userinfobot` on Telegram, send `/start`, and copy the number (**Id**).

### 4️⃣ Putting it Together (Apps Script)
* In your spreadsheet, click **Extensions** > **Apps Script**.
* On the left menu, click **"+"** next to Files and create one named `Config`. Paste this:
    ```javascript
    const GEMINI_API_KEY = 'PASTE_YOUR_GEMINI_KEY_HERE';
    const TELEGRAM_BOT_TOKEN = 'PASTE_YOUR_TELEGRAM_TOKEN_HERE';
    const TELEGRAM_CHAT_ID = 'PASTE_YOUR_ID_HERE';
    ```
* In the `Code.gs` file, delete everything and paste the code from `CFO_Logic.gs` found in this GitHub repository.
* Click the **Floppy Disk (Save)** icon.

### 5️⃣ Set the Alarm (Triggers)
* On the left menu in Apps Script, click the **Clock (Triggers)** icon.
* Click **"+ Add Trigger"**.
* Select the `RelatorioCompleto` function, choose **"Time-driven"**, and pick the time you want to receive your report.

---
*Disclaimer: This project is for educational purposes only and does not constitute financial advice.*
