import { data } from 'jquery';
import { CategoryData } from './categoryData';

export class PieReport {
  categorNames: string[];
  categorNames1: string[];
  categoryData: CategoryData[];

  public static FromJson(json: any): PieReport {
    const report = new PieReport();
    // report.categorNames1 = json.categoryNames;
    // //Array sort again
    // report.categorNames=[ report.categorNames1[1],
    //                       report.categorNames1[3],
    //                       report.categorNames1[0],
    //                       report.categorNames1[2],
    //                     ];

    // report.categoryData = json.categoryData.map(
    //   (val) => new CategoryData(val.name, val.value)
    // );
    // return report;

    report.categorNames = [];
    report.categoryData = [];

    for (let item of json.salesReportByCategory){
      report.categorNames.push(item.productCategoryName);
      report.categoryData.push(new CategoryData(item.productCategoryName, item.totalSalesqty));
    }

    return report;
  }
}
