<template>
    <div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-logo">
                            <a href="#" alt="god">
                                <h1>IT-RollCall</h1>
                            </a>
                        </div>
                        <div class="login-form">
                            <form action="" method="post">
                                <div class="form-group">
                                    <label>ชื่อผู้ใช้งาน</label>
                                    <input v-model="form.login_username" class="au-input au-input--full" id="usr" type="text" name="username" placeholder="ชื่อผู้ใช้งาน">
                                </div>
                                <div class="form-group">
                                    <label>รหัสผ่าน</label>
                                    <input v-model="form.login_password" type="password" id="psw" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" class="au-input au-input--full" placeholder="รหัสผ่าน">
                                </div>
                                <div v-if="form.login_password">
                                    <h3>รหัสผ่านต้องเป็นไปตามข้อกำหนดนี้:</h3>
                                    <p id="letter" v-bind:class="{'invalid':!statusPasswordLowercase, 'valid':statusPasswordLowercase}">ตัวอักษร <b>ภาษาอังกฤษตัวเล็ก</b> อย่างน้อย1ตัว</p>
                                    <p id="capital" v-bind:class="{'invalid':!statusPasswordUppercase, 'valid':statusPasswordUppercase}">ตัวอักษร <b>ภาษาอังกฤษตัวใหญ่</b> อย่างน้อย1ตัว</p>
                                    <p id="number" v-bind:class="{'invalid':!statusPasswordNumberic, 'valid':statusPasswordNumberic}">ตัวเลข <b>อย่างน้อย1ตัว</b></p>
                                    <p id="length" v-bind:class="{'invalid':!statusPasswordLength, 'valid':statusPasswordLength}">รหัสผ่านต้องมีความยาวอย่างน้อย <b>8 ตัว</b></p>
                                </div>
                                <div class="form-group">
                                    <label>ยืนยันรหัสผ่าน</label>
                                    <input v-model="form.login_repassword" class="au-input au-input--full" type="password" id="conpsw" name="conpass" placeholder="ยืนยันรหัสผ่าน">
                                    <div v-if="form.login_repassword">
                                      <div v-if="form.login_password == form.login_repassword">
                                        <p style="color: green">รหัสผ่านตรงกัน <i class="fas fa-check"></i></p>
                                      </div>
                                      <div v-else>
                                        <p style="color: red">รหัสผ่านไม่ตรงกัน <i class="fas fa-times"></i></p>
                                      </div>
                                    </div>
                                </div>
                                <div class="login-checkbox">
                                    <label>
                                        <input type="checkbox" id="checkbx" name="agree">ยอมรับ<a @click="$bvModal.hide('bv-modal-example')">ข้อกำหนดและเงื่อนไขการใช้งาน</a>
                                        <b-modal id="bv-modal-example" hide-footer>
                                        <template v-slot:modal-title>
                                            Using <code>$bvModal</code> Methods
                                        </template>
                                        <div class="d-block text-center">
                                            <h3>Hello From This Modal!</h3>
                                        </div>
                                        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
                                        </b-modal>
                                    </label>
                                </div>
                                <button type="button" class="au-btn au-btn--block au-btn--blue m-b-20">ลงทะเบียน</button>
                            </form>
                            <div class="register-link">
                                <p>
                                    มีบัญชีผู้ใช้งานอยู่แล้ว ?
                                    <router-link to="login">ลงชื่อเข้าใช้งาน</router-link>
                                </p>
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
  mounted () {
  },
  data () {
    return {
      form: {
        login_username: '',
        login_password: '',
        login_repassword: '',
      }
    }
  },
  methods: {
  },
  computed: {
    statusPasswordLowercase: function () {
      return this.form.login_password.match(/[a-z]/g)
    },
    statusPasswordUppercase: function () {
      return this.form.login_password.match(/[A-Z]/g)
    },
    statusPasswordNumberic: function () {
      return this.form.login_password.match(/[0-9]/g)
    },
     statusPasswordLength: function () {
      return this.form.login_password.length >= 8
    }
  }
}
</script>

<style>

input {
    width: auto;
    padding: auto;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    margin-top: 0px;
    margin-bottom: 0px;
}

.container {
    background-color: #ffffff00;
    padding: auto;
}

#message {
    display:none;
    background: #ffffff00;
    color: #000;
    position: relative;
    padding: 0px 10px;
    margin-top: 0px;
}

#message p {
    padding: auto;
    font-size: 18px;
}

.valid {
    color: green;
}

.valid:before {
    position: relative;
    left: auto;
    content: "✔   ";
}

.invalid {
    color: red;
}

.invalid:before {
    position: relative;
    left: auto;
    content: "✖   ";
}

</style>