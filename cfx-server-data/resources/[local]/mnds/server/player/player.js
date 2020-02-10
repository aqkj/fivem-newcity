/**
 * 玩家类
 */
class Player {
    constructor(playerId, player) {
        this.player = player;
        this.playerId = playerId;
    }
    /**
     * 触发用户客户端事件
     * @param eventName 事件名称
     */
    emit(eventName, data) {
        TriggerClientEvent(eventName, this.playerId, data);
    }
    /**
     * 获取steamId
     */
    getIdentifier() {
        return this.player.identifier;
    }
    /**
     * 获取数据库玩家坐标
     */
    getPosition() {
        const position = JSON.parse(this.player.position || defaultPositionStr);
        return position;
    }
    /**
     * 设置玩家坐标
     * @param position
     */
    setPosition(position, canEmit) {
        this.player.position = JSON.stringify(position);
        canEmit && this.emit('mnds:setPosition', position);
    }
    /**
     * 获取字符串类型的数据库玩家坐标
     */
    getPositionStr() {
        return this.player.position || defaultPositionStr;
    }
    /**
     * 获取武器
     * @param isStr 是否字符串
     */
    getWeapon(isStr) {
        if (isStr)
            return this.player.weapon;
        else
            return JSON.parse(this.player.weapon || '{}');
    }
    /**
     * 获取饥饿度
     * @param isStr 是否字符串
     */
    getFood(isStr) {
        const food = parseFloat(this.player.food + '').toFixed(3);
        if (isStr)
            return food;
        else
            return parseFloat(food);
    }
    /**
     * 获取饥渴度
     * @param isStr 是否字符串
     */
    getDrink(isStr) {
        const drink = parseFloat(this.player.drink + '').toFixed(3);
        if (isStr)
            return drink;
        else
            return parseFloat(drink);
    }
    /**
     * 更新玩家数据
     * @param data 玩家数据
     */
    updateData(data) {
        this.player = data;
    }
    /**
     * 回到出生点
     */
    reSpawn() {
        this.emit('mnds:playerSpawned');
    }
}
