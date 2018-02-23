import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";

import { Customer } from "./shared/customer.model";
import { CustomerService } from "./shared/customer.service";

/* ***********************************************************
* This is the master list component in the master-detail structure.
* This component gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
@Component({
    selector: "CustomersList",
    moduleId: module.id,
    templateUrl: "./customer-list.component.html",
    styleUrls: ["./customer-list.component.scss"]
})
export class CustomerListComponent implements OnInit {
    private _isLoading: boolean = false;
    private _customers: ObservableArray<Customer> = new ObservableArray<Customer>([]);

    constructor(
        private _customerService: CustomerService,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this._isLoading = true;

        /* ***********************************************************
        * The data is retrieved remotely from FireBase.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in customers/shared/customer.service.ts
        *************************************************************/
        this._customerService.load()
            .then((customers: Array<Customer>) => {
                console.log('list');
                console.log(JSON.stringify(customers));
                this._customers = new ObservableArray(customers);
                this._isLoading = false;
            })
            .catch(() => {
                this._isLoading = false;
            });
    }

    get customers(): ObservableArray<Customer> {
        return this._customers;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * item details page. Retrieve a reference for the data item (the id) and pass it
    * to the item details page, so that it can identify which data item to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    onCustomerItemTap(args: ListViewEventData): void {
        const tappedCustomerItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/customers/customer-detail", tappedCustomerItem.id],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }
}
