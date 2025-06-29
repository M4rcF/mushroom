import joblib
import pandas as pd
import os
import json

def load_model(path='mushroom_model.joblib'):
    return joblib.load(path)

def predict_input(model, input_data):
    df = pd.DataFrame([input_data])
    pred = model.predict(df)[0]
    prediction_text = 'edible' if pred == 'e' else 'poisonous'
    return {
        "prediction": prediction_text,
        "edible": pred == 'e',
        "poisonous": pred == 'p'
    }

def predict_batch(model, input_list):
    df = pd.DataFrame(input_list)
    preds = model.predict(df)
    return [{
        "prediction": 'edible' if p == 'e' else 'poisonous',
        "edible": p == 'e',
        "poisonous": p == 'p'
    } for p in preds]

def save_log(input_data, prediction, log_path='prediction_log.csv'):
    df = pd.DataFrame([{**input_data, **prediction}])
    header = not os.path.exists(log_path)
    df.to_csv(log_path, mode='a', index=False, header=header)

def get_metrics(metrics_path='model_metrics.json'):
    if os.path.exists(metrics_path):
        with open(metrics_path) as f:
            return json.load(f)
    return {
        "accuracy": None,
        "f1_score": None,
        "precision": None,
        "created_at": None,
        "warning": "Arquivo de métricas não encontrado."
    }


