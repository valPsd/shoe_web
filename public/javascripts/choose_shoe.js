
function chooseShoe (shoe, style, user) {
    if(!user){
        alert("กรุณาเข้าสู่ระบบก่อนทำการตกแต่งรองเท้า")
    }else{
        window.location.href = `/shoe/${shoe}/${style}`
    }
}