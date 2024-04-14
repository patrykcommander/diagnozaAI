import pandas as pd
from timeit import default_timer as timer

def mapCsvToDataFrame(src_csv):
    fileStorageObj = src_csv
    file_name = fileStorageObj.filename

    dataframe = pd.read_csv(fileStorageObj, encoding='utf-8', sep=',') 
    attributes = dict((column_name, dataframe[column_name].tolist()[0]) for column_name in dataframe.columns)

    return dataframe, attributes, file_name


def mapDataFrameToBinary(dataframe):
    temp = ""

    for colname in dataframe.columns:
        colname=str(colname) if (isinstance(colname, (int, float))) else colname
        temp += colname
        temp += ","

    temp = temp[:-1] + "\r\n"

    values = dataframe.values[0]

    for value in values:
        value=str(value) if (isinstance(value, (int, float))) else value
        temp += value
        temp += ","

    temp = temp[:-1] + "\r\n"


    return bytes(temp, 'utf-8')

def mapDataFrameToJSON(dataframe):
    return dataframe.iloc[0].to_json()