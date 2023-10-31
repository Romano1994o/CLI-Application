const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join("./db/contacts.json");

async function listContacts() {
    try {
      const response = await fs.readFile(contactsPath);
      const contacts = JSON.parse(response);
      return contacts;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getContactById(contactId) {
    try {
      const contacts = await listContacts();
      const findedContact = contacts.find((contact) => contact.id === contactId);
      if (!findedContact) {
        return null;
      }
      return findedContact;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
      const deletedContactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );
  
      if (deletedContactIndex === -1) {
        return null;
      }
      const deletedContact = contacts.splice(deletedContactIndex, 1);
  
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return deletedContact;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function addContact(name, email, phone) {
    try {
      const contacts = await listContacts();
      const newContact = {
        id: crypto.randomUUID(),
        name,
        email,
        phone: `${phone}`,
      };
      const newContacts = [...contacts, newContact];
      await fs.writeFile(contactsPath, JSON.stringify(newContacts));
      return newContact;
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };