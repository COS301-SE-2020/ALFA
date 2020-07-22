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
    isAnalyzing: boolean = true;
    articles: any[] = [];
    /**
     * articles: [
     *      article: {
     *          file: string,
     *          data: []
     *      }
     * ]
     */

  constructor(private uploadService: UploadServiceService) { }

  ngOnInit(): void {
  }

    /**
     * @brief this function extracts the selected files from the input field. Supports multiple file uploads.
     * @param files an array of files selected
     */
  handleUploadFiles(files): void{
    this.filesReady = false;
    this.isAnalyzing = true;
    this.articles = Array(files.length);

    // read files
    let reader: any;
    let fileData: any;
    [... files].forEach( (file, index) => {
        // reader.readAsArrayBuffer(file);
        reader = new FileReader();
        reader.readAsText(file);

        reader.onload = evt => {
            fileData = {
                filename: file.name,
                date: "",
                content: evt.target.result
            }
            this.filesToUpload.push( fileData );
            // this.articles[index].filename = (file.name.replace(' ', '-') + '-' + index);
        }
    });

    // console.log(this.filesToUpload);
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
        this.isAnalyzing = true;
        
        this.filesToUpload.forEach( (file, index) => {
            this.uploadService.uploadLogFile(file).subscribe( data => {
                this.articles[index] = {
                    "filename" : (
                        "lf-"+file.filename.split('.').join('-').split('_').join('-')
                    ),
                    "data": data
                }
                // console.log(this.articles);
                // console.log("Articles: " + JSON.stringify(this.articles));
                if(index == this.filesToUpload.length - 1) this.isAnalyzing = false;
            });
        })
  }

  articlesReady(): boolean{
      if((this.articles.length === this.filesToUpload.length)){
          for(let i = 0; i < this.articles.length; i++){
            if( !( this.articles[i] && this.articles[i].filename && this.articles[i].data ) ){
                return false;
            }
          }
        return true;
      }
      return false;
  }

}