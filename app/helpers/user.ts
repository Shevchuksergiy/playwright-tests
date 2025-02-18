import { faker } from '@faker-js/faker';

export class User {
    public email: string;
    public name: string
    constructor() {
        this.email = "c203d557831-dcd27d+"+faker.person.firstName()+faker.number.int({ min: 1, max: 100 })+"@inbox.of-it.org"
        this.name = faker.person.firstName();
    }
}