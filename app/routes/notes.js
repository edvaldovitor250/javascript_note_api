var express = require('express');
var router = express.Router();
const Note = require('../models/note')
const withAuth = require('../middlewares/auth')


router.post('/', withAuth, async (req, res, next) => {
  const {title, body} = req.body;

  try {
    const note = new Note({
      title: title,
      body: body,
      author: req.user._id
    });
    await note.save();
    res.status(201).json(note);
  } catch(error){
    res.status(500).json({ error: "Problem to create a new note" });
  }
})

router.get('/search', withAuth, async (req,res) => {
  const { query} = req.query;
  try {
    let notes = await Note.find({author:req.user_id})
    .find({$text:{$search: query}})
    res.json(notes)
    
  } catch (error) {
    res.json({error: error}).status(500)
  }
})

router.get('/id', withAuth, async (req,res) =>{
  try {
    const { id} = req.params;
    let note = await Note.findById(id);
    if (isOwner(req.user,note))
      res.json(note)
    else
    res.status(403).json({ error: "You are not the owner of this note" });

  } catch (error) {
    res.status(500).json({ error: "Problem to get a note" });
  }
})


router.put('/:id', withAuth, async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  try {
      let note = await Note.findById(id);

      if (isOwner(req.user, note)) {
          note = await Note.findByIdAndUpdate(
              id,
              { $set: { title: title, body: body } },
              { new: true, upsert: true }
          );
          res.json(note);
      } else {
          res.status(403).json({ error: "You are not the owner of this note" });
      }
  } catch (error) {
      res.status(500).json({ error: "Problem to update a note" });
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