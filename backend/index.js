require("dotenv").config();
const path = require("path");
const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect(process.env.MONGO);

const User = require("./models/user.model");
const Item = require("./models/item.model");
const List = require("./models/list.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(cors({ origin: "*" }));

const _dirname = path.resolve();

app.use(express.static(path.join(__dirname, '..', 'frontend', 'desire-app', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'desire-app', 'dist', 'index.html'));
});

/*
All commands relating to List 
*/

//create account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Resistration sucesful",
  });
});

//Login account
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return red.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, userInfo.password);

  if (userInfo.email == email && passwordMatch) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login sucessful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});

//get user
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    res.sendStatus(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

//edit user
app.put("/edit-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { fullName, email, password } = req.body;

  try {
    const seconduser = await User.findById(user._id);
    if (fullName) {
      seconduser.fullName = fullName;
    }
    if (email) {
      seconduser.email = email;
    }
    if (password) {
      seconduser.password = password;
    }

    await seconduser.save();

    return res.json({
      error: false,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: `internal error ${error}`,
    });
  }
});

//delete account
app.delete("/delete-account", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
    //first delete all lists
    await List.deleteMany({ userId: user._id });
    await Item.deleteMany({ userId: user._id });
    await User.deleteOne({ _id: user._id });
    return res.json({
      error: false,
      message: "User has been deleted, including any user data",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `internal error ${error}`,
    });
  }
});

/*
All commands relating to List 
*/

//add list
app.post("/add-list", authenticateToken, async (req, res) => {
  const { listName } = req.body;
  const { user } = req.user;

  if (!listName) {
    return res
      .status(400)
      .json({ error: true, message: "List name is required" });
  }

  try {
    const list = new List({
      listName,
      userId: user._id,
    });

    await list.save();

    return res.json({
      error: false,
      list,
      message: "list sucessfully created",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `internal error ${error}`,
    });
  }
});

//get all list items
app.get("/get-lists", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
    const lists = await List.find({ userId: user._id });

    return res.json({
      error: false,
      lists,
      message: "All lists successfully sent",
    });
  } catch (error) {
    return res.json({
      error: true,
      message: `Internal error ${errors}`,
    });
  }
});

//get a single list
app.get("/get-list/:listId", authenticateToken, async (req, res) => {
  const listId = req.params.listId;
  const { user } = req.user;

  try {
    const list = await List.findOne({ _id: listId, userId: user._id });

    if (!list) {
      return res.status(400).json({ error: true, message: "List not found" });
    }

    return res.json({
      error: false,
      list,
      message: "List updates successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `internal error ${error}`,
    });
  }
});

//edit list
app.put("/edit-list/:listId", authenticateToken, async (req, res) => {
  const listId = req.params.listId;
  const listName = req.body.listName;
  const { user } = req.user;

  if (!listName) {
    return res.status(400).json({
      error: true,
      message: "No changes provided",
    });
  }

  try {
    const list = await List.findOne({ _id: listId, userId: user._id });

    if (!list) {
      return res.status(400).json({ error: true, message: "List not found" });
    }

    if (listName) list.listName = listName;

    await list.save();

    return res.json({
      error: false,
      list,
      message: "List updates successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `internal error ${error}`,
    });
  }
});

//delete list
app.delete("/delete-list/:listId", authenticateToken, async (req, res) => {
  const listId = req.params.listId;
  const { user } = req.user;

  try {
    const list = await List.findOne({ _id: listId, userId: user._id });

    if (!list) {
      return res.status(400).json({ error: true, message: "list not found" });
    }

    //Delete the list
    await List.deleteOne({ _id: listId, userId: user._id });
    //Delete all items in the list
    await Item.deleteMany({ listId: listId });

    return res.json({ error: false, message: "list deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: `internal error ${error}` });
  }
});

/*
All commands relating to Items 
*/

//add item
app.post("/add-item/:listId", authenticateToken, async (req, res) => {
  const listId = req.params.listId;
  const { itemName, image, description, amount } = req.body;
  const { user } = req.user;

  if (!itemName) {
    return res
      .status(400)
      .json({ error: true, message: "Item name is required" });
  }

  if (!amount) {
    return res.status(400).json({ error: true, message: "Amount is required" });
  }

  try {
    //case1: random input
    if (!mongoose.Types.ObjectId.isValid(listId)) {
      return res.status(400).json({ error: true, message: "Invalid list ID" });
    }

    //case2: invalid object input
    const list = await List.findOne({ _id: listId, userId: user._id });

    if (!list) {
      return res
        .status(400)
        .json({ error: true, message: "List was not found" });
    }

    //case3: valid input
    const item = new Item({
      itemName,
      image,
      description,
      amount,
      listId: listId,
      userId: user._id,
    });

    await item.save();

    return res.json({
      error: false,
      item,
      message: "Item added to list",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `internal error ${error}`,
    });
  }
});

//edit item
app.put("/edit-item/:itemId", authenticateToken, async (req, res) => {
  const itemId = req.params.itemId;
  const { itemName, image, description, amount, isPinned } = req.body;
  const { user } = req.user;

  if (!itemName && !description && !amount) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const item = await Item.findOne({ _id: itemId, userId: user._id });

    if (!item) {
      return res.status(400).json({ error: true, message: "Item not found" });
    }

    if (itemName) item.itemName = itemName;
    if (image) item.image = image;
    if (description) item.description = description;
    if (amount) item.amount = amount;
    if (isPinned) item.isPinned = isPinned;

    await item.save();

    return res.json({
      error: false,
      item,
      message: "Item updates successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `internal error ${error}`,
    });
  }
});

//get items in specifc list
app.get("/get-items-in-list/:listId", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const listId = req.params.listId;

  //Check if listId is a valid object, and not a random string
  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return res.status(400).json({ error: true, message: "Invalid list ID" });
  }

  try {
    // Check if the list exists
    const list = await List.findOne({ _id: listId, userId: user._id });

    if (!list) {
      return res
        .status(400)
        .json({ error: true, message: "List was not found" });
    }

    //Get all items in list
    const items = await Item.find({ userId: user._id, listId: listId }).sort({
      isPinned: -1,
    });

    return res.json({
      error: false,
      items,
      message: `Items successfully sent`,
    });
  } catch (error) {
    return res.json({
      error: true,
      message: `internal error ${error}`,
    });
  }
});

//delete item
app.delete("/delete-item/:itemId", authenticateToken, async (req, res) => {
  const itemId = req.params.itemId;
  const { user } = req.user;

  try {
    const note = await Item.findOne({ _id: itemId, userId: user._id });

    if (!note) {
      return res.status(400).json({ error: true, message: "item not found" });
    }

    await Item.deleteOne({ _id: itemId, userId: user._id });

    return res.json({ error: false, message: "item deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: `internal error ${error}` });
  }
});

//pin item
app.put("/pin-item/:itemId", authenticateToken, async (req, res) => {
  const itemId = req.params.itemId;
  const { user } = req.user;
  const { isPinned } = req.body;

  try {
    const item = await Item.findOne({ _id: itemId, userId: user._id });
    if (!item) {
      return res.status(400).json({ error: true, message: "Item not found" });
    }

    item.isPinned = isPinned;

    await item.save();

    return res.json({
      error: false,
      item,
      message: "Item has been pinned",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `Internal error ${error}`,
    });
  }
});

app.listen(8000);

module.exports = app;
