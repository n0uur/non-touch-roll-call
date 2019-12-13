<template>
  <div>
    <div class="page-wrapper">
      <div class="page-content--bge5">
        <div class="container">
          <div class="login-wrap">
            <div class="login-content">
              <div class="login-logo">
                <a>
                  <h1>IT-RollCall</h1>
                  <h4>ลงทะเบียนนักศึกษา</h4>
                </a>
              </div>
              <div class="login-form">
                <form v-on:submit.prevent="submitRegistion()">
                  <div class="form-group">
                    <label>รหัสนักศึกษา</label>
                    <input
                      class="au-input au-input--full"
                      type="number"
                      placeholder="รหัสนักศึกษา"
                      v-model="form.stdID"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>ชื่อ</label>
                    <input
                      type="text"
                      class="au-input au-input--full"
                      placeholder="ชื่อ"
                      v-model="form.stdName"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>นามสกุล</label>
                    <input
                      class="au-input au-input--full"
                      type="text"
                      placeholder="นามสกุล"
                      v-model="form.stdLastname"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>ชื่อเล่น</label>
                    <input
                      class="au-input au-input--full"
                      type="text"
                      placeholder="ชื่อเล่น"
                      v-model="form.stdNickname"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>URL รูปภาพ</label>
                    <input
                      class="au-input au-input--full"
                      type="text"
                      placeholder="URL สำหรับภาพโปรไฟล์"
                      v-model="form.stdImgURL"
                      required
                    />
                  </div>
                  <!-- <div class="upload-group" style="padding-bottom: 2vw;padding-top: 2vw;">
                    <div class="custom-file">
                        <input
                        @change="uploadFile"
                        type="file"
                        accept="image/*"
                        class="custom-file-input"
                        id="customFile"
                        />
                        <label class="custom-file-label" for="customFile">{{ b_file_name }}</label>
                    </div>
                    <div class="alert alert-success mt-3" v-if="chatForm.isUploaded">
                        <img :src="chatForm.imageURL" class="img-fluid" />
                    </div>
                  </div>-->
                  <button type="submit" class="au-btn au-btn--block btn-primary m-b-20">ลงทะเบียน</button>
                </form>
                <div class="register-link">
                  <p>
                    <router-link :to="{name: 'AllClass'}">กลับหน้าหลัก</router-link>
                  </p>
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        stdName: "",
        stdLastname: "",
        stdID: "",
        stdNickname: "",
        stdImgURL: ""
      }
    };
  },
  methods: {
    submitRegistion() {
      axios({
        method: "POST",
        url: this.$api_ip + "/std/register",
        data: this.form
      })
        .then(res => {
          if (res.data.status == 200) {
            Swal.fire("สำเร็จ", "ลงทะเบียนเรียบร้อย", "success")
              .then(r => {
                Object.keys(this.form).forEach(key => {
                  this.form.key = "";
                });
              })
              .catch(e => {
                console.log(e);
              });
          } else {
            Swal.fire(
              "ไม่สำเร็จ",
              "ไม่สามารถลงทะเบียนได้ [" + res.data.message + "]",
              "error"
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>

#upload_btn {
  padding: 10px;
  color: white;
  background-color: #4272d7;
  border-radius: 5px;
  cursor: pointer;
}
  
#upload_btn:hover {
  background-color: #3868cd;
}

#status_text {
  margin-left: 10px;
  color: #aaa;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
-webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance:textfield;
}

</style>
