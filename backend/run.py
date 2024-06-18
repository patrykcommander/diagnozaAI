from src import app, db
from src.models.patientData_model import PatientData
from src.models.patient_model import Patient
from src.models.wirowka_model import Wirowka
import argparse

parser = argparse.ArgumentParser(description="Create new tables in databse after the schema change")
parser.add_argument('--recreate',
                    '-r',
                    action='store_true',
                    help="switch, when defined, drops all tables and creates new ones")
parser.add_argument('--debug',
                    '-d',
                    action='store_true',
                    help="switch, when defined, app is run in debug mode")

args = parser.parse_args()

if __name__ == "__main__":    
    app.app_context().push()
    if args.recreate == True:
        db.drop_all()
        print("Dropping all tables")
    db.create_all()
    app.run(debug=args.debug)
