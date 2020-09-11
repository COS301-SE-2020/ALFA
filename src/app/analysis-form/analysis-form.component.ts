import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { UploadServiceService } from '../upload-service.service';
import { Logfile } from '../logfile';

@Component({
  selector: 'app-analysis-form',
  templateUrl: './analysis-form.component.html',
  styleUrls: ['./analysis-form.component.css']
})
export class AnalysisFormComponent implements OnInit {
    filesToUpload: Logfile[] = [];
    analysisResults: any[] = [];
    isAnalyzing: boolean = false;
    inputMode: string;

    analyzeFileForm = new FormGroup({
        logfiles: new FormControl('', [
            Validators.required
        ])
    });
    analyzeTextForm = new FormGroup({
        errors: new FormControl('')
    });

    constructor(private uploadService: UploadServiceService, private messageService: MessageService) { }

    ngOnInit(): void {
    }

    /**
     * @brief function stores selected files in the 'selected files' array
     * @param files list of selected files from the input field
     */
    handleFiles(files): void {
        this.analyzeTextForm.reset();
        this.inputMode = "";
        let filesCount: number = this.filesToUpload.length + [... files].length;
        if( filesCount > 5 ){
            this.messageService.notify("You can only select a maximum of 5 files at a time.");
            this.analyzeFileForm.reset();
            return;
        }

        let reader: any;
        let fileData: any;
        [... files].forEach( (file, index) => {
            if( this.fileExists(file) === true ){
                return;
            }
            reader = new FileReader();
            reader.readAsText(file);

            reader.onload = evt => {
                // if(evt.target.result.indexOf("data:text/") !== 0){
                //     this.messageService.notify(`File type for the file '${file.name}' not supported`);
                //     return;
                // }
                fileData = {
                    filename: file.name,
                    date: "",
                    content: evt.target.result
                }
                this.filesToUpload.push( fileData );
                this.analyzeFileForm.reset();
            }
        });
    }

    handleTextInput(): void{
        this.inputMode = "";
        this.analyzeFileForm.reset();
        this.filesToUpload = [];
    }

    /**
     * @brief function removes selected file from the filesToUpload array
     * @param index index of the file selected for removal
     */
    removeFile(index: number): void{
        this.filesToUpload.splice(index, 1);
        [this.analyzeFileForm.controls.logfiles].splice(index, 1);
    }

    /**
     * @brief function sends file data to the API endpoint for analysis
     */
    analyzeFile(): void{
        if(this.analyzeFileForm.controls.logfiles.status !== "VALID" && [this.analyzeFileForm.controls.logfiles].length <= 0){
            this.messageService.notify("Please select atleast one file");
            return;
        }
        this.analysisResults = Array(this.filesToUpload.length);
        this.isAnalyzing = true;
       
        this.filesToUpload.forEach( (file, index) => {
            this.uploadService.uploadLogFile(file).subscribe( data => {
                if(!data){
                    // server error
                    this.isAnalyzing = false;
                    this.filesToUpload = [];
                    return;
                }

                this.analysisResults[index] = {
                    "filename" : (
                        "lf-"+file.filename.split('.').join('-').split('_').join('-')
                    ),
                    "data": data
                }
                if(index == this.filesToUpload.length - 1){
                    this.isAnalyzing = false;
                    this.inputMode = "files";
                }
            });
        });
    }

    /**
     * @brief function sends text input field data for analysis
     */
    analyzeText(): void{
        if(this.analyzeTextForm.controls.errors.status !== "VALID"){
            this.messageService.notify("The error field is required, paste error in the text field and try again");
            return;
        }
        this.isAnalyzing = true;

        let fileData = {
            filename: "Textfield.data",
            date: "",
            content: ""
        }        
        fileData.content = this.analyzeTextForm.controls.errors.value;
        // fileData.content = fileData.content.substr( 0, fileData.content.length - 1 ); // remove equal sign at the end of the string
        // console.log(`Field Data: ${fileData.content}`);

        this.uploadService.uploadLogFile(fileData).subscribe( data => {
            if(!data){
                // server error
                this.isAnalyzing = false;
                this.filesToUpload = [];
            }
            this.analysisResults = [];

            this.analysisResults.push({
                "filename" : (
                    "lf-"+fileData.filename.split('.').join('-').split('_').join('-')
                ),
                "data": data
            });
            this.isAnalyzing = false;
            this.inputMode = "textField";
        })
    }

    /**
     * @brief function checks if the analysis results are ready to be displayed
     * @returns boolean
     */
    resultsReady(): boolean{
        if(this.inputMode === "files"){
            if( (this.analysisResults.length === this.filesToUpload.length) || (this.analysisResults.length > 0 && this.analyzeTextForm.controls.errors.value.length > 0) ){
                for(let i = 0; i < this.analysisResults.length; i++){
                    if( !( this.analysisResults[i] && this.analysisResults[i].filename && this.analysisResults[i].data ) ){
                        return false;
                    }
                }
                return true;
            }
            return false;
       }
       if(this.inputMode === "textField"){
           if(this.analysisResults.length > 0){
                return true;
           }
           return false;
       }
       return false;
    }

    /**
     * @brief function checks if file selected by user already exists in the filesToUplaod array
     * @param file file selected by user
     * @returns boolean
     */
    fileExists(file: any): boolean{
        let fileExists: boolean = false;
        if( this.filesToUpload.length > 0 ){
            this.filesToUpload.forEach( f =>{
                if(f.filename === file.name){
                    fileExists = true;
                }
            });
        }
        return fileExists;
    }

}
