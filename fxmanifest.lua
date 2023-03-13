fx_version "cerulean"
game "gta5"

author 'Overextended'
fx_version '0.0.0'

client_script 'client/controls.lua'
client_script 'dist/client.js'
server_script 'dist/server.js'

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/*.js',
}
