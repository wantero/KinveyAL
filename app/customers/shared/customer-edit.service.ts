import { Injectable } from "@angular/core";

import { Customer } from "./customer.model";
import { CustomerService } from "./customer.service";

@Injectable()
export class CustomerEditService {
    private _editModel: Customer;

    constructor(private _customerService: CustomerService) {}

    startEdit(id: string): Customer {
        this._editModel = null;

        return this.getEditableCustomerById(id);
    }

    getEditableCustomerById(id: string): Customer {
        if (!this._editModel || this._editModel.id !== id) {
            const customer = this._customerService.getCustomerById(id);
            //console.log('getEditableCustomerById: ' + console.log(JSON.stringify(customer)));

            // get fresh editable copy of customer model
            this._editModel = new Customer(customer);
            //console.log('this._editModel: ' + this._editModel.Name);
        }

        return this._editModel;
    }
}
