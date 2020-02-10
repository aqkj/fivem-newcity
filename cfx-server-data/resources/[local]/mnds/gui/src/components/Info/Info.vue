<template>
  <div class="info__info">
    <div class="info__info__header">
      <div class="info__info__avatar">
        <!-- <img src="../../assets/timg.jpg"/> -->
      </div>
      <div class="info__info__header__main">
      </div>
    </div>
    <div class="info__info__body">
      <div class="info__info__item">
        <div class="info__info__title">ID：</div>
        23
      </div>
      <div class="info__info__item">
        <div class="info__info__title">姓名：</div>
        mango
      </div>
      <div class="info__info__item">
        <div class="info__info__title">等级：</div>
        12
      </div>
      <div class="info__info__item">
        <div class="info__info__title">余额：</div>
        13123123
      </div>
      <div class="info__info__item">
        <div class="info__info__title">银行存款：</div>
        4213123
      </div>
      <div class="info__info__item">
        <div class="info__info__title">手机号：</div>
        15006217722
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InfoInfo'
}
</script>
<style lang="less" scoped>
.info__info{
  display: flex;
  flex-direction: column;
  padding: 12px * 2.0;
  color: #4c4c4c;
  &__header{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px * 2.0;
    &__main{
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column
    }
  }
  &__avatar{
    min-width: 50px * 2.0;
    min-height: 50px * 2.0;
    background-color: #f5f5f5;
    border-radius: 50%;
    overflow: hidden;
    background: url(../../assets/avatar.jpg) no-repeat center / cover;
    // img{
    //   max-width: 50px;
    //   max-height: 50px;
    // }
    // margin-right: 10px;
  }
  &__name{
    font-size: 12px * 2.0;
  }
  &__level{
    font-size: 12px * 2.0;
  }
  &__body{
    display: flex;
    flex-wrap: wrap;
  }
  &__item{
    width: 33%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    font-weight: bold;
    padding: 10px * 2.0;
  }
}
</style>