const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const debtController = require("./controllers/debtController");

const PORT = 3000;
const app = express();

const URL = "mongodb+srv://user:SoftwareEngineering5@cluster0.iop3o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const debtRouter = express.Router();
app.use('/api/debt', debtRouter);

// Create a debt in the database
// http://localhost:3000/api/debt
debtRouter.post('/', debtController.createDebt);

// Get debts from the database

// http://localhost:3000/api/debt
debtRouter.get('/', debtController.getDebts);

// Get a debt from the database
// http://localhost:3000/api/debt/"id"
debtRouter.get('/:id', debtController.getDebt);

// Change a debt's info
// http://localhost:3000/api/debt/"id"
debtRouter.patch('/:id', debtController.updateDebt);

// Delete a debt from the database
// http://localhost:3000/api/debt/"id"
debtRouter.delete('/:id', debtController.deleteDebt);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});