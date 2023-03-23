import { BarReport } from './../../models/barReport';
import { ReportTotals } from './../../models/reportTotals';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PieReport } from 'src/app/models/pieReport';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private api: ApiService) {}

  public totals(): Observable<ReportTotals> {
    return this.api.get('/OrderReport/GetSalesOrderTotalReport').pipe(
      map((response) => {
        return ReportTotals.FromJson(response);
      })
    );
  }

  public categories(date : Date): Observable<PieReport> {
    return this.api.get('/OrderReport/GetSalesReport/'+date.toDateString()).pipe(
      map((response) => {
        return PieReport.FromJson(response);
      })
    );
  }

  public productCategories(year: string): Observable<BarReport> {
    return this.api.get(`/OrderReport/GetProductSalesReport/${year}`).pipe(
      map((response) => {
        return BarReport.FromJson(response);
      })
    );
  }
}
