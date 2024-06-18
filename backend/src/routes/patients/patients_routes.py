from src import app, session
from flask import request, Response
from io import BytesIO, StringIO

from src.functions.storage.wholePatientObj_db import *

from src.functions.mapper.mapCsvToWirowka import mapCsvToWirowka
from src.functions.mapper.mapJSONtoPatientData import mapJSONtoPatientData

import json

@app.route('/patients/patient/<nr_pacjenta>/data/blood', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def manageCSV(nr_pacjenta):

    try:
        primary_key = session.query(Patient).filter_by(nr_pacjenta=nr_pacjenta).first().id
    except:
        return {"message": f"Patient with {nr_pacjenta} not found"}, 404

    if request.method == 'GET':
        args = request.args.to_dict()
        if "attributes" in args.keys():
            manual_attributes = args['attributes'].split(",")
            return Wirowka.getAttributes(primary_key, manual_attributes)
        else:
            return Wirowka.fetch(primary_key, nr_pacjenta)


    if request.method == 'POST':
        args = request.args.to_dict()

        if 'file-csv' in request.files.to_dict().keys():
            src_csv = request.files['file-csv']
            attributes = mapCsvToWirowka(src_csv)
            return Wirowka.newWirowkaObject(primary_key, attributes)
        
        elif 'file-csv' not in request.files.to_dict().keys() and args == {}:
            return {"message": "CSV file has not been provided"}, 400
            
        '''
        if args['update'].lower() == "true":
            return Wirowka.update(primary_key, attributes)
        else:
            return {"message": "Update parameter or update attributes was not provided"}, 400
        '''


    if request.method == 'PATCH':
        json_args = request.get_json()
        if not json_args:
            return {"message": "Attributes to be updated have not been provided"}, 400
        return Wirowka.update(primary_key, json_args)


    if request.method == 'DELETE':
        return Wirowka.delete(primary_key)

    
    
@app.route('/patients/patient/<nr_pacjenta>/data', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def manageJSON(nr_pacjenta):

    try:
        primary_key = session.query(Patient).filter_by(nr_pacjenta=nr_pacjenta).first().id
    except:
        return {"message": f"Patient with {nr_pacjenta} not found"}, 404

    if request.method == 'GET':
        args = request.args.to_dict()
        if "attributes" in args.keys():
            manual_attributes = args['attributes'].split(",")
            return PatientData.getAttributes(primary_key, manual_attributes)
        else:
            return PatientData.fetch(primary_key, nr_pacjenta)

    elif request.method == 'POST': # Substitute the existing json-file
        files = request.files
        if 'file-json' not in files.to_dict().keys():
            return {"message": "Server did not receive JSON file"}, 400

        src_json = files['file-json']
        attributes = mapJSONtoPatientData(src_json)
        return PatientData.update(primary_key, attributes)

    elif request.method == 'PATCH':   # change of selected attributes
        json_args = request.get_json()
        if not json_args:
            return {"message": "Attributes to be updated have not been provided"}, 400

        return PatientData.update(primary_key, json_args)


    if request.method == 'DELETE':
        return PatientData.delete(primary_key)


@app.route("/patients/patient", methods=["GET", "POST", "PATCH"])
def managePatient():
    if request.method == "POST":
        files = request.files
        keys = files.keys()

        if('file-csv' in keys):
            src_csv = files['file-csv']
        else:
            src_csv = -1
        
        if('file-json' in keys):
            src_json = files['file-json']
        else:
            return {"message": "The JSON file was not provided, therefore Patient object can not be created"}, 400
      
        output = createWholePatientObj(src_csv, src_json)

        return output[0], output[1]
    
    elif request.method == "PATCH":
        files = request.files
        nr_pacjenta = request.args.get("nr_pacjenta")
        try: 
            primary_key = session.query(Patient).filter_by(nr_pacjenta=nr_pacjenta).first().id
        except:
            return {"message": f"Patient with {nr_pacjenta} not found"}, 404
        
        keys = files.keys()

        '''if('file-csv' in keys):
            src_csv = files['file-csv']'''
        
        if('file-json' in keys):
            src_json = files['file-json']
            print(primary_key)
            attributes = mapJSONtoPatientData(src_json)
            status_json = PatientData.update(primary_key, attributes)
        
        return {"msg": "Test"}, 200

    elif request.method == "GET":
        args = request.args.to_dict()
        keys = (request.args.to_dict()).keys()
        nr_pacjenta = args['nr_pacjenta']
        if 'getEmpty' in keys:
            getEmpty = True if args['getEmpty'].lower() == 'true' else False
        else:
            getEmpty = False

        if 'direction' in keys:
            direction = int(args['direction'])
        else:
            direction = 0

        return Patient.fetchPatient(nr_pacjenta, getEmpty, direction)


@app.route('/patients', methods=['GET'])
def getAllPatients():
    returnCount = request.args.get('all')
    if returnCount != None or returnCount == "true":
        length, status = Patient.getLength()
        return Response(response=str(length), status=status)

    page = request.args.get('page') 
    if page == None:
        page = 1
    else:
        page = int(page)

    elementsPerPage = request.args.get('elementsPerPage') 
    if elementsPerPage == None:
        elementsPerPage = 10
    else:
        elementsPerPage = int(elementsPerPage)

    return Patient.fetchPaginatedPatients(page, elementsPerPage), 200

@app.route('/patients/statistics', methods=["GET"])
def getPatientsStats():
    statistics, status = Patient.getStats()
    return statistics, status


@app.route("/patients/patient/<nr_pacjenta>/download")
def saveCsv(nr_pacjenta):
    csvFormat = Patient.savePatientToCsv(nr_pacjenta=nr_pacjenta).getvalue().encode('utf8')
    response = Response(
        response        = csvFormat.getvalue(),
        content_type    = 'text/csv',
        headers         = {"Content-Disposition": f"attachment;filename={nr_pacjenta}_data.csv"}
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    # send_file(BytesIO(csvFormat), mimetype='text/csv', download_name=f'{nr_pacjenta}_data.csv', as_attachment=True )
    return response

'''
    if request.method == 'POST':  # creates new PatientData object, outdated function, because now PatientData file is mandatory when creating patient entry in createWholePatientObj
        try:   
            if 'file-json' not in request.files.to_dict().keys():
                raise Exception
            
            src_json = request.files['file-json']
            _, patientJSON, file_name = mapJSONtoPatientData(src_json)
            attributes = extract_fields(patientJSON)
            attributes['file_name'] = file_name
            attributes['src_json'] = patientJSON
            return PatientData.newPatientData(primary_key, file_name, patientJSON, attributes)
        
        except: 
            return {"message": "Server did not receive JSON file"}, 400
    '''