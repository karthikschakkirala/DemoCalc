import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalcModel } from '../Models/CalcModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

    PostAPI(data: any) {
        const headers = new HttpHeaders({
            // 'Authorization': 'Negotiate',
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Headers': 'Content-Type',
            // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        });
        
        return this.httpClient.post('https://calcdemokarthik.azurewebsites.net/api/calculate/sum', data, { headers });
        //return this.httpClient.post('http://localhost:44981/api/calculate/sum', data, { headers });
        //return this.httpClient.get('http://localhost:44981/api/calculate/sum', { headers });
    }
}