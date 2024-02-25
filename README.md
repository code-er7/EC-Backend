# EC-Backend

This project is a backend API for an e-commerce platform. It provides endpoints for user authentication, managing products, carts, orders, and more.

## Project Setup

To set up the project, follow these steps:

1. Clone the repository: git clone https://github.com/code-er7/EC-Backend.git
2. Initialize npm: npm init
3. Run Prisma migrations to create the database schema:  npx prisma migrate dev --name created all schema
4. Generate Prisma client:  npx prisma generate
5. Start the server:  npm start

6. 
## Schema Design

### Users Table
- Columns: id (Primary Key), username, email, password_hash (hashed password), etc.

### Categories Table
- Columns: id (Primary Key), name, description, etc.

### Products Table
- Columns: id (Primary Key), title, description, price, availability, category_id (Foreign Key)

### Carts Table
- Columns: id (Primary Key), user_id (Foreign Key)

### Cart Items Table
- Columns: id (Primary Key), cart_id (Foreign Key), product_id (Foreign Key), quantity

### Orders Table
- Columns: id (Primary Key), user_id (Foreign Key), created_at, total_amount

### Order Items Table
- Columns: id (Primary Key), order_id (Foreign Key), product_id (Foreign Key), quantity, price

## Relationships
- Each user can have multiple carts, but only one active cart at a time.
- Each cart can have multiple cart items.
- Each user can place multiple orders.
- Each order can have multiple order items.

## Authentication
- Upon registration, user information is stored in the Users table.
- Authentication is handled through JWT tokens.
- Users can register and authenticate via the `/register` and `/login` endpoints.

## Endpoints

### Public Endpoints
- `/register`: Register a new user.
- `/login`: Authenticate a user and generate a JWT token.

### Protected Endpoints
- `/categories`: Retrieve a list of categories.
- `/categories/{category_id}/products`: Retrieve products based on category ID.
- `/products/{product_id}`: Retrieve detailed information about a product by its ID.
- `/cart`: View the current user's cart.
- `/cart/add/:productid`: Add a product to the current user's cart.
- `/cart/update`: Update the quantity of a product in the current user's cart.
- `/cart/remove`: Remove a product from the current user's cart.
- `/order/place`: Place an order with products from the user's cart.
- `/order/history`: Retrieve the order history for the current user.
- `/order/{order_id}`: Retrieve detailed information about a specific order by its ID.

### Meta Endpoint
- `/createproducts`: Meta endpoint to create products for testing purposes.

## Usage

To use the API, send HTTP requests to the respective endpoints. Ensure to include appropriate authentication headers for protected endpoints.

## Technologies Used
- Node.js
- Express.js
- Prisma
- JWT for authentication

## Contributors
- [Chetan Rao](https://github.com/yourusername)

Feel free to contribute to this project by submitting pull requests or opening issues.

Thank you for using EC-Backend! Happy coding! 🚀


