import jsonpath_ng as jp
import json
import re
import datetime


def getPatientIDFromJSON(content: json):
    try: 
        patient_id = content['patient_id']
        return patient_id
    except: 
        return None
    


def extract_tumor_type(content: json):
    try:
        return jp.parse("$.data.stays[*].diagnosis[*].icd.name").find(content)[0].value
    except:
        return None
    

def extract_age(content: json):
    try:
        age = jp.parse("$.data['age']").find(content)
        return age[0].value
    except:
        return None


def extract_plt(content: json, operation_date: str):
    try:
        # Extract PLT parameter just before the operation

        examinations = jp.parse("$..examinations[*]").find(content)
        day, month, year = tuple(operation_date.split("/"))
        operation_date = datetime.datetime(int(year), int(month), int(day))
        #examinations_with_PLT_score = {}

        pre_operation_PLT_value = None
        #k = 0
        for i in range(len(examinations)):
            if examinations[i].value['result'] != None:
                tabs = examinations[i].value['result']['form']['tabs']
                examination_date = examinations[i].value['examinationDate'].split("T")[0]
                for tab in tabs:
                    attributes = tab['attribute'] 
                    for attribute in attributes:
                        if attribute['code'] == 'PLT':
                            #examinations_with_PLT_score[k] = (examination_date, attribute['value'])
                            #k += 1
                            year, month, day = examination_date.split("-")
                            temp_date = datetime.datetime(int(year), int(month), int(day))
                            if temp_date > operation_date:
                                pre_operation_PLT_value = attribute['value']
        return pre_operation_PLT_value
    except:
        return None


def extract_histology(content: json):
    try:
        result = jp.parse("$..examinations[*]..attribute[*]").find(content)
        result = [temp.value for temp in result if "name" in dict(temp.value).keys() and temp.value['name'] == "Wynik mikroskopowy"]
        return result[0]['value']
    except:
        return None


def extract_ca125(content: json):
    try:
        result = jp.parse("$..examinations[*]..attribute[*]").find(content)
        ca125 = [temp.value for temp in result if "name" in dict(temp.value).keys() and temp.value['name'] == "Antygen nowotworowy Ca 125"]
        return ca125[0]['value']
    except: 
        return None


def extract_operation_date(content: json):
    day = None
    month = None
    year = None
    try:
        result = jp.parse("$..treatment_forms..attribute[*].value").find(content)

        filtered_text = [text.value for text in result if isinstance(text.value, str)]
        date_text = [text for text in filtered_text if "Operowanadnia" in text.replace(" ","")]

        search = r"Operowanadnia(\d{2})[. /-]?(\d{2})[. /-]?(\d{4}|\d{2})"
        date_text = date_text[0].replace(" ","").replace("\n", "").replace("\t", "")
        date = re.search(search, date_text, re.IGNORECASE)
        day, month, year = date.groups()
    
        date = day + "/" + month + "/" + year
    except:        # different format - isntead of dd.MM.YYYY it is YYYY.MM.dd
        if day != None:
            date = year + "/" + month + "/" + day
        else:
            date = None
    return date


def extract_fields(src_json: json):
    content = json.loads(src_json)
    age = extract_age(content)
    histology = extract_histology(content)
    ca125 = extract_ca125(content)
    date = extract_operation_date(content)
    pre_opreation_PLT_value = extract_plt(content, date)
    tumor_type = extract_tumor_type(content)
    nr_pacjenta = getPatientIDFromJSON(content)

    return  {
                "age": age,
                "plt": pre_opreation_PLT_value,
                "histology": histology,
                "ca125": ca125,
                "operation_date": date,
                "tumor_type": tumor_type,
                "nr_pacjenta": nr_pacjenta
            }
