const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const prisma = new PrismaClient();

const TokenSplitter = function (req) {
  let authHeader = req.get('Authorization');
  if (!authHeader) {
    return null;
  }
  let token = authHeader.split(' ')[1];
  return token;
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        if (!email || !password) {
          return done(null, false, {
            message: 'Nav ievadīts E-Pasts vai parole.',
          });
        }

        const user = await prisma.users.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          return done(null, false, {
            message: 'Lietotājs ar šādu E-Pasta adresi netika atrasts.',
          });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, {
            message: 'Nepareiza parole.',
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: TokenSplitter,
      secretOrKey: process.env.SECRET_KEY,
    },
    async function (jwtPayload, done) {
      return prisma.users
        .findUnique({
          where: {
            email: jwtPayload.email,
          },
        })
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Lietotājs ar šādu E-Pastu netika atrasts.',
            });
          }
        })
        .catch(err => {
          return done(err);
        });
    },
  ),
);

exports.registerUser = async (req, res) => {
  try {
    let { password, email, fullname, username } = req.body;
    // Pārbauda vai request.body ir nepieciešamie lauciņi lietotāja profila izveidei
    if (!email || !password || !fullname || !username) {
      return res.status(400).send({
        error: true,
        message: 'Viens vai vairāki lauciņi nav aizpildīti',
      });
    }

    // Parbauda, vai e-pasta adrese jau nav reģistrēta
    let user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(409).send({
        message: 'Lietotājs ar šādu E-Pasta adresi jau eksistē.',
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: hash,
        fullname: fullname,
        username: username,
      },
    });
    if (newUser) {
      return res.status(200).send({ message: 'Lietotāja profils izveidots!' });
    } else {
      return res
        .status(500)
        .send({ message: 'Notika kļūda izveidojot profilu.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message:
        'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru.',
    });
  }
};

exports.loginUser = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, message) => {
    if (err) {
      return res.status(500).send({
        message: `Notika kļūda: ${err.message}`,
      });
    }

    if (!user) {
      return res.status(403).send({
        token: null,
        message: message,
      });
    }

    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });
    res.status(200).json({
      token: token,
      user: {
        id: user.id,
        name: user.fullname,
        username: user.username,
        email: user.email,
      },
    });
  })(req, res, next);
};

exports.getLoggedInUser = async (req, res) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error) {
      return res
        .status(500)
        .json({ message: `Notika kļūda: ${error.message}` });
    } else if (!user) {
      return res.status(403).send({
        message: 'Nav lietotāja.',
      });
    } else {
      console.log('Token seems to be valid, sending back data');
      return res.status(200).json({
        user: {
          id: user.id,
          name: user.fullname,
          username: user.username,
          email: user.email,
        },
      });
    }
  })(req, res);
};
