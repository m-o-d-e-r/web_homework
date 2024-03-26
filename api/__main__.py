
from api.utils.app import create_app
from api.utils.config_reader import get_config


app = create_app()

if __name__ == "__main__":
    from api.apps.catalog.router import catalog_blueprint
    from api.apps.admin.router import admin_blueprint

    app.register_blueprint(catalog_blueprint)
    app.register_blueprint(admin_blueprint)

    print(app.url_map)
    app.run(host="0.0.0.0", port=get_config().API_RUN_PORT, debug=True)
