const router = require("express").Router();
let Admin = require("../model/admin.model");
let Person = require("../model/person.model");

const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const emailLogin = await Admin.findOne({ email: req.body.email });

  try {
    if (emailLogin) {
      // const token = emailLogin.generateAuthToken();
      const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "24h",
      });
      res.json({ token: token, user: emailLogin.email, isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
  } catch (error) {
    throw error;
  }
});

// VERIFY TOKEN
router.post("/token", async (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
    try {
      if (err) {
        // console.log(err);
        // res.json(err);
        res.json({ isValid: false, err });
      } else {
        res.json({ isValid: true });
      }
    } catch (error) {
      throw error;
    }
  });
});

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const newAdmin = new Admin({
    firstName,
    lastName,
    email,
  });

  await newAdmin
    .save()
    .then((admin) =>
      res.status(200).send({ message: "New admin successfully added." })
    )
    .catch((err) => res.status(400).json("ERROR :" + err));
});

router.delete("/delete/:id", async (req, res) => {
  await Person.findByIdAndDelete(req.params.id)
    .then((result) => res.status(200).json("Client deleted"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
