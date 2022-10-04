import { promisify } from 'util'
import { exec as originExec } from 'child_process'

const execAsync = promisify(originExec)

async function exec(command: string) {
  try {
    const { stdout, stderr } = await execAsync(command)
    if (stderr) {
      console.error(stderr)
    } else if (stdout) {
      console.info(stdout)
    }
  } catch(err) {
    console.error(err.message)
  }
}

export default exec
