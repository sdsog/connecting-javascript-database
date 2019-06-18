const express = require('express');
const router = express.Router();
const { addVillain, deleteVillain, editVillain, getVillains, getVillainById } = require('../data-helpers/villain-queries');








module.exports = router;