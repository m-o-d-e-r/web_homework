
from api.utils.app import create_app
from api.utils.config_reader import get_config


app = create_app()

if __name__ == "__main__":
    print(app.url_map)
    app.run(host="0.0.0.0", port=get_config().API_RUN_PORT, debug=True)
