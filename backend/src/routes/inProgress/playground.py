from src import app
from flask import Response, request
from src.models.patient_model import *
import config, subprocess, datetime


# Requires the postgresql-client tools installed
@app.route("/snapshot")
def testRoute():
    date = datetime.datetime.utcnow()
    dump_file_path = "/snapshots/date_" + date.strftime("%d-%m-%Y") + ".sql"
    pg_dump_cmd = [
        "pg_dumpall",
        f"-h {config.SVR_ADDRESS}",
        f"-p {config.PORT}",
        f"-U {config.USER}",
        f"--no-password",
        "--file",
        dump_file_path# how to pass this value?
    ]
    try:
        subprocess.run(pg_dump_cmd)
        message = "Command to create a snapshot was sent to the PostgreSQL"
        status = 200
    except Exception as e:
        message = str(e)
        status = 500

    return {"message": message}, status


