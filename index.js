import { program } from "commander";
import *as contacts from './contacts.js'

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.table(allContacts)
            break;

        case "get":
            const contactById = await contacts.getContactById(id);
            console.log(contactById)
            break;

        case "add":
            const addedContact = await contacts.addContact(data)
            console.log(addedContact);
            break;

        case "remove":
            const removedContact = await contacts.removeContact(id);
            console.log(removedContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);