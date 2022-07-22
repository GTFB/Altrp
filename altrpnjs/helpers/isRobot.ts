const robots = [
  'ngdomPageSpeed',
  'ghthouse',
  'TST/',
];
export default function isRobot(headers: {}): boolean {
  for (let robot of robots){
    if(headers['user-agent'] && headers['user-agent'].indexOf(robot) > -1){
      return true
    }
  }
  return false
}
