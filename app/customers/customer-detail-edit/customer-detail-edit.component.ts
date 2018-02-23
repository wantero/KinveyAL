import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";

import { CustomerEditService } from "../shared/customer-edit.service";
import { Customer } from "../shared/customer.model";
import { CustomerService } from "../shared/customer.service";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "CustomerDetailEdit",
    templateUrl: "./customer-detail-edit.component.html",
    styleUrls: ["./customer-detail-edit.component.scss"]
})
export class CustomerDetailEditComponent implements OnInit {
    private _customer: Customer;
    private _isUpdating: boolean = false;

    constructor(
        private _customerService: CustomerService,
        private _customerEditService: CustomerEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this.initializeEditOptions();

        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                const customerId = params.id;

                this._customer = this._customerEditService.startEdit(customerId);
            });
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get customer(): Customer {
        return this._customer;
    }

    get cityValue(): string {
        return this._customer.city;
    }

    set cityValue(value: string) {
        this._customer.city = value;
    }

    /* ***********************************************************
    * The edit cancel button navigates back to the item details page.
    *************************************************************/
    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as customers/shared/customer.service.ts
    *************************************************************/
    onDoneButtonTap(): void {
        /* ***********************************************************
        * By design this app is set up to work with read-only sample data.
        * Follow the steps in the "Kinvey database setup" section in app/readme.md file
        * and uncomment the code block below to make it editable.
        *************************************************************/

        /* ***********************uncomment here*********************
        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isCustomerImageDirty && this._customer.imageUrl) {
            queue = queue
                .then(() => this._customerService.uploadImage(this._customer.imageStoragePath, this._customer.imageUrl))
                .then((uploadedFile: any) => {
                    this._customer.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._customerService.update(this._customer))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/customers"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
        *********************uncomment here*************************/

        /* ***********************************************************
        * Comment out the code block below if you made the app editable.
        *************************************************************/
        const readOnlyMessage = "Check out the \"Kinvey database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
        const queue = Promise.resolve();
        queue.then(() => alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }))
            .then(() => this._routerExtensions.navigate(["/customers"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideBottom",
                    duration: 200,
                    curve: "ease"
                }
            }));
    }

    private initializeEditOptions(): void {

    }
}
