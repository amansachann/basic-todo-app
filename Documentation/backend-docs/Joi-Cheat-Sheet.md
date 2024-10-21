# **Cheat Sheet to Joi Validation in Node.js**

## **Table of Contents**
1. [**Introduction**](#1-introduction)
2. [**Installation**](#2-installation)
3. [**Joi Schema Basics**](#3-joi-schema-basics)
   - [Basic Validation Example](#basic-validation-example)
   - [String Validation](#string-validation)
   - [Number Validation](#number-validation)
   - [Boolean Validation](#boolean-validation)
   - [Object Validation](#object-validation)
   - [Array Validation](#array-validation)
   - [Date Validation](#date-validation)
4. [**Advanced Joi Validation Techniques**](#4-advanced-joi-validation-techniques)
   - [Nested Object Validation](#nested-object-validation)
   - [Conditional Validation](#conditional-validation)
   - [Custom Validation](#custom-validation)
   - [Asynchronous Validation](#asynchronous-validation)
5. [**Validation Options**](#5-validation-options)
6. [**Common Validators and Methods**](#6-common-validators-and-methods)
   - [`Joi.any()`](#joiany)
   - [`Joi.string()`](#joistring)
   - [`Joi.number()`](#joinumber)
   - [`Joi.date()`](#joi-date)
   - [`Joi.boolean()`](#joiboolean)
   - [`Joi.array()`](#joiarray)
   - [`Joi.object()`](#joiobject)
   - [Schema Composition with `Joi.alternatives()`, `Joi.when()`, `Joi.any()`](#schema-composition)
7. [**Error Handling and Custom Error Messages**](#7-error-handling-and-custom-error-messages)
   - [Custom Error Messages](#custom-error-messages)
   - [Logging and Error Tracking](#logging-and-error-tracking)
8. [**Modularization and Reusability**](#8-modularization-and-reusability)
   - [Shared Schemas](#shared-schemas)
   - [Pre-Defined Schemas and Extending Joi](#pre-defined-schemas-and-extending-joi)
9. [**Performance Considerations**](#9-performance-considerations)
10. [**Security Considerations**](#10-security-considerations)
11. [**Testing Joi Schemas**](#11-testing-joi-schemas)
12. [**Joi with API Frameworks**](#12-joi-with-api-frameworks)
    - [Joi with Express.js](#joi-with-expressjs)
    - [Joi with Hapi.js](#joi-with-hapijs)
13. [**Joi with ORMs and Databases**](#13-joi-with-orms-and-databases)
    - [Joi with Sequelize](#joi-with-sequelize)
    - [Joi with Mongoose](#joi-with-mongoose)
14. [**Joi with TypeScript**](#14-joi-with-typescript)
15. [**Converting Joi to JSON Schema**](#15-converting-joi-to-json-schema)
16. [**Compliance and Industry-Specific Validation**](#16-compliance-and-industry-specific-validation)
17. [**Conclusion**](#17-conclusion)

---

## **1. Introduction**

Joi is a powerful validation library for JavaScript, commonly used in Node.js applications. It helps you define object schemas, validate data, and enforce strict rules on incoming data structures. Proper validation is crucial for securing applications and ensuring data integrity.

This guide will walk you through everything you need to know to master Joi, from simple schema definitions to advanced patterns used in real-world applications.

---

## **2. Installation**

To get started with Joi, you need to install the package in your Node.js project:

```bash
npm install joi
```

Once installed, import Joi in your project:

```javascript
const Joi = require('joi'); // Import Joi for data validation
```

---

## **3. Joi Schema Basics**

A Joi schema is used to define the structure and rules for data validation. Let’s start by covering some of the most basic types of validation.

### **Basic Validation Example**

Here’s an example of validating an object with two fields: `name` and `age`.

```javascript
// Define a schema with required fields and constraints
const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(), // Name must be a string, between 3 and 30 characters
    age: Joi.number().integer().min(0).max(120).required() // Age must be an integer between 0 and 120
});

// Validate an object against the schema
const result = schema.validate({ name: "John", age: 25 }); // Validate the object { name: "John", age: 25 }

// Check if there's an error during validation
if (result.error) {
    console.log(result.error.details); // Log the validation errors if any
} else {
    console.log("Validation passed!"); // Confirm successful validation
}
```

---

### **String Validation**

Joi provides a number of useful string validation methods:

```javascript
// Define a schema for string validation
const schema = Joi.string().min(5).max(10).required(); // String must be between 5 and 10 characters

// Validate a string against the schema
const result = schema.validate("hello"); // Validate the string "hello"
```

Common string methods include:
- `min(length)`: Minimum length of the string.
- `max(length)`: Maximum length of the string.
- `regex()`: Allows regex-based validation.
- `email()`: Ensures the string is a valid email format.
- `uri()`: Ensures the string is a valid URI.
- `alphanum()`: Alphanumeric characters only.

---

### **Number Validation**

Joi allows flexible number validation:

```javascript
// Define a schema for number validation
const schema = Joi.number().integer().min(10).max(100).required(); // Number must be an integer between 10 and 100

// Validate a number against the schema
const result = schema.validate(25); // Validate the number 25
```

Common number methods include:
- `min(value)`: Minimum number allowed.
- `max(value)`: Maximum number allowed.
- `greater(value)`: Ensures the number is greater than a specific value.
- `less(value)`: Ensures the number is less than a specific value.

---

### **Boolean Validation**

Booleans can be easily validated:

```javascript
// Define a schema for boolean validation
const schema = Joi.boolean().required(); // Boolean must be true or false

// Validate a boolean against the schema
const result = schema.validate(true); // Validate the boolean true
```

---

### **Object Validation**

Objects are the core structure Joi works with. Here’s an example:

```javascript
// Define a schema for object validation
const schema = Joi.object({
    name: Joi.string().required(), // Name must be a string and is required
    age: Joi.number().integer().min(0).max(120).required(), // Age must be an integer between 0 and 120
    email: Joi.string().email() // Email must be a valid email format
});
```

---

### **Array Validation**

Arrays are validated with the `.array()` method:

```javascript
// Define a schema for array validation
const schema = Joi.array().items(Joi.string()).min(2).max(5); // Array must have 2 to 5 string items

// Validate an array against the schema
const result = schema.validate(["apple", "banana"]); // Validate the array ["apple", "banana"]
```

You can also validate arrays with complex or nested items:

```javascript
// Define a schema for an array of objects
const schema = Joi.array().items(
    Joi.object({
        name: Joi.string().required(), // Each object must have a required string 'name'
        price: Joi.number().required() // Each object must have a required number 'price'
    })
);
```

---

### **Date Validation**

Joi offers built-in methods for date validation:

```javascript
// Define a schema for date validation
const schema = Joi.date().iso(); // Date must be in ISO format

// Validate a date against the schema
const result = schema.validate("2022-03-30"); // Validate the date "2022-03-30"
```

---

## **4. Advanced Joi Validation Techniques**

### **Nested Object Validation**

Joi can handle deeply nested objects. For instance, validating an address object within a user profile:

```javascript
// Define a schema for a nested object
const schema = Joi.object({
    name: Joi.string().required(), // Required string for 'name'
    address: Joi.object({
        street: Joi.string().required(), // Required string for 'street'
        city: Joi.string().required(), // Required string for 'city'
        postalCode: Joi.string().length(5).required() // Required string for 'postalCode' with length of 5
    }).required() // The address object itself is required
});

// Validate a nested object against the schema
const result = schema.validate({
    name: "John",
    address: {
        street: "123 Main St",
        city: "New York",
        postalCode: "10001"
    }
});
```

---

### **Conditional Validation**

Sometimes, validation rules depend on the values of other fields:

```javascript
// Define a schema with conditional validation


const schema = Joi.object({
    isActive: Joi.boolean().required(), // isActive must be a boolean
    status: Joi.string().when('isActive', { // status depends on isActive
        is: true, // If isActive is true
        then: Joi.string().valid('active').required(), // status must be 'active'
        otherwise: Joi.string().valid('inactive').required() // status must be 'inactive'
    })
});

// Validate the object
const result = schema.validate({ isActive: true, status: "active" });
```

---

### **Custom Validation**

You can create your own validation rules:

```javascript
// Define a custom validation rule
const schema = Joi.object({
    password: Joi.string().custom((value, helpers) => {
        if (!/[A-Z]/.test(value)) { // Check for at least one uppercase letter
            return helpers.error('any.custom'); // Custom error message
        }
        return value; // Return the validated value
    }).required() // Password is required
});

// Validate a password
const result = schema.validate({ password: "mypassword" });
```

---

### **Asynchronous Validation**

For cases that require async checks (like database queries), use `.validateAsync()`:

```javascript
// Asynchronous validation example
const schema = Joi.object({
    email: Joi.string().email().required() // Email must be valid and required
});

// Example async function to validate an email
async function validateEmail(email) {
    try {
        const result = await schema.validateAsync({ email }); // Validate asynchronously
        console.log("Validation passed:", result);
    } catch (error) {
        console.log("Validation failed:", error.details); // Log validation errors
    }
}

validateEmail("test@example.com"); // Call the async validation function
```

---

## **5. Validation Options**

Joi allows for various validation options, such as:

- **`abortEarly`**: If set to `false`, will return all errors found in the validation.
- **`allowUnknown`**: If set to `true`, will allow properties not defined in the schema.
- **`stripUnknown`**: If set to `true`, will remove properties not defined in the schema from the validated result.

Example:

```javascript
const options = {
    abortEarly: false, // Return all errors
    allowUnknown: true, // Allow unknown keys
    stripUnknown: true // Remove unknown keys
};

const result = schema.validate(data, options); // Validate with options
```

---

## **6. Common Validators and Methods**

### **`Joi.any()`**

Used for any type of value. Can be used for types that do not fit into other categories.

```javascript
const schema = Joi.any(); // Allows any value
```

### **`Joi.string()`**

For string values, allows various methods for string validation.

```javascript
const schema = Joi.string().min(5).max(10); // String must be between 5 and 10 characters
```

### **`Joi.number()`**

For number values, with validation methods for integers, decimals, etc.

```javascript
const schema = Joi.number().positive(); // Number must be positive
```

### **`Joi.date()`**

For date values, allowing validation for formats, ranges, etc.

```javascript
const schema = Joi.date().iso(); // Date must be in ISO format
```

### **`Joi.boolean()`**

For boolean values (true/false).

```javascript
const schema = Joi.boolean().required(); // Boolean must be present
```

### **`Joi.array()`**

For array values, with methods to specify item types and validation constraints.

```javascript
const schema = Joi.array().items(Joi.string()).min(1); // Array must contain at least one string
```

### **`Joi.object()`**

For validating object structures.

```javascript
const schema = Joi.object({
    id: Joi.string().required(), // id is required
    name: Joi.string().optional() // name is optional
});
```

### **Schema Composition with `Joi.alternatives()`, `Joi.when()`, `Joi.any()`**

Used for creating complex validation schemas with multiple options.

```javascript
const schema = Joi.alternatives().try(Joi.string(), Joi.number()); // Value can be either a string or a number

const schema = Joi.object({
    type: Joi.string().valid('car', 'truck').required(),
    vehicle: Joi.when('type', { // Conditional validation based on type
        is: 'car',
        then: Joi.object({ wheels: Joi.number().valid(4).required() }),
        otherwise: Joi.object({ wheels: Joi.number().valid(6).required() })
    })
});
```

---

## **7. Error Handling and Custom Error Messages**

### **Custom Error Messages**

You can customize error messages for better user feedback:

```javascript
const schema = Joi.string().min(5).messages({
    'string.min': 'The string must be at least {#limit} characters long', // Custom error for min length
    'string.empty': 'The string cannot be empty' // Custom error for empty string
});

// Validate a string
const result = schema.validate('abc'); // Validation will fail
```

### **Logging and Error Tracking**

Always log validation errors for monitoring and debugging:

```javascript
if (result.error) {
    console.error("Validation Error:", result.error.details); // Log detailed error messages
}
```

---

## **8. Modularization and Reusability**

### **Shared Schemas**

You can define reusable schemas for consistent validation:

```javascript
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
});

// Use the shared schema in multiple places
const validateUser = (userData) => userSchema.validate(userData);
```

### **Pre-Defined Schemas and Extending Joi**

You can create a base schema and extend it as needed:

```javascript
const baseSchema = Joi.object({
    id: Joi.string().required()
});

const extendedSchema = baseSchema.append({
    name: Joi.string().required()
}); // Adds 'name' to the base schema
```

---

## **9. Performance Considerations**

When using Joi, consider performance in high-throughput applications. Caching schemas or reducing complexity in validation can help maintain performance.

```javascript
const cachedSchema = Joi.object({ /* define schema */ });
// Reuse the same schema instance for performance
```

---

## **10. Security Considerations**

Ensure that your validation logic is secure against injection attacks. Always validate user input and never trust data coming from the client.

```javascript
// Validate and sanitize all user inputs
const result = schema.validate(userInput);
```

---

## **11. Testing Joi Schemas**

Unit testing your Joi schemas ensures they work as expected:

```javascript
const { expect } = require('chai'); // Using Chai for assertions

describe('User Validation', () => {
    it('should validate a valid user', () => {
        const userData = { name: "Alice", age: 30 };
        const result = userSchema.validate(userData);
        expect(result.error).to.be.undefined; // No error expected
    });

    it('should throw error for invalid user', () => {
        const userData = { age: 30 }; // Missing name
        const result = userSchema.validate(userData);
        expect(result.error).to.not.be.undefined; // Error expected
    });
});
```

---

## **12. Joi with API Frameworks**

### **Joi with Express.js**

Integrate Joi into your Express application for request validation:

```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
    const { error } = userSchema.validate(req.body); // Validate request body
    if (error) return res.status(400).send(error.details); // Return error if validation fails
    res.send("User is valid!"); // Success message
});
```

### **Joi with Hapi.js**

Hapi.js has built-in support for Joi validation:

```javascript
const Hapi = require('@hapi/hapi');
const server = Hapi.server({ port: 3000 });

server.route({
    method: 'POST',
    path: '/users',
    handler: (request, h) => {
        const { error } = userSchema.validate(request.payload); // Validate payload
        if (error) return h.response(error.details).code(400); // Return error if validation fails
        return "User is valid!"; // Success message
    }
});

server.start();
```

---

## **13. Joi with ORMs and Databases**

### **Joi with Sequelize**

When using Sequelize, validate models before saving:

```javascript
const User = sequelize.define('User', { /* Model definition */ });

const userData = { name: "Alice", age: 30 };
const { error } = userSchema.validate(userData); // Validate before saving

if (!error) {
    await User.create(userData); // Only save if valid
}
```

### **Joi with Mongoose**

Integrate Joi with Mongoose for validating documents:

```javascript
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ name: String, age: Number });

const User = mongoose.model('User', UserSchema);
const userData = { name: "Alice", age: 30 };

const { error } = userSchema.validate(userData); // Validate before saving

if (!error) {
    await User.create(userData); // Only save if valid
}
```

---

## **14. Joi with TypeScript**

Joi works well with

 TypeScript, providing type inference and validation.

```typescript
import Joi from 'joi';

// Define schema with TypeScript types
const userSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().min(0).required()
});

// Validate and infer types
const userData = { name: "Alice", age: 30 };
const { error, value } = userSchema.validate(userData); // Validate user data

// Type inference
type User = Joi.extractType<typeof userSchema>; // Create User type based on schema
```

---

## **15. Converting Joi to JSON Schema**

Joi schemas can be converted to JSON Schema for integration with other tools:

```javascript
const jsonSchema = schema.describe(); // Convert Joi schema to JSON Schema
console.log(JSON.stringify(jsonSchema, null, 2)); // Output JSON schema
```

---

## **16. Compliance and Industry-Specific Validation**

Joi can be used for compliance with specific regulations, such as GDPR or HIPAA, by ensuring data formats and structures adhere to required standards.

Example:

```javascript
const schema = Joi.object({
    email: Joi.string().email().required(), // Ensure valid email for GDPR compliance
    consent: Joi.boolean().valid(true).required() // Ensure user consent is recorded
});
```

---

## **17. Conclusion**

Joi is a powerful and flexible library for validating data in Node.js applications. Its rich set of features and methods allows for both simple and complex validations, making it an invaluable tool for developers. By following the examples and techniques outlined in this cheat sheet, you can effectively integrate Joi into your projects, ensuring robust data validation and improving the overall security of your applications.

