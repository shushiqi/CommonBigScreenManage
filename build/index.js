const { run } = require('runjs')
const chalk = require('chalk')
const client = require('scp2')
const config = require('../vue.config.js')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')

if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  const report = rawArgv.includes('--report')

  run(`vue-cli-service build ${args}`)

  const port = 9526
  const publicPath = config.publicPath

  var connect = require('connect')
  var serveStatic = require('serve-static')
  const app = connect()

  app.use(
    publicPath,
    serveStatic('./dist', {
      index: ['index.html', '/']
    })
  )

  app.listen(port, function () {
    console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
    if (report) {
      console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
    }

  })

 
} else {
  run(`vue-cli-service build ${args}`)
}

client.scp('D:\\workingspace\\CommonBigScreenManage\\deploy\\',{
  host:"121.41.112.45",
  username:"DESKTOP-VIJK9VG\administrator",
  passsowrd:"aklyAi+9",
  path:"E:\\IIS Application\\enterpointxrm\\CommonBigScreenBack"
},function(err){
if(err){
  // throw(err)
  console.log(err);
}else{
  console.log("上传成功");
}
})
