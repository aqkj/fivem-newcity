/* 服务器脚本主逻辑 */

/**
 * 当玩家加载
 * @param playerId {number} 玩家id
 */
interface IPlayerTable {
    /**
     * 设置金钱余额
     * @param m 金额
     */
    setMoney(m: number)
    /**
     * 获取金钱余额
     */
    getMoney(): number
    /**
     * 设置银行余额
     * @param m 金额
     */
    setBankBalance(m: number)
    /**
     * 获取银行
     */
    getBank(): number
    /**
     * 获取坐标
     */
    getCoords(): IV3
    /**
     * 设置坐标
     * @param x x轴
     * @param y y轴
     * @param z z轴
     */
    setCoords(x: number, y: number, z: number)
    /**
     * 踢出玩家
     * @param r 理由
     */
    kick(r: string)
    /**
     * 添加金额
     * @param m 钱
     */
    addMoney(m: number)
    /**
     * 扣除钱
     * @param m 金额
     */
    removeMoney(m: number)
    addBank(m: number)
    removeBank(m: number)
    displayMoney(m: number)
    displayBank(m: number)
    setSessionVar(key: string, value: any)
    getSessionVar(key: string)
    getPermissions(): number
    setPermissions(p: number)
    getIdentifier()
    getGroup(): string
    set(key: string, value: any)
    get(key: string)
    setGlobal(g: string, d: any)
    hasRole(role: any)
    giveRole(role: any)
    removeRole(role: any)
}
interface IV3 {
    x: number,
    y: number,
    z: number
}
// 坐标
interface IPosition extends IV3{
    heading?: number
}