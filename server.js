require("dotenv").config();
require("./config/database")
const express = require("express");
const cors = require("cors")

const PORT = process.env.PORT || 1290;

const app = express();

const userRoute = require('./routes/userRoute');
const categoryRouter = require("./routes/categoryRoute")
const productRouter = require("./routes/productRoute")
const checkoutRouter = require("./routes/checkoutRoute")
const cartRouter = require("./routes/cartRoute")

app.use(express.json());
app.use(cors())
app.use('/api/v1', userRoute)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', checkoutRouter)
app.use('/api/v1', cartRouter)

const swaggerJsdoc = require('swagger-jsdoc');
const swagger_ui = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SWAGGER',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/documentation', swagger_ui.serve, swagger_ui.setup(openapiSpecification));


app.listen(PORT, () => {
  console.log(`server is listening to port: ${PORT}`);

})