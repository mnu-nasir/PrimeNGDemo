import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-row-group-grid',
  templateUrl: './row-group-grid.component.html',
  styleUrls: ['./row-group-grid.component.css']
})
export class RowGroupGridComponent implements OnInit {
  products: Product[] = [];

  cols: any[] = [];
  _selectedColumns: any[] = [];
  categories: any[] = [];
  rowGroupMetadata: any;

  @ViewChild('dt2') dt2!: Table;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsSmall().then(data => {
      this.products = data;
      this.updateRowGroupMetaData();
    });

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];

    this._selectedColumns = this.cols;

    this.categories = [
      { label: "Clothing", value: "Clothing" },
      { label: "Electronics", value: "Electronics" },
      { label: "Fitness", value: "Fitness" },
      { label: "Accessories", value: "Accessories" },
    ];
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  applyFilter1($event: any, field: string, matchMode: string) {
    let value = ($event.target as HTMLInputElement)?.value;
    this.dt2.filter(value, field, matchMode);
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData(rows?: Product[]) {
    let products = rows ?? this.products;
    this.rowGroupMetadata = {};

    if (products) {
      for (let i = 0; i < products.length; i++) {
        let rowData = products[i];
        let category1 = rowData.category;

        if (i == 0) {
          this.rowGroupMetadata[category1] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = products[i - 1];
          let previousRowGroup = previousRowData.category;

          if (category1 === previousRowGroup)
            this.rowGroupMetadata[category1].size++;
          else
            this.rowGroupMetadata[category1] = { index: i, size: 1 };
        }
      }
    }
  }

  dropdownFilter(filter: (a: any) => void, value: string) {
    filter(value);
    this.updateRowGroupMetaData(this.dt2.filteredValue);
  }
}