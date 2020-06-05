import { Component, OnInit } from '@angular/core';
import{ searchService}from '../../shared/services/search.services'
import { Idata } from 'src/app/shared/model/data.interface';
import { saveAs } from 'file-saver/FileSaver';
import { template} from "../../shared/model/template";

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  public Model = new template();

  constructor(private searchService:searchService) { }

  public allData;
  public allDataResult;
  public companyName:string;
  public exchangeName:string;
  public allDataUniqe;

 
  ngOnInit() {
    //All Data Fetch from API & unique data for dropdown
    this.searchService.FetchData().subscribe((item:Idata)=>{
      this.allData =item
      this.allDataResult=item
      this.allDataUniqe=this.allData.map(item => item.stockExchange)
      .filter((value, index, self) => self.indexOf(value) === index)
      
    })

  }       

  downloadCSV(data: any) {
    const blobData = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blobData);
    saveAs(blobData, "statement.csv"); 
    return window.open(url); 
  }

  download(){
  //CSV data fetch from API
    this.searchService.FetchStatment()
    .subscribe(
        (data) => this.downloadCSV(data)
    )
  }

  
  //Filter code 
  companySearch(data){
    if (data.companyName==undefined && data.exchangeName==undefined){
      alert("Please provide value for Name or ExchangeShortName")
    }else if (data.companyName!=undefined && data.exchangeName!=undefined) {
      this.allDataResult =this.allData.filter(item => 
        item.name.includes(data.companyName) && item.stockExchange.includes(data.exchangeName))
    } else {
    this.allDataResult =this.allData.filter(item => 
    item.name.includes(data.companyName) || item.stockExchange.includes(data.exchangeName))
    }
  }
 
}
