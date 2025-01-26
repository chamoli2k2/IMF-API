import Gadget from "../models/gadget.model.js";
import { Op } from "sequelize";

// GET: Retrieve gadgets with optional status filter
const getGadgets = async (req, res) => {
    try {
      const { status } = req.query;
      const whereClause = status
        ? { status } // Filter by the provided status
        : { status: { [Op.ne]: "Decommissioned" } }; // Exclude "Decommissioned" if no status is provided
  
      const gadgets = await Gadget.findAll({ where: whereClause });
      const gadgetsWithProbability = gadgets.map((gadget) => ({
        ...gadget.toJSON(),
        missionSuccessProbability: `${Math.floor(Math.random() * 100)}%`,
      }));
      res.json(gadgetsWithProbability);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  

// POST: Add a new gadget
const addGadget = async (req, res) => {
  try {
    const { name, status } = req.body;
    const gadget = await Gadget.create({ name });
    if(status) {
        gadget.status = status;
        await gadget.save();
    }
    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH: Update a gadget
const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Gadget.update(req.body, { where: { id } });
    if (updated[0] === 0) {
      return res.status(404).json({ error: "Gadget not found" });
    }
    res.json({ message: "Gadget updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Mark a gadget as decommissioned
const deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: "Gadget not found" });
    }
    gadget.status = "Decommissioned";
    gadget.decommissionedAt = new Date();
    await gadget.save();
    res.json({ message: "Gadget decommissioned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: Trigger self-destruct sequence
const selfDestruct = async (req, res) => {
  try {
    const { id } = req.params;
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    res.json({
      message: `Self-destruct sequence triggered for gadget ${id}. Confirmation code: ${confirmationCode}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { getGadgets, addGadget, updateGadget, deleteGadget, selfDestruct };
