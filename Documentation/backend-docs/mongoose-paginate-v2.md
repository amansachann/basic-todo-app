# mongoose-paginate-v2: Cheat Sheet

## Overview

`mongoose-paginate-v2` is a Mongoose plugin that simplifies pagination of query results. It allows you to efficiently handle large datasets by splitting them into smaller, manageable pages. This enhances the performance of your application and improves user experience.

### Key Features
- Easy to implement pagination in Mongoose.
- Customizable pagination response.
- Support for query population.
- Integration with existing Mongoose models.

## Installation

To get started, install the plugin via npm:

```bash
npm install mongoose-paginate-v2
```

## Basic Usage

### Step 1: Define Your Schema and Model

Here's an example of how to define a schema and model for a `Product`:

```javascript
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

// Apply the pagination plugin to the schema
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);
```

### Step 2: Insert Sample Data

To illustrate pagination effectively, let's insert a larger dataset:

```javascript
const seedProducts = async () => {
    for (let i = 1; i <= 100; i++) {
        await Product.create({
            name: `Product ${i}`,
            price: Math.floor(Math.random() * 100) + 1,
            category: `Category ${Math.ceil(i / 10)}`,
            stock: Math.floor(Math.random() * 50) + 1,
        });
    }
};

seedProducts()
    .then(() => console.log('Sample products seeded.'))
    .catch((err) => console.error(err));
```

### Step 3: Implement Pagination

Now that we have a dataset, we can implement pagination:

```javascript
const getPaginatedProducts = async (page, limit) => {
    const options = {
        page: page || 1, // Current page number
        limit: limit || 10, // Number of products per page
        sort: { createdAt: -1 }, // Sort by createdAt in descending order
        populate: { path: 'category' }, // Example of population if needed
    };

    try {
        const result = await Product.paginate({}, options);
        console.log('Paginated Products:', result);
    } catch (err) {
        console.error('Error fetching paginated products:', err);
    }
};

// Retrieve the first page of products with a limit of 10
getPaginatedProducts(1, 10);
```

### Pagination Response

The result of the `getPaginatedProducts` function will look like this:

```json
{
    "docs": [
        {
            "_id": "1",
            "name": "Product 100",
            "price": 42,
            "category": "Category 10",
            "stock": 37,
            "createdAt": "2024-10-22T00:00:00.000Z"
        },
        // Additional product documents...
    ],
    "totalDocs": 100,
    "limit": 10,
    "totalPages": 10,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
}
```

## Customizing Pagination Labels

You can customize the response labels for clarity by modifying the `options` object:

```javascript
const options = {
    page: 1,
    limit: 10,
    customLabels: {
        totalDocs: 'Total Products',
        docs: 'Products',
        limit: 'Items per Page',
        page: 'Current Page',
        totalPages: 'Total Pages',
        hasNextPage: 'Has Next Page',
        hasPrevPage: 'Has Previous Page',
        prevPage: 'Previous Page',
        nextPage: 'Next Page',
        pagingCounter: 'Paging Counter',
    }
};
```

### Example with Custom Labels

Using custom labels, the response from `getPaginatedProducts` would look like:

```json
{
    "Products": [
        {
            "_id": "1",
            "name": "Product 100",
            "price": 42,
            "category": "Category 10",
            "stock": 37,
            "createdAt": "2024-10-22T00:00:00.000Z"
        },
        // Additional product documents...
    ],
    "Total Products": 100,
    "Items per Page": 10,
    "Total Pages": 10,
    "Current Page": 1,
    "Paging Counter": 1,
    "Has Next Page": true,
    "Has Previous Page": false,
    "Previous Page": null,
    "Next Page": 2
}
```

## Conclusion

`mongoose-paginate-v2` is an excellent tool for implementing pagination in Mongoose applications. With its ease of use and powerful customization options, you can efficiently manage large datasets, making it easier for users to navigate through them.

### Additional Resources

For more details and advanced features, check out the [mongoose-paginate-v2 GitHub Repository](https://github.com/alexcodeup/mongoose-paginate-v2).

