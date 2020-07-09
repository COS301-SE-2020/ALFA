import { Component, OnInit } from '@angular/core';
import { UploadServiceService } from '../upload-service.service';
import { Logfile } from '../logfile';

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css']
})
export class UploadBoxComponent implements OnInit {
    filesToUpload: Logfile[] = [];
    filesReady: boolean = true;
    isAnalyzing: boolean = false;

  constructor(private uploadService: UploadServiceService) { }

  ngOnInit(): void {
  }

    /**
     * @brief this function extracts the selected files from the input field. Supports multiple file uploads.
     * @param files an array of files selected
     */
  handleUploadFiles(files): void{
    this.filesReady = false;

    // read files
    let reader: any;
    let fileData: any;
    [... files].forEach( file => {
        // reader.readAsArrayBuffer(file);
        reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = evt => {
            fileData = {
                filename: file.name,
                date: Date.now(),
                data: evt.target.result,
            }
            this.filesToUpload.push( fileData );
        }
    });

    console.log(this.filesToUpload);
    this.filesReady = true;
  }

  /**
   * @brief this function uploads file(s) by sending a POST request to the API for analysis
   * uploaded file(s) are then analyzed from the server side, and results returned to this function
   * @param evt form submit event
   */
  analyzeFiles(evt): void{
    evt.preventDefault();
    this.isAnalyzing = true;
    // upload file(s)
    // this.uploadService.uploadLogFile(this.filesToUpload[0]);
    // this.property = this.someservice.operation(payload).subscribe( data => { this.property = data 1;})
  }

}
