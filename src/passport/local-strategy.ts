import { User } from '@app/models';
import { passwordService } from '@app/utils';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    async (username, password, done) => {
      try {
        const user = await User.query()
          .where('username', username)
          .first();

        if (user) {
          const isValidPassword = await passwordService.verify(
            password,
            user.hash,
            user.salt
          );

          if (isValidPassword) {
            return done(undefined, user, {
              message: 'Logged in successfully '
            });
          }
          return done(undefined, false, { message: 'Wrong password' });
        }
        return done(undefined, false, { message: 'User not found.' });
      } catch (error) {
        return done(error, false, {
          message: '[local-strategy] Something went wrong.'
        });
      }
    }
  )
);
