import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Config } from "../../shared/config";
import { Customer } from "./customer.model";

const editableProperties = [
    "Name",
    "City",
    "rowid"
];

@Injectable()
export class CustomerService {

    private static cloneUpdateModel(customer: Customer): object {
        // tslint:disable-next-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = customer[e], a), { _id: customer.id });
    }
    

    private allCustomers: Array<Customer> = [];
    private customersStore = Kinvey.DataStore.collection<any>("Customer");    

    getCustomerById(id: string): Customer {
        //console.log('getCustomerById id: ' + id);
        if (!id) {
            return;
        }

        return this.allCustomers.filter((customer) => {
            return customer.id === id;
        })[0];
    }
    

    load(): Promise<any> {
        /*return this.mock().then(() => {
            return this.allCustomers;
        });*/
        return this.login().then(() => {
            //console.log("Sync");
            //this.customersStore.clear();
            return this.customersStore.sync();
        }).then(() => {
            //console.log('Query');
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("Name");
            const stream = this.customersStore.find(sortByNameQuery);

            //console.log('stream: ' + JSON.stringify(stream));

            return stream.toPromise();
        }).then((data) => {
            //console.log('allCustomers');
            this.allCustomers = [];
            data.forEach((customerData: any) => {
                //console.log('forEach: ' + JSON.stringify(customerData));
                customerData.id   = customerData._id;
                
                const customer = new Customer(customerData);

                //console.log('forEach: ' + JSON.stringify(customer));

                this.allCustomers.push(customer);
            });

            return this.allCustomers;
        });
    }

    update(customerModel: Customer): Promise<any> {
        const updateModel = CustomerService.cloneUpdateModel(customerModel);

        //console.log('updateModel: ' + JSON.stringify(updateModel));

        return this.customersStore.save(updateModel);
    }    

    private mock(): Promise<any> {
        var _customerData: any = [];
        this.allCustomers = [];

        _customerData.id = "1";
        _customerData.Name = "William";
        _customerData.City = "Criciuma";
        var customer = new Customer(_customerData);
        this.allCustomers.push(customer);        

        _customerData.id = "2";
        _customerData.Name = "Leidiane";
        _customerData.City = "Pato Branco";
        customer = new Customer(_customerData);
        this.allCustomers.push(customer);        
        

        return Promise.resolve();
    }

    private login(): Promise<any> {
        //console.log(!!Kinvey.User.getActiveUser());
        if (!!Kinvey.User.getActiveUser()) {
            //console.log('promise');
            return Promise.resolve();
        } else {
            //console.log('Kinvey login');
            return Kinvey.User.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    }    
}