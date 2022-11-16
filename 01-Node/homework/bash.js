const commands = require('./commands')


const print =(input) =>{
    process.stdout.write(input +'\n')
    process.stdout.write('prompt > ' )
}
process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', (data) => {
      let args = data.toString().trim().split(" ")
      console.log( args)
      let cmd = args.shift()
      console.log("cmd "+cmd)
      console.log('commands' +commands)
      commands[cmd] ? commands[cmd](args, print ) :print("commant nnnot found") 
    });