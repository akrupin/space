var $canvas, $select
var i = 0
var x,y
var kx = 3, ky = 3

drawField()

function drawField() {
    var $el

    $canvas = document.getElementById('canvas')
    $select = document.getElementById('type')

    for (i=0; i < 100;i++) {
        $el = document.createElement('div')
        $el.className = 'cell'

        x = i%10
        y = (i- i%10)/10

        $el.dataset.x = x
        $el.dataset.y = y

        $el.style.top = (y*50) + 'px'
        $el.style.left = (x*50) + 'px'

        if((x+y) % 2 === 0) {
           $el.className = $el.className + ' cell-black'
        } else {
            $el.className = $el.className + ' cell-white'
        }

        $canvas.appendChild($el)
    }

    $canvas.onclick = handleClick
}

function handleClick(evt) {
    var kx = +evt.path[0].dataset.x
    var ky = +evt.path[0].dataset.y

    highlightOptions(kx, ky)
}

function highlightOptions(kx, ky)  {
    Array.from($canvas.children).forEach(function($el) {
        $el.classList.remove('cell-green')

        x = +$el.dataset.x
        y = +$el.dataset.y

        var dx = Math.abs(kx - x)
        var dy = Math.abs(ky - y)

        // TODO: Figure conditions here

        if(x===kx && y===ky){
            $el.classList.remove('cell-green')
        }
    })
}

