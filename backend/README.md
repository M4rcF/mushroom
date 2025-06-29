# 🍄 Backend - Classificador de Cogumelos

API Flask para classificação de cogumelos usando Machine Learning.

## 🚀 Funcionalidades

- **Predição Individual**: Classificação de cogumelos únicos
- **Predição em Lote**: Processamento de múltiplos cogumelos
- **Métricas do Modelo**: Performance e estatísticas
- **Recálculo de Métricas**: Atualização dinâmica de performance
- **Documentação Swagger**: API documentada e interativa
- **Teste Automatizado**: Validação de qualidade com golden dataset

## 🛠️ Tecnologias

- **Python 3.8+**
- **Flask**: Framework web
- **Scikit-learn**: Machine Learning
- **Pandas**: Manipulação de dados
- **Joblib**: Serialização do modelo
- **Flasgger**: Documentação Swagger
- **PyTest**: Testes automatizados

## 📦 Instalação

### Opção 1: Usando Docker (Recomendado)

```bash
# Na raiz do projeto
docker-compose up backend

# Ou para build específico
docker-compose build backend
docker-compose up backend
```

A API estará disponível em: http://localhost:5000

### Documentação Swagger
Acesse a documentação interativa da API em: http://localhost:5000/apidocs

### Opção 2: Instalação Manual

#### Pré-requisitos
- Python 3.8+
- pip

#### Setup
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

pip install -r requirements.txt
```

#### Execução
```bash
python3 run.py
```

A API estará disponível em: http://localhost:5000

## 🌐 Endpoints

### GET /metrics
Retorna métricas do modelo treinado.

**Resposta:**
```json
{
  "accuracy": 1.0,
  "f1_score": 1.0,
  "precision": 1.0,
  "recall": 1.0,
  "model_type": "RandomForestClassifier",
  "dataset_size": 8124,
  "features_used": 21,
  "test_samples": 1625
}
```

### POST /predict
Predição individual de cogumelo.

**Request:**
```json
{
  "cap-shape": "x",
  "cap-surface": "s",
  "cap-color": "y",
  "bruises": "t",
  "odor": "p",
  "gill-attachment": "f",
  "gill-spacing": "c",
  "gill-size": "n",
  "gill-color": "k",
  "stalk-shape": "e",
  "stalk-root": "e",
  "stalk-surface-above-ring": "s",
  "stalk-surface-below-ring": "s",
  "stalk-color-above-ring": "w",
  "stalk-color-below-ring": "w",
  "veil-color": "w",
  "ring-number": "o",
  "ring-type": "p",
  "spore-print-color": "k",
  "population": "s",
  "habitat": "u"
}
```

**Resposta:**
```json
{
  "prediction": "poisonous",
  "edible": false,
  "poisonous": true,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### POST /predict/batch
Predição em lote de múltiplos cogumelos.

**Request:**
```json
[
  {
    "cap-shape": "x",
    "cap-surface": "s",
    "cap-color": "y",
    ...
  },
  {
    "cap-shape": "f",
    "cap-surface": "s",
    "cap-color": "y",
    ...
  }
]
```

**Resposta:**
```json
[
  {
    "prediction": "poisonous",
    "edible": false,
    "poisonous": true,
    "timestamp": "2024-01-01T12:00:00Z"
  },
  {
    "prediction": "edible",
    "edible": true,
    "poisonous": false,
    "timestamp": "2024-01-01T12:00:01Z"
  }
]
```

### POST /metrics/recalculate
Recalcula métricas do modelo.

**Resposta:**
```json
{
  "message": "Métricas recalculadas com sucesso",
  "metrics": {
    "accuracy": 1.0,
    "f1_score": 1.0,
    "precision": 1.0,
    "recall": 1.0
  }
}
```

## 📊 Modelo

### Características
- **Algoritmo**: Random Forest
- **Acurácia**: ~100%
- **Features**: 21 características morfológicas
- **Classes**: Comestível/Venenoso

### Dataset
- **Fonte**: UCI Machine Learning Repository
- **Amostras**: 8.124 cogumelos
- **Features**: 21 características categóricas
- **Split**: 80% treino, 20% teste

### Características Utilizadas
1. `cap-shape`: Forma do chapéu
2. `cap-surface`: Superfície do chapéu
3. `cap-color`: Cor do chapéu
4. `bruises`: Machucados
5. `odor`: Odor
6. `gill-attachment`: Anexo das lâminas
7. `gill-spacing`: Espaçamento das lâminas
8. `gill-size`: Tamanho das lâminas
9. `gill-color`: Cor das lâminas
10. `stalk-shape`: Forma do caule
11. `stalk-root`: Raiz do caule
12. `stalk-surface-above-ring`: Superfície do caule (acima do anel)
13. `stalk-surface-below-ring`: Superfície do caule (abaixo do anel)
14. `stalk-color-above-ring`: Cor do caule (acima do anel)
15. `stalk-color-below-ring`: Cor do caule (abaixo do anel)
16. `veil-color`: Cor do véu
17. `ring-number`: Número de anéis
18. `ring-type`: Tipo de anel
19. `spore-print-color`: Cor da impressão de esporos
20. `population`: População
21. `habitat`: Habitat

## 🧪 Teste Automatizado com Dataset

O sistema inclui testes automatizados que garantem a qualidade do modelo usando um conjunto de dados fixo (golden dataset). Isso evita regressão de performance quando o modelo é substituído.

### Como executar os testes
```bash
cd backend
python3 -m pytest test_model.py -v
```

### Dataset
- Conjunto de dados fixo para testes consistentes
- 10 exemplos representativos do dataset
- Evita variações aleatórias nos testes
- Garante que o modelo mantenha performance mínima

### Thresholds de Performance
- **Acurácia**: ≥ 0.90
- **F1-Score**: ≥ 0.80
- **Recall**: ≥ 0.65
- **Precisão**: ≥ 0.90
- **Balanceamento de classes**: tolerância de 75%

## 🔧 Configuração

### Variáveis de Ambiente
```bash
FLASK_ENV=development
FLASK_DEBUG=1
```

### Arquivos Importantes
- `run.py`: Aplicação principal
- `mushroom_model.joblib`: Modelo treinado
- `model_metrics.json`: Métricas do modelo
- `generate_metrics.py`: Script para gerar métricas
- `test_model.py`: Testes automatizados
- `swagger_template.json`: Documentação da API

## 📁 Estrutura

```
backend/
├── run.py                 # Aplicação principal
├── app/                   # Módulo da aplicação
│   ├── __init__.py       # Configuração Flask
│   ├── routes.py         # Rotas da API
│   └── models.py         # Modelos de dados
├── test_model.py         # Testes automatizados
├── generate_metrics.py   # Geração de métricas
├── requirements.txt      # Dependências Python
├── mushroom_model.joblib # Modelo treinado
├── model_metrics.json   # Métricas do modelo
└── prediction_log.csv   # Log de predições
```
