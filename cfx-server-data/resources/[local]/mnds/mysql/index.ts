/**
 * mysql
 */
class Mysql {
  /**
   * 查找所有
   * @param query 查询语句
   */
  static fetchAll(query: string, params: Record<string, any>): Promise<any> {
    return new Promise((resolve) => {
      exports['mysql-async'].mysql_fetch_all(query, params, resolve)
    })
  }
  /**
   * 执行sql语句
   * @param query 查询语句
   */
  static execute(query: string, params: Record<string, any>): Promise<any> {
    return new Promise((resolve) => {
      exports['mysql-async'].mysql_execute(query, params, resolve)
    })
  }
}