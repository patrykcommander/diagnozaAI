export const validateFileFormData = (userFormData: FormData) : FormData => {
    let newFormData: FormData = new FormData();

    const fileJSON = userFormData.get("file-json") as File
    const fileCSV = userFormData.get("file-csv") as File

    if (fileJSON && fileJSON.name !== 'undefined') {
        newFormData.append("file-json", fileJSON);
    } else {
        throw { error: {resposne: {data: "No JSON file provided" }}}
    };
    
    if (fileCSV && fileCSV.name !== 'undefined') newFormData.append("file-csv", fileCSV);

    return newFormData
}
