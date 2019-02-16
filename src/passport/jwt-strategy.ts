import { JWT_OPTIONS } from '@app/config/jwt-options';
import { User } from '@app/models';
import { IJwtPayload } from '@app/utils';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';

passport.use(
  'jwt',
  new JwtStrategy(JWT_OPTIONS, async (jwtPayload: IJwtPayload, done) => {
    try {
      const user = await User.query().where('id', jwtPayload.userId).first();

      if (!user) {
        done(undefined, false, { message: 'User not found.' });
      }

      done(undefined, user, { message: 'User found.' });
    } catch (error) {
      done(error, false, { message: '[jwt-strategy] Something went wrong.' });
    }
  })
);
