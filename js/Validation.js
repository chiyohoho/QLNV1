function Validation() {
    this.checkEmpty = (input, thongBao, content, inputBorder) => {
        if (input) {
            if (input !== 'Pick') {
                this.toggleInput(inputBorder, thongBao, true, content)
                return true
            } else {
                this.toggleInput(inputBorder, thongBao, false, content)
                return false
            }
        } else {
            this.toggleInput(inputBorder, thongBao, false, content)
            return false
        }
    }

    this.checkDuplicated = (input, thongBao, content, inputBorder) => {
        const index = UserList.dsnv.findIndex(item => item.username === input)
        if (index >= 0) {
            this.toggleInput(inputBorder, thongBao, false, content)
            return false
        } else {
            this.toggleInput(inputBorder, thongBao, true, content)
            return true
        }
    }

    this.checkEmail = (email, thongBao, content, inputBorder) => {
        const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (regex.test(email)) {
            this.toggleInput(inputBorder, thongBao, true, content)
            return true
        } else {
            this.toggleInput(inputBorder, thongBao, false, content)
            return false
        }
    }

    this.checkImage = (image, thongBao, content, inputBorder) => {
        const regex = /^https?:\/\/[a-zA-Z0-9@:%._\-+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\-+~#?&//=]*)$/;
        if (regex.test(image)) {
            this.toggleInput(inputBorder, thongBao, true, content)
            return true
        } else {
            this.toggleInput(inputBorder, thongBao, false, content)
            return false
        }
    }

    this.checkName = (name, thongBao, content, inputBorder) => {
        const regex = /^[A-Z][a-zàáâãèéêễểềếệìíòóôơớờỡởợõùúưứừửữỳỹđÀÁÂÃÈÉÊẾỀỄỂỆÌÍÒÓÔƠớờỡởợõùúưứừửữỳỹĐ]*( [A-Z][a-zàáâãèéêễểềếệìíòóôơớờỡởợõùúưứừửữỳỹđÀÁÂÃÈÉÊẾỀỄỂỆÌÍÒÓÔƠớờỡởợõùúưứừửữỳỹĐ]+)*$/;

        if (regex.test(name)) {
            this.toggleInput(inputBorder, thongBao, true, content)
            return true
        } else {
            this.toggleInput(inputBorder, thongBao, false, content)
            return false
        }
    }

    this.checkPassword = (password, thongBao, content, inputBorder) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,16}$/;
        if (regex.test(password)) {
            this.toggleInput(inputBorder, thongBao, true, content);
            return true;
        } else {
            this.toggleInput(inputBorder, thongBao, false, content);
            return false;
        }
    }

    this.checkSalary = (salary, thongBao, content, inputBorder) => {
        const regex = new RegExp(`^[0-9]+$`);
        if (regex.test(salary)) {
            this.toggleInput(inputBorder, thongBao, true, content);
            return true;
        } else {
            this.toggleInput(inputBorder, thongBao, false, content);
            return false;
        }
    }

    this.checkOnDuty = (onduty, thongBao, content, inputBorder) => {
        const regex = /^(?:1[6-9]\d|200)$/;
        if (regex.test(onduty)) {
            this.toggleInput(inputBorder, thongBao, true, content);
            return true;
        } else {
            this.toggleInput(inputBorder, thongBao, false, content);
            return false;
        }
    }

    this.toggleInputEdit = (dieuKien, position) => {
        if (dieuKien) {
            inputFullName.disabled = false
            inputTaiKhoan.disabled = false
            inputEmail.disabled = false
            inputPassword.disabled = false
            inputDate.disabled = false
            inputSalary.disabled = false
            inputPosition.disabled = false
            inputOnDuty.disabled = false

            inputFullName.style.cursor = 'initial'
            inputTaiKhoan.style.cursor = 'initial'
            inputEmail.style.cursor = 'initial'
            inputPassword.style.cursor = 'initial'
            inputDate.style.cursor = 'initial'
            inputPosition.style.cursor = 'initial'
            inputSalary.style.cursor = 'initial'
            inputOnDuty.style.cursor = 'initial'
        } else {
            if (position === 'Sếp') {
                inputFullName.disabled = true
                inputTaiKhoan.disabled = true
                inputEmail.disabled = false
                inputPassword.disabled = false
                inputDate.disabled = true
                inputSalary.disabled = false
                inputPosition.disabled = false
                inputOnDuty.disabled = false

                inputFullName.style.cursor = 'no-drop'
                inputTaiKhoan.style.cursor = 'no-drop'
                inputDate.style.cursor = 'no-drop'
            } else if (position === 'Trưởng phòng') {
                inputFullName.disabled = true
                inputTaiKhoan.disabled = true
                inputEmail.disabled = true
                inputPassword.disabled = true
                inputDate.disabled = true
                inputSalary.disabled = false
                inputPosition.disabled = true
                inputOnDuty.disabled = false

                inputFullName.style.cursor = 'no-drop'
                inputTaiKhoan.style.cursor = 'no-drop'
                inputEmail.style.cursor = 'no-drop'
                inputPassword.style.cursor = 'no-drop'
                inputDate.style.cursor = 'no-drop'
                inputPosition.style.cursor = 'no-drop'
            } else {
                inputFullName.disabled = true
                inputTaiKhoan.disabled = true
                inputEmail.disabled = true
                inputPassword.disabled = true
                inputDate.disabled = true
                inputSalary.disabled = true
                inputPosition.disabled = true
                inputOnDuty.disabled = true

                inputFullName.style.cursor = 'no-drop'
                inputTaiKhoan.style.cursor = 'no-drop'
                inputEmail.style.cursor = 'no-drop'
                inputPassword.style.cursor = 'no-drop'
                inputDate.style.cursor = 'no-drop'
                inputPosition.style.cursor = 'no-drop'
                inputSalary.style.cursor = 'no-drop'
                inputOnDuty.style.cursor = 'no-drop'
            }
        }
    }

    this.toggleButton = (dieuKien) => {
        if (dieuKien) {
            btnAddUser.disabled = false
            btnUpdateUser.disabled = true
        } else {
            btnAddUser.disabled = true
            btnUpdateUser.disabled = false
        }
    }

    this.toggleInput = (input, id, dieuKien, content) => {
        if (input) {
            callElement(input).style.borderColor = dieuKien ? 'green' : 'red'
        } else {
            callElement(input).style.borderColor = '#ccc'
        }

        if (dieuKien) {
            callElement(id).style.display = 'none'
            callElement(id).innerHTML = ''
        } else {
            callElement(id).style.display = 'block'
            callElement(id).innerHTML = content
        }



    }

    this.toggleClose = (input, thongBao) => {
        if (input) {
            callElement(input).style.borderColor = '#ccc'
            callElement(thongBao).style.display = 'none'
            callElement(thongBao).innerHTML = ''
        }
    }
}