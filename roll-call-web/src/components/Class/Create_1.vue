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
                                        <input class="au-input au-input--full" v-model="classForm.instructorName" type="text" placeholder="ชื่ออาจารย์ผู้สอน">
                                    </div>
                                    <div class="form-group">
                                        <label>วิชา</label>
                                        <input class="au-input au-input--full" v-model="classForm.subjectName" type="text" placeholder="วิชา">
                                    </div>
                                    <div class="form-group">
                                        <label>รหัสผ่านห้องเรียน</label>
                                        <input class="au-input au-input--full" v-model="classForm.classPassword" type="password" placeholder="รหัสผ่านห้องเรียน">
                                    </div>
                                </form>
                                <button class="btn-block btn btn-info m-b-20 btn-md" @click="nextPage()">ขั้นตอนต่อไป</button>
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

export default {
    data () {
        return {
            classForm: {
                instructorName: '',
                subjectName: '',
                classPassword: ''
            }
        }
    },
    methods: {
        nextPage () {
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: "กรุณาตรวจสอบความถูกต้องก่อนไปหน้าต่อไป",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ถูกต้อง',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if(result.value) {
                    if (this.classForm.instructorName != '' && this.classForm.subjectName != '' && this.classForm.classPassword != '') {
                        // Vuex Commit
                        // Nothing Now
                        //
                        this.$router.push({path: '2'})
                    }
                    else {
                        Swal.fire(
                            'กรุณากรอกข้อมูลให้ครบ',
                            'กรุณากรอกข้อมูลให้ครบก่อนไปหน้าถัดไป',
                            'error'
                        )
                    }
                }
            })
        }
    }
}
</script>
