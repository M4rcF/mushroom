# 🍄 Frontend - Classificador de Cogumelos

Interface web para classificação de cogumelos usando React e TypeScript.

## 🚀 Funcionalidades

- **Predição Individual**: Formulário completo para classificação única
- **Predição em Lote**: Upload de arquivos CSV com drag & drop
- **Métricas do Modelo**: Dashboard com performance e estatísticas
- **Internacionalização**: Suporte para português e inglês
- **Interface Responsiva**: Design moderno com Chakra UI
- **Integração com Backend**: Comunicação completa com API Flask

## 🛠️ Tecnologias

- **React 18** com TypeScript
- **Vite**: Build tool
- **Chakra UI**: Componentes
- **React Router**: Navegação
- **i18next**: Internacionalização
- **Axios**: Cliente HTTP

## 📦 Instalação

### Opção 1: Usando Docker (Recomendado)

```bash
# Na raiz do projeto
docker-compose up frontend

# Ou para build específico
docker-compose build frontend
docker-compose up frontend
```

A aplicação estará disponível em: http://localhost:3000

### Opção 2: Instalação Manual

#### Pré-requisitos
- Node.js 16+
- npm ou yarn

#### Setup
```bash
npm install
```

#### Execução
```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

## 🎯 Funcionalidades Detalhadas

### Predição Individual
- Formulário completo com 21 características
- Validação em tempo real
- Resultado com confiança
- Interface organizada por seções

### Predição em Lote
- Upload de arquivos CSV
- Drag & drop interface
- Tabela de resultados
- Modal de detalhes por cogumelo
- Contadores de comestíveis/venenosos

### Métricas do Modelo
- Dashboard de performance
- Gráficos de distribuição
- Informações do modelo
- Recálculo de métricas

## 🌐 Internacionalização

### Idiomas Suportados
- **Português** (padrão)
- **Inglês**

### Estrutura de Traduções
```
src/i18n/locales/
├── pt.json    # Português
└── en.json    # Inglês
```

### Seletor de Idioma
- Localizado no cabeçalho
- Mudança instantânea
- Persistência no localStorage

## 🎨 Design System

### Chakra UI
- Componentes consistentes
- Tema personalizado
- Responsividade automática
- Acessibilidade integrada

### Cores
- **Primária**: Teal (#319795)
- **Secundária**: Green (#38A169)
- **Aviso**: Orange (#DD6B20)
- **Erro**: Red (#E53E3E)

### Layout
- Grid responsivo
- Cards organizados
- Espaçamento consistente
- Tipografia hierárquica

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/           # Componentes React
│   │   ├── SinglePredictionForm/
│   │   ├── BatchPredictionForm/
│   │   └── MetricsDisplay/
│   ├── hooks/               # Hooks customizados
│   │   └── useTranslations.ts
│   ├── i18n/               # Internacionalização
│   │   ├── locales/
│   │   └── config.ts
│   ├── services/           # Serviços API
│   │   └── api.ts
│   ├── types/              # Tipos TypeScript
│   │   └── mushroom.ts
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Ponto de entrada
├── public/                 # Arquivos estáticos
├── package.json            # Dependências
├── vite.config.ts          # Configuração Vite
├── tsconfig.json           # Configuração TypeScript
└── README.md              # Este arquivo
```

## 🔧 Configuração

### Variáveis de Ambiente
```bash
VITE_API_URL=http://localhost:5000
```

## 📊 Componentes Principais

### SinglePredictionForm
- Formulário de 21 campos
- Validação completa
- Resultado visual
- Reset automático

### BatchPredictionForm
- Upload de arquivos
- Processamento em lote
- Tabela de resultados
- Modal de detalhes

### MetricsDisplay
- Dashboard de métricas
- Gráficos interativos
- Recálculo dinâmico
- Informações do modelo

## 🔌 Integração com API

### Endpoints Utilizados
- `GET /metrics` - Métricas do modelo
- `POST /predict` - Predição individual
- `POST /predict/batch` - Predição em lote
- `POST /metrics/recalculate` - Recalcular métricas

### Tratamento de Erros
- Toast notifications
- Fallback states
- Error boundaries
- Retry logic

### Comunicação com Backend
- Cliente HTTP configurado
- Interceptors para tratamento de erros
- Timeout configurado
- Headers apropriados

## 🧪 Testes

### Executar Testes
```bash
npm run test
npm run test:coverage
```

### Tipos de Teste
- Unit tests para componentes
- Integration tests para serviços
- E2E tests (se configurado)

### Cobertura de Testes
- Componentes React
- Hooks customizados
- Serviços de API
- Utilitários

## 🐳 Docker

### Build da Imagem
```bash
docker build -t mushroom-frontend .
```

### Executar Container
```bash
docker run -p 3000:3000 mushroom-frontend
```

### Desenvolvimento com Docker
```bash
# Com volumes para hot reload
docker run -p 3000:3000 -v $(pwd):/app mushroom-frontend
```
