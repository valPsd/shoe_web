const img = document.querySelector('.img');
let type = ''
let value = ''

const pickr = Pickr.create({

    // el: '#html5colorpicker',

    onChange(hsva) {
        const color = hsva.toHEX().toString();
        img.style.backgroundColor = color;
    },
    position: 'center',
    components: {

        // Main components
        preview: true,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true,

            input: true, // input / output element
            clear: false, // Button which provides the ability to select no color,
            save: false // Save button
        }
    }
});

function choose_color() {
    value = ''
    type = 'color'
    img.style.backgroundImage = "none"
    img.style.backgroundColor = 'white';
    document.getElementById('leatherColor').style.display = 'none'
    document.getElementById('changeColor').style.display = 'flex'
}

function changeColor(picker) {
    // Set the fill style
    img.style.backgroundColor = picker.toHEXString();
    value = picker.toHEXString();
}

function choose_leather(leather) {
    type = 'leather'
    value ='none'
    // img.style.backgroundColor = 'white';
    img.style.backgroundImage = "url('/images/"+ leather +".jpg')"
    document.getElementById('changeColor').style.display = 'none'
    document.getElementById('leatherColor').style.display = 'flex'
}

function leather_colors(colors) {
    value = colors
    img.style.backgroundColor = '#' + colors
}
function butNext() {
    value.replace('#', '')
    if (type == '' || value == '') {
        alert('กรุณาเลือกวัสดุและสีของรองเท้า')
    }
    else {
        window.location.href = '/shoe/save/shoemen/style1/foot_front/' + type + '/' + value
    }
}