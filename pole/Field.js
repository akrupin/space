var $canvas, $el
var i = 0
var x,y
$canvas = document.getElementById('canvas')
console.log($canvas)

for(i=0; i < 100;i++) {
    $el = document.createElement('div')
    $el.className = 'cell'
    x = i%10
    y = (i- i%10)/10
    $el.style.top = (y*50) + 'px'
    $el.style.left = (x*50) + 'px'

    $canvas.appendChild($el)
}
