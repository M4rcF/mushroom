from flask import Blueprint, request, jsonify
from .utils import load_model, predict_input, predict_batch, save_log, get_metrics
from datetime import datetime
import subprocess
import sys
import os

predict_blueprint = Blueprint('predict', __name__)
model = load_model()

@predict_blueprint.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        prediction = predict_input(model, input_data)
        prediction['timestamp'] = datetime.now().isoformat()
        save_log(input_data, prediction)
        return jsonify(prediction)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@predict_blueprint.route('/predict/batch', methods=['POST'])
def predict_batch_route():
    try:
        input_list = request.get_json()
        results = predict_batch(model, input_list)
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@predict_blueprint.route('/metrics', methods=['GET'])
def metrics():
    return jsonify(get_metrics())

@predict_blueprint.route('/metrics/recalculate', methods=['POST'])
def recalculate_metrics():
    try:
        script_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'generate_metrics.py')
        if not os.path.exists(script_path):
            return jsonify({"error": "Script de geração de métricas não encontrado"}), 404
        result = subprocess.run(
            [sys.executable, script_path],
            capture_output=True,
            text=True,
            cwd=os.path.dirname(os.path.dirname(__file__))
        )
        if result.returncode == 0:
            updated_metrics = get_metrics()
            return jsonify({
                "message": "Métricas recalculadas com sucesso!",
                "metrics": updated_metrics
            })
        else:
            return jsonify({
                "error": "Erro ao recalcular métricas",
                "details": result.stderr
            }), 500
    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500


