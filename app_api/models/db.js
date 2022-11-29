const mongoose=require('mongoose')
const dbURI='mongodb+srv://my_atlas_user:fpemffj159357@cluster0.riaea.mongodb.net/Loc8r'
mongoose.connect(dbURI, {useNewUrlParser:true})

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dbURI)
})

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ' +err)
})

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected')
})

var gracefulShutdown =function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through '+msg)
        callback()
    })
}
//Nodemon  리스너는 SIGUSR2 이벤트를 한 번만 수신하려고 하므로  process.on 이 아닌 process.once 를 사용한다.
process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2')
    })
})
//for app termination
process.on('SIGINT', function(){
    gracefulShutdown('app termination', function(){
        process.exit(0)
    })
})
//for heroku app termination
process.on('SIGTERM', function(){
    gracefulShutdown('Heroku app shutdown', function(){
        process.exit(0)
    })
})

require('./locations')
//2017125009 박지웅