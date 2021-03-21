const Debt = require('../models/Debt');

const getParsedFirstNameNLastName = (name) => {
  const parsedName = name.split(' ');
  const firstName = parsedName.slice(0, parsedName.length - 1).join(' ');
  const lastName = parsedName[parsedName.length - 1];
  return [firstName, lastName];
}

const DebtController = {
  // Create a new debt in the Database
  // Their information will be sent in the request body
  // This should send the created debt
  async createDebt(req, res) {
    try {
      const newDebt = new Debt(req.body);
      const newDebtSaved = await newDebt.save(newDebt);
      res.status(200).json(newDebtSaved);
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  },

  // Get debts from the database and send them in the response
  // This should send the found debts
  async getDebts(req, res) {
    const {query} = req;
    console.log(query);
    try {
      const existingDebts = await Debt.find(query);
      console.log(existingDebts);
      res.status(200).json(existingDebts);
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  },

  // Get a debt from the database and send it in the response
  // Its id will be in the request parameter 'id'
  // This should send the found debt
  async getDebt(req, res) {
    const {id} = req.params;
    // const [firstName, lastName] = getParsedFirstNameNLastName(name);
    try {
      const existingDebt = await Debt.findOne({ id });
      console.log(existingDebt);
      res.status(200).json(existingDebt);
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  },

  // Get a debt from the database and update the debt
  // The debt's id will be in the request parameter 'id'
  // The debt's new infos will be in the request body
  async updateDebt(req, res) {
    const {id} = req.params;
    // const [firstName, lastName] = getParsedFirstNameNLastName(name);
    try {
      const existingDebt = await Debt.findOne({ id });
      Object.entries(req.body).forEach(function([key, val]) {
        switch (key) {
          case 'amount':
            existingDebt.amount = val;
            break;
          case 'status':
            existingDebt.status = val;
            break;
          case 'isPaid':
            existingDebt.isPaid = val;
            break;
          case 'isRequested':
            existingDebt.isRequested = val;
            break;
          case 'type':
            existingDebt.type = val;
            break;
          case 'category':
            existingDebt.category = val;
            break;
          case 'note':
            existingDebt.note = val;
            break;
          default:
        }
      })
      const updatedDebt = await existingDebt.save();
      res.status(200).json(updatedDebt);
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  },

  // Delete a debt from the database
  // The debt's id will be sent in the request parameter 'id'
  // This should send a success status code
  async deleteDebt(req, res) {
    const {id} = req.params;
    // const [firstName, lastName] = getParsedFirstNameNLastName(name);
    try {
      const removedDebt = await Debt.findOneAndDelete({ id });
      res.status(200).json(removedDebt);
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  },
};

module.exports = DebtController;
