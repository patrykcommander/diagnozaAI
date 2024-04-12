from src.functions.mapper.mapDataFrame import *

def mapCsvToWirowka(src_csv):
    if not (src_csv == -1):
        dataframe, attributes, file_name = mapCsvToDataFrame(src_csv)
        csv_bin = mapDataFrameToBinary(dataframe)
        json = mapDataFrameToJSON(dataframe)
        attributes['csv_to_json'] = json
        attributes['csv_binary'] = csv_bin
        attributes['file_name'] = file_name

        return attributes
    else:
        return "", "", ""