from src import db, session
from sqlalchemy.dialects.postgresql import JSON
from flask import jsonify
import json

class Wirowka(db.Model):
    __tablename__ = "wirowka"
    id                          = db.Column(db.Integer, primary_key=True)
    patient_primary_key         = db.Column(db.Integer, db.ForeignKey('patient.id', ondelete='CASCADE'), nullable=False)
    file_name                   = db.Column(db.String(100), nullable=True, unique=False)
    csv_binary                  = db.Column(db.LargeBinary, nullable=True)
    csv_to_json                 = db.Column(JSON, nullable=True)
    sample_id                   = db.Column(db.String(), nullable=True)
    grade                       = db.Column(db.String(), nullable=True)
    figo_stage                  = db.Column(db.String(), nullable=True)
    rna_isolation_date          = db.Column(db.String(), nullable=True)
    rna_tape_station_date       = db.Column(db.String(), nullable=True)
    rna_isolation_concentration = db.Column(db.String(), nullable=True)
    reverse_transcription_date  = db.Column(db.String(), nullable=True)
    tube_qpcr                   = db.Column(db.String(), nullable=True)
    array_qpcr                  = db.Column(db.String(), nullable=True)
    collection_date             = db.Column(db.String(), nullable=True)
    collection_time             = db.Column(db.String(), nullable=True)
    processing_date             = db.Column(db.String(), nullable=True)
    processing_time             = db.Column(db.String(), nullable=True)
    box_position                = db.Column(db.String(), nullable=True)
    tumor                       = db.Column(db.String(), nullable=True)
    nodes                       = db.Column(db.String(), nullable=True)
    metastasis                  = db.Column(db.String(), nullable=True)
    ctc                         = db.Column(db.String(), nullable=True)


    def __repr__(self):
        return f"Wirowka ('{self.id}, pacjent {self.patient_primary_key}, c1 {self.c1}')"
    

    def as_dict(self):
        wirowkaDict = {}
        drop = ["csv_binary", "csv_to_json"]
        for c in self.__table__.columns:
            if c.name not in drop:
                wirowkaDict[c.name] = getattr(self, c.name)
        wirowkaDict["csv_file_name"] = wirowkaDict.pop("file_name")
        return wirowkaDict

    
    def fetch(patient_primary_key: int, nr_pacjenta: str):
        try:
            wirowka = session.query(Wirowka).filter_by(patient_primary_key=patient_primary_key).first()
            return wirowka.as_dict()
        except:
            empty_dict = {
                "id"                            : None,
                "patient_primary_key"           : None,
                "sample_id"                     : None,
                "grade"                         : None,
                "figo_stage"                    : None,
                "rna_isolation_date"            : None,
                "rna_tape_station_date"         : None,
                "rna_isolation_concentration"   : None,
                "reverse_transcription_date"    : None,
                "tube_qpcr"                     : None,
                "array_qpcr"                    : None,
                "collection_date"               : None,
                "collection_time"               : None,
                "processing_date"               : None,
                "processing_time"               : None,
                "box_position"                  : None,
                "tumor"                         : None,
                "nodes"                         : None,
                "metastasis"                    : None,
                "ctc"                           : None
            }
            # {"message": f"Could not find Wirowka object for patient {nr_pacjenta}"}, 404
            return empty_dict


    def getAttributes(patient_primary_key: int, attributes: list):
        try:
            wirowkaObj = session.query(Wirowka).filter_by(patient_primary_key=patient_primary_key).first()
            wirowkaObj = wirowkaObj.as_dict()
            wirowkaObj = dict((key, value) for key, value in wirowkaObj.items() if key in attributes)
            if wirowkaObj == {}:
                return {"message": "No attributes found"}, 404
            return wirowkaObj, 200
        except: 
            return  {"message": "Error while looking for specified attributes"}, 400


    def newWirowkaObject(patient_primary_key: int, attributes: dict):
        try:
            if attributes["file_name"] == "":
                return {"message": "Object wirowka was not created because the csv file was not provided"}, 400
            else:
                attributes['patient_primary_key'] = patient_primary_key
                wirowkaObj = Wirowka(**attributes)
            session.add(wirowkaObj)
            session.commit()
            return {"message": "Object wirowka has been added to patient"}, 201
        
        except Exception as e: # "Error while creating Wirowka object"
            session.rollback()
            return {"message": str(e)}, 400
        

    def update(patient_primary_key: int, attributes):
        try:
            wirowkaObj = Wirowka.query.filter_by(patient_primary_key=patient_primary_key).first()
            if wirowkaObj != None:
                session.query(Wirowka).filter_by(patient_primary_key=patient_primary_key).update(attributes)  ### catch if the query does not return any object
                session.commit()
                return {"message": "Object wirowka has been updated"}, 200
            else:
                return {"message": f"No CSV file found for patient"}, 404
        except Exception as e:
            session.rollback()
            temp = str(e)
            return {"message": f"Error while updating Wirowka object - {str(e)}"}, 400
        

    def delete(patient_primary_key: int):
        try:
            session.query(Wirowka).filter_by(patient_primary_key=patient_primary_key).delete()
            session.commit()
            return {"message": "Object wirowka has been deleted"}, 200
        except:
            session.rollback()
            return {"message": "Error while deleting Wirowka object"}, 400

        