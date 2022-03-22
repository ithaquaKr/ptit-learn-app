const router = require("express").Router();
const Document = require("../models/Document");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");
  

//CREATE

router.post("/", verifyToken, async (req, res) => {
    const newDocument = new Document(req.body);
    try {
      const savedDocument = await newDocument.save();
      res.status(201).json(savedDocument);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedDocument = await Document.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDocument);
    } catch (err) {
      res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Document.findByIdAndDelete(req.params.id);
      res.status(200).json("The document has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET

router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    res.status(200).json(document);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM

router.get("/random", verifyToken, async (req, res) => {
  const type = req.query.type;
  let document;
  try {
    if (type === "series") {
      document = await Document.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      document = await Document.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(document);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const documents = await Document.find();
      res.status(200).json(documents.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
