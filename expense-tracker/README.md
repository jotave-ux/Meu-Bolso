# Livro-Caixa

Rastreador de gastos pessoais construído em React. Os lançamentos (entradas e saídas) ficam salvos no `localStorage` do navegador, com resumo mensal de saldo e um gráfico de saídas por categoria.

> Projeto de portfólio, focado em demonstrar organização de componentes React, gerenciamento de estado local e um pipeline de deploy na AWS.

## Funcionalidades

- Lançamento de entradas e saídas, com descrição, categoria, data e valor
- Resumo do mês: total de entradas, saídas e saldo
- Gráfico de saídas por categoria (via [Recharts](https://recharts.org))
- Persistência automática no `localStorage` — os dados continuam lá ao recarregar a página
- Remoção de lançamentos
- Interface responsiva, sem dependência de nenhum backend

## Tecnologias

- [React 18](https://react.dev) + [Vite](https://vitejs.dev)
- [Recharts](https://recharts.org) para o gráfico de categorias
- CSS puro (sem framework de UI), com identidade visual própria inspirada em um livro-caixa físico
- Deploy contínuo via **GitHub Actions** para **AWS S3 + CloudFront**

## Rodando localmente

Pré-requisitos: [Node.js](https://nodejs.org) 18 ou superior.

```bash
# instale as dependências
npm install

# suba o servidor de desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build   # gera a pasta dist/
npm run preview # testa o build localmente
```

## Estrutura do projeto

```
src/
├── components/       # componentes de UI (formulário, lista, gráfico, resumo)
├── hooks/
│   └── useLedger.js  # estado dos lançamentos + persistência em localStorage
├── utils/            # formatação de moeda/data e definição de categorias
├── App.jsx
├── main.jsx
└── index.css
```

## Deploy na AWS (S3 + CloudFront)

A ideia é hospedar os arquivos estáticos gerados pelo `npm run build` em um bucket S3, e usar o CloudFront como CDN na frente para HTTPS, cache e menor latência.

### 1. Criar o bucket S3

```bash
aws s3 mb s3://SEU-BUCKET-AQUI --region us-east-1

# habilita hospedagem de site estático
aws s3 website s3://SEU-BUCKET-AQUI \
  --index-document index.html \
  --error-document index.html
```

Mantenha o bucket **privado** (bloqueando acesso público direto) — o acesso público será feito através do CloudFront, usando uma Origin Access Control (OAC), e não do bucket em si.

### 2. Criar a distribuição CloudFront

No console da AWS (CloudFront → Create distribution):

- **Origin domain**: o endpoint do bucket S3
- **Origin access**: Origin Access Control (OAC) — recomendado pela AWS no lugar do antigo OAI
- **Viewer protocol policy**: Redirect HTTP to HTTPS
- **Default root object**: `index.html`
- Em **Error pages**, crie uma regra para `403` e `404` retornando `index.html` com status `200` (necessário porque o React usa rotas no lado do cliente)

Depois de criada, atualize a política do bucket S3 para permitir apenas leituras vindas da distribuição CloudFront (o próprio console oferece essa policy pronta ao configurar a OAC).

### 3. Deploy manual (primeira vez ou ajustes pontuais)

```bash
npm run build
aws s3 sync dist/ s3://SEU-BUCKET-AQUI --delete
aws cloudfront create-invalidation --distribution-id SEU_DISTRIBUTION_ID --paths "/*"
```

### 4. Deploy contínuo com GitHub Actions

O workflow em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builda e publica automaticamente a cada push na branch `main`, usando autenticação via OIDC (sem chaves de acesso estáticas no repositório).

Para funcionar, configure no repositório (`Settings → Secrets and variables → Actions`):

| Secret | Descrição |
|---|---|
| `AWS_ROLE_ARN` | ARN de uma IAM Role configurada para confiar no provedor OIDC do GitHub Actions, com permissão de escrita no bucket e de criar invalidações no CloudFront |
| `AWS_REGION` | Região do bucket, ex.: `us-east-1` |
| `AWS_S3_BUCKET` | Nome do bucket S3 |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | ID da distribuição CloudFront |

> Se preferir uma configuração mais simples para começar, dá para trocar a autenticação OIDC por um usuário IAM com `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY` como secrets — mas a role via OIDC é a prática recomendada hoje em dia e vale mais a pena mostrar em portfólio.

## Possíveis melhorias futuras

- Exportar lançamentos para CSV
- Filtro por período (mês/ano) e por categoria na listagem
- Sincronizar os dados em uma API própria (esse seria o par "backend" deste projeto)

## Licença

MIT — sinta-se à vontade para usar como base para o seu próprio projeto.
