import env from './env';

export default function isProd() {
  return env('NODE_ENV') === 'production';
}
