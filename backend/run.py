from app import create_app
from app.routes import predict_blueprint
from flask_cors import CORS
from flasgger import Swagger
import os
import subprocess
import sys

def generate_metrics_on_startup():
    try:
        metrics_file = 'model_metrics.json'

        if not os.path.exists(metrics_file):
            print("Arquivo de métricas não encontrado. Gerando automaticamente...")

            script_path = os.path.join(os.path.dirname(__file__), 'generate_metrics.py')

            if os.path.exists(script_path):
                result = subprocess.run([sys.executable, script_path],
                                      capture_output=True, text=True, cwd=os.path.dirname(__file__))

                if result.returncode == 0:
                    print("Métricas geradas automaticamente!")
                else:
                    print("Erro ao gerar métricas automaticamente. Usando métricas padrão.")
            else:
                print("Script de geração de métricas não encontrado.")
        else:
            print("Arquivo de métricas encontrado.")

    except Exception as e:
        print(f"Erro ao verificar métricas: {e}")

generate_metrics_on_startup()

app = create_app()
app.config['SWAGGER'] = { 'title': 'Classificador de Cogumelos API', 'uiversion': 3 }

swagger_config = {
   'headers': [],
   'specs': [
      {
         'endpoint': 'apisec_1',
         'route': '/apispec_1.json',
         'rule_filter': lambda rule: True,
         'model_filter': lambda tag: True,
      }
   ],
   'static_url_path': '/flasgger_static',
   'swagger_ui': True,
}

Swagger(app, config=swagger_config, template_file="swagger_template.json")

CORS(app)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


