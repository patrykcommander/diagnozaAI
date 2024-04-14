from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_swagger_ui import get_swaggerui_blueprint
from flask_restful import Api
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

# Call factory function to create our blueprint
swaggerui_blueprint = get_swaggerui_blueprint(
    Config.SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
    Config.API_URL,
    config={  # Swagger UI config overrides
        'app_name': "diagnozaAI"
    }
)

app.register_blueprint(swaggerui_blueprint)

from src.routes.inProgress import playground
from src.routes.patients import patients_routes

'''
import os
import yaml
yaml_files_dir = os.listdir(Config.SWAGGER_YAML)

# Merge the contents of the YAML files into a single dictionary
merged_spec = {}
for file_path in yaml_files_dir:
    file_path = os.path.join(Config.SWAGGER_YAML, file_path)
    with open(file_path, 'r') as file:
        content = yaml.safe_load(file)
        merged_spec.update(content)

# Create a temporary YAML file with the merged content
temp_yaml_path = os.path.join(Config.SWAGGER_YAML, "merged.yml")
with open(temp_yaml_path, 'w') as temp_file:
    yaml.dump(merged_spec, temp_file, default_flow_style=False)






postgres commands

psql -h <host_name/ip_addr> -p <port> -U <username> -d <database> -> connect to database

\l - lists all dbs

\c <database> -> switch to the database <database>

\dt -> list all tables id database

CREATE DATABASE <name>; the comma here is necessary!

DROP TABLE <tblname>;

'''
