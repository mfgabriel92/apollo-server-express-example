import http from 'http'
import app from './app'

const httpServer = http.createServer(app)
httpServer.listen(8000)
