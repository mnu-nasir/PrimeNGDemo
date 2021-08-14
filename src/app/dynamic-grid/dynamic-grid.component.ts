import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';

@Component({
	selector: 'app-dynamic-grid',
	templateUrl: './dynamic-grid.component.html',
	styleUrls: ['./dynamic-grid.component.css']
})
export class DynamicGridComponent implements OnInit {
	products: Product[] = [];

	cols: any[] = [];
	_selectedColumns: any[] = [];
	categories: any[] = [];
	rowGroupMetadata: any;

	@ViewChild('dt1') dt!: Table;

	constructor(private productService: ProductService) { }

	ngOnInit() {
		this.productService.getProductsSmall().then(data => this.products = data);

		this.cols = [
			{ field: 'code', header: 'Code' },
			{ field: 'name', header: 'Name' },
			{ field: 'category', header: 'Category' },
			{ field: 'quantity', header: 'Quantity' }
		];

		this._selectedColumns = this.cols;

		this.categories = [
			{ label: "Accessories", value: "Accessories" },
			{ label: "Clothing", value: "Clothing" },
			{ label: "Electronics", value: "Electronics" },
			{ label: "Fitness", value: "Fitness" }
		];
	}

	@Input() get selectedColumns(): any[] {
		return this._selectedColumns;
	}

	set selectedColumns(val: any[]) {
		//restore original order
		this._selectedColumns = this.cols.filter(col => val.includes(col));
	}

	applyFilter($event: any, field: string, matchMode: string) {
		let value = ($event.target as HTMLInputElement)?.value;
		this.dt.filter(value, field, matchMode);
	}	
}