import { promisify } from 'util'
import { exec as originExec } from 'child_process'

const execAsync = promisify(originExec)

async function exec(command: string):Promise<string|null> {
  try {
    const { stdout, stderr } = await execAsync(command)
    if (stderr) {
      console.error(`Exec ${command} Command Error:`)
      console.error(stderr)
    } else if (stdout?.trim()?.length) {
      console.log(stdout.trim())
      return stdout
    }
  } catch(err) {
    console.error(`Exec ${command} Command Error:`)
    console.error(err)
  }
  return null
}

export default exec
