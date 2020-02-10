var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * 客户端脚本
 */
// 判断是否为第一次出生
let isFirstSpawned = true;
let isSpawned = false;
let isLoaded = false;
let playerData = null;
// 是否死亡
let isDied = false;
let isPauseMenuActive = false;
function onPlayerServerLoaded(_playerData) {
    isLoaded = true;
    playerData = _playerData;
    console.log('onPlayerServerLoaded');
}
/**
 * 玩家出生触发
 */
function onPlayerSpawned() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('playerSpawned');
        // 判断玩家脚本是否加载完毕
        while (!isLoaded) {
            yield sleep(20);
        }
        if (isFirstSpawned) {
            console.log(playerData);
            isFirstSpawned = false;
            const playerWeapons = JSON.parse(playerData.weapon || '[]');
            playerWeapons.forEach(weapon => {
                const weaponHash = GetHashKey(weapon.name);
                const playerId = PlayerPedId();
                GiveWeaponToPed(playerId, weaponHash, weapon.ammo, false, false);
                console.log('给予玩家武器: ', weapon.name);
                weapon.components.forEach(c => {
                    console.log('给予玩家武器配件: ', c);
                    GiveWeaponComponentToPed(playerId, weaponHash, GetHashKey(c));
                });
            });
            yield setPosition(config.spawnPosition);
            // 更新玩家坐标
            // updatePlayerPosition()
            onUpdate();
        }
        else if (isDied) {
            // 死亡后回到出生点
            yield setPosition(config.spawnPosition);
            isDied = false;
        }
        isSpawned = true;
    });
}
/**
 * 当玩家自我死亡
 */
function onPlayerDied(killerType, deathCoords) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('onPlayerDied');
        onPlayerClientDied();
    });
}
/**
 * 当玩家被干掉
 */
function onPlayerKilled(killerType, deathCoords) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('onPlayerKilled', killerType, deathCoords);
        onPlayerClientDied();
        // console.log(killerType, deathCoords)
    });
}
/**
 * 当玩家死亡处理
 */
function onPlayerClientDied() {
    isSpawned = false;
    isDied = true;
    ClientPlayer.clearWeapon();
}
// const DensityMultiplier = 0.0
/**
 * 更新玩家信息
 */
function onUpdate() {
    return __awaiter(this, void 0, void 0, function* () {
        onUpdateFood();
        onUpdateWeapon();
        // 当玩家打开菜单
        onPlayerPauseMenu();
        // onPlayerPressHome()
    });
}
/**
 * 更新玩家武器数据
 */
function onUpdateWeapon() {
    setTick(() => __awaiter(this, void 0, void 0, function* () {
        // 判断玩家脚本是否加载完毕
        while (!isLoaded || !isSpawned) {
            yield sleep(20);
        }
        const playerId = PlayerPedId();
        // 玩家武器
        const playerWeapons = [];
        for (const weapon of WEAPON) {
            const name = weapon.name;
            const hash = GetHashKey(weapon.name);
            // 判断是否存在武器
            if (HasPedGotWeapon(playerId, hash, false)) {
                // 获取子弹数量
                const ammo = GetAmmoInPedWeapon(playerId, hash);
                // 存储武器的配件
                const playerWeaponComponents = [];
                // 遍历配件
                for (const component of weapon.components) {
                    if (HasPedGotWeaponComponent(playerId, hash, component.hash)) {
                        playerWeaponComponents.push(component.name);
                    }
                }
                playerWeapons.push({
                    ammo,
                    name: weapon.name,
                    components: playerWeaponComponents
                });
            }
        }
        playerData.weapon = JSON.stringify(playerWeapons);
        yield sleep(1000);
    }));
    // onUpdateWeapon()
}
/**
 * 更新食物饥饿度
 */
function onUpdateFood() {
    setTick(() => __awaiter(this, void 0, void 0, function* () {
        // 判断玩家脚本是否加载完毕
        while (!isLoaded || !isSpawned) {
            yield sleep(20);
        }
        ClientPlayer.remove('food', 0.001);
        ClientPlayer.remove('drink', 0.0015);
        TriggerServerEvent('mnds:updatePlayerData', playerData);
        yield sleep(1000);
    }));
}
/**
 * 按按键触发
 */
function onPlayerPauseMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        setTick(() => __awaiter(this, void 0, void 0, function* () {
            if (IsPauseMenuActive() && !isPauseMenuActive) {
                isPauseMenuActive = true;
                // 隐藏gui
                SendNuiMessage(JSON.stringify({
                    type: 'mnds:event',
                    action: 'display',
                    data: false
                }));
            }
            else if (!IsPauseMenuActive() && isPauseMenuActive) {
                isPauseMenuActive = false;
                SendNuiMessage(JSON.stringify({
                    type: 'mnds:event',
                    action: 'display',
                    data: true
                }));
            }
            yield sleep(500);
        }));
    });
}
/**
 * 当用户点击home按钮
 */
// async function onPlayerPressHome() {
//   onPlayerPressHome()
// }
setTick(() => __awaiter(this, void 0, void 0, function* () {
    yield sleep(0);
    // if (IsControlJustPressed(0, 212)) {
    //   console.log('212按钮点击成功')
    // }
    // if (IsControlJustPressed(0, 213)) {
    //   console.log('213按钮点击成功')
    // }
    // console.log(IsControlJustPressed(1, 212), IsControlJustPressed(1, 213), IsControlPressed(1, 212))
    if (IsControlJustPressed(0, 212)) {
        SetNuiFocus(true, true);
        SendNuiMessage(JSON.stringify({
            type: 'mnds:event',
            action: 'showHelp'
        }));
    }
}));
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
function setPosition(position) {
    return __awaiter(this, void 0, void 0, function* () {
        const playerId = PlayerPedId();
        console.log(DoesEntityExist(playerId));
        // freezePlayer(playerId, false)
        // 检查玩家实体是否在游戏世界内
        if (DoesEntityExist(playerId)) {
            RequestCollisionAtCoord(position.x, position.y, position.z);
            while (!HasCollisionLoadedAroundEntity(playerId)) {
                RequestCollisionAtCoord(position.x, position.y, position.z);
                yield sleep(0);
            }
            SetEntityCoords(playerId, position.x, position.y, position.z + 1, false, false, false, false);
            // 判断是否存在heading
            if (position.heading) {
                SetEntityHeading(playerId, position.heading);
            }
        }
    });
}
