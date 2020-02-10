/**
 * 操作
 */
class ClientPlayer {
    /**
     * 设置饥饿度
     * @param food 饥饿度
     */
    static set(type, food) {
        playerData[type] = food + '';
        SendNuiMessage(JSON.stringify({
            type: 'mnds:event',
            action: type,
            data: food
        }));
    }
    /**
     * 添加饥饿度
     * @param food 饥饿度
     */
    static add(type, food) {
        food = ~~food;
        const playerFood = ~~playerData.food;
        playerData[type] = food + playerFood + '';
        SendNuiMessage(JSON.stringify({
            type: 'mnds:event',
            action: type,
            data: playerData.food
        }));
    }
    /**
     * 移除饥饿度
     * @param food
     */
    static remove(type, food) {
        food = parseFloat(food + '');
        let playerFood = parseFloat(playerData[type]);
        playerFood = playerFood - food;
        // console.log(playerData.food, playerFood, food)
        playerData[type] = playerFood < 0 ? '0.0' : playerFood + '';
        SendNuiMessage(JSON.stringify({
            type: 'mnds:event',
            action: type,
            data: playerData.food
        }));
    }
    /**
     * 清空武器
     */
    static clearWeapon() {
        playerData.weapon = '';
        TriggerServerEvent('mnds:updatePlayerData', playerData);
    }
}
