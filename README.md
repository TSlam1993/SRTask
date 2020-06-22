# Squad Ready IT Store (Test task)

## Getting started:

1. Run the client app using `npm run start` command in the current directory - the application will be available at [http://localhost:3000](http://localhost:3000)

2. Run the server app by moving into the `server` directory and running `npm run start` in terminal. See [API endpoints](#api-endpoints) below.

## Functional requirements

### Task 1: As a user I want to see a list of products titles and descriptions

  * Given that I am a user
  * When I land on the main page
  * Then I can see a list of product titles and descriptions (CSS styles to your taste)

### Task 2: As a user I want to see all available product categories

  * Given that I am a user
  * When I land on the main page
  * Then I can see a list of product categories (CSS styles to your taste)

### Task 3: As a user I want to be able to filter the products by category

  * Given that I am a user
  * When I land on the main page
  * And I click on a category
  * Then I see a list of only products belonging to that category
  * And the selected category is bold

### Task 4: As a user I want to only see the production description when the product title is clicked

  * Given that I am a user and I land on main page
  * When I land on the main page
  * Then I see only a list of product titles
  * And I click on a product title
  * Then I see the product desription underneath
  * And I click on another product title
  * Then I see only the description for the product last clicked

### Task5: As a user I want to be able to search for products by title and description

  * Given that I am a user
  * When I type into the input search
  * Then only products matching this search input in title and/or description are shown


#### [API endpoints:](#api-endpoints)
Ensure that the server is running locally (Step 2 in Getting Started), and then you can access: 
* Categories at: http://localhost:2567/products/v2.0/categories
* Products at: http://localhost:2567/products/v2.0/products

## Non-Functional Requirements

* The UI should be built with React, but you are allowed to use additional libraries if needed
* Use your preferred library for state management (Redux dependencies are already set up, but you can use what you want)
* Use your preferred CSS solution/library. Use your imagination, but do not spend too much time for css

## Visuals

![Image1](./public/first.png)
![Image2](./public/second.png)
![Image3](./public/third.png)
