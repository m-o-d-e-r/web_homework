
from api.utils.app import create_app


app = create_app()

if __name__ == "__main__":
    from api.apps.catalog.router import catalog_blueprint
    from api.apps.admin.router import admin_blueprint

    app.register_blueprint(catalog_blueprint)
    app.register_blueprint(admin_blueprint)

    print(app.url_map)
    app.run(port=8080, debug=True)
