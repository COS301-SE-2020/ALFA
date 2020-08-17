import { Component, OnInit } from '@angular/core';
import { UploadServiceService } from '../upload-service.service';
import { Logfile } from '../logfile';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css']
})
export class UploadBoxComponent implements OnInit {
    filesToUpload: Logfile[] = [];
    filesReady: boolean = true;
    isAnalyzing: boolean = true;
    analysisResults: any[] = [];

  constructor(private uploadService: UploadServiceService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

    /**
     * @brief this function extracts the selected files from the input field. Supports multiple file uploads.
     * @param files an array of files selected
     */
  handleUploadFiles(files): void{
    this.filesReady = false;
    this.isAnalyzing = true;
    this.analysisResults = Array(files.length);

    // read files
    let reader: any;
    let fileData: any;
    [... files].forEach( (file, index) => {
        // reader.readAsArrayBuffer(file);
        reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = evt => {
            fileData = {
                filename: file.name,
                date: "",
                content: evt.target.result
            }
            this.filesToUpload.push( fileData );
        }
    });

    this.filesReady = true;
  }

  resetForm(): void{
      this.filesToUpload = [];
  }

  /**
   * @brief this function uploads file(s) by sending a POST request to the API for analysis
   * uploaded file(s) are then analyzed from the server side, and results returned to this function
   * @param evt form submit event
   */
    analyzeFiles(evt): void{
        evt.preventDefault();

        if(this.filesToUpload.length == 0){
            this.messageService.notify("No file selected. Please select atleast one logfile");
            // console.log("Please select atleast one logfile");
            return;
        }

        this.isAnalyzing = true;
        
        this.filesToUpload.forEach( (file, index) => {
            this.uploadService.uploadLogFile(file).subscribe( data => {
                console.log(data);
                this.analysisResults[index] = {
                    "filename" : (
                        "lf-"+file.filename.split('.').join('-').split('_').join('-')
                    ),
                    "data": data
                }
                if(index == this.filesToUpload.length - 1) this.isAnalyzing = false;
            });
        })
  }

  resultsReady(): boolean{
      if((this.analysisResults.length === this.filesToUpload.length)){
          for(let i = 0; i < this.analysisResults.length; i++){
            if( !( this.analysisResults[i] && this.analysisResults[i].filename && this.analysisResults[i].data ) ){
                return false;
            }
          }
        return true;
      }
      return false;
  }

}
