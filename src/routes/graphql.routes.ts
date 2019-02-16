import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();

/*
This will intercept all requests going to this endpoint.
To protect query fields, use GraphQL Shield.
*/
router.post('/graphql', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      next(err);
    }

    /*
    https://github.com/apollographql/apollo-server/issues/1487#issuecomment-413078180
    Since we've provided a callback, we'll be the ones populating the user
    We'll need to populate the user and provide an optional response
    */
    // if (user) {
    //   req.user = user;
    // } else {
    //   res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Not authenticated. Login required.' });
    // }

    // Attach the serialized user object by passportjs to the request object
    // We will let GraphQL handle the authentication.
    req.user = user;

    next();
  })(req, res, next);
});

/*
Letting passport handle everything is also possible but in case of errors,
it returns a raw plain/text response so if you're expecting a JSON,
you might get an error like unexpected token in JSON at position 0.
*/
// router.post('/graphql', passport.authenticate('jwt', { session: false }));

router.get('/graphql', async (req, res, next) => {
  return await next();
});

export const graphQLRouter = router;
