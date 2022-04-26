export default function isProd() {
  return process.env.NODE_ENV === 'production'
}
