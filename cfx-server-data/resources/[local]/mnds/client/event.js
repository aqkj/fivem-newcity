/**
 * 事件
 */
onNet('mnds:setPosition', (position) => {
    setPosition(position);
});
onNet('mnds:playerLoaded', (playerData) => {
    onPlayerServerLoaded(playerData);
});
// 玩家出生触发
// onNet('mnds:playerSpawned', () => {
//   onPlayerSpawned()
// })
// 机场位置
// const spawnPos: IV3 = {
//   x: -1026.7894287109375,
//   y: -2486.408203125,
//   z: 13.944536209106445
// }
on('playerSpawned', () => {
    onPlayerSpawned();
});
on('baseevents:onPlayerDied', (killerType, deathCoords) => {
    onPlayerDied(killerType, deathCoords);
});
on('baseevents:onPlayerKilled', (killerType, deathCoords) => {
    onPlayerKilled(killerType, deathCoords);
});
RegisterNuiCallbackType('close');
on('__cfx_nui:close', () => {
    console.log('nuiClose');
    SetNuiFocus(false, false);
});
// on('onClientGameTypeStart', () => {
//   exports.spawnmanager.setAutoSpawnCallback(() => {
//     exports.spawnmanager.spawnPlayer({
//       ...spawnPos,
//       model: 'a_m_m_skater_01'
//     }, () => {
//       emit('chat:addMessage', {
//         args: [
//           '你好，欢迎来到模拟都市'
//         ]
//       })
//     });
//   });
//   exports.spawnmanager.setAutoSpawn(true)
//   exports.spawnmanager.forceRespawn()
// });
// on('onClientResourceStop', () => {
//   TriggerServerEvent('mnds:print', 'onClientResourceStop')
// })
// on('onClientGameTypeStop', () => {
//   TriggerServerEvent('mnds:print', 'onClientGameTypeStop')
// })
