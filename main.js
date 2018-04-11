const PLANET_COUNT = 15

;(function () {

    document.addEventListener('DOMContentLoaded', main)
    document.addEventListener('keydown', onKeyPress)

    setInterval(move, 50)

    let field
    let isMoving = false

    function main () {
        field = new Field()

        field.createPlanets(PLANET_COUNT)

        field.planets.forEach((planet) => {
            planet.addMutualForces(field.planets)
            planet.render()
        })
    }

    function move() {
        if (!isMoving) {
            return
        }

        field.handleTick()
    }

    function onKeyPress(event) {
        switch (event.code) {
            case 'Numpad2':
                field.offsetY += field.height / 10
                break
            case 'Numpad4':
                field.offsetX -= field.width / 10
                break
            case 'Numpad8':
                field.offsetY -= field.height / 10
                break
            case 'Numpad6':
                field.offsetX += field.width / 10
                break
            case 'Space':
                isMoving = !isMoving
                break
        }

        field.restrictOffset()

        // TODO: Move this to Field.render()
        for (let i = 0; i < field.planets.length; i++) {
            field.planets[i].render(field.offsetX, field.offsetY)
        }
    }
})()
