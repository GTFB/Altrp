import env from "../env";

const LIKE = env('DB_CONNECTION') === 'mysql' ? 'LIKE' : 'ILIKE'

export default LIKE
