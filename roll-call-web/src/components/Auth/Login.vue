<template>
    <div>
        <div class="page-wrapper">
            <div class="page-content--bge5">
                <div class="container">
                    <div class="login-wrap">
                        <div class="login-content">
                            <div class="login-logo">
                                <a href="#">
                                    <h1 alt="god">IT-RollCall</h1>
                                </a>
                            </div>
                            <div class="login-form">
                                <form action="" method="post">
                                    <div class="form-group">
                                        <label>ชื่อผู้ใช้งาน</label>
                                        <input class="au-input au-input--full" type="text" name="username" placeholder="ชื่อผู้ใช้งาน">
                                    </div>
                                    <div class="form-group">
                                        <label>รหัสผ่าน</label>
                                        <input class="au-input au-input--full" type="password" name="password" placeholder="รหัสผ่าน">
                                    </div>
                                    <div class="login-checkbox">
                                        <label>
                                            <input type="checkbox" name="remember">จดจำรหัสผ่าน
                                        </label>
                                        <label>
                                            <a href="forget-pass.html">ลืมรหัสผ่าน?</a>
                                        </label>
                                    </div>
                                </form>
                                    <a href="#" class="btn-block btn btn-info m-b-20 btn-md" role="button">ลงชื่อเข้าใช้</a>
                                    <a href="register.html" class="btn-block btn btn-warning m-b-20 btn-md" role="button">ลงทะเบียน</a>
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
        data () {
            return {
                h: ""
            }
        }
    }
</script>
