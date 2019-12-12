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
                                    <h4>สร้างห้องเรียน</h4>
                                </a>
                            </div>
                            <div class="login-form">
                                <form action="" method="post">
                                    <div class="form-group">
                                        <label>ชื่ออาจารย์ผู้สอน</label>
                                        <input class="au-input au-input--full" v-model="classForm.instructor" type="text" placeholder="ชื่ออาจารย์ผู้สอน">
                                    </div>
                                    <div class="form-group">
                                        <label>วิชา</label>
                                        <input class="au-input au-input--full" v-model="classForm.subject" type="text" placeholder="วิชา">
                                    </div>
                                    <div class="form-group">
                                        <label>รหัสผ่านห้องเรียน</label>
                                        <input class="au-input au-input--full" v-model="classForm.password" type="password" placeholder="รหัสผ่านห้องเรียน">
                                    </div>
                                </form>
                                <button class="btn-block btn btn-info btn-md" @click="nextPage()">สร้างห้องเรียน</button>
                                <button class="btn-block btn btn-warning m-b-20 btn-md" @click="$router.push({name: 'AllClass'})">กลับ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
    data () {
        return {
            classForm: {
                instructor: '',
                subject: '',
                password: ''
            }
        }
    },
    methods: {
        nextPage () {
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: "กรุณาตรวจสอบความถูกต้องก่อนไปหน้าต่อไป",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ถูกต้อง',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if(result.value) {
                    if (this.classForm.instructor != '' && this.classForm.subject != '' && this.classForm.password != '') {
                        axios({
                            method: "POST",
                            url: this.$api_ip + "/class/create",
                            data: this.classForm
                        })
                        .then((res) => {
                            if (res.data.status == 200)
                                this.$router.push({path: '/class/view/'+ res.data.classid})
                            else {
                                Swal.fire(
                                    'ข้อผิดพลาด',
                                    'พบข้อผิดพลาด',
                                    'error'
                                )
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                    }
                    else {
                        Swal.fire(
                            'กรุณากรอกข้อมูลให้ครบ',
                            'กรุณากรอกข้อมูลให้ครบก่อนสร้างห้องเรียน',
                            'error'
                        )
                    }
                }
            })
        }
    }
}
</script>
