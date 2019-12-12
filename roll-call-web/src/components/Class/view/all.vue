<template>
  <div>
    <div class="container bg-light mt-3">
      <div class="row mt-3 mb-3">
        <div class="col mt-2">
          <h3>
            <i class="fas fa-users" @click="$router.push({name: 'registerStudent'})"></i> หน้ารวมห้องเรียน
            <i
              @click="getAllClass()"
              class="fas fa-redo-alt text-primary hover-trans"
              style="font-size: 15px"
            ></i>
            <div class="text-right">
              <button class="btn btn-success" @click="$router.push({ name: 'Create_1'})">
                <i class="fas fa-plus"></i> สร้างห้องเรียน
              </button>
            </div>
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table table">
            <thead class="thead-light">
              <tr>
                <th>
                  <i class="fas fa-user-circle"></i> รหัสห้องเรียน
                </th>
                <th>
                  <i class="fas fa-list"></i> วิชา
                </th>
                <th>
                  <i class="fas fa-user"></i> ผู้สอน
                </th>
                <th>
                  <i class="far fa-clock"></i> เวลาที่สร้าง
                </th>
                <th>
                  <i class="fas fa-users"></i> จำนวนนักเรียนในห้อง
                </th>
                <th>
                  <i class="fas fa-check-square"></i> สถานะ
                </th>
                <th>
                  <i class="fas fa-check-square"></i> ไปยังห้องเรียน
                </th>
              </tr>
            </thead>
            <tbody v-if="allClass.length">
              <tr v-for="rclass in allClassroom" :key="rclass.Class_ID">
                <td>{{ rclass.Class_ID }}</td>
                <td>{{ rclass.Class_Subject }}</td>
                <td>{{ rclass.Class_Instructor }}</td>
                <td>{{ getShowTime(rclass.CreatedTime) }}</td>
                <td>{{ rclass.studentCount }} คน</td>
                <td>
                  <button v-if="rclass.Class_Status == 0" class="btn btn-primary">ยังไม่เปิด</button>
                  <button v-if="rclass.Class_Status == 1" class="btn btn-success">เปิด</button>
                  <button v-if="rclass.Class_Status == 2" class="btn btn-warning">สาย</button>
                  <button v-if="rclass.Class_Status == 3" class="btn btn-danger">ลงชื่อออก</button>
                  <button v-if="rclass.Class_Status == 4" class="btn btn-dark">ปิด</button>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-primary btn-block"
                    @click="$router.push({path: '/class/view/' + rclass.Class_ID})"
                  >
                    <i class="fas fa-external-link-alt"></i> ดูห้องเรียน
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center">ไม่พบข้อมูล</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  data() {
    return {
      allClass: []
    };
  },
  methods: {
    getAllClass() {
      let temp_class = [];
      axios({
        method: "GET",
        url: this.$api_ip + "/class/getall"
      })
        .then(res => {
          res.data.forEach(e => {
            axios({
              method: "GET",
              url: this.$api_ip + "/class/stdcount/" + e.Class_ID
            })
              .then(respond => {
                temp_class.push(
                  Object.assign(
                    {},
                    e,
                    { studentCount: respond.data.count },
                    { create_timestamp: new Date(e.CreatedTime).getTime() }
                  )
                );
              })
              .catch(err => {
                console.log(err);
              });
          });
          this.allClass = temp_class;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getShowTime(time) {
      const options = {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      let datetime = new Date(time).toLocaleDateString("th-TH", options);
      return datetime;
    }
  },
  computed: {
    allClassroom() {
      return _.orderBy(this.allClass, ["Class_Status", "create_timestamp"]);
    }
  },
  mounted() {
    this.getAllClass();
  }
};
</script>

<style scoped>
.hover-trans {
  transition: all 0.5s;
}
.hover-trans:hover {
  transform: scale(1.1) rotate(40deg);
}
.hover-trans:active {
  transform: rotate(150deg);
}
</style>
