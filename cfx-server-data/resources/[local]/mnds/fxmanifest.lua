fx_version 'adamant'
games { 'rdr3', 'gta5' }

client_scripts {
    'weapon.js',
    'config.js',
    'utils/index.js',
    -- 'client/control.lua',
    'client/**/*.js'
}

server_scripts {
    'weapon.js',
    'config.js',
    'mysql/index.js',
    'server/**/*.js'
}

ui_page 'gui/dist/index.html'

files {
    'gui/dist/element-icons.ttf',
    'gui/dist/element-icons.woff',
    'gui/dist/iconfont.eot',
    'gui/dist/iconfont.svg',
    'gui/dist/iconfont.ttf',
    'gui/dist/iconfont.woff',
    'gui/dist/main.css',
    'gui/dist/index.html',
    'gui/dist/main.js'
}