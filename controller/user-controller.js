import models from '../models'; const Sequelize = require('sequelize');
import { signJsonWebToken, getErrorMessage, } from '../utils/utils';

const { user, passion, userPassion } = models;

const { Op } = Sequelize;

class UserController {
  authSignIn(req, res, next) {
    user.findOne({
      where: {
        email: req.body.email,
      },
    }).then((updatedUser) => {
      if (updatedUser) {
        // User found, sign in and return token
        const token = signJsonWebToken(updatedUser);
        return res.status(201).json({
          id: updatedUser.id,
          firstName: updatedUser.firstName,
          email: updatedUser.email,
          message: 'Sign in successful',
          token,
        });
      }

      // If the user doesn't exist, create a new user
      return user.create({
        firstName: req.body.firstName,
        email: req.body.email,
      }).then((createdUser) => {
        const token = signJsonWebToken(createdUser);
        res.status(201).json({
          id: createdUser.id,
          firstName: createdUser.firstName,
          email: createdUser.email,
          message: 'User created and signed in successfully',
          token,
        });
      }).catch((error) => {
        console.log(error);
        return res.status(400).json({
          message: 'An error occurred while trying to sign up. Please try again',
        });
      });
    }).catch((error) => res.status(401).json({
      error: getErrorMessage(error),
    })).finally(() => {
      next();
    });
  }

  verifyPassions(req, res, next) {
    const { passions } = req.body;
    passion.findAll({ where: { id: passions } }).then((data) => {
      const passionIds = data.map((x) => x.id);
      const missingPassions = passions.filter((item) => !passionIds.includes(item));

      if (missingPassions.length) {
        res.status(401).send({
          message: `We do not have meals with the following ids: [${missingPassions.join(', ')}]`,
        });
      } else {
        next();
      }
    });
  }

  updateUser(req, res, next) {
    // const latitude = req.body.location.latitude;
    // const longitude = req.body.location.longitude;

    // const location = Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
    //   type: 'Point',
    //   coordinates: [longitude, latitude] // GeoJSON coordinates are [longitude, latitude]
    // }));
    user.update(
      {
        firstName: req.body.firstName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        pic1: req.body.pic1,
        pic2: req.body.pic2,
        pic3: req.body.pic3,
        pic4: req.body.pic4,
        pic5: req.body.pic5,
        pic6: req.body.pic6,
        // location: location,
        aboutMe: req.body.aboutMe,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        school: req.body.school,
        livingIn: req.body.livingIn
      },
      {
        where: { email: req.body.email }, returning: true,
        // where: { id: req.user.id }, returning: true,
      }
    ).then((updated) => {
      const updatedUser = updated[1][0];
      req.user = updatedUser;
      req.passions = req.body.passions;

      return next();
    }).catch((error) => {
      getErrorMessage(error);
      console.log(error);
    });
  }

  createUserPassions(req, res) {
    const { user, passions } = req;

    const newPassions = [];

    passions.forEach((psn) => {
      newPassions.push({
        userId: user.id,
        passionId: psn
      });
    });

    userPassion.bulkCreate(newPassions).then(() => {
      // Find the newly created user passions with associated passion details
      userPassion.findAll({
        where: { userId: user.id },
        include: [{
          model: passion,
          attributes: ['id', 'name'],
        }]
      }).then((userPassions) => {
        // Extract passion records from userPassions
        const passionRecords = userPassions.map((userPassion) => userPassion.passion);

        res.status(201).send({
          message: 'User passions updated successfully',
          user: user,
          passions: passionRecords,
        });
      }).catch((error) => {
        console.error('Error fetching user passions:', error);
        res.status(500).send({ message: 'Internal server error' });
      });
    }).catch((error) => {
      console.error('Error creating user passions:', error);
      res.status(400).send({ message: error.name });
    });
  }

  updateUserPassions(req, res) {
    const { user, passions } = req;

    // Delete existing user passions
    userPassion.destroy({ where: { userId: user.id } }).then(() => {
      const newPassions = [];

      passions.forEach((psn) => {
        newPassions.push({
          userId: user.id,
          passionId: psn
        });
      });

      userPassion.bulkCreate(newPassions).then(() => {
        // Find the newly created user passions with associated passion details
        userPassion.findAll({
          where: { userId: user.id },
          include: [{
            model: passion,
            attributes: ['id', 'name'],
          }]
        }).then((userPassions) => {
          // Extract passion records from userPassions
          const passionRecords = userPassions.map((userPassion) => userPassion.passion);
          console.log(passionRecords);
          res.status(201).send({
            message: 'User passions updated successfully',
            user: user,
            passions: passionRecords,
          });
        }).catch((error) => {
          console.error('Error fetching user passions:', error);
          res.status(500).send({ message: 'Internal server error' });
        });
      }).catch((error) => {
        console.error('Error creating user passions:', error);
        res.status(400).send({ message: error.name });
      });
    }).catch((error) => {
      console.error('Error deleting user passions:', error);
      res.status(500).send({ message: 'Internal server error' });
    });
  }

  updateLocation(req, res) {
    const latitude = req.body.location.latitude;
    const longitude = req.body.location.longitude;

    const location = Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
      type: 'Point',
      coordinates: [longitude, latitude] // GeoJSON coordinates are [longitude, latitude]
    }));

    user.update(
      {
        location: location,
      },
      {
        where: { id: req.user.id }, returning: true,
      }
    ).then((updated) => {
      const updatedUser = updated[1][0];

      return res.status(200).send({
        message: 'User updated successfully',
        user: updatedUser,
      });
    }).catch((error) => {
      getErrorMessage(error);
      console.log(error);
    });
  }

}

export default new UserController();