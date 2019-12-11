<template>
  <div>
    <div class="container bg-light">
      <div class="row mt-md-5">
        <div class="col mt-3">
          <h3>
            <i class="fas fa-users"></i> สรุปห้องเรียน
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col mb-2 mt-3">
          <button class="btn btn-primary">
            <i class="fas fa-thumbs-up"></i>
            มาเรียน: {{ studentList.length }}
          </button>
          <button class="btn btn-warning">
            <i class="fas fa-stopwatch"></i>
            มาสาย: {{ studentLateCount }}
          </button>
          <button class="btn btn-danger">
            <i class="fas fa-sign-out-alt"></i>
            หนีการเรียน: {{ studentSkipCount }}
          </button>
          <button class="btn btn-success">
            <i class="fas fa-download"></i>
            ดาวน์โหลดสรุป CVS
          </button>
        </div>
      </div>
      <div class="row mt-3 mb-3">
        <div class="col mb-3">
          <table class="table table-sm">
            <thead class="thead-light">
              <tr>
                <th>
                  <i class="fas fa-user-circle"></i> รหัสนักศีกษา
                </th>
                <th>
                  <i class="fas fa-smile"></i> ชื่อ
                </th>
                <th>
                  <i class="fas fa-smile"></i> นามสกุล
                </th>
                <th>
                  <i class="fas fa-clock"></i> เวลาเข้าเรียน
                </th>
                <th>
                  <i class="fas fa-clock"></i> เวลาออก
                </th>
                <th>
                  <i class="fas fa-check-square"></i> สถานะ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="std in studentList" :key="std.STD_ID">
                <td>{{ std.STD_ID }}</td>
                <td>{{ std.STD_Name }}</td>
                <td>{{ std.STD_Lastname }}</td>
                <td>{{ getDisplayDate(std.Attend_Time) }} น.</td>
                <td>{{ getDisplayDate(std.Leave_Time) }} น.</td>
                <td>{{ getDisplayStatus(std.STD_Status, std.Attend_Status) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row mt-3 mb-3 border-top border-1 pt-3">
        <div class="col-12 mb-3">
          <router-link class="btn btn-warning btn-block" :to="{ name: 'AllClass'} "><i class="fas fa-sign-out-alt"></i> กลับหน้ารวมห้องเรียน</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      classID: this.$route.params.classid,
      classData: [],
      studentRaw: [],
      studentInfo: []
    }
  },
  computed: {
    studentList () {
      return _.orderBy(this.studentRaw, ['STD_ID'])
    },
    studentSkipCount () {
      let count = 0
      this.studentRaw.forEach(e => {
        if (e.STD_Status == 2)
          count += 1
      })
      return count
    },
    studentLateCount() {
      let count = 0
      this.studentRaw.forEach(e => {
        if (e.Attend_Status == 2)
          count += 1
      })
      return count
    }
  },
  mounted() {
    this.updateStdData()
    this.updateClassData()
  },
  methods: {
    getDisplayStatus (status, type) {
      if(status == 2)
        return 'หนีการเรียน'
      else if(status == 0 && type == 1)
        return 'ปกติ'
      else
        return 'สาย'
    },
    getDisplayDate(time) {
      if(time) {
        let dateTime = new Date(time)
        return dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds()
      }
      return '-'
    },
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
        else if (res.data.Class_Status != 4) {
          Swal.fire(
              'ข้อผิดพลาด',
              'ห้องเรียนยังไม่ปิด',
              'error'
            ).then (e => {
              this.$router.push({path: '/class/view/' + this.classID})
          })
        }
        else {
          this.classData = res.data
          console.log(res.data.Class_Status)
        }
      })
      .catch((err) => {
        console.log(err)
      });
    },
  }
};
</script>
