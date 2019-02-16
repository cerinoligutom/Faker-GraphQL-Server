import { ExtractJwt, StrategyOptions } from 'passport-jwt';

export const JWT_OPTIONS: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'zeferinix-faker-graphql-server'
};
