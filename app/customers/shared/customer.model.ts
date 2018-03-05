export class Customer {
    id: string;
    Name: string;
    City: string;
    rowid: string;

    constructor(options: any) {
        //console.log("class Customer: " + JSON.stringify(options));
        this.id = options.id;
        this.Name = options.Name;
        this.City = options.City;
        this.rowid = options.rowid;
    }
}
