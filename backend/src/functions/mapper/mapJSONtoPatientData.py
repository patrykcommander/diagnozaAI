from src.functions.mapper.mapDataFrame import *
import json
import jsonpath_ng as jp
from src.functions.extractJsonData.extract_json_fields import *




def mapJSONtoPatientData(src_json):
    fileStorageObj = src_json
    binary_json = fileStorageObj.read()
    decoded_json = binary_json.decode('utf-8')
    temporary = json.loads(decoded_json)
    patientJSON = json.dumps(temporary)
    attributes = extract_fields(patientJSON)
    attributes["file_name"] = fileStorageObj.filename
    attributes["src_json"] = patientJSON

    return attributes
