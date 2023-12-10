function DanhSachNhanVien() {
    this.dsnv = []

    this.addUserToDSNV = function (user) {
        this.dsnv.push(user)
    }

    this.findUserIndex = function (user) {
        const index = this.dsnv.findIndex(item => item.username === user)
        return index
    }

    this.removeUser = function (user) {
        const userNeedRemove = this.findUserIndex(user)
        if (userNeedRemove >= 0) {
            this.dsnv.splice(userNeedRemove, 1)
        }
    }

    this.updateUser = function (user) {
        const userNeedUpdate = this.findUserIndex(user.username)
        if (userNeedUpdate !== -1) {
            this.dsnv[userNeedUpdate] = user
        }
    }
}