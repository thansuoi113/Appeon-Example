export class ReportTotals {
  public totalNum: number;
  public process: number;
  public approved: number;
  public backordered: number;
  public rejected: number;
  public shipped: number;
  public cancelled: number;

  public static FromJson(json: any ): ReportTotals {
    const obj = new ReportTotals();
    obj.totalNum = json.totalNum;
    obj.process = json.process;
    obj.approved = json.approved;
    obj.backordered = json.backordered;
    obj.rejected = json.rejected;
    obj.shipped = json.shipped;
    obj.cancelled = json.cancelled;
    return obj;
  }
}
