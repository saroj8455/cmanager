import {Component, ElementRef, ViewChild} from '@angular/core';
import {CustomerService} from "../../services/customerservice";
import {Table} from "primeng/table";
import * as FileSaver from "file-saver"
import * as jspdf from "jspdf";


export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: number;
}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}



@Component({
  selector: 'app-datatbl',
  templateUrl: './datatbl.component.html',
  styleUrls: ['./datatbl.component.css']
})
export class DatatblComponent {
  customers!: Customer[];
  selectedCustomers!: Customer[];
  @ViewChild('dt') dt: Table | undefined;

  loading: boolean = true;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers
      this.loading = false
    });
    this.cols = [
      { field: 'date', header: 'Date', customExportHeader: 'Create_at' },
      { field: 'name', header: 'Name' },
      { field: 'company', header: 'Company' },
      { field: 'balance', header: 'Balance' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  clear(table: Table) {
    table.clear();
  }
  // exportCSV() {
  //   // @ts-ignore
  //   let tableRef: ElementRef<HTMLTableElement> = this.dt.tableViewChild;
  //   let table = tableRef.nativeElement;
  //   console.log(table)
  //   // this.exportService.exportCsv(table, "Contracts.csv");
  // }
  exportExcel() {
    import("xlsx").then((xlsx)=>{
      // parse only selected customers or all customers
      const worksheetData = this.selectedCustomers ? this.selectedCustomers : this.customers
      const worksheet = xlsx.utils.json_to_sheet(this.serializeCustomers(worksheetData));
      const workbook = {Sheets:{data:worksheet},SheetNames:['data']}
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,"customers")
    })
  }

  exportPdf() {
    import("jspdf").then((jspdf)=>{
      import("jspdf-autotable").then((x)=>{
        // @ts-ignore
        let doc: any;
        // @ts-ignore
        doc = new jspdf.default('p', 'px', 'a4')
        doc.autoTable(this.exportColumns,this.customers);
        doc.save("customers.pdf")
      })
    })
  }

  serializeCustomers(customers:Customer[]) {
    const serializeArray = customers.map((cust)=>{
      return {...cust,country:cust.country?.name,representative:cust.representative?.name}
    })
    return serializeArray;
  }
  saveAsExcelFile(buffer:any,fileName:string) {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    let EXCEL_EXTENSION=".xlsx"
    const data: Blob = new Blob([buffer],{
      type:EXCEL_TYPE
    })
    FileSaver.saveAs(data,fileName+"_export_"+new Date().getTime()+EXCEL_EXTENSION)
  }

}
