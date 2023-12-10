function NhanVien(username, fullname, avatar, email, password, date, salary, position, onduty) {
    this.username = username
    this.fullname = fullname
    this.avatar = avatar
    this.email = email
    this.password = password
    this.date = date
    this.salary = salary
    this.position = position
    this.onduty = onduty
    this.rank = ''
    this.totalSalary = 0

    this.calculateTotalSalary = function () {
        if (this.position === 'Sếp') {
            this.totalSalary = (this.salary * 2 * this.onduty).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        } else if (this.position === 'Trưởng phòng') {
            this.totalSalary = (this.salary * 1.5 * this.onduty).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        } else {
            this.totalSalary = (this.salary * this.onduty).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        }
        return this.totalSalary
    }

    this.setRank = function () {
        if (this.onduty >= 200) {
            this.rank = 'Xuất sắc'
        } else if (this.onduty >= 160 && this.onduty < 200) {
            this.rank = 'Đủ chỉ tiêu'
        } else {
            this.rank = 'GenZ'
        }
        return this.rank
    }
}