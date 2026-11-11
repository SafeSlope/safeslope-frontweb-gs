# SafeSlope

> *Safe slopes, peaceful lives.*

## Ficha da CitizenTech

| Campo | Resposta |
|---|---|
| **Nome da CitizenTech** | SafeSlope |
| **Cidade e bairro** | São Paulo (SP) — áreas de encosta como Jardim Ângela, Capão Redondo e Brasilândia (dados simulados) |
| **Cidadão beneficiado** | Morador de área de encosta ou beira de córrego e o agente da Defesa Civil que atende a região |
| **Problema, em uma frase** | Em chuva forte, quem mora em área de risco tem poucos minutos entre o solo encharcar e a terra deslizar, e não recebe aviso local nem tem um jeito simples de avisar a prefeitura sobre rachaduras e alagamentos. |
| **Como funciona** | Um sensor (ESP32 no Wokwi) mede nível da água, chuva e umidade do solo. A API calcula a velocidade de subida da água (derivada) e a chuva acumulada em 24h (integral) e define o estado: Seguro, Atenção ou Perigo. O site mostra o estado em tempo real, dispara um alerta quando há perigo e permite que moradores registrem ocorrências que a Defesa Civil acompanha. |
| **O que cada parte faz** | **Front-end/Web (este repositório):** interface React + Tailwind e CRUD de ocorrências · **API (pasta `backend`):** guarda ocorrências e calcula o risco · **Python:** registra e tria logs de alerta · **Edge:** ESP32 com LEDs e buzzer que alarma mesmo sem internet · **Matemática:** modelo dh/dt e ∫R(t)dt · **Experiência:** requisitos e protótipo · **Pitch:** vídeo de 3 min |
| **Link do repositório** | `https://github.com/<usuario>/safeslope` (privado) |
| **Indicador de impacto** | Tempo entre o sensor atingir nível crítico e o alerta aparecer na tela (meta: até 5 s) · nº de ocorrências registradas e % resolvidas pela Defesa Civil |
| **ODS conectados** | **ODS 11** (meta 11.5: reduzir mortes e pessoas afetadas por desastres) e **ODS 13** (meta 13.1: aumentar a resiliência a riscos ligados ao clima) |

---

## Sobre o projeto

O SafeSlope tem dois painéis na mesma página:

- **Para moradores:** situação do córrego agora (verde, amarelo ou vermelho), chuva e umidade do solo, mapa de setores e formulário anônimo para avisar sobre rachaduras, alagamentos ou lixo no córrego.
- **Defesa Civil:** lista de chamados com filtro por gravidade, troca de status (`Em Análise` → `Em Atendimento` → `Normalizado`), exclusão de duplicados e botão para simular uma tempestade na apresentação.

Quando o estado chega em **Perigo**, uma faixa vermelha aparece no topo da página automaticamente.

## Tecnologias

- **Front-end:** React 18 + Vite, Tailwind CSS, lucide-react (ícones)
- **API:** Node.js + Express, dados em arquivo JSON
- **Hooks:** `useState`, `useEffect`, `useCallback` + custom hooks `useAlerts` e `useSensorData`

## Estrutura

```text
safeslope/
├── AI.md                 # uso de IA no projeto
├── INTEGRANTES.md
├── README.md
├── backend/              # API REST (Express)
│   └── src/
│       ├── server.js
│       ├── data/db.json
│       ├── routes/       # reports, sectors, sensors
│       └── utils/        # db, validate, risk (derivada e integral)
└── frontend/             # aplicação React + Vite + Tailwind
    └── src/
        ├── App.jsx
        ├── components/   # 8 componentes
        ├── hooks/        # useAlerts, useSensorData
        ├── services/     # api.js (acesso a dados)
        └── utils/        # risk.js (regras de exibição)
```

**Separação de responsabilidades:** componentes só desenham a tela; os hooks guardam o estado e as regras; `services/api.js` é o único arquivo que conversa com a API.

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Como rodar

**1. API**

```bash
cd backend
npm install
npm run dev
# API em http://localhost:3333
```

**2. Front-end** (em outro terminal)

```bash
cd frontend
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:3333
npm run dev
# abrir http://localhost:5173
```

## Deploy

- **API:** Render → New Web Service → pasta `backend`, comando `npm install` / `npm start`.
- **Front-end:** Vercel → pasta `frontend`, variável `VITE_API_URL` com a URL da API no Render.
- Link do deploy: `https://safeslope.vercel.app` *(atualizar após publicar)*

## Endpoints da API

| Método | Rota | Uso no front |
|---|---|---|
| GET | `/reports` | ReportList (Read) |
| POST | `/reports` | ReportForm (Create) |
| PATCH | `/reports/:id` | ReportList (Update de status) |
| DELETE | `/reports/:id` | ReportList (Delete) |
| GET | `/sectors` | RiskMap |
| GET | `/sensors/latest` | useSensorData (a cada 5 s) |
| POST | `/sensors` | recebe leitura do ESP32 |
| POST | `/sensors/tempestade` e `/sensors/reset` | modo demonstração |

## Dados

Todos os dados são **simulados**. Nenhum dado pessoal real é coletado: o formulário não pede nome, telefone nem documento.

## Integrantes

Veja [INTEGRANTES.md](INTEGRANTES.md).
