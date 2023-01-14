const router = require("express").Router();
const { MessageMailer } = require("../nodemailer/email");
let Person = require("../model/person.model");

router.get("/", async (req, res) => {
  await Person.find()
    .then((guess) => res.json(guess))
    .catch((err) => res.status(400).json("ERROR :" + err));
});

// BOOK A PERSON
router.post("/reserved/booking", async (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const checkIn = req.body.checkIn;
  const checkOut = req.body.checkOut;
  const guess = req.body.guess;
  const room = req.body.room;

  const bookPerson = new Person({
    fullname,
    email,
    checkIn,
    checkOut,
    guess,
    room,
  });

  await bookPerson
    .save()
    .then((person) => {
      res.status(200).send({ message: "Booking Successfully Done." });
      MessageMailer(email, fullname, checkIn, room);
    })
    .catch((err) => res.status(400).json("ERROR :" + err));
});

module.exports = router;
