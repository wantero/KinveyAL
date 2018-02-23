export class Customer {
    id: string;
    name: string;
    city: string;

    constructor(options: any) {
        console.log(JSON.stringify(options));
        this.id = options.id;
        this.name = options.Name;
        this.city = options.City;
    }
}
