/**
 * 客户端脚本
 */
// 判断是否为第一次出生
let isFirstSpawned: boolean = true
let isSpawned: boolean = false
let isLoaded: boolean = false
let playerData: IPlayerData = null
// 是否死亡
let isDied: boolean = false
let isPauseMenuActive: boolean = false
function onPlayerServerLoaded(_playerData: IPlayerData) {
  isLoaded = true
  playerData = _playerData
  console.log('onPlayerServerLoaded')
}
/**
 * 玩家出生触发
 */
async function onPlayerSpawned() {
  console.log('playerSpawned')
  // 判断玩家脚本是否加载完毕
  while (!isLoaded) {
    await sleep(20)
  }
  if (isFirstSpawned) {
    console.log(playerData)
    isFirstSpawned = false
    const playerWeapons: IPlayerWeapon[] = JSON.parse(playerData.weapon || '[]')
    playerWeapons.forEach(weapon => {
      const weaponHash: number = GetHashKey(weapon.name)
      const playerId: number = PlayerPedId()
      GiveWeaponToPed(playerId, weaponHash, weapon.ammo, false, false)
      console.log('给予玩家武器: ', weapon.name)
      weapon.components.forEach(c => {
        console.log('给予玩家武器配件: ', c)
        GiveWeaponComponentToPed(playerId, weaponHash, GetHashKey(c))
      })
    })
    await setPosition(config.spawnPosition)
    // 更新玩家坐标
    // updatePlayerPosition()
    onUpdate()
  } else if (isDied) {
    // 死亡后回到出生点
    await setPosition(config.spawnPosition)
    isDied = false
  }
  isSpawned = true
}
/**
 * 当玩家自我死亡
 */
async function onPlayerDied(killerType: number, deathCoords: number[]) {
  console.log('onPlayerDied')
  onPlayerClientDied()
}
/**
 * 当玩家被干掉
 */
async function onPlayerKilled(killerType: number, deathCoords: number[]) {
  console.log('onPlayerKilled', killerType, deathCoords)
  onPlayerClientDied()
  // console.log(killerType, deathCoords)
}
/**
 * 当玩家死亡处理
 */
function onPlayerClientDied() {
  isSpawned = false
  isDied = true
  ClientPlayer.clearWeapon()
}
// const DensityMultiplier = 0.0
/**
 * 更新玩家信息
 */
async function onUpdate() {
  onUpdateFood()
  onUpdateWeapon()
  // 当玩家打开菜单
  onPlayerPauseMenu()
  // onPlayerPressHome()
}
/**
 * 更新玩家武器数据
 */
function onUpdateWeapon() {
  setTick(async () => {
    // 判断玩家脚本是否加载完毕
    while (!isLoaded || !isSpawned) {
      await sleep(20)
    }
    const playerId: number = PlayerPedId()
    // 玩家武器
    const playerWeapons: IPlayerWeapon[] = []
    for (const weapon of WEAPON) {
      const name: string = weapon.name
      const hash: number = GetHashKey(weapon.name)
      // 判断是否存在武器
      if (HasPedGotWeapon(playerId, hash, false)) {
        // 获取子弹数量
        const ammo: number = GetAmmoInPedWeapon(playerId, hash)
        // 存储武器的配件
        const playerWeaponComponents: string[] = []
        // 遍历配件
        for (const component of weapon.components) {
          if (HasPedGotWeaponComponent(playerId, hash, component.hash)) {
            playerWeaponComponents.push(component.name)
          }
        }
        playerWeapons.push({
          ammo,
          name: weapon.name,
          components: playerWeaponComponents
        })
      }
    }
    playerData.weapon = JSON.stringify(playerWeapons)
    await sleep(1000)
  })
  // onUpdateWeapon()
}
/**
 * 更新食物饥饿度
 */
function onUpdateFood() {
  setTick(async () => {
    // 判断玩家脚本是否加载完毕
    while (!isLoaded || !isSpawned) {
      await sleep(20)
    }
    ClientPlayer.remove('food', 0.001)
    ClientPlayer.remove('drink', 0.0015)
    TriggerServerEvent('mnds:updatePlayerData', playerData)
    await sleep(1000)
  })
}
/**
 * 按按键触发
 */
async function onPlayerPauseMenu() {
  setTick(async () => {
    if (IsPauseMenuActive() && !isPauseMenuActive) {
      isPauseMenuActive = true
      // 隐藏gui
      SendNuiMessage(JSON.stringify({
        type: 'mnds:event',
        action: 'display',
        data: false
      }))
    } else if (!IsPauseMenuActive() && isPauseMenuActive) {
      isPauseMenuActive = false
      SendNuiMessage(JSON.stringify({
        type: 'mnds:event',
        action: 'display',
        data: true
      }))
    }
    await sleep(500)
  })
}
/**
 * 当用户点击home按钮
 */
// async function onPlayerPressHome() {
    
//   onPlayerPressHome()
// }
setTick(async () => {
  await sleep(0)
  if (IsControlJustPressed(0, 212)) {
    SetNuiFocus(true, true)
    SendNuiMessage(JSON.stringify({
      type: 'mnds:event',
      action: 'showHelp'
    }))
  }
})
/**
 * 更新玩家坐标
 */
// async function updatePlayerPosition() {
//   if (isSpawned) {
//     const playerId: number = PlayerPedId()
//     const [x, y, z] = GetEntityCoords(playerId)
//     const heading = GetEntityHeading(playerId)
//     TriggerServerEvent('mnds:updatePlayerPosition', {
//       x,
//       y,
//       z,
//       heading
//     })
//   }
//   await sleep(1000)
//   updatePlayerPosition()
// }
/**
 * 设置玩家坐标
 * @param position 坐标位置
 */
async function setPosition(position: IPosition) {
  const playerId: number = PlayerPedId()
  console.log(DoesEntityExist(playerId))
  // freezePlayer(playerId, false)
  // 检查玩家实体是否在游戏世界内
  if (DoesEntityExist(playerId)) {
    RequestCollisionAtCoord(position.x, position.y, position.z)
    while (!HasCollisionLoadedAroundEntity(playerId)) {
      RequestCollisionAtCoord(position.x, position.y, position.z)
      await sleep(0)
    }
    SetEntityCoords(playerId, position.x, position.y, position.z + 1, false, false, false, false)
    // 判断是否存在heading
    if (position.heading) {
      SetEntityHeading(playerId, position.heading)
    }
  }
}