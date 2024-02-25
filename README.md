--Read Me--


Project Setup -->
git clone https://github.com/code-er7/EC-Backend.git
npm init
npx prisma migrate dev --name created all schema
npx prisma generate
npm start


Schema Design:

Users Table:
Columns: id (Primary Key), username, email, password_hash (hashed password), etc.


Categories Table:
Columns: id (Primary Key), name, description, etc.


Products Table:
Columns: id (Primary Key), title, description, price, availability, category_id (Foreign Key)




Carts Table:
Columns: id (Primary Key), user_id (Foreign Key)


Cart Items Table:
Columns: id (Primary Key), cart_id (Foreign Key), product_id (Foreign Key), quantity


Orders Table:
Columns: id (Primary Key), user_id (Foreign Key), created_at, total_amount 


Order Items Table:
Columns: id (Primary Key), order_id (Foreign Key), product_id (Foreign Key), quantity, price



Relationships:
Each user can have multiple carts, but only one active cart at a time. This relationship is achieved through the user_id column in the Carts table.

Each cart can have multiple cart items. This relationship is achieved through the cart_id column in the Cart Items table.

Each user can place multiple orders. This relationship is achieved through the user_id column in the Orders table.

Each order can have multiple order items. This relationship is achieved through the order_id column in the Order Items table.

Authentication:
When a user registers, their username, email, and hashed password are stored in the Users table.

Upon login, the API will validate the credentials and generate a JWT token, which the user will use for subsequent authenticated requests.

The JWT token will contain the user's ID and possibly other relevant information for authorization and validation.




Endpoints:


/register - Register a new user.  // send the name , email , password in the body of the req 

/login - Authenticate a user and generate a JWT token. // send the name , email , password in the body of the req


///////////////////////////////a meta endpoints  to crete a product for testing purpose ////////////////////////////////////// 
/createproducts 







///These all routes are protected 

/categories - Retrieve a list of categories.

/categories/{category_id}/products - Retrieve products based on category ID.

/products/{product_id} - Retrieve detailed information about a product by its ID.




/cart - View the current user's cart.

/cart/add/:productid - Add a product to the current user's cart.

/cart/update - Update the quantity of a product in the current user's cart.  // send the porductid and the quantity in the body of the req

/cart/remove - Remove a product from the current user's cart. //send the product id in the body of the req




/order/place - Place an order with products from the user's cart.

/order/history - Retrieve the order history for the current user.

/order/{order_id} - Retrieve detailed information about a specific order by its ID.
