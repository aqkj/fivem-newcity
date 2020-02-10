/**
 * 工具方法
 */
/**
 * 添加message到chat
 * @param args 
 */
function addChatMessage(...args: any[]) {
    emit('chat:addMessage', {
        args
    })
}
/**
 * 停顿
 * @param times 时间
 */
function sleep(times: number) {
    return new Promise(reslove => {
        setTimeout(reslove, times)
    })
}