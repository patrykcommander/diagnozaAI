USER="postgres"
PASSWORD="password"
SVR_ADDRESS="localhost"
PORT="5432"

DB_URL = 'postgresql+psycopg2://{user}:{pw}@{ipv4}:{port}/diagnozaAI'.format(user=USER,pw=PASSWORD, ipv4=SVR_ADDRESS, port=PORT)

class Config:
    DEBUG = False
    TESTING = False
    SESSION_COOKIE_SECURE=False
    SQLALCHEMY_DATABASE_URI = DB_URL
    SWAGGER_URL = '/api'
    API_URL = '/static/swagger.yml' 