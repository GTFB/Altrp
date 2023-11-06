import { promisify } from 'util'
import { exec as originExec } from 'child_process'

const execAsync = promisify(originExec)

async function exec(command: string):Promise<string|null> {
  try {
    // @ts-ignore
    const { stdout, stderr } = await execAsync(...arguments)
    if (stderr) {
      console.error(`Exec ${command} Command Error:`)
      console.error(stderr)
      if (stdout?.trim()?.length) {
        console.log(stdout.trim())
      }
      return stderr
    } else if (stdout?.trim()?.length) {
      console.log(stdout.trim())
      return stdout
    }
  } catch(err) {
    console.error(`Exec ${command} Command Error:`)
    console.error(err)
    return err
  }
  return null
}

export default exec
