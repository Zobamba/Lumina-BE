import models from '../models';

const { passion } = models;

class PassionController {
  createPassion(req, res) {
    const newPassion = passion.build({ name: req.body.name });

    passion.findOne({ where: { name: newPassion.name } }).then((existingPassion) => {
      if (existingPassion) {
        res.status(409).send({
          message: `A passion with the name '${req.body.name}' already exists`,
        });
      } else {
        newPassion.save().then((psn) => {
          res.status(201).send({
            passion: psn
          })
        }).catch((error) => {
          console.log(error);
          return res.status(400).json({
            message: 'An error occurred while trying to sign up. Please try again',
          });
        })
      }
    });
  }
}

export default new PassionController();