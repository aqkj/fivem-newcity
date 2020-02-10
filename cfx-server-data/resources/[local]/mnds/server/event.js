/**
 * 事件
 */
onNet('mnds:print', (...args) => {
    console.log('mnds:print:', ...args);
});
// 玩家加载
on('es:playerLoaded', (source, player) => {
    onPlayerLoaded(source, player);
});
// 玩家第一次出生
// on('es:firstSpawn', (...args) => {
//     console.log('玩家第一次出生', args)
// })
on('es:initialized', (...args) => {
    console.log('玩家初始化', args);
});
// 玩家离线
on('playerDropped', (r) => {
    onPlayerDropped(source, r);
});
onNet('mnds:updatePlayerData', (data) => {
    onUpdatePlayerData(source, data);
});
