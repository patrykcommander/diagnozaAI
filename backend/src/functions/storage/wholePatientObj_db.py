from src import session
from src.models.patientData_model import *
from src.models.wirowka_model import *

from src.functions.mapper.mapJSONtoPatientData import *
from src.functions.mapper.mapCsvToWirowka import *

from src.functions.extractJsonData.extract_json_fields import *


def createWholePatientObj(src_csv, src_json):
    #src_csv and src_json are objects of werkzeug.datastructures.fie_storage.FileStorage

    attributes = mapJSONtoPatientData(src_json)

    patientObj = Patient.newPatient(attributes["nr_pacjenta"])
    if isinstance(patientObj, tuple): # catch if user object has not been created
        return patientObj
    primary_key = patientObj.id
    
    statusJson = PatientData.newPatientData(primary_key, attributes)

    if statusJson[1] == 400:                                    # Creation failed with .JSON file
        session.delete(patientObj)
        session.commit()
        return {"message": f"Patient creation failed"}, 400

    if statusJson[1] != 400:
        try:
            attributes = mapCsvToWirowka(src_csv)
            statusCsv = Wirowka.newWirowkaObject(primary_key, attributes)
        except:
            statusCsv = ("Error while parsing .CSV file", 400)
    
    if statusJson[1] != 400 and statusCsv[1] == 400:            # CSV file is failing or has not been received by the server
        return {"message": f"Patient created only with .JSON data."}, 200
    
    if statusCsv[1] != 400 and statusJson[1] != 400:            # Both files are correct and full_data can be set to true
        session.query(Patient).filter_by(id = primary_key).update({'pelne_dane': True})
        session.commit()                            
        return {"message": "Patient created from both files"}, 200