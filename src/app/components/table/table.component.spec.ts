import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent, TableData } from './table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { FormGroup, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Table, TableService } from 'src/app/services/table/table.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';


fdescribe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let router: Router;
  let dataItem:TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        HttpClientModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        MatPaginatorModule,
        

        MatFormFieldModule,

        MatInputModule,


        ReactiveFormsModule,
        FormsModule,
        MatTableModule,

        BrowserAnimationsModule,
        HttpClientTestingModule
         
       
      ],

      providers: [HttpClient, TableService,
        // NgControl
      ],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call ngOnInit",()=>{

    spyOn(component,'ngOnInit').and.callThrough();
  
   
    component.ngOnInit(); // trigger ngOnInit
    expect(component.ngOnInit).toHaveBeenCalled();
  
     
  
    });
  it('should call getITems on ngOnInit', () => {
    // const getITems = jasmine.createSpy('getITems');

    spyOn(component, 'getITems'); // create a spy on the method
    component.ngOnInit(); // trigger ngOnInit

    expect(component.getITems).toHaveBeenCalled(); // check if method is called
  });
 
  // 
  // it('should call pageEvent function when page event occurs', () => {
  //   spyOn(component, 'pageEvent');
  
  //   // get the paginator element and dispatch a page event
  //   const paginatorElement = fixture.debugElement.query(By.directive(MatPaginator));
  //   paginatorElement.triggerEventHandler('page', { pageIndex: 2, pageSize: 10, length: 100 });
  
  //   // check that the pageEvent function was called with the expected arguments
  //   expect(component.pageEvent).toHaveBeenCalledWith(2, 10, 100);
  // });
  // it('should pass the correct page values to the pageEvent function', () => {
  //   spyOn(component, 'pageEvent');
  
  //   const pageIndex = 2;
  //   const pageSize = 10;
  //   const length = 100;
  
  //   const event = { pageIndex, pageSize, length };
    
  //   const paginatorEl = fixture.debugElement.query(By.css('.mat-paginator')).nativeElement;
  //   paginatorEl.dispatchEvent(new CustomEvent('page', { detail: event }));
    
  //   expect(component.pageEvent).toHaveBeenCalledWith(pageIndex, pageSize, length);
  // });
  it('should render search input field', () => {
    const searchInput = fixture.debugElement.query(By.css('input'));
    expect(searchInput).toBeTruthy();
  });
  // it('should set component search value when the user inputs a value in search input field', () => {
  //   const searchInput = fixture.debugElement.query(By.css('input'));
  //   const testValue = 'test value';
  //   searchInput.nativeElement.value = testValue;
  //   searchInput.nativeElement.dispatchEvent(new Event('input'));
  //   expect(component.search).toEqual(testValue);
  // });
// For pageEvent();--------------------------------------------------
describe('pageEvent()', () => {
  it('should emit page event', () => {
    spyOn(component, 'pageEvent');
    const paginator = fixture.debugElement.query(By.css('mat-paginator')).componentInstance;
    paginator.page.emit();
    expect(component.pageEvent).toHaveBeenCalled();
  });
  it('should call the pageEvent function with the correct data', () => {
    spyOn(component, 'pageEvent');
    const paginator = fixture.debugElement.query(By.css('mat-paginator')).componentInstance;
    const event = { pageIndex: 1, pageSize: 10, length: 100 };
    paginator.page.emit(event);
    expect(component.pageEvent).toHaveBeenCalledWith(event);
  });
  it('should call page event when pagination changes', () => {
    spyOn(component, 'pageEvent');
    const paginator = fixture.debugElement.nativeElement.querySelector('mat-paginator');
    paginator.dispatchEvent(new Event('page'));
    fixture.detectChanges();
    expect(component.pageEvent).toHaveBeenCalled();
  });


  it('should set current page and page size', () => {
    const event = {
      pageIndex: 2,
      pageSize: 10
    };
    component.pageEvent(event);
    expect(component.currentpage).toBe(3);
    expect(component.pageSize).toBe(10);
  });

  it('should call getBySearch when search string is not empty', () => {
    component.search = 'test';
    component.searching = true;
    spyOn(component, 'getBySearch');
    const event = {
      pageIndex: 1,
      pageSize: 10
    };
    component.pageEvent(event);
    expect(component.getBySearch).toHaveBeenCalled();
  });

  it('should call applyFilters01 when search string is empty and searching is true',()=>{
    component.search="";
    component.searching=true;
    spyOn(component,'applyFilters01');
    const event = {
      pageIndex: 2,
      pageSize: 10
    };
    component.pageEvent(event);
    expect(component.applyFilters01).toHaveBeenCalled();
  });

it('it should call getITems when searching is false and search string is empty',()=>{
  component.searching=false;
  component.search="";
  spyOn(component,'getITems');
  const event={
    pageIndex:0,
    pageSize:10
  };
  component.pageEvent(event);
  expect(component.getITems).toHaveBeenCalled();
});
it('while searching something it should set searching flag to true', () => {
  component.currentpage = 1;
  component.pageSize = 10;
  component.search = 'test';
  component.getBySearch();

  expect(component.searching).toBe(true);
});

});



// getBySearch()----------------------------------
describe('getBySearch()', () => {
  beforeEach(() => {
    component.currentpage = 1;
    component.pageSize = 10;
    component.search = 'test';
  });

  it('should set searching flag to true', () => {
    component.getBySearch();

    expect(component.searching).toBe(true);
  });
 

  it('should set pageSize', () => {
    component.getBySearch();

    expect(component.pageSize).toBe(10);
  });

  it('should set search term', () => {
    component.getBySearch();

    expect(component.search).toBe('test');
  });

  it('should call setTimeout with a delay of 3000ms', () => {
    
   const timeoutSpy= spyOn(window, 'setTimeout');

    component.getBySearch(); // call the method that contains the setTimeout

    // jasmine.clock().tick(3000); // set the clock forward by 3000ms

    expect(timeoutSpy).toHaveBeenCalled();
    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 3000);
  });

 
});
// getItems()----------------------------------------------------------------
// just want to know how to create service file object to give an argument
describe('getItems()', () => {
  it('should set totalElements, totalPages, size, dataSource and searching to expected values if table data is successfully fetched', () => {
    // arrange
    dataItem=TestBed.inject(TableService);
    router = jasmine.createSpyObj('Router', ['navigate']);
    const mockTableData:Table = {
      content: [
     {
    
                 assetId: "ITL-LF-LIFTS-000000001917",
    
                status: ">5000 PV Required",
    
                description: "LIFT CAPACITY 21 PAC",
    
                assetMake: "MITSUBISHI ELEVATOR",
    
                assetModel: "MITSUBISHI ELEVATOR",
    
                manufacturer: "MITSUBISHI ELEVATOR INDIA",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200012787,
    
                price: 3623724.0,
    
                currency: "(INR)",
    
                conversionFactor: 1.0,
    
                priceInr: 3623724.0,
    
                bondNo: "65 Nov 4 2014",
    
                tags: null,
    
                remarks: "SDB-1 8TH F",
    
                categoryName: "Lifts",
    
                vendor: "MITSUBISHI"
    
            },
    
            {
    
                 assetId: "ITL-LF-LIFTS-000000001918",
    
                status: ">5000 PV Required",
    
                description: "LIFT CAPACITY 21 PAC",
    
                assetMake: "MITSUBISHI ELEVATOR",
    
                assetModel: "MITSUBISHI ELEVATOR",
    
                manufacturer: "MITSUBISHI ELEVATOR INDIA",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200012787,
    
                price: 3623724.0,
    
                currency: "(INR)",
    
                conversionFactor: 1.0,
    
                priceInr: 3623724.0,
    
                bondNo: "65 Nov 4 2014",
    
                tags: null,
    
                remarks: "SDB-1 8TH F",
    
                categoryName: "Lifts",
    
                vendor: "MITSUBISHI"
    
            },
    
            {
    
                 assetId: "ITL-LF-LIFTS-000000001919",
    
                status: ">5000 PV Required",
    
                description: "LIFT CAPACITY 21 PAC",
    
                assetMake: "MITSUBISHI ELEVATOR",
    
                assetModel: "MITSUBISHI ELEVATOR",
    
                manufacturer: "MITSUBISHI ELEVATOR INDIA",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200012787,
    
                price: 3623724.0,
    
                currency: "(INR)",
    
                conversionFactor: 1.0,
    
                priceInr: 3623724.0,
    
                bondNo: "65 Nov 4 2014",
    
                tags: null,
    
                remarks: "SDB-1 8TH F",
    
                categoryName: "Lifts",
    
                vendor: "MITSUBISHI"
    
            },
    
            {
    
                 assetId: "ITL-LF-LIFTS-000000001920",
    
                status: ">5000 PV Required",
    
                description: "LIFT CAPACITY 21 PAC",
    
                assetMake: "MITSUBISHI ELEVATOR",
    
                assetModel: "MITSUBISHI ELEVATOR",
    
                manufacturer: "MITSUBISHI ELEVATOR INDIA",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200012787,
    
                price: 3623724.0,
    
                currency: "(INR)",
    
                conversionFactor: 1.0,
    
                priceInr: 3623724.0,
    
                bondNo: "65 Nov 4 2014",
    
                tags: null,
    
                remarks: "SDB-1 8TH F",
    
                categoryName: "Lifts",
    
                vendor: "MITSUBISHI"
    
            },
    
            {
    
                 assetId: "ITL-LF-LIFTS-000000001921",
    
                status: ">5000 PV Required",
    
                description: "LIFT CAPACITY 21 PAC",
    
                assetMake: "MITSUBISHI ELEVATOR",
    
                assetModel: "MITSUBISHI ELEVATOR",
    
                manufacturer: "MITSUBISHI ELEVATOR INDIA",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200012787,
    
                price: 3623724.0,
    
                currency: "(INR)",
    
                conversionFactor: 1.0,
    
                priceInr: 3623724.0,
    
                bondNo: "65 Nov 4 2014",
    
                tags: null,
    
                remarks: "SDB-2 8TH F",
    
                categoryName: "Lifts",
    
                vendor: "MITSUBISHI"
    
            },
    
            {
    
                 assetId: "ITL-LF-LIFTS-000000001922",
    
                status: ">5000 PV Required",
    
                description: "LIFT CAPACITY 21 PAC",
    
                assetMake: "MITSUBISHI ELEVATOR",
    
                assetModel: "MITSUBISHI ELEVATOR",
    
                manufacturer: "MITSUBISHI ELEVATOR INDIA",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200012787,
    
                price: 3623724.0,
    
                currency: "(INR)",
    
                conversionFactor: 1.0,
    
                priceInr: 3623724.0,
    
                bondNo: "65 Nov 4 2014",
    
                tags: null,
    
                remarks: "SDB-2 8TH F",
    
                categoryName: "Lifts",
    
                vendor: "MITSUBISHI"
    
            },
    
            {
    
                 assetId: "ITL-LF-LIFTS-000000001923",
    
                status: ">5000 PV Required",
    
                description: "LIFT CAPACITY 21 PAC",
    
                assetMake: "MITSUBISHI ELEVATOR",
    
                assetModel: "MITSUBISHI ELEVATOR",
    
                manufacturer: "MITSUBISHI ELEVATOR INDIA",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200012787,
    
                price: 3623724.0,
    
                currency: "(INR)",
    
                conversionFactor: 1.0,
    
                priceInr: 3623724.0,
    
                bondNo: "65 Nov 4 2014",
    
                tags: null,
    
                remarks: "SDB-2 8TH F",
    
                categoryName: "Lifts",
    
                vendor: "MITSUBISHI"
    
            },
    
            {
    
                 assetId: "ITL-LF-LIFTS-000000001924",
    
                status: ">5000 PV Required",
    
                description: "LIFT CAPACITY 21 PAC",
    
                assetMake: "MITSUBISHI ELEVATOR",
    
                assetModel: "MITSUBISHI ELEVATOR",
    
                manufacturer: "MITSUBISHI ELEVATOR INDIA",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200012787,
    
                price: 3623724.0,
    
                currency: "(INR)",
    
                conversionFactor: 1.0,
    
                priceInr: 3623724.0,
    
                bondNo: "65 Nov 4 2014",
    
                tags: null,
    
                remarks: "SDB-2 8TH F",
    
                categoryName: "Lifts",
    
                vendor: "MITSUBISHI"
    
            },
    
            {
    
                 assetId: "ITL-AV-VSWCH-000000001106",
    
                status: ">5000 PV Required",
    
                description: "MODULAR DIGITAL MATRIX SWITCHERS WITH SPEEDSWITCH TECHNOLOGY",
    
                assetMake: "MOS WORLD SOUTH EAST",
    
                assetModel: "XTP CROSS",
    
                manufacturer: "MOS WORLD SOUTH EAST ASIA PTE LTD",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200016151,
    
                price: 21668.31,
    
                currency: "(USD)",
    
                conversionFactor: 73.5,
    
                priceInr: 1592620.7850000001,
    
                bondNo: "129 Jan 29 2016",
    
                tags: null,
    
                remarks: "SDB-1 8TH F BOARD ROOM",
    
                categoryName: "AV",
    
                vendor: "MOS WORLD SOUTH EAST ASIA PTE LTD"
    
            },
    
            {
    
                 assetId: "ITL-AV-VSWCH-000000001178",
    
                status: ">5000 PV Required",
    
                description: "MUDULAR DIGITEL MIXER",
    
                assetMake: "MOS WORLD",
    
                assetModel: "XTP II CTOSS POINT 1600",
    
                manufacturer: "MOS WORLD",
    
                location: "JAIPURSEZUN1",
    
                subLocation: "JAIPURSEZUN1",
    
                assetStatus: "Idle",
    
                serialNo: "NA",
    
                poNo: 1200016563,
    
                price: 21437.0,
    
                currency: "(USD)",
    
                conversionFactor: 73.5,
    
                priceInr: 1575619.5,
    
                bondNo: "138~~Mar 11 2016",
    
                tags: null,
    
                remarks: "FOR JAIPUR SDB",
    
                categoryName: "AV",
    
                vendor: "7.00001399E8"
    
            }
    
        ],
    
        pageable: {
    
            sort: {
    
                unsorted: true,
    
                sorted: false,
    
                empty: true
    
            },
    
            pageSize: 10,
    
            pageNumber: 0,
    
            offset: 0,
    
            unpaged: false,
    
            paged: true
    
        },
    
        totalPages: 9759,
    
        totalElements: 97590,
    
        last: false,
    
        number: 0,
    
        sort: {
    
            unsorted: true,
    
            sorted: false,
    
            empty: true
    
        },
    
        numberOfElements: 10,
    
        first: true,
    
        size: 10,
    
        empty: false
    
    };
    // component = new TableComponent(dataItem,router);
    spyOn(component.getDataItem(), 'getTableData').and.returnValue(of(mockTableData));

    // act
    component.getITems();

    // assert
    expect(component.totalElements).toBe(97590);
    expect(component.totalPages).toBe(9759);
    expect(component.size).toBe(10);
    expect(component.dataSource.data).toEqual(mockTableData.content);
    expect(component.searching).toBe(false);
  });

// it('should log an error message and set searching to false if table data fetch fails', () => {
//   // arrange
// // dataItem = TestBed.inject(TableService) as jasmine.SpyObj<TableService>;
// //   dataItem=TestBed.inject(TableService);
// //   router = jasmine.createSpyObj('Router', ['navigate']);
//   // component = new TableComponent(dataItem,router);

//   spyOn(component.getDataItem(), 'getTableData');
//   spyOn(console, 'error');
// /* this.dataItem.getTableData(this.currentpage, this.pageSize).subscribe((data: any) => {
//       this.totalElements = data.totalElements;
//       this.totalPages = data.totalPages;
//       this.size = data.size;
//       this.dataSource.data = data['content']
//       console.log(this.dataSource);*/ 
//   // act
//   component.getITems();
// // component.getDataItem().getTableData(0,10);
//   // assert
//   expect(component.totalElements).toBeUndefined();
//   expect(component.totalPages).toBeUndefined();
//   expect(component.size).toBeUndefined();
//   expect(component.dataSource.data).toBeUndefined();
//   expect(component.searching).toBe(false);
//   expect(console.error).toHaveBeenCalledWith('Error in fetching data');

// });
});

