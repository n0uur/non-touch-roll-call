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
            มาเรียน: {{ 50 }}
          </button>
          <button class="btn btn-warning">
            <i class="fas fa-thumbs-down"></i>
            มาสาย: {{ 50 }}
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
                  <i class="fas fa-user-clock"></i> เวลาเข้าเรียน
                </th>
                <th>
                  <i class="fas fa-user-clock"></i> เวลาออก
                </th>
                <th>
                  <i class="fas fa-check-square"></i> สถานะ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>62070016</td>
                <td>Kittipak</td>
                <td>Panarin</td>
                <td>11.33</td>
                <td>#</td>
                <td>ยังไม่ตาย</td>
              </tr>
              <tr>
                <td>62070016</td>
                <td>Kittipak</td>
                <td>Panarin</td>
                <td>11.33</td>
                <td>#</td>
                <td>ยังไม่ตาย</td>
              </tr>
              <tr>
                <td>62070016</td>
                <td>Kittipak</td>
                <td>Panarin</td>
                <td>11.33</td>
                <td>#</td>
                <td>ยังไม่ตาย</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
