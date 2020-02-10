/**
 * 玩家逻辑
 */
// 玩家数据存储
const players = {};
// 默认坐标
const defaultPositionStr = JSON.stringify(config.spawnPosition);
/**
 * 玩家加载触发
 */
function onPlayerLoaded(playerId, table) {
    console.log(`ID: ${playerId} 玩家 - 加载完毕`);
    const identifier = table.getIdentifier();
    Mysql.fetchAll('SELECT position, food, drink, weapon FROM user_account WHERE identifier = @identifier', {
        '@identifier': identifier
    }).then(data => {
        // console.log(data)
        const pData = data[0] || {};
        const player = players[playerId] = new Player(playerId, {
            position: pData.position || defaultPositionStr,
            food: pData.food || '1.0',
            drink: pData.drink || '1.0',
            weapon: pData.weapon || '',
            identifier,
            table
        });
        // 通知客户端加载完毕
        player.emit('mnds:playerLoaded', player.player);
        // 如果数据不存在，则创建
        if (!data.length) {
            createPlayer(playerId);
        }
    });
}
/**
 * 当玩家离线
 * @param playerId number
 */
function onPlayerDropped(playerId, r) {
    console.log(`ID:${playerId} 玩家离线`);
    const player = players[playerId];
    // player
    Mysql.execute('UPDATE user_account SET position = @position, weapon = @weapon, food = @food, drink = @drink WHERE identifier = @identifier', {
        '@identifier': player.getIdentifier(),
        '@position': player.getPositionStr(),
        '@weapon': player.getWeapon(true),
        '@food': player.getFood(true),
        '@drink': player.getDrink(true)
    }).then(data => {
        console.log('更新数据', data);
    });
}
/**
 * 更新玩家数据
 * @param playerId 玩家id
 * @param data 玩家数据
 */
function onUpdatePlayerData(playerId, data) {
    // console.log(playerId, pos)
    const player = getPlayer(playerId);
    player.updateData(data);
}
/**
 * 创建玩家
 * @param playerId number
 */
function createPlayer(playerId) {
    const player = players[playerId];
    Mysql.execute('INSERT INTO user_account (identifier, position) VALUES (@identifier, @position)', {
        '@identifier': player.getIdentifier(),
        '@position': player.getPositionStr()
    });
}
/**
 * 获取玩家实体
 * @param playerId 玩家id
 */
function getPlayer(playerId) {
    return players[playerId];
}
