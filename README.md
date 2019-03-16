# Pro-geek E-commerce - API Aplication

Pro-geek is a action-figures ecommerce aplication developed as our final project at Ironhack's full stack course. This repository keeps the RESTful API aplication, which is resposible for the back-end (data persistence).
Each successful request will generate a response with a JSON all information requested, so it can be used in the front-end.

## Acknowledgments

It was 3 weeks with a lot of work and dedication after almost 2 months bootcamping. Everybody at Ironhack's Sao Paulo has a huge participation on this achievement and we are very gratefull for all the support and for believe in our potential. :-)

## API carachteristics

* Stack used: Node, Express, Mongoose, Morgan, Cors, BodyParser, Passport, Bcrypt, Multer, Cloudinary-Multer
* Requests inplemented: GET, POST, PUT, PATCH & DELETE
* Deployed at: Heroku

* Link to API: [https://pro-geek-ecommerce-api.herokuapp.com/]
* Endpoints: "/users", "/categories", "/products", "/orders", "/evaluations"

* Link to Front-End aplication: [https://pro-geek-surge.sh]
* Link to Front-End repository: [https://github.com/henriquegmendes/pro-geek-ecommerce-app-front-end-react]

## Additional implementations and improvements

Althouth the API is fully functional, improvements can be made to validate the data being sent from the front-end in order to ensure a consistent information being stored in the database.

## Contributing

Please feel free to fork/clone this repo to look deeper into the logics of this API and contribute with some of the above improvements if you like :-)
By forking this repo, use '$ npm install' in your terminal to add all dependencies needed. You will also need to create a ".env" file in your root folder and add some keys:
* PORT=YOUR_LOCALHOST_ACCESS_PORT
* MONGODB_URI=mongodb://localhost/YOUR_COLLECTION_NAME_IN_MONGODB
* cloudKey=YOUR_CLOUDINARY_KEY
* cloudName=YOUR_CLOUDINARY_NAME
* cloudSecret=YOUR_CLOUDINARY_SECRET

You will also need to set up CORS middleware to ensure that the requests sent from the front-end will be accepted. Just go to "index.js" file and set up the origin link at line #39 (example below).

*app.use(cors({*
  *credentials: true,*
  **origin: ['http://localhost:3000']**
*}));*

## Authors & Version Control

API developed by **Bruno Dolce - https://github.com/brudolce**, **Henrique Guazzelli Mendes - https://github.com/henriquegmendes** & **João Pedro Serrat - https://github.com/Jpserrat** - *ProGeek API App Version 0.1* - **Published in March-10th of 2019**