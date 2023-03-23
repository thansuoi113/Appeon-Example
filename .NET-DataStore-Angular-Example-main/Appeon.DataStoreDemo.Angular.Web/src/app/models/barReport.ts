import { ProductCategoryData } from './productCategoryData';

export class BarReport {
  public saleMonth: string[];
  public productCategoryQty: ProductCategoryData[];
  public productCategory: string[];

  constructor(
  ) { }

  public static FromJson(json: any): BarReport {
    const report = new BarReport();

    report.saleMonth = []
    report.productCategory = [];
    report.productCategoryQty = [];

    let categoryMap = new Map<string, number[]>();

    let i = 1;
    for (let key of Object.keys(json)) {
      let monthArr = json[key];
      report.saleMonth.push(`${i}`)
      for (let month of monthArr) {
        if (!categoryMap.has(month.productCategoryName))
          categoryMap.set(month.productCategoryName, []);
        categoryMap.get(month.productCategoryName).push(month.totalSalesqty);
      }
      ++i;
    }

    report.productCategory = Array.from(categoryMap.keys());

    for (let category of report.productCategory) {
      report.productCategoryQty.push(new ProductCategoryData(category, 'bar', categoryMap.get(category)));
    }


    return report;
  }
}
