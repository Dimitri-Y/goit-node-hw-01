import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./db/contacts.js";

const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.log(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      return console.log(contact);
      break;

    case "add":
      const aContact = await addContact(name, email, phone);
      return console.log(aContact);
      break;

    case "remove":
      const rContact = await removeContact(id);
      return console.log(rContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
