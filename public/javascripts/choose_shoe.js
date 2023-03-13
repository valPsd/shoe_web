
function chooseShoe (shoe, style, user) {
    if(user){
        window.location.href = `/shoe/${shoe}/${style}`
    }else{
        alert("กรุณาเข้าสู่ระบบก่อนทำการตกแต่งรองเท้า")
    }
}