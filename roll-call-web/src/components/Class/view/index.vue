<template>
  <div>
    <div class="container bg-light">
      <div class="row">
        <div class="col">
          <div class="page-wrapper">
            <div class="container mt-5">
              <div class="row">
                <div class="col-md-12">
                  <div class="overview-wrap mb-2">
                    <h2 class="title-1">จัดการห้องเรียน วิชา {{ classData.Class_Subject + ' โดย ' + classData.Class_Instructor }}
                      [สถานะ :
                      <button v-if="classData.Class_Status == 0" class="btn btn-primary">ยังไม่เปิด</button>
                      <button v-if="classData.Class_Status == 1" class="btn btn-success">เปิด</button>
                      <button v-if="classData.Class_Status == 2" class="btn btn-warning">สาย</button>
                      <button v-if="classData.Class_Status == 3" class="btn btn-danger">ลงชื่อออก</button>
                      <button v-if="classData.Class_Status == 4" class="btn btn-dark">ปิด</button>
                      <i @click="updateClassData()" class="fas fa-redo-alt text-primary hover-trans" style="font-size: 15px"></i>
                      ]
                    </h2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button class="btn btn-success" @click="sendUpdateClass(1)">
                    <i class="fa fa-play"></i> เริ่มห้องเรียน
                  </button>
                  <button class="btn btn-warning" @click="sendUpdateClass(2)">
                    <i class="fa fa-meh"></i> จับนักศึกษามาสาย
                  </button>
                  <button class="btn btn-danger" @click="sendUpdateClass(3)">
                    <i class="fa fa-stop"></i> เลิกคลาส
                  </button>
                  <!-- <button class="btn btn-danger float-right">
                    <i class="fa fa-trash"></i> ลบคลาส
                  </button> -->
                </div>
              </div>
            </div>
            <div class="section__content section__content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <div class="overview-wrap mt-3 mb-2">
                      <h2 class="title-1 border-bottom">รายชื่อนักศึกษา <i @click="updateStdData()" class="fas fa-redo-alt text-primary hover-trans" style="font-size: 15px"></i></h2>
                    </div>
                  </div>
                </div>
                <transition-group name="slide-fade" tag="div" class="row">
                  <div class="col-sm-6 col-md-6 col-lg-3" v-for="std in studentList" :key="new Date(std.Attend_Time).getTime()">
                    <div class="card">
                      <div class="card-header">
                        <i class="fa fa-user"></i>
                        <strong class="card-title pl-2">{{ std.STD_ID }}</strong>
                      </div>
                      <div class="card-body">
                        <div class="mx-auto d-block">
                          <img
                            class="rounded-circle mx-auto d-block"
                            style="height: 20vh; width: 20vh; object-fit: cover"
                            :src="std.STD_IMG_URL"
                            draggable="false"
                            :alt="std.STD_Name + '\'s image'"
                          />
                          <h4 class="text-sm-center mt-2 mb-1">{{ std.STD_Name + " " + std.STD_Lastname }}</h4>
                          <div class="location text-sm-left">
                            <i class="fa fa-clock"></i> เวลาเข้าเรียน : {{ getDisplayDate(std.Attend_Time) }}
                            <br />
                            <i class="fa fa-clock"></i> เวลาออก : <b v-if="std.Leave_Time">{{ getDisplayDate(std.Leave_Time) }}</b><b v-else>ยังไม่ออก</b>
                            <br />
                            <i class="far fa-check-square"></i> สถานะ :
                            <button v-if="std.STD_Status == 0" class="btn btn-sm btn-danger">ออก</button>
                            <button v-else-if="std.Attend_Status == 1" class="btn btn-sm btn-success">ปกติ</button>
                            <button v-else class="btn btn-sm btn-warning">สาย</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition-group>
                <div v-if="studentRaw.length == 0" class="row">
                  <div class="col-12 text-center">
                    <h4>ไม่มีนักศึกษา</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="copyright">
                  <p>Copyright © {{new Date().getFullYear()}} IT@KMITL. All rights reserved.</p>
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
import io from 'socket.io-client'
import axios from 'axios'
import _ from 'lodash'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      show: true,
      classID: this.$route.params.classid,
      classData: [],
      studentRaw: [],
      studentInfo: [],
      classSocket: io("192.168.1.41:3010")
    };
  },
  computed: {
      studentList () {
        return _.orderBy(this.studentRaw, ['STD_Status' ,'attend_timestamp']).reverse()
      }
  },
  methods: {
    updateStdData () {
      let temp_list = []
      axios({
        method: "GET",
        url: "http://192.168.1.41:3000/class/getstd/" + this.classID,
        data: []
      })
      .then((res) => {
        res.data.forEach(e => {
          axios({
            method: "GET",
            url: "http://192.168.1.41:3000/std/getid/" + e.STD_ID,
            data: []
          })
          .then((res) => {
            temp_list.push(Object.assign({}, e, res.data, {attend_timestamp: new Date(e.Attend_Time).getTime()}))
            // console.log(Object.assign({}, e, res.data))
          })
          .catch((err) => {
            console.log(err)
          });
        })
        this.studentRaw = temp_list
        
      })
      .catch((err) => {
        console.log(err)
      });
    },
    updateClassData() {
      axios({
        method: "GET",
        url: "http://192.168.1.41:3000/class/get/" + this.classID,
        data: []
      })
      .then((res) => {
        if (res.data.status == 404) {
          Swal.fire(
              'ข้อผิดพลาด',
              'ไม่พบห้องเรียนที่ร้องขอ',
              'error'
            ).then (e => {
            this.$router.push({name: 'AllClass'})
          })
        }
        else {
          this.classData = res.data
        }
      })
      .catch((err) => {
        console.log(err)
      });
    },
    sendUpdateClass(updateToStatus) {
      // console.log(updateToStatus)
      let text_status = 'ข้อผิดพลาด อย่ากดต่อ'

      if (updateToStatus == 1) {
        text_status = 'ยืนยันที่จะเริ่มห้องเรียน'
      }
      else if (updateToStatus == 2) {
        text_status = 'ยืนยันที่จะจับนักศึกษามาสาย'
      }
      else if (updateToStatus == 3) {
        text_status = 'ยืนยันที่จะเลิกคลาส (เปิดให้นักศึกษาลงชื่อออก)'
      }

      Swal.fire({
        title: 'กรอกรหัสผ่านห้องเรียนเพื่อยืนยัน',
        text: text_status,
        input: 'password',
        type: 'warning',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return axios({
            method: "POST",
            url: "http://192.168.1.41:3000/class/update/" + this.classID,
            data: {
              password: login,
              status: updateToStatus
            }
          })
          .then((res) => {
            if (res.data.status == 404) {
              Swal.showValidationMessage(
                'รหัสผ่านผิด'
              )
            }
          })
          .catch((err) => {
            console.log(err)
          });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'สำเร็จ',
            'อัปเดตห้องเรียนสำเร็จ',
            'success'
          )
          this.updateClassData()
        }
      })
    },
    getDisplayDate(time) {
      let dateTime = new Date(time)
      return dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds()
    },
  },
  mounted() {
    this.updateStdData()

    this.classSocket.on('updateStd', (data) => {
        if (data.classID == this.classID) { // not good but work <- must find the better way
          this.updateStdData()
          this.updateClassData()
        }
    });

    this.updateClassData()
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

.hover-trans:hover {
  transform: scale(1.1) rotate(40deg);
}
.hover-trans:active {
  transform: rotate(150deg);
}
</style>
