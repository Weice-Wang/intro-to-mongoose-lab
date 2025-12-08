/*------------------------------- Starter Code -------------------------------*/

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const prompt = require("prompt-sync")();

/*------------------------------- Main connect -------------------------------*/

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

connect();
/*------------------------------ Query Functions -----------------------------*/

const runQueries = async () => {
  // const username = prompt("What is your name? ");

  // console.log(`Your name is ${username}`);
  console.log("Welcome to the CRM!\n");

  function showMenu() {
    console.log(`What would you like to do?
  
    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. Quit
    `);
  }

  let input = "";

  while (true) {
    showMenu();
    input = prompt("Number of action to run: ");
    console.log(`# user inputs ${input} `);
    if (input === "1") {
      await createCustomer();
    } else if (input === "2") {
      await viewCustomers();
    } else if (input === "3") {
      await updateCustomer();
    } else if (input === "4") {
      await deleteCustomer();
    } else if (input === "5") {
      console.log("Exiting...");
      break;
    } else {
      console.log("Invalid input");
    }
  }
};

const createCustomer = async () => {
  const userName = prompt("What is your name? ");
  const userAge = Number(prompt("What is your age "));
  const customerData = {
    name: userName,
    age: userAge,
  };
  const customer = await Customer.create(customerData);
  console.log(`Customer created: `, customer);
};

const viewCustomers = async () => {
  const customers = await Customer.find({});
  console.log("Belpw is a list of customers:", customers);
};

const updateCustomer = async () => {
  const customers = await Customer.find({});
  console.log("Below is a list of customers:", customers);
  const userID = prompt(
    "Copy and paste the id of the customer you would like to update here:"
  );
  console.log(`# user inputs ${userID} `);
  const newName = prompt("What is the customers new name?");
  console.log(`# user inputs ${newName} `);
  const newAge = Number(prompt("What is the customers new age?"));
  console.log(`# user inputs ${newAge} `);
  const updateCm = await Customer.findByIdAndUpdate(
    userID,
    {
      name: newName,
      age: newAge,
    },
    { new: true }
  );
  console.log("Updated customer:", updateCm);
};

const deleteCustomer = async () => {
  const customers = await Customer.find({});
  console.log("Below is a list of customers:", customers);
  const userID = prompt(
    "Copy and paste the id of the customer you would like to delete here:"
  );
  const removedCm = await Customer.findByIdAndDelete(userID);
  console.log("Removed customer:", removedCm);
};