// getRowDetail()-----------------------------
// just want to know how to create service file object to give an argument
describe('getRowDetail()', () => {
it('should navigate to tableItemDetails/:asset_id when a row is clicked', () => {
  router = jasmine.createSpyObj('Router', ['navigate']);
  dataItem=TestBed.inject(TableService);
    component = new TableComponent(dataItem,router);
  component.getRowDetail('12345');
  expect(router.navigate).toHaveBeenCalledWith(['/tableItemDetails', '12345']);
});});

//applyFilter---------------------------------
describe('applyFilter()', () => {

  let matSelectChangeSpy: jasmine.SpyObj<MatSelectChange>;

  beforeEach(() => {
    // matSelectChangeSpy = jasmine.createSpyObj<MatSelectChange>('MatSelectChange', ['value']);
    matSelectChangeSpy = jasmine.createSpyObj<MatSelectChange>('MatSelectChange', ['value']);
    // component = new MyComponent();

    // Set up the spies in the matSelectChangeSpy object
    matSelectChangeSpy.value = ['Pune', 'Indore'];
  });

  it('should select correct while applying filter', () => {
    const columnName = 'location';
    const event = { value: ['Pune','Indore'] };

    component.applyFilter(matSelectChangeSpy, columnName);

    expect(component.filterValues[columnName]).toEqual(event.value);
  });
});

// addFilter()---------------------------------------------------
describe('addFilter()', () => {
it('should add a new filter if not exists and update an existing filter if exists', () => {
  const columnName1 = 'location';
  const selectedValues1 = [ 'Indore', 'Pune'];
  const columnName2 = 'assetMake';
  const selectedValues2 = ['EXTRON', 'SAMSUNG','CRESTRON'];
  const columnName3 = 'vendor';
  const selectedValues3 = ['MULTEE PRO INDIA', 'MOS WORLD SOUTH EAST ASIA PTE LTD'];

  component.addFilter(columnName1, selectedValues1);

  expect(component.filters.length).toBe(1);
  expect(component.filters[0].columnName).toBe(columnName1);
  expect(component.filters[0].values).toEqual(selectedValues1);

  component.addFilter(columnName2, selectedValues2);

  expect(component.filters.length).toBe(2);
  expect(component.filters[1].columnName).toBe(columnName2);
  expect(component.filters[1].values).toEqual(selectedValues2);

  component.addFilter(columnName1, ['JAIPURSEZUN1']);

  expect(component.filters.length).toBe(2);
  expect(component.filters[0].values).toEqual(['Indore', 'Pune', 'JAIPURSEZUN1']);

  component.addFilter(columnName3, selectedValues3);

  expect(component.filters.length).toBe(3);
  expect(component.filters[2].columnName).toBe(columnName3);
  expect(component.filters[2].values).toEqual(selectedValues3);
});
});

// applyFilter01()-----------------------------------
it('should call the getFilteredData method of the DataItemService', () => {
 spyOn(component.getDataItem(), 'getFilteredData').and.returnValue(of([]));

  // Call the method that you want to test
  component.applyFilters01();

  expect(component.getDataItem().getFilteredData).toHaveBeenCalled();
});


//clearFilter()---------------------------------------
describe('clearFilters()', () => {
  it('should clear filter', () => {
    // Arrange
component.filters=[]
component.resetLocationFilter="Indore"
component.resetVendorFilter="MOS WORLD"
component.resetAssetMakeFilter="SAMSUNG"
component.search="Samsung"
component.filterValues={}
component.currentpage = 5;

 spyOn(component.getDataItem(), 'getFilteredData').and.returnValue(of([]));//checking service file is calling or not

// Act
    component.clearFilters();
    
    // Assert
    expect(component.filters.length).toBe(0);
    expect(component.resetLocationFilter).toBe('');
    expect(component.resetVendorFilter).toBe('');
    expect(component.resetAssetMakeFilter).toBe('');
    expect(component.search).toBe('');
    expect(component.filterValues).toEqual({});
    expect(component.currentpage).toBe(0);
    // expect(component.getDataItem().getFilteredData(component.filters, component.currentpage, component.pageSize)).toHaveBeenCalled();
  });
});

});
