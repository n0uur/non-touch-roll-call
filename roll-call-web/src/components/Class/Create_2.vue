<template>
    <div>
        <div class="page-wrapper">
            <div class="page-content--bge5">
                <div class="container pb-5">
                    <div class="login-wrap pb-5">
                        <div class="login-content">
                            <div class="login-logo">
                                <a>
                                    <h1>IT-RollCall</h1>
                                    <h4>สร้างห้องเรียน</h4>
                                </a>
                            </div>
                            <div class="login-form">
                                <form>
                                    <div class="form-group">
                                        <b-form-checkbox switch size="lg" v-model="classForm.customTime">เวลาเรียนไม่แน่นอน</b-form-checkbox>
                                    </div>
                                    <transition name="fade">
                                        <div v-if="classForm.customTime">
                                            <div class="form-group">
                                                <label>เวลาเริ่มเรียน</label>
                                                <input class="au-input au-input--full" type="time" placeholder="เวลาเริ่มเรียน">
                                            </div>
                                            <div class="form-group" >
                                                <label>เวลาเลิกเรียน</label>
                                                <input class="au-input au-input--full" type="time" placeholder="เวลาเลิกเรียน">
                                            </div>
                                        </div>
                                    </transition>
                                    <div class="form-group">
                                        <label>เวลาขั้นต่ำในห้องเรียน (เปอร์เซ็นต์)</label>
                                        <input class="au-input au-input--full" v-model="classForm.minimumClassTime" type="number" min="0" max="100" placeholder="เวลาขั้นต่ำในห้องเรียน">
                                    </div>
                                    <div v-if="classForm.minimumClassTime == 0">
                                        <p style="color:orange">เวลาขั้นต่ำเป็น 0 จะไม่มีการตรวจสอบการเข้าเรียนสาย</p>
                                    </div>
                                    <hr>
                                    <b-form-group label="ตัวเลือกเพิ่มเติม">
                                        <b-form-checkbox switch size="sm" v-model="classForm.unlimitStudents" disabled>ไม่จำกัดจำนวนนักศึกษา</b-form-checkbox>
                                        <b-form-checkbox switch size="sm" v-model="classForm.emailForInstructor" disabled>ส่งอีเมลสรุปคาบเรียน เมื่อคาบเรียนจบ</b-form-checkbox>
                                    </b-form-group>
                                </form>
                                <button class="btn-block btn btn-info m-b-20 btn-md" @click="createClass">สร้างห้องเรียน</button>
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
                unlimitStudents: true,
                emailForInstructor: false,
                customTime: false,
                classStartTime: '',
                classEndTime: '',
                minimumClassTime: 0
            }
        }
    },
    methods: {
        createClass () {
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: "กรุณาตรวจสอบความถูกต้องก่อนจะสร้างห้องเรียน",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ถูกต้อง',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if(result.value) {
                    if (!this.classForm.customTime || (this.classForm.customTime && (this.classForm.classStartTime != '' && this.classForm.classEndTime != ''))) {
                        // Axios post
                        
                        //
                        this.$router.push({path: '/class/view/' + axiosReturnedRoomID})
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

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>