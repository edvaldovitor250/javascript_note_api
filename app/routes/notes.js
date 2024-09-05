var express = require('express');
var router = express.Router();
const Note = require('../models/note')
const withAuth = require('../middlewares/auth')


router.get('/', withAuth, async (req, res) => {
  try {
    const notes = await Note.find({ author: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Problem to fetch notes" });
  }
});



router.delete('/:id', withAuth, async (req, res) => {
  const { id } = req.params;

  try {
      let note = await Note.findById(id);

      if (isOwner(req.user, note)) {
          await Note.findByIdAndRemove(id);
          res.status(204).send();
      } else {
          res.status(403).json({ error: "You are not the owner of this note" });
      }
  } catch (error) {
      res.status(500).json({ error: "Problem to delete a note" });
  }
})


const isOwner = (user, note) => {
  return JSON.stringify(user._id) === JSON.stringify(note.author._id);
}


module.exports = router;