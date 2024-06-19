from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_swagger_ui import get_swaggerui_blueprint
#from flask_restful import Api
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
#api = Api(app)
engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

swaggerui_blueprint = get_swaggerui_blueprint(
    Config.SWAGGER_URL,
    Config.API_URL,
    config={
        'app_name': "diagnozaAI"
    }
)

app.register_blueprint(swaggerui_blueprint)

from src.routes.inProgress import playground
from src.routes.patients import patients_routes
