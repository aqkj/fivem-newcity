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
 * 注册命令
 */
// 刷车命令
RegisterCommand('car', (source, args) => __awaiter(this, void 0, void 0, function* () {
    // 车名称
    const vehName = args[0] || 'voltic2';
    // 判断车子是否合法
    if (!IsModelInCdimage(vehName) || !IsModelAVehicle(vehName)) {
        return addChatMessage('未找到该车辆, 该车辆不合法', vehName);
    }
    // 请求模型
    RequestModel(vehName);
    // 等模型加载完毕后
    while (!HasModelLoaded(vehName)) {
        // Wait(500)
        yield sleep(500);
    }
    const playerPed = PlayerPedId();
    // 获取玩家坐标
    const [x, y, z] = GetEntityCoords(playerPed);
    // 创建载具
    const vehicle = CreateVehicle(vehName, x, y, z, GetEntityHeading(playerPed), true, false);
    SetPedIntoVehicle(playerPed, vehicle, -1);
    SetEntityAsNoLongerNeeded(vehicle);
    SetModelAsNoLongerNeeded(vehName);
    addChatMessage(`刷车成功了`, vehName);
}), false);
// 坐标命令
RegisterCommand('pos', () => {
    // 玩家
    const playerPed = PlayerPedId();
    const position = GetEntityCoords(playerPed);
    const heading = GetEntityHeading(playerPed);
    addChatMessage('pedid为：' + playerPed, ' - 坐标为：' + position);
    // emitNet('mnds:print', '哈哈哈')
    TriggerServerEvent('mnds:print', { position, heading });
}, false);
// 事件指令
RegisterCommand('event', (source, args) => {
    if (!args[0])
        return addChatMessage('请输入事件信息');
    // 玩家
    addChatMessage('event事件', args[0]);
    SendNuiMessage(JSON.stringify({
        type: 'event',
        data: args[0]
    }));
}, false);
