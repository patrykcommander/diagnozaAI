from src import db, session
from sqlalchemy.orm import load_only
from sqlalchemy.dialects.postgresql import JSON
from src.models.patient_model import Patient
import json

class PatientData(db.Model):
    __tablename__               = "patientData"
    id                          = db.Column(db.Integer, primary_key=True)
    patient_primary_key         = db.Column(db.Integer, db.ForeignKey('patient.id', ondelete='CASCADE'), nullable=False)
    file_name                   = db.Column(db.String(), nullable=True, unique=False)
    src_json                    = db.Column(JSON, nullable=False)
    age                         = db.Column(db.Integer, nullable=True)
    plt                         = db.Column(db.Float, nullable=True)
    histology                   = db.Column(db.String(), nullable=True)
    ca125                       = db.Column(db.Float, nullable=True)
    operation_date              = db.Column(db.String(), nullable=True)
    tumor_type                  = db.Column(db.String(), nullable=True)
    menopausal_status           = db.Column(db.String(), nullable=True)
    

    def __repr__(self):
        return f"Patient_data ('{self.id}, pacjent {self.patient_primary_key}, j1 {self.j1}')"
    

    def as_dict(self):
        dataDict = {}
        drop = ["src_json"]
        for c in self.__table__.columns:
            if c.name not in drop:
                dataDict[c.name] = getattr(self, c.name)
        dataDict["json_file_name"] = dataDict.pop("file_name")
        return dataDict

    
    def fetch(patient_primary_key: int, nr_pacjenta: str):
        try:
            patientData = session.query(PatientData).filter_by(patient_primary_key=patient_primary_key).first()
            return patientData.as_dict()
        except:
            empty_dict = {
                    "id": None,
                    "patient_primary_key": None,
                    "file_name": None,
                    "src_json": None,
                    "age": None,
                    "plt": None,
                    "histology": None,
                    "ca125": None,
                    "operation_date": None,
                    "tumor_type": None,
                    "menopausal_status": None
                }
                # return {"message": f"Could not find PatientData object for patient {nr_pacjenta}"}, 404
            return empty_dict


    def getAttributes(patient_primary_key: int, attribute: str):  #attributes: list
        try:
            patientData = session.query(PatientData).filter_by(id=patient_primary_key).first()
            #patientData = patientData.as_dict()
            #patientData = dict((key, value) for key, value in patientData.items() if key in attributes)
            return getattr(patientData, attribute)
        except: 
            return None
        


    def update(patient_primary_key: int, attributes: dict): # dodać zerowanie innych parametrów, których nie ma w attributes!
        # same function used for substituting JSON file and updaing selected attributes, that is why there is a lot of fuss abour nr_pacjenta
        # nr_pacjenta only changed when new JSON file is received
        
        nr_pacjenta = None
        if "nr_pacjenta" in attributes.keys():
            nr_pacjenta = attributes["nr_pacjenta"]
            del attributes["nr_pacjenta"]
        try:
            patientDataObj = PatientData.query.filter_by(patient_primary_key=patient_primary_key).first()
            if patientDataObj:
                session.query(PatientData).filter_by(patient_primary_key=patient_primary_key).update(attributes)  ### catch if the query does not return any object

                if nr_pacjenta != None:
                    nr_pacjenta_update = {"nr_pacjenta": nr_pacjenta}
                    session.query(Patient).filter_by(id=patient_primary_key).update(nr_pacjenta_update)

                session.commit()
                return {"message": "Object PatientData has been updated"}, 200
        except:
            session.rollback()
            return {"message": "Error while updating PatientData object"}, 400

    
    def newPatientData(patient_primary_key: int, attributes: dict):
        if "nr_pacjenta" in attributes.keys():
            del attributes["nr_pacjenta"]
        try:
            patientDataObj = PatientData(  
                                            patient_primary_key     = patient_primary_key, 
                                            file_name               = attributes["file_name"], 
                                            src_json                = attributes["src_json"], 
                                            age                     = attributes['age'],
                                            plt                     = attributes['plt'],
                                            histology               = attributes['histology'],
                                            ca125                   = attributes['ca125'],
                                            operation_date          = attributes['operation_date'],
                                            tumor_type              = attributes['tumor_type']
                                        ) # PatientData(**attributes) -> prawdopodobnie kiedy bede dostepne wszystkie wartosci do inicjalizacji obiektu
            session.add(patientDataObj)
            session.commit()
            return {"message": "Object PatientData has been added to patient"}, 201
        except:
            session.rollback()
            return {"message": "Error while creating PatientData object for patient"}, 400
    

    def delete(patient_primary_key: int):
        try:
            #session.query(PatientData).filter_by(patient_primary_key=patient_primary_key).delete()
            session.query(Patient).filter_by(id=patient_primary_key).delete()
            session.commit()
            return {"message": "Object PatientData has been deleted"}, 200
        except:
            session.rollback()
            return {"message": "Error while deleting PatientData object"}, 400