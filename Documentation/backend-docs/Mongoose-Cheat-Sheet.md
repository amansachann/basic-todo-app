### Comprehensive Mongoose Documentation

### Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Connecting to MongoDB](#connecting-to-mongodb)
4. [Defining a Schema](#defining-a-schema)
5. [Creating a Model](#creating-a-model)
6. [CRUD Operations](#crud-operations)
   - [Creating Documents](#creating-documents)
   - [Reading Documents](#reading-documents)
   - [Updating Documents](#updating-documents)
   - [Deleting Documents](#deleting-documents)
7. [Schema Types and Validation](#schema-types-and-validation)
   - [Custom Validation](#custom-validation)
8. [Schema Methods and Statics](#schema-methods-and-statics)
   - [Instance Methods](#instance-methods)
   - [Static Methods](#static-methods)
9. [Middleware](#middleware)
   - [Pre Middleware](#pre-middleware)
   - [Post Middleware](#post-middleware)
10. [Query Helpers](#query-helpers)
11. [Population](#population)
12. [Indexes](#indexes)
13. [Pagination and Filtering](#pagination-and-filtering)
14. [Transactions](#transactions)
15. [Aggregation](#aggregation)
16. [Handling Large Datasets with Cursors](#handling-large-datasets-with-cursors)
17. [Error Handling](#error-handling)
18. [Testing with Mongoose](#testing-with-mongoose)
19. [Security Best Practices](#security-best-practices)
20. [Best Practices](#best-practices)
21. [Complete Example of Express and Mongoose Application](#complete-example-of-express-and-mongoose-application)
22. [Conclusion](#conclusion)
23. [Additional Resources](#additional-resources)

---

### Introduction
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model your application data, offering features like validation, middleware, transactions, population, and more. Mongoose helps enforce structure and data integrity in MongoDB collections, making it easier to manage complex applications.

---

### Installation
You can install Mongoose via npm by running:

```bash
npm install mongoose
```

This will add Mongoose to your project's dependencies, enabling you to use its features in your Node.js applications.

---

### Connecting to MongoDB
To start using MongoDB with Mongoose, you need to establish a connection. Below is an example that demonstrates connecting to a local MongoDB instance and handling connection events.

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// Success event
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Error event
mongoose.connection.on('error', (err) => {
    console.error('Connection error:', err);
});
```

You can also configure Mongoose to use environment variables for connection strings to keep sensitive data secure:

```bash
# .env file
MONGODB_URI=mongodb://localhost:27017/mydatabase
```

Then, in your application:

```javascript
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
```

---

### Defining a Schema
A **Mongoose schema** defines the structure of documents in your MongoDB collection. It specifies the fields, their types, and validation rules. Below is an example of a basic schema for a `User`:

```javascript
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
}, { timestamps: true }); // Enables automatic `createdAt` and `updatedAt` timestamps
```

#### Schema Options
- **timestamps**: Automatically adds `createdAt` and `updatedAt` fields.
- **strict**: Mongoose will only allow fields that are specified in the schema, others will be discarded.
- **versionKey**: Disables the default `__v` version key if set to `false`.

```javascript
const postSchema = new Schema({
    title: String,
    content: String
}, { versionKey: false });
```

You can also define **virtual properties** that are not stored in MongoDB but can be computed dynamically:

```javascript
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});
```

---

### Creating a Model
A **model** is a compiled version of the schema and provides an interface for interacting with the database.

```javascript
const User = mongoose.model('User', userSchema);
```

This model corresponds to the `users` collection in MongoDB.

---

### CRUD Operations

#### Creating Documents
You can create a new document by instantiating the model and calling `save()`.

```javascript
const newUser = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30
});

try {
    await newUser.save();
    console.log('User created');
} catch (err) {
    console.error('Error creating user:', err);
}
```

For **batch creation**, use `insertMany()`:

```javascript
await User.insertMany([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
]);
```

#### Reading Documents
You can query the database with methods like `find()`, `findById()`, and `findOne()`.

- **Find all users**:

```javascript
const users = await User.find();
console.log(users);
```

- **Find by condition**:

```javascript
const usersOver25 = await User.find({ age: { $gt: 25 } });
```

- **Pagination**:

```javascript
const page = 1;
const limit = 10;
const paginatedUsers = await User.find().skip((page - 1) * limit).limit(limit);
```

#### Updating Documents
There are multiple methods to update documents, such as `updateOne()`, `updateMany()`, `findByIdAndUpdate()`, etc.

- **Find and update**:

```javascript
const updatedUser = await User.findByIdAndUpdate('userId', { name: 'Jane Doe' }, { new: true });
console.log(updatedUser);
```

#### Deleting Documents
You can delete documents with methods like `deleteOne()`, `deleteMany()`, and `findByIdAndDelete()`.

```javascript
await User.deleteOne({ _id: 'userId' });
console.log('User deleted');
```

---

### Schema Types and Validation
Mongoose provides a variety of schema types and built-in validation options.

- **String**: `String`, with options like `minlength`, `maxlength`, `match`.
- **Number**: `Number`, with options like `min`, `max`.
- **Boolean**: `Boolean`, representing true/false values.
- **Date**: `Date`, for date and time.

#### Custom Validation
You can create custom validators by defining the `validate` function.

```javascript
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /.+@.+\..+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    }
});
```

---

### Schema Methods and Statics

#### Instance Methods
Instance methods operate on individual documents.

```javascript
userSchema.methods.getInitials = function () {
    return this.name.split(' ').map(word => word[0]).join('');
};
```

```javascript
const user = await User.findById('userId');
console.log(user.getInitials());
```

#### Static Methods
Static methods are called on the model itself and not on an instance.

```javascript
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};
```

```javascript
const user = await User.findByEmail('john.doe@example.com');
console.log(user);
```

---

### Middleware

#### Pre Middleware
Pre middleware runs before certain actions, such as `save`, `remove`, `update`, and `find`.

```javascript
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
```

#### Post Middleware
Post middleware runs after an action is completed.

```javascript
userSchema.post('save', function (doc, next) {
    console.log('User saved:', doc);
    next();
});
```

---

### Query Helpers
Query helpers allow you to chain custom query logic.

```javascript
userSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, 'i') });
};
```

```javascript
const users = await User.find().byName('John');
```

---

### Population
Population lets you reference documents from other collections, enabling you to create relationships between models.

```javascript
const postSchema = new Schema({
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postSchema);

// Populate author field
const posts = await Post.find().populate('author');
console.log(posts);
```

---

### Indexes
Indexes improve query

 performance by creating fast lookup paths. Use the `index()` method to create indexes.

```javascript
userSchema.index({ name: 1, age: -1 });
```

Mongoose also supports **compound indexes**, text indexes for **full-text search**, and more.

```javascript
// Text index
userSchema.index({ name: 'text', email: 'text' });
```

---

### Pagination and Filtering
Pagination helps in breaking down large result sets. Here's a simple example of pagination using `limit` and `skip`:

```javascript
const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);
```

You can also use libraries like `mongoose-paginate-v2` to simplify pagination logic:

```javascript
const mongoosePaginate = require('mongoose-paginate-v2');
userSchema.plugin(mongoosePaginate);
const result = await User.paginate({}, { page: 1, limit: 10 });
```

---

### Transactions
Mongoose supports transactions, which allow you to execute a sequence of operations atomically.

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
    await User.create([{ name: 'User1' }], { session });
    await User.create([{ name: 'User2' }], { session });

    await session.commitTransaction();
    session.endSession();
} catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
}
```

---

### Aggregation
Aggregation pipelines allow you to perform advanced data manipulations, like filtering, sorting, grouping, and transformations.

```javascript
const result = await User.aggregate([
    { $match: { age: { $gte: 18 } } },
    { $group: { _id: null, averageAge: { $avg: "$age" } } }
]);
```

---

### Handling Large Datasets with Cursors
For processing large datasets efficiently, you can use cursors instead of loading the entire dataset into memory.

```javascript
const cursor = User.find().cursor();
for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    console.log(doc);
}
```

---

### Error Handling
Error handling in Mongoose allows you to catch and manage different types of errors, such as validation errors and MongoDB errors.

```javascript
try {
    await newUser.save();
} catch (err) {
    if (err.name === 'ValidationError') {
        console.error('Validation Error:', err.message);
    } else {
        console.error('Database Error:', err);
    }
}
```

You can also differentiate between MongoDB errors, like duplicate key errors, and validation errors.

---

### Testing with Mongoose
When testing Mongoose applications, you can mock database interactions using libraries like `sinon` or `mongoose-mock`.

```javascript
const sinon = require('sinon');
sinon.stub(User, 'find').returns([/* mocked user data */]);
```

Unit tests can also use an in-memory MongoDB instance with `mongodb-memory-server`.

---

### Security Best Practices
1. **Input Validation**: Always validate user inputs to avoid injection attacks.
2. **Query Rate Limiting**: Implement rate limiting to avoid database overload.
3. **Sanitization**: Ensure query inputs are sanitized to avoid injection attacks.

---

### Best Practices
- Always define **schema validations** to ensure data integrity.
- Use **Indexes** to optimize query performance.
- Implement **Transactions** for critical operations.
- Use **population** carefully to avoid unnecessary database joins.
- Handle **errors** properly, differentiating between different error types.

---

### Complete Example of Express and Mongoose Application

```javascript
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0 }
});

// Define User Model
const User = mongoose.model('User', userSchema);

// Route to create a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Route to get all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

---

### Conclusion
Mongoose provides a powerful and flexible ODM solution for working with MongoDB in Node.js. By defining schemas, handling validation, and using features like transactions and population, you can manage complex applications with ease.

---

### Additional Resources
- [Mongoose Official Documentation](https://mongoosejs.com/)
- [MongoDB Official Documentation](https://www.mongodb.com/docs/)
