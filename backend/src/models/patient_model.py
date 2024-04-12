from src import db, session
from datetime import datetime
from sqlalchemy import Boolean
import json , csv, io


class Patient(db.Model):
    __tablename__ = "patient"
    id = db.Column(db.Integer, primary_key=True)
    nr_pacjenta = db.Column(db.String(), unique=True, nullable=False)
    data_dodania = db.Column(db.DateTime(), nullable=False, default=datetime.now())
    patient_json = db.relationship('PatientData', backref='patient', lazy=True)
    patient_csv = db.relationship('Wirowka', backref='patient', lazy=True)
    pelne_dane = db.Column(Boolean, nullable=False, default=False)

    def __repr__(self):
        return f"Pacjent ('{self.id}, {self.nr_pacjenta}, {self.data_dodania}')"
    
    
    def newPatient(nr_pacjenta: str):
        try:  
            patientObj = Patient(nr_pacjenta=nr_pacjenta)
            session.add(patientObj)
            session.commit()
            print("test")
            return patientObj
        except:
            session.rollback()
            return {"message": "Error while creating the Patient object"}, 400
        
    
    def fetchAllPatients():
        from src.models.patientData_model import PatientData
        patients = Patient.query.all()
        allInJSON = []

        for patient in patients:
            patientDict =   { 
                                "patientId":        patient.nr_pacjenta, 
                                "createdAt":        patient.data_dodania.strftime("%d/%m/%Y, %H:%M:%S"), 
                                #"dane pacjenta":   "" ,
                                #"wirowka":         "", 
                                "isFullData":       patient.pelne_dane,
                            }
            
            try:
                patientDict["tumorType"] = PatientData.getAttributes(patient.id, attribute="tumor_type")
            except:
                patientDict["tumorType"] = None
            '''
            try:
                patientDict["dane pacjenta"] = patient.patient_json[0].src_json
            except:
                patientDict["dane pacjenta"] = None
            try:
                patientDict["wirowka"] = patient.patient_csv[0].csv_to_json
            except:
                patientDict["wirowka"] = None
            '''

            temp = json.dumps(patientDict)

            allInJSON.append(temp)

        return allInJSON


    def fetchPatient(nr_pacjenta: str, fetchEmpty: bool, direction: int):                          ################ CHANGE FILTER METHOD!!!!! ##################
        from src.models.patientData_model import PatientData
        from src.models.wirowka_model import Wirowka
        #engine = create_engine(DB_URL)
        #session = Session(engine)
        #patient_id = session.query(Patient).filter_by(nr_pacjenta = int(nr_pacjenta)).first().id

        patient = Patient.query.filter(Patient.nr_pacjenta == nr_pacjenta).first()
        
        if patient == None:
            return {'message': f"No patient found with nr_pacjenta {nr_pacjenta}"}, 404

        if fetchEmpty == True:
            if patient:
                patient_primary_key = patient.id
                if direction == -1:
                    patient = Patient.query.filter((Patient.id < patient_primary_key) & (Patient.pelne_dane == False)).order_by(Patient.id.desc()).first()  #db.session.query....
                    # filtr zwraca tablice rekordow, ale w bazie danych przeszukuje od gory do dolu i dopisuje po kolei, wiec trzeb znalezc ostatni item 
                elif direction == 1:
                    patient = session.query(Patient).filter(Patient.id > patient_primary_key, Patient.pelne_dane == False).first()
                else:
                    patient = None

            if patient == None:
                return {'patientId': ""}, 404
            else: 
                return {'patientId': patient.nr_pacjenta}, 200
            
        patientDict =   { 
                            "id":                       patient.id,
                            "nr_pacjenta":              patient.nr_pacjenta, 
                            "data_dodania":             patient.data_dodania.strftime("%d/%m/%Y, %H:%M:%S"), 
                            "pelne_dane":               patient.pelne_dane,
                            "dane_pacjenta":            PatientData.fetch(patient_primary_key=patient.id, nr_pacjenta=patient.nr_pacjenta),
                            "wirowka":                  Wirowka.fetch(patient_primary_key=patient.id, nr_pacjenta=patient.nr_pacjenta)
                        }

        patientDict.pop("id")
        patientDict["dane_pacjenta"].pop("patient_primary_key")
        patientDict["dane_pacjenta"].pop("id")
        if patientDict["wirowka"] != []:
            patientDict["wirowka"].pop("patient_primary_key")
            patientDict["wirowka"].pop("id")

        patientObj = json.dumps(patientDict)
        return patientObj, 200


    def savePatientToCsv(nr_pacjenta: str):
        patientObj = Patient.query.filter_by(nr_pacjenta = nr_pacjenta).first()
        patientData = patientObj.patient_json[0]
        try:
            patientWirowka = patientObj.patient_csv[0]
        except:
            patientWirowka = None
        
        output = io.StringIO()
        writer = csv.writer(output, delimiter=',')


        dropColnames = ["id", "pelne_dane", "patient_primary_key", "src_json", "binary", "csv_to_json", "csv_binary"]
        colNames = []
        #test = bytes(patientObj.__table__.columns[0].name, 'utf-8')
        #test =  io.BytesIO(test)
        patientObjColNames = [column.name for column in patientObj.__table__.columns if column.name not in dropColnames]
        patientDataColNames = [column.name for column in patientData.__table__.columns if column.name not in dropColnames]
        if patientWirowka != None:
            patientWirowkaColNames = [column.name for column in patientWirowka.__table__.columns if column.name not in dropColnames]
            
        
        # substitute the name of the column (for the Wirowka and patientData it is the same -> file_name, so we have to distinguish them from one another)
        patientDataColNames[0] = "json_file_name"
        if patientWirowka != None:
            patientWirowkaColNames[0] = "csv_file_name"

        colNames.extend(patientObjColNames)
        colNames.extend(patientDataColNames)
        if patientWirowka != None:
            colNames.extend(patientWirowkaColNames)

        writer.writerow(colNames)

        fillRow = []

        for colName in patientObjColNames:
            attribute = getattr(patientObj, colName)
            if isinstance(attribute, (datetime)):
                attribute = attribute.strftime("%d/%m/%y")

            fillRow.append(attribute)


        for colName in patientDataColNames:
            if colName == "json_file_name":
                colName = "file_name"

            attribute = getattr(patientData, colName)

            if isinstance(attribute, (datetime)):
                attribute = attribute.strftime("%d/%m/%y")

            elif isinstance(attribute, (int)):
                attribute = str(attribute)

            elif attribute == None:
                attribute = "-1"

            fillRow.append(attribute)

        if patientWirowka != None:
            for colName in patientWirowkaColNames:
                if colName == "csv_file_name":
                    colName = "file_name"

                attribute = getattr(patientWirowka, colName)
                if isinstance(attribute, (datetime)):
                    attribute = attribute.strftime("%d/%m/%y")

                elif isinstance(attribute, (int)):
                    attribute = str(attribute)
                
                elif attribute == None:
                    attribute = "-1"

                fillRow.append(attribute)

        writer.writerow(fillRow)

        #for row in patientObj:                # can iterate over patientObj list, in this case there is only one patient
        #writer.writerow([getattr(patientObj, colName) for colName in patientObjColNames])

        #for row in patientData:                # can iterate over patientObj list, in this case there is only one patient
        #writer.writerow([getattr(patientData, colName) for colName in patientDataColNames])

        #for row in patientWirowka:                # can iterate over patientObj list, in this case there is only one patient
        #writer.writerow([getattr(patientWirowka, colName) for colName in patientWirowkaColNames])

        return output



