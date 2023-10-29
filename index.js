const contacts = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.table(contactsList);

      break;

    case "get":
      const contact = await contacts.getContactById(`${id}`);
      if (!contact) {
        throw new Error(`Contact with id: ${id} not found!`);
      }
      console.log(contact);

      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);

      break;

    case "remove":
      const deletedContact = await contacts.removeContact(`${id}`);
      console.log(deletedContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);