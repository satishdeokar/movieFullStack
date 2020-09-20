import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http-services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls.enum';
import { LocalStorageService } from 'src/app/core/data-services/local-storage.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateMovieComponent implements OnInit {
  createMovieForm: FormGroup;
  errorMessage ='';
  params: any;
  file: any;
  fileName;
  userDetails:any;
  userId:string='';
  imgPath:string='';
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private localStorage:LocalStorageService,
    private activeRoute: ActivatedRoute
  ) { 
    this.createMovieForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      directorName: ["", [Validators.required]],
      dateReleased: ["", [Validators.required]],
      bannerUrl: [""]
    });
    this.userDetails= this.localStorage.getLocalStorage('userDetails');
      if(this.userDetails && this.userDetails.userId){
        this.userId = this.userDetails.userId
      }
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log('params', params)
      this.params = params;
      if (this.params) {
        let url= `${ApiUrls.getMovie}?id=${params.movieId}`;
        console.log(url,'url')
        this.httpService.get(url).subscribe((res: any) => {
          console.log('res', res);
          let response = res['movie'];
          this.imgPath = response.bannerUrl
          const arr = response.bannerUrl.split('/');
          delete response['bannerUrl']
          this.fileName = arr[arr.length - 1];
          console.log('response', response)
          this.createMovieForm.patchValue(response);


        }, (err) => {
          console.log('err', err);
        });
      }

    });
  }

  onSubmit(formValue) {

    let payload = JSON.parse(JSON.stringify(formValue));
    if (this.file) {
      this.uploadFile(payload);
    } else {
      payload['bannerUrl']= this.imgPath;
      this.saveForm(payload);
    }
    //console.log('this.createUserForm', this.createMovieForm.value);
  }
  onFileInput(e) {
    console.log('e', e.target.files[0]);
    this.file = e.target.files[0];
  }
  async uploadFile(payload) {
    let bannerUrl = '';
    let fd = new FormData();
    fd.append('image', this.file);
    this.httpService.post(ApiUrls.uploadImage, fd).subscribe((res: any) => {
      console.log('res', res);
      bannerUrl = res.url;
      payload.bannerUrl = bannerUrl;
      this.saveForm(payload);
    }, (err) => {
      console.log('err', err);
      this.saveForm(payload);
    });
  }
  saveForm(payload) {
    
    if (this.params.movieId) {
      payload['updatedBy']=this.userId;
      this.httpService.securePut(`${ApiUrls.updateMovie}?id=${this.params.movieId}`,payload).subscribe((res) => {
        console.log('res', res);
        this.router.navigateByUrl('dashboard/movies/movie-list');
      }, (err) => {
      });
    } else {
      payload['createdBy']=this.userId;
      console.log('formValue', payload);
      this.httpService.post(ApiUrls.createMovie, payload).subscribe((res) => {
        console.log('res', res);
        alert("user saved")
        this.router.navigateByUrl('dashboard/movies/movie-list');
      }, (err) => {
        console.log('err', err);
      });
    }
  }
}