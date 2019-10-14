<template>
  <div style="text-align: center">
    <div class="notfound">
      <div class="nt404">4&nbsp;&nbsp;&nbsp;4</div>
      <span class="egg"></span>
    </div>
    <br>
    <h2>ไม่พบหน้าที่คุณร้องขอ</h2>
    <p>หากคิดว่านี่คือข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ</p>
    <button class="btn btn-warning" @click="$router.push('/')">กลับสู่หน้าหลัก</button>
  </div>
</template>

<style>
.nt404 {
  display: inline-block;
  position: relative;
  bottom: -80px;
  right: 14px;
}
.notfound {
  font-size: 120px;
  margin: auto;
  background-image: url('../assets/fried-egg.png');
  background-size: cover;
  width: 320px;
  height: 320px;
}
</style>
