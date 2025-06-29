import pytest
import joblib
import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
import json
import os

PERFORMANCE_THRESHOLDS = {
    'accuracy': 0.90,
    'f1_score': 0.80,
    'precision': 0.90,
    'recall': 0.65
}

GOLDEN_DATASET = [
    {
        'cap-shape': 'x', 'cap-surface': 's', 'cap-color': 'n', 'bruises': 't', 'odor': 'p',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'n', 'gill-color': 'k',
        'stalk-shape': 'e', 'stalk-root': 'e', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'k', 'population': 's', 'habitat': 'u',
        'class': 'p'
    },
    {
        'cap-shape': 'f', 'cap-surface': 's', 'cap-color': 'y', 'bruises': 't', 'odor': 'a',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'b', 'gill-color': 'k',
        'stalk-shape': 'e', 'stalk-root': 'c', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'n', 'population': 'n', 'habitat': 'g',
        'class': 'e'
    },
    {
        'cap-shape': 'x', 'cap-surface': 's', 'cap-color': 'y', 'bruises': 't', 'odor': 'a',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'b', 'gill-color': 'k',
        'stalk-shape': 'e', 'stalk-root': 'c', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'n', 'population': 'n', 'habitat': 'g',
        'class': 'e'
    },
    {
        'cap-shape': 'b', 'cap-surface': 's', 'cap-color': 'w', 'bruises': 't', 'odor': 'l',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'b', 'gill-color': 'n',
        'stalk-shape': 'e', 'stalk-root': 'c', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'n', 'population': 'n', 'habitat': 'm',
        'class': 'e'
    },
    {
        'cap-shape': 'x', 'cap-surface': 'y', 'cap-color': 'w', 'bruises': 't', 'odor': 'a',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'b', 'gill-color': 'n',
        'stalk-shape': 'e', 'stalk-root': 'c', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'n', 'population': 'n', 'habitat': 'u',
        'class': 'e'
    },
    {
        'cap-shape': 'x', 'cap-surface': 's', 'cap-color': 'g', 'bruises': 'f', 'odor': 'n',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'n', 'gill-color': 'n',
        'stalk-shape': 'e', 'stalk-root': 'e', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'k', 'population': 's', 'habitat': 'u',
        'class': 'p'
    },
    {
        'cap-shape': 'x', 'cap-surface': 'y', 'cap-color': 'k', 'bruises': 't', 'odor': 's',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'n', 'gill-color': 'k',
        'stalk-shape': 'e', 'stalk-root': 'e', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 's', 'population': 'o', 'habitat': 'u',
        'class': 'p'
    },
    {
        'cap-shape': 'f', 'cap-surface': 's', 'cap-color': 'n', 'bruises': 't', 'odor': 'a',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'b', 'gill-color': 'k',
        'stalk-shape': 'e', 'stalk-root': 'c', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'n', 'population': 'n', 'habitat': 'g',
        'class': 'e'
    },
    {
        'cap-shape': 'k', 'cap-surface': 's', 'cap-color': 'n', 'bruises': 't', 'odor': 'a',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'b', 'gill-color': 'n',
        'stalk-shape': 'e', 'stalk-root': 'c', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'n', 'population': 'n', 'habitat': 'm',
        'class': 'e'
    },
    {
        'cap-shape': 'x', 'cap-surface': 's', 'cap-color': 'e', 'bruises': 't', 'odor': 'a',
        'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'b', 'gill-color': 'n',
        'stalk-shape': 'e', 'stalk-root': 'c', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
        'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
        'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'n', 'population': 'n', 'habitat': 'g',
        'class': 'e'
    }
]

class TestMushroomModelGolden:

    @pytest.fixture(scope="class")
    def model(self):
        model_path = "mushroom_model.joblib"
        if not os.path.exists(model_path):
            pytest.skip(f"Modelo não encontrado em {model_path}")
        return joblib.load(model_path)

    @pytest.fixture(scope="class")
    def golden_dataset(self):
        df = pd.DataFrame(GOLDEN_DATASET)
        X = df.drop('class', axis=1)
        y = df['class']
        return X, y

    def test_model_loading(self, model):
        assert model is not None, "Modelo não foi carregado"
        assert hasattr(model, 'predict'), "Modelo não possui método predict"
        assert hasattr(model, 'predict_proba'), "Modelo não possui método predict_proba"

    def test_model_prediction_shape(self, model, golden_dataset):
        X_test, y_test = golden_dataset

        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)

        assert y_pred.shape == y_test.shape, f"Forma das predições incorreta: {y_pred.shape} vs {y_test.shape}"
        assert y_pred_proba.shape[0] == y_test.shape[0], "Número de amostras nas probabilidades incorreto"
        assert y_pred_proba.shape[1] == 2, "Número de classes nas probabilidades incorreto"

    def test_model_prediction_values(self, model, golden_dataset):
        X_test, y_test = golden_dataset

        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)

        valid_classes = ['e', 'p']
        assert all(pred in valid_classes for pred in y_pred), f"Predições contêm valores inválidos: {set(y_pred)}"

        assert np.all(y_pred_proba >= 0), "Probabilidades negativas encontradas"
        assert np.all(y_pred_proba <= 1), "Probabilidades maiores que 1 encontradas"
        assert np.allclose(y_pred_proba.sum(axis=1), 1.0), "Soma das probabilidades não é 1"

    def test_model_accuracy_threshold(self, model, golden_dataset):
        X_test, y_test = golden_dataset

        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)

        assert accuracy >= PERFORMANCE_THRESHOLDS['accuracy'], \
            f"Acurácia {accuracy:.4f} está abaixo do threshold {PERFORMANCE_THRESHOLDS['accuracy']}"

        print(f"Acurácia: {accuracy:.4f} (threshold: {PERFORMANCE_THRESHOLDS['accuracy']})")

    def test_model_f1_score_threshold(self, model, golden_dataset):
        X_test, y_test = golden_dataset

        y_pred = model.predict(X_test)
        f1 = f1_score(y_test, y_pred, pos_label='p')

        assert f1 >= PERFORMANCE_THRESHOLDS['f1_score'], \
            f"F1-Score {f1:.4f} está abaixo do threshold {PERFORMANCE_THRESHOLDS['f1_score']}"

        print(f"F1-Score: {f1:.4f} (threshold: {PERFORMANCE_THRESHOLDS['f1_score']})")

    def test_model_precision_threshold(self, model, golden_dataset):
        X_test, y_test = golden_dataset

        y_pred = model.predict(X_test)
        precision = precision_score(y_test, y_pred, pos_label='p')

        assert precision >= PERFORMANCE_THRESHOLDS['precision'], \
            f"Precisão {precision:.4f} está abaixo do threshold {PERFORMANCE_THRESHOLDS['precision']}"

        print(f"Precisão: {precision:.4f} (threshold: {PERFORMANCE_THRESHOLDS['precision']})")

    def test_model_recall_threshold(self, model, golden_dataset):
        X_test, y_test = golden_dataset

        y_pred = model.predict(X_test)
        recall = recall_score(y_test, y_pred, pos_label='p')

        assert recall >= PERFORMANCE_THRESHOLDS['recall'], \
            f"Recall {recall:.4f} está abaixo do threshold {PERFORMANCE_THRESHOLDS['recall']}"

        print(f"Recall: {recall:.4f} (threshold: {PERFORMANCE_THRESHOLDS['recall']})")

    def test_model_class_balance(self, model, golden_dataset):
        X_test, y_test = golden_dataset

        y_pred = model.predict(X_test)

        pred_dist = pd.Series(y_pred).value_counts()
        true_dist = pd.Series(y_test).value_counts()

        pred_ratio = pred_dist['e'] / pred_dist['p']
        true_ratio = true_dist['e'] / true_dist['p']

        tolerance = 0.75
        ratio_diff = abs(pred_ratio - true_ratio) / true_ratio

        assert ratio_diff <= tolerance, \
            f"Modelo muito enviesado: razão predita {pred_ratio:.2f} vs real {true_ratio:.2f} (diff: {ratio_diff:.2f})"

        print(f"Balanceamento de classes: razão predita {pred_ratio:.2f} vs real {true_ratio:.2f}")

    def test_model_confidence_scores(self, model, golden_dataset):
        X_test, y_test = golden_dataset

        y_pred_proba = model.predict_proba(X_test)

        max_proba = np.max(y_pred_proba, axis=1)
        high_confidence_ratio = np.mean(max_proba >= 0.8)

        assert high_confidence_ratio >= 0.6, \
            f"Poucas predições com alta confiança: {high_confidence_ratio:.2f} < 0.6"

        print(f"Predições com alta confiança: {high_confidence_ratio:.2f}")

    def test_model_consistency(self, model, golden_dataset):
        X_test, y_test = golden_dataset

        predictions = []
        for _ in range(5):
            pred = model.predict(X_test.iloc[:5])
            predictions.append(pred)

        for i in range(1, len(predictions)):
            assert np.array_equal(predictions[0], predictions[i]), \
                f"Predições inconsistentes na iteração {i}"

        print("Modelo é consistente em predições repetidas")

    def test_model_edge_cases(self, model):
        single_sample = pd.DataFrame([{
            'cap-shape': 'x', 'cap-surface': 's', 'cap-color': 'n', 'bruises': 't', 'odor': 'p',
            'gill-attachment': 'f', 'gill-spacing': 'c', 'gill-size': 'n', 'gill-color': 'k',
            'stalk-shape': 'e', 'stalk-root': 'e', 'stalk-surface-above-ring': 's', 'stalk-surface-below-ring': 's',
            'stalk-color-above-ring': 'w', 'stalk-color-below-ring': 'w', 'veil-color': 'w',
            'ring-number': 'o', 'ring-type': 'p', 'spore-print-color': 'k', 'population': 's', 'habitat': 'u'
        }])

        try:
            pred = model.predict(single_sample)
            proba = model.predict_proba(single_sample)

            assert len(pred) == 1, "Predição única deve retornar array com 1 elemento"
            assert proba.shape == (1, 2), "Probabilidades devem ter forma (1, 2)"

            print("Modelo funciona com amostra única")
        except Exception as e:
            pytest.fail(f"Modelo falhou com amostra única: {e}")

    def test_metrics_file_exists(self):
        metrics_file = "model_metrics.json"

        assert os.path.exists(metrics_file), f"Arquivo de métricas {metrics_file} não encontrado"

        try:
            with open(metrics_file, 'r') as f:
                metrics = json.load(f)

            required_keys = ['accuracy', 'f1_score', 'precision', 'recall', 'model_type']
            for key in required_keys:
                assert key in metrics, f"Chave {key} não encontrada no arquivo de métricas"

            print("Arquivo de métricas é válido")
        except Exception as e:
            pytest.fail(f"Erro ao ler arquivo de métricas: {e}")

def test_performance_regression():
    metrics_file = "model_metrics.json"

    if os.path.exists(metrics_file):
        with open(metrics_file, 'r') as f:
            metrics = json.load(f)

        assert metrics['accuracy'] >= 0.85, f"Acurácia muito baixa: {metrics['accuracy']}"
        assert metrics['f1_score'] >= 0.85, f"F1-Score muito baixo: {metrics['f1_score']}"

        print(f"Teste de regressão passou - Acurácia: {metrics['accuracy']:.4f}, F1: {metrics['f1_score']:.4f}")

