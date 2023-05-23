export default function resIsOk(res) {
    if (res.status >=200 && res.status < 300) return true
    return false
}