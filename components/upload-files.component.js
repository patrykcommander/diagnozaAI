import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Button } from "@mui/material";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
    this.onDropJson = this.onDropJson.bind(this);
    this.onDropCsv = this.onDropCsv.bind(this);

    this.state = {
      selectedJsonFiles: undefined,
      selectedCsvFiles: undefined,
      message: "",
      errorMessage: null,
    };
  }
  async upload() {
    // Create formData
    const formData = new FormData();

    // Check if JSON file was dropped and append to formData if true
    if (this.state.selectedJsonFiles) {
      let currentJsonFile = this.state.selectedJsonFiles[0];
      formData.append("file-json", currentJsonFile);
    }

    // Check if CSV file was dropped and append to formData if true
    if (this.state.selectedCsvFiles) {
      let currentCsvFile = this.state.selectedCsvFiles[0];
      formData.append("file-csv", currentCsvFile);
    }

    // Continue with your upload
    try {
      const response = await axios.post(
        "http://localhost:5000/patients/patient",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      this.props.closeDialog();
      window.location.reload();
    } catch (error) {
      console.error(error);
      this.setState({ errorMessage: "Dodawanie nieudane. Spróbuj ponownie." });
    }

    // Clear the uploaded files
    this.setState({
      selectedJsonFiles: undefined,
      selectedCsvFiles: undefined,
    });
  }

  onDropJson(files) {
    if (files.length > 0) {
      this.setState({ selectedJsonFiles: files });
    }
  }

  onDropCsv(files) {
    if (files.length > 0) {
      this.setState({ selectedCsvFiles: files });
    }
  }

  render() {
    const { selectedJsonFiles, selectedCsvFiles, message } = this.state;

    return (
      <div className="flex flex-col justify-center mx-20">
        <div className="flex justify-evenly flex-row gap-10">
          <div className="border-2 border-dashed border-black px-10 py-10">
            <Dropzone onDrop={this.onDropJson} multiple={false} accept=".json">
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    {selectedJsonFiles && selectedJsonFiles[0].name ? (
                      <div className="selected-file">
                        {selectedJsonFiles && selectedJsonFiles[0].name}
                      </div>
                    ) : (
                      <div className="h-full w-full">
                        Przeciągnij i upuść plik JSON tutaj lub kliknij, aby
                        wybrać plik
                      </div>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="border-2 border-dashed border-black px-10 py-10">
            <Dropzone onDrop={this.onDropCsv} multiple={false} accept=".csv">
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    {selectedCsvFiles && selectedCsvFiles[0].name ? (
                      <div className="selected-file">
                        {selectedCsvFiles && selectedCsvFiles[0].name}
                      </div>
                    ) : (
                      "Przeciągnij i upuść plik CSV tutaj lub kliknij, aby wybrać plik"
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
        {this.state.errorMessage && (
          <div className="error-message">{this.state.errorMessage}</div>
        )}
        <div className="flex justify-center pt-5">
          <Button
            variant="contained"
            className="btn btn-success"
            disabled={!selectedJsonFiles}
            onClick={this.upload}
            style={{
              backgroundColor: "#1d4aa1",
            }}
          >
            Stwórz pacjenta
          </Button>
        </div>
        <div className="alert alert-light" role="alert">
          {message}
        </div>
      </div>
    );
  }
}
