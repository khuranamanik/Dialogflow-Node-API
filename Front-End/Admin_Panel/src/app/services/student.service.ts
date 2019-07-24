import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }
  logIn(login): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', login);
  }
  doLogout() {
    return sessionStorage.removeItem('token');
  }
  isLoggedIn() {
    return sessionStorage.getItem('token');
  }

  createAdmin(admin):Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/Agentcreate', admin);
  }

  setInfo(key:string,value:any)
  {
return sessionStorage.setItem(key,value);
  }

   getStorageInfo(key: string): any {
		const value = sessionStorage.getItem(key);
		if (value) {
			return JSON.parse(value);
		}
    return null;
   }
   public get sessionUserInfo() {
		let user = this.getStorageInfo('user');
    user = user || {};
   return user;
   
  }
  
  createIntent(intent):Observable<any>
  {
    return this.http.post<any>('http://localhost:3000/createIntent',intent)
  }
  

}


