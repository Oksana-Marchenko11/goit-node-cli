import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve("db", "contacts.json")

export async function listContacts() {

    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
};

export async function getContactById(contactId) {
    const contact = await listContacts();
    return contact.find(contact => contact.id === contactId) || null;
}

export async function removeContact(contactId) {
    const contact = await listContacts();
    const index = contact.findIndex(contact => contact.id === contactId);
    if (index === -1) { return null };
    const [result] = contact.splice(index, 1);
    return result;
}

export async function addContact(data) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

