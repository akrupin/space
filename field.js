function Field() {
    this.width = window.innerWidth * 3
    this.height = window.innerHeight * 3

    this.offsetX = window.innerWidth
    this.offsetY = window.innerHeight

    this.planets = []
}

Field.prototype.restrictOffset = function() {
    this.offsetX = Math.max(this.offsetX, 0)
    this.offsetY = Math.max(this.offsetY, 0)
    this.offsetX = Math.min(this.offsetX, this.width - window.innerWidth)
    this.offsetY = Math.min(this.offsetY, this.height - window.innerHeight)
}

Field.prototype.createPlanets = function (count) {
    for (let i = 0; i < count; i++) {
        let planet = this.locatePlanet()

        planet.init(document.body)
        planet.calcForces()
        planet.render(this.offsetX, this.offsetY)
    }
}

Field.prototype.locatePlanet = function() {
    let x, y
    let allowed

    let r = 20 + Math.random() * 40
    let type = 1 + Math.round(Math.random()*3)
    let v = {
        x: Math.random()*5-2.5,
        y: Math.random()*5-2.5,
    }

    do {
        allowed = true
        x = Math.random() * this.width
        y = Math.random() * this.height

        for (let j = 0; j < this.planets.length; j++) {
            let planet = this.planets[j]
            let distance = Planet.calcDistance({ x, y }, planet)

            if (distance < r + planet.radius) {
                // debugger
                allowed = false
                break
            }
        }
    } while (!allowed)

    let planet = new Planet(this, x, y, r, type, v)

    this.planets.push(planet)

    return planet
}

Field.prototype.handleTick = function () {
    for (let i = 0; i < PLANET_COUNT; i++) {
        let planet = this.planets[i]

        planet.x += planet.v.x
        planet.y += planet.v.y

        planet.calcForces()

        planet.forces.forEach((force) => {
            planet.v.x += force.x / planet.radius
            planet.v.y += force.y / planet.radius
        })

        this.planets[i].render(this.offsetX, this.offsetY)
    }
}