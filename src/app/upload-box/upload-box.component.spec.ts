import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBoxComponent } from './upload-box.component';
import { HttpClientModule } from '@angular/common/http';

describe('UploadBoxComponent', () => {
  let component: UploadBoxComponent;
  let fixture: ComponentFixture<UploadBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadBoxComponent],
      imports: [HttpClientModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate file entry', () => {

  })
  // it('should validate file upload', ()=>{
  //   expect(component.filesToUpload.length).toEqual(0)
  //   //how to represent/get lifes to upload
  //   // component.handleUploadFiles()
  //   expect(component.filesToUpload.length).toBeGreaterThan(0)
  // })

});
