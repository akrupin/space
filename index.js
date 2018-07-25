var $canvas, $colorInput
var context
var isDrawing = false
var px, py
var activeTool

main()

function main() {
    $canvas = document.getElementById('canvas')
    $colorInput = document.getElementById('color')
    context = $canvas.getContext('2d')

    $canvas.width = document.body.offsetWidth - 105
    $canvas.height = document.body.offsetHeight - 10

    $canvas.addEventListener('mousedown', onMouseDown)
    $canvas.addEventListener('mouseup', onMouseUp)
    $canvas.addEventListener('mousemove', onMouseMove)

    activeTool = 'pen'
}

function selectTool(tool) {
    activeTool = tool
    console.log(tool)
}

function onMouseDown(event) {
    isDrawing = true

    switch (activeTool) {
        case 'pen':
            context.strokeStyle = $colorInput.value

            context.beginPath()
            context.moveTo(event.offsetX, event.offsetY)

            break
        case 'brush':
            context.fillStyle = $colorInput.value
            py = event.offsetY
            px = event.offsetX
            break
        case 'bitter':
            context.fillStyle = $colorInput.value
            py = event.offsetY
            px = event.offsetX


            break
    }
}


function onMouseMove(event) {
    if (!isDrawing) {
        return
    }

    let x = event.offsetX
    let y = event.offsetY

    switch (activeTool) {
        case 'pen':
            context.lineTo(event.offsetX, event.offsetY)
            context.stroke()
            break
        case 'brush':
            let d = Math.sqrt((x-px)**2 + (y-py)**2)


            for (let i = 0; i < d; i++) {
                let cx = px + i/d * (x-px)
                let cy = py + i/d * (y-py)

                context.beginPath()
                context.arc(cx, cy, 20, 0, Math.PI * 2)
                context.fill()
            }

            px = x
            py = y
            break
        case 'bitter':
            let d = Math.sqrt((x-px)**2 + (y-py)**2)


            for (let i = 0; i < d; i++) {
                let cx = px + i/d * (x-px)
                let cy = py + i/d * (y-py)

                context.beginPath()
                context.arc(cx, cy, 20, 0, Math.PI * 2)
                context.fill()
            }

            px = x
            py = y
    }
}

function onMouseUp(event) {
    isDrawing = false
}



//
// Pencil
//
// function onMouseDown(event) {
//     isDrawing = true
//
//     context.strokeStyle = $colorInput.value
//
//     context.beginPath()
//     context.moveTo(event.offsetX, event.offsetY)
// }
//
// function onMouseMove() {
//     if (!isDrawing) {
//         return
//     }
//
//     context.lineTo(event.offsetX, event.offsetY)
//     context.stroke()
// }
//
// function onMouseUp(event) {
//     isDrawing = false
// }