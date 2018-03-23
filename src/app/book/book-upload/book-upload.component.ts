import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { FileuploadService } from '../../shared/services/fileupload.service';

@Component({
  selector: 'app-book-upload',
  templateUrl: './book-upload.component.html',
  styleUrls: ['./book-upload.component.css']
})
export class BookUploadComponent implements OnInit {
  uploadForm: FormGroup;
  loading: boolean= false;
  previewImage: any;

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('imgPreview') imgPreview: ElementRef;
  
  
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private fileUploadSvc: FileuploadService,
    private el: ElementRef) {
      this.initializeForm();
  }

  initializeForm(){
    this.uploadForm = this.fb.group({
      remarks: ['', Validators.required],
      coverThumbnail: null
    })
  }

  ngOnInit() {
    this.authService.setLogon(true);
  }

  prepareSave(){
    let input = new FormData();
    input.append('remarks', this.uploadForm.get('remarks').value);
    input.append('coverThumbnail', this.uploadForm.get('coverThumbnail').value);
    return input;
  }

  onUpload(){
    const formModel = this.prepareSave();
    this.loading = true;
    this.fileUploadSvc.upload(formModel).subscribe((result)=>{
      console.log(result);
      this.loading = false;
    })
  }

  onChange(event){
    if(event.target.files.length > 0){
      let file = event.target.files[0];
      var reader = new FileReader();
      let el = this.imgPreview;
      reader.onloadend = function(e){
        el.nativeElement.src = reader.result;
      };
      reader.readAsDataURL(file);
      this.uploadForm.get('coverThumbnail').setValue(file);
    }
  }

}