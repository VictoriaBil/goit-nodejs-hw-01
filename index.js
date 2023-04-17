const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case "getById":
      const oneContact = await contacts.getContactById(id);
      return console.table(oneContact);
    case "removeById":
      const removeContact = await contacts.removeContact(id);
      return console.table(removeContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);
    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(options);
