<template>
  <div>
    <div class="container bg-light">
      <div class="row">
        <div class="col">
          <div class="page-wrapper">
            <!-- MAIN CONTENT-->
            <div class="container mt-5">
              <div class="row">
                <div class="col-md-12">
                  <div class="overview-wrap mb-2">
                    <h2 class="title-1">จัดการห้องเรียน {{ classroom.id }}</h2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button class="btn btn-warning">
                    <i class="fa fa-meh"></i> จับนักศึกษามาสาย
                  </button>
                  <button class="btn btn-success">
                    <i class="fa fa-play"></i> เริ่มห้องเรียน
                  </button>
                  <button class="btn btn-danger">
                    <i class="fa fa-stop"></i> เลิกคลาส
                  </button>
                  <button class="btn btn-danger float-right">
                    <i class="fa fa-trash"></i> ลบคลาส
                  </button>
                </div>
              </div>
            </div>
            <div class="section__content section__content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <div class="overview-wrap mt-3 mb-2">
                      <h2 class="title-1">รายชื่อนักศึกษา</h2>
                    </div>
                  </div>
                </div>
                <transition-group name="slide-fade" tag="div" class="row">
                  <div class="col-md-4 col-lg-3" v-for="i in pToList" :key="i">
                    <div class="card">
                      <div class="card-header">
                        <i class="fa fa-user"></i>
                        <strong class="card-title pl-2">6207{{ i }}</strong>
                      </div>
                      <div class="card-body">
                        <div class="mx-auto d-block">
                          <img
                            class="rounded-circle mx-auto d-block"
                            src="https://media1.tenor.com/images/b9c59363e7dd35cb7c19d8736b102d99/tenor.gif?itemid=13730968"
                            alt="Card image cap"
                          />
                          <h4 class="text-sm-center mt-2 mb-1">พี่โต{{i}}</h4>
                          <div class="location text-sm-left">
                            <i class="fa fa-clock"></i> เวลาเข้าเรียน : -
                            <br />
                            <i class="fa fa-clock"></i> เวลาออก : -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="copyright">
                  <p>Copyright © 2019 IT@KMITL. All rights reserved. Template by Me.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: true,
      classroom: {
        id: '#testing'
      },
      pto: ["Somchai", "Somsak", "Sompong", "pTo"]
    };
  },
  computed: {
      pToList () {
          return this.pto.reverse()
      }
  }
};
</script>

<style scoped>
* {
  transition: all 0.3s;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
