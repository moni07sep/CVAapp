import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Idata} from './../model/data.interface'
@Injectable({providedIn:"root"})

export class searchService{ 
    public headers:HttpHeaders  
    private all_data_endpoint="https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ&apikey=725fca5b21a3e896c5f9b2d34cf3477b"
    private statements="https://financialmodelingprep.com/api/v3/balance-sheet-statement/AAPL?datatype=csv&apikey=725fca5b21a3e896c5f9b2d34cf3477b"
    
    constructor(private http:HttpClient){
        this.headers = new HttpHeaders({ "Content-Type": "application/json" });
    }

    FetchData():Observable<Idata> {
        return this.http.get<Idata>(this.all_data_endpoint);
    }

    FetchStatment() {
        return this.http.get(this.statements, {responseType: 'blob'})
       
    }

  
}