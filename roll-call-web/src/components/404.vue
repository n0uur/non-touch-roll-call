<template>
  <div>
    <div class="notfound">
      <div class="nt404">4&nbsp;&nbsp;&nbsp;4</div>
      <span class="egg"></span>
    </div>
    <br>
    <h1>ไม่พบหน้าที่คุณร้องขอ</h1>
    <h5>หากคิดว่านี่คือข้อผิดพลาดของระบบ กรุณาติดต่อผู้ดูแลระบบ</h5>
    <button class="btn btn-info" @click="$router.push('/')">กลับสู่หน้าหลัก</button>
  </div>
</template>

<style>
.nt404 {
  display: inline-block;
  position:relative;
  bottom: -100px;
  right: 14px;
}
.notfound {
  font-size: 140px;
  margin: auto;
  display: inline-block;
  background-image: url('./assets/fried-egg.png');
  background-size: cover;
  width: 400px;
  height: 400px;
}
</style>
