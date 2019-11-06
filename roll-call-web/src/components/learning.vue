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
                    <h2 class="title-1">จัดการห้องเรียน</h2>
                  </div>
                </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button class="btn btn-warning">จับนักศึกษามาสาย</button>
                <button class="btn btn-success">เริ่มห้องเรียน</button>
                <button class="btn btn-danger">เลิกคลาส</button>
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
                <div class="row">
                  <transition name="fade">
                    <div class="col-md-4 col-lg-3">
                      <div class="card">
                        <div class="card-header">
                          <i class="fa fa-user"></i>
                          <strong class="card-title pl-2">6207####</strong>
                        </div>
                        <div class="card-body">
                          <div class="mx-auto d-block">
                            <img
                              class="rounded-circle mx-auto d-block"
                              src="https://media1.tenor.com/images/b9c59363e7dd35cb7c19d8736b102d99/tenor.gif?itemid=13730968"
                              alt="Card image cap"
                            />
                            <h4 class="text-sm-center mt-2 mb-1">#ชื่อนักศึกษา</h4>
                            <div class="location text-sm-left">
                              <i class="fa fa-clock"></i> เวลาเข้าเรียน : ####
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                  <transition name="fade">
                    <div class="col-md-4 col-lg-3">
                      <div class="card">
                        <div class="card-header">
                          <i class="fa fa-user"></i>
                          <strong class="card-title pl-2">6207####</strong>
                        </div>
                        <div class="card-body">
                          <div class="mx-auto d-block">
                            <img
                              class="rounded-circle mx-auto d-block"
                              src="https://media1.tenor.com/images/b9c59363e7dd35cb7c19d8736b102d99/tenor.gif?itemid=13730968"
                              alt="Card image cap"
                            />
                            <h4 class="text-sm-center mt-2 mb-1">#ชื่อนักศึกษา</h4>
                            <div class="location text-sm-left">
                              <i class="fa fa-clock"></i> เวลาเข้าเรียน : ####
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                  <transition name="fade">
                    <div class="col-md-4 col-lg-3">
                      <div class="card">
                        <div class="card-header">
                          <i class="fa fa-user"></i>
                          <strong class="card-title pl-2">6207####</strong>
                        </div>
                        <div class="card-body">
                          <div class="mx-auto d-block">
                            <img
                              class="rounded-circle mx-auto d-block"
                              src="https://media1.tenor.com/images/b9c59363e7dd35cb7c19d8736b102d99/tenor.gif?itemid=13730968"
                              alt="Card image cap"
                            />
                            <h4 class="text-sm-center mt-2 mb-1">#ชื่อนักศึกษา</h4>
                            <div class="location text-sm-left">
                              <i class="fa fa-clock"></i> เวลาเข้าเรียน : ####
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                  <transition name="fade">
                    <div class="col-md-4 col-lg-3">
                      <div class="card">
                        <div class="card-header">
                          <i class="fa fa-user"></i>
                          <strong class="card-title pl-2">6207####</strong>
                        </div>
                        <div class="card-body">
                          <div class="mx-auto d-block">
                            <img
                              class="rounded-circle mx-auto d-block"
                              src="https://media1.tenor.com/images/b9c59363e7dd35cb7c19d8736b102d99/tenor.gif?itemid=13730968"
                              alt="Card image cap"
                            />
                            <h4 class="text-sm-center mt-2 mb-1">#ชื่อนักศึกษา</h4>
                            <div class="location text-sm-left">
                              <i class="fa fa-clock"></i> เวลาเข้าเรียน : ####
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
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
      show: true
    };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
