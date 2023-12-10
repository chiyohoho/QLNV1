const callElement = id => { return document.getElementById(id) }
// -------------------------------------------------------------
const inputTaiKhoan = callElement('tknv')
const inputFullName = callElement('name')
const inputAvatar = callElement('avatar')
const inputEmail = callElement('email')
const inputPassword = callElement('password')
const inputDate = callElement('datepicker')
const inputSalary = callElement('luongCB')
const inputPosition = callElement('chucvu')
const inputOnDuty = callElement('gioLam')

const btnOpenForm = callElement('btnThem')
const btnAddUser = callElement('btnThemNV')
const btnUpdateUser = callElement('btnCapNhat')
const btnClose = callElement('btnDong')
const modalAvatar = callElement('avatar_modal')
const userSearchInput = callElement('searchName')
const userSearchBtn = callElement('btnTimNV')

const validation = new Validation()
const UserList = new DanhSachNhanVien()

const setLocalStorage = (data) => {
  localStorage.setItem('DSNV', JSON.stringify(data))
}

const addUserToList = () => {
  const userTaiKhoan = inputTaiKhoan.value;
  const userFullName = inputFullName.value;
  const userAvatar = inputAvatar.value;
  const userEmail = inputEmail.value;
  const userPassword = inputPassword.value;
  const userDate = inputDate.value;
  const userSalary = inputSalary.value;
  const userPosition = inputPosition.value;
  const userOnDuty = inputOnDuty.value;

  let isValid = false
  isValid = validation.checkEmpty(userTaiKhoan, 'tbTKNV', 'Vui lòng nhập tài khoản', 'tknv') && validation.checkDuplicated(userTaiKhoan, 'tbTKNV', 'Tài khoản này đã tồn tại', 'tknv')
  isValid &= validation.checkEmpty(userFullName, 'tbTen', 'Vui lòng nhập họ và tên', 'name') && validation.checkName(userFullName, 'tbTen', 'Vui lòng ghi hoa các chữ cái đầu, không được chứa số và các ký tự đặc biệt', 'name')
  isValid &= validation.checkEmpty(userAvatar, 'tbAvatar', 'Vui lòng cung cấp link ảnh', 'avatar') && validation.checkImage(userAvatar, 'tbAvatar', 'Link ảnh không hợp lệ', 'avatar')
  isValid &= validation.checkEmpty(userEmail, 'tbEmail', 'Vui lòng nhập email', 'email') && validation.checkEmail(userEmail, 'tbEmail', 'Định dạng email không đúng', 'email')
  isValid &= validation.checkEmpty(userPassword, 'tbMatKhau', 'Vui lòng nhập mật khẩu', 'password') && validation.checkPassword(userPassword, 'tbMatKhau', 'Password có độ dài là 8-20 ký tự, phải bao gồm số, ký tự đặc biệt và 1 chữ IN HOA', 'password')
  isValid &= validation.checkEmpty(userDate, 'tbNgay', 'Vui lòng nhập ngày', 'datepicker')
  isValid &= validation.checkEmpty(userSalary, 'tbLuongCB', 'Vui lòng nhập lương', 'luongCB') && validation.checkSalary(userSalary, 'tbLuongCB', 'Vui lòng chỉ nhập số', 'luongCB')
  isValid &= validation.checkEmpty(userPosition, 'tbChucVu', 'Vui lòng chọn 1 chức vụ', 'chucvu')
  isValid &= validation.checkEmpty(userOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm việc', 'gioLam') && validation.checkOnDuty(userOnDuty, 'tbGiolam', 'Vui lòng nhập số và trong giới hạn 160-200', 'gioLam')

  if (isValid) {
    const newUser = new NhanVien(userTaiKhoan, userFullName, userAvatar, userEmail, userPassword, userDate, userSalary, userPosition, userOnDuty)
    newUser.rank = newUser.setRank()
    newUser.totalSalary = newUser.calculateTotalSalary()
    UserList.addUserToDSNV(newUser)
    showUserList(UserList.dsnv)
    setLocalStorage(UserList.dsnv)
    btnClose.click()
  }
}
btnAddUser.addEventListener('click', addUserToList)

btnClose.addEventListener('click', function () {
  validation.toggleClose('tknv', 'tbTKNV')
  validation.toggleClose('name', 'tbTen')
  validation.toggleClose('avatar', 'tbAvatar')
  validation.toggleClose('email', 'tbEmail')
  validation.toggleClose('password', 'tbMatKhau')
  validation.toggleClose('datepicker', 'tbNgay')
  validation.toggleClose('luongCB', 'tbLuongCB')
  validation.toggleClose('chucvu', 'tbChucVu')
  validation.toggleClose('gioLam', 'tbGiolam')
  validation.toggleButton(true)
  modalAvatar.style.display = 'none'
  callElement('header-title').innerHTML = `Thêm nhân viên`
  validation.toggleInputEdit(true)
  callElement('form_input').reset()
})

const showUserList = (data) => {
  let str = ``
  data.map(user =>
    str += `
    <tr>
      <td>
        <img id="avatar_nv" src="${user.avatar}" alt="" style="width: 40px; height: 40px;">
      </td>
      <td style="line-height:40px">${user.username}</td>
      <td style="line-height:40px">${user.fullname}</td>
      <td style="line-height:40px">${user.email}</td>
      <td style="line-height:40px">${user.date}</td>
      <td style="line-height:40px">${user.position}</td>
      <td style="line-height:40px">${user.totalSalary}</td>
      <td style="line-height:40px">${user.rank}</td>
      <td class="d-flex"> 
        <button onclick = "removeUser('${user.username}')" class="btn btn-danger mx-1">Xoá</button>
        <button onclick="checkUser('${user.username}')" class="btn btn-success mx-1">Sửa</button>
      </td>
    </tr>
    `
  )
  callElement('tableDanhSach').innerHTML = str
}

const getLocalStorage = () => {
  if (localStorage.getItem('DSNV')) {
    const userList = JSON.parse(localStorage.getItem('DSNV'))
    UserList.dsnv = userList
    showUserList(userList)
  }
}
getLocalStorage()

const removeUser = (username) => {
  UserList.removeUser(username)
  alert(`Đã xóa nhân viên ${username}`)
  setLocalStorage(UserList.dsnv)
  showUserList(UserList.dsnv)
}

const checkUser = (username) => {
  const userIndex = UserList.findUserIndex(username)
  const userValueInput = UserList.dsnv[userIndex]

  inputTaiKhoan.value = userValueInput.username;
  inputFullName.value = userValueInput.fullname;
  inputAvatar.value = userValueInput.avatar;
  inputEmail.value = userValueInput.email;
  inputPassword.value = userValueInput.password;
  inputDate.value = userValueInput.date;
  inputSalary.value = userValueInput.salary;
  inputPosition.value = userValueInput.position;
  inputOnDuty.value = userValueInput.onduty;

  callElement('header-title').innerHTML = `Chỉnh sửa người dùng ${userValueInput.username}`
  validation.toggleButton(false)
  validation.toggleInputEdit(false, userValueInput.position)
  modalAvatar.style.display = 'block'
  modalAvatar.src = `${userValueInput.avatar}`
  btnOpenForm.click()
}

const editUser = () => {
  const newFullName = inputFullName.value
  const newUserName = inputTaiKhoan.value
  const newAvatar = inputAvatar.value
  const newEmail = inputEmail.value
  const newPassword = inputPassword.value
  const newDate = inputDate.value
  const newSalary = inputSalary.value
  const newPosition = inputPosition.value
  const newOnDuty = inputOnDuty.value

  let isValid = false

  isValid = validation.checkEmpty(newEmail, 'tbEmail', 'Vui lòng nhập email', 'email') && validation.checkEmail(newEmail, 'tbEmail', 'Định dạng Email không đúng', 'email')
  isValid &= validation.checkEmpty(newPassword, 'tbMatKhau', 'Vui lòng nhập mật khẩu', 'password') && validation.checkPassword(newPassword, 'tbMatKhau', 'Mật khẩu phải bao gồm 1 chữ ghi hoa, 1 chữ số, 1 ký tự đặc biệt, tối thiểu 8 ký tự và tối đa 16 ký tự', 'password')
  isValid &= validation.checkEmpty(newDate, 'tbNgay', 'Vui lòng nhập ngày', 'datepicker')
  isValid &= validation.checkEmpty(newSalary, 'tbLuongCB', 'Vui lòng nhập lương', 'luongCB') && validation.checkSalary(newSalary, 'tbLuongCB', 'Vui lòng chỉ nhập số', 'luongCB')
  isValid &= validation.checkEmpty(newPosition, 'tbChucVu', 'Vui lòng chọn chức vụ', 'chucvu')
  isValid &= validation.checkEmpty(newOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm việc', 'gioLam') && validation.checkOnDuty(newOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm từ 160 đến 200', 'gioLam')
  isValid &= validation.checkEmpty(newAvatar, 'tbAvatar', 'Vui lòng bổ sung hình ảnh', 'avatar') && validation.checkImage(newAvatar, 'tbAvatar', 'Link ảnh không hợp lệ', 'avatar')

  if (isValid) {
    const userUpdate = new NhanVien(newUserName, newFullName, newAvatar, newEmail, newPassword, newDate, newSalary, newPosition, newOnDuty)
    userUpdate.rank = userUpdate.setRank()
    userUpdate.totalSalary = userUpdate.calculateTotalSalary()
    UserList.updateUser(userUpdate)
    showUserList(UserList.dsnv)
    setLocalStorage(UserList.dsnv)
    alert(`Đã chỉnh sửa thành công nhân viên ${userUpdate.username}`)
    btnClose.click()
  }
}
btnUpdateUser.addEventListener('click', editUser)

const searchUser = () => {
  let userSearch = userSearchInput.value.toLowerCase().replace(/\s/g, '')
  let DSNV = UserList.dsnv

  if (userSearch !== '') {
    DSNV = DSNV.filter(user => { return user.username.toLowerCase().replace(/\s/g, '').includes(userSearch) })
  }

  showUserList(DSNV)
}
userSearchInput.addEventListener('keyup', searchUser)
userSearchBtn.addEventListener('click', searchUser)
