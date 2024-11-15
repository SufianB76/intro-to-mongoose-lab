const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
console.log(process.env.MONGODB_URI)

const prompt = require('prompt-sync')();

// const username = prompt('What is your name? ');
// console.log(`Your name is ${username}`);
const Customer = require('./models/customer.js')
const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    console.log('Welcome to the CRM\n')
    while (true) {
        console.log('What would you like to do?\n')
        console.log('   1. Create a customer')
        console.log('   2. View all customers')
        console.log('   3. Update a customer')
        console.log('   4. Delete a customer')
        console.log('   5. quit\n')

        console.log('Number of action to run:\n')
        var decision = prompt(`# user inputs `)

        if (decision === '1') {
            var names = prompt("Enter a customer's name: ")
            var ages = prompt("Enter the customer's age: ")
            const customerData = {
                name: names,
                age: ages
            }
            const customer = await Customer.create(customerData)
            console.log(customer)
        }
        else if (decision === '2') {
            const customer = await Customer.find({})
            console.log('Here are all the customers: \n')
            console.log(customer)
        }
        else if (decision === '3') {
            const customer = await Customer.find()
            console.log('Customers: \n')
            customer.forEach((c) => console.log(`id: ${c._id} -- Name: ${c.name}, Age: ${c.age}`)) // had help from google to understand the correct syntax
            console.log('\nCopy and paste the id of the customer you would like to update here: ')
            var idNumber = prompt('# user inputs ')
            console.log('What is the customers new name?')
            var newName = prompt('# user inputs ')
            console.log('What is the customers new age?')
            var newAge = prompt('# user inputes ')
            const updatedCustomer = await Customer.findByIdAndUpdate(idNumber, { name: newName, age: newAge },
                { new: true }
            )
            console.log(customer.forEach((c) => console.log(`id: ${c._id} -- Name: ${c.name}, Age: ${c.age}`)))
        }
        else if (decision === '4') {
            const customer = await Customer.find()
            console.log('Customers: \n')
            customer.forEach((c) => console.log(`id: ${c._id} -- Name: ${c.name}, Age: ${c.age}`)) // had help from google to understand the correct syntax
            console.log('\nCopy and paste the id of the customer you would like to delete here: ')
            var idNumber = prompt('# user inputs ')
            const deleteCustomer = await Customer.findByIdAndDelete(idNumber)
            console.log(deleteCustomer)
        }
        else if (decision === '5') {
            console.log('exiting...')
            process.exit()
            break;
        }
        else {
            console.log('Invalid response, Try Again')
        }
    }
}

connect()
