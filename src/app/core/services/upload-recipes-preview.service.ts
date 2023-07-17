import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UploadStatus } from '../models/upload-status';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class UploadRecipesPreviewService {

  constructor(private http: HttpClient) { }

  uploadFile(code: string, fileToUpload?: File) {
    const formData = new FormData();
    formData.append('fileToUpload', fileToUpload as File);

    return this.http.post<UploadStatus>(`${BASE_PATH}/recipes/upload/${code}`, formData);
  }
}
