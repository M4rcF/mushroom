# 🍄 Classificador de Cogumelos

Sistema completo de classificação de cogumelos usando Machine Learning, com frontend React e backend Flask.

## 📂 Estrutura do Projeto

```
mushroom/
├── backend/   # API Flask e modelo ML
├── frontend/  # Interface web React
├── mushroom_classification_colab.ipynb  # Notebook de desenvolvimento do modelo
└── README.md  # Este arquivo
```

- [Documentação Backend](backend/README.md)
- [Documentação Frontend](frontend/README.md)

## 🚀 Funcionalidades Principais

- Predição individual e em lote de cogumelos
- Upload de CSV para classificação em massa
- Visualização de métricas do modelo
- Internacionalização (português e inglês)
- Interface responsiva e moderna (Chakra UI)
- Documentação Swagger da API
- Teste automatizado

## 🛠️ Tecnologias

- **Backend:** Python, Flask, Scikit-learn, Pandas, Flasgger
- **Frontend:** React, TypeScript, Vite, Chakra UI
- **Containerização:** Docker, Docker Compose
- **Testes:** PyTest, Dataset

## 📊 Notebook de Desenvolvimento do Modelo

O arquivo `mushroom_classification_colab.ipynb` contém o processo completo de desenvolvimento do modelo de Machine Learning usado no sistema.

### 🎯 Para que serve?

Este notebook demonstra:
- **Carregamento e limpeza** do dataset de cogumelos da UCI
- **Pré-processamento** dos dados (encoding categórico)
- **Comparação de algoritmos** (Naive Bayes, Decision Tree, KNN, SVM)
- **Avaliação de performance** com métricas (Accuracy, Precision, Recall, F1-Score)
- **Exportação do modelo** treinado para uso na API

### 🚀 Como executar?

#### Google Colab (Recomendado)
1. Abra o [Google Colab](https://colab.research.google.com/)
2. Faça upload do arquivo `mushroom_classification_colab.ipynb`
3. Execute as células sequencialmente
4. O modelo será salvo automaticamente como `mushroom_model.joblib`

### 🔄 Após executar o notebook
1. O arquivo `mushroom_model.joblib` será gerado
2. Copie este arquivo para a pasta `backend/`
3. O modelo estará pronto para uso na API

## 🧪 Teste Automatizado

O sistema inclui testes automatizados com PyTest que garantem a qualidade do modelo:

### Dataset
- Conjunto de dados fixo para testes consistentes
- Evita regressão de performance ao trocar modelos
- Thresholds definidos para métricas mínimas

### Como executar os testes
```bash
cd backend
python3 -m pytest test_model.py -v
```

### Métricas testadas
- Acurácia: ≥ 0.90
- F1-Score: ≥ 0.80
- Recall: ≥ 0.65
- Precisão: ≥ 0.90
- Balanceamento de classes: tolerância de 75%

## 📦 Instalação e Execução

### 1. Usando Docker Compose (Recomendado)

```bash
git clone <repo>
cd mushroom
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend:  http://localhost:5000
- **Swagger Docs**: http://localhost:5000/apidocs

#### Parar os containers
```bash
docker-compose down
```

### 2. Execução Manual (Desenvolvimento)

#### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows
pip install -r requirements.txt
python3 run.py
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:3000

## 🔧 Configuração

### Variáveis de Ambiente

**Backend:**
```
FLASK_ENV=development
FLASK_DEBUG=1
```

**Frontend:**
```
VITE_API_URL=http://localhost:5000
```

## 📊 Exemplo de CSV para Predição em Lote

```csv
cap-shape,cap-surface,cap-color,bruises,odor,gill-attachment,gill-spacing,gill-size,gill-color,stalk-shape,stalk-root,stalk-surface-above-ring,stalk-surface-below-ring,stalk-color-above-ring,stalk-color-below-ring,veil-color,ring-number,ring-type,spore-print-color,population,habitat
x,s,y,t,p,f,c,n,k,e,e,s,s,w,w,w,o,p,k,s,u
```

## 🌐 Endpoints Principais

- `GET /metrics` - Métricas do modelo
- `POST /predict` - Predição individual
- `POST /predict/batch` - Predição em lote
- `POST /metrics/recalculate` - Recalcular métricas

## 📚 Documentação Adicional

- [Documentação da API](http://localhost:5000/apidocs)
- [Notebook de Desenvolvimento](mushroom_classification_colab.ipynb)



