const REPULSION_FACTOR = 500**2
const GRAVITY_CONST = 1

function Planet(field, x, y, radius, type, v) {
    this.id = Planet.counter++
    this.field = field

    this.x = x
    this.y = y
    this.radius = radius
    this.type = type

    this.forces = []
    'top right bottom left'.split(' ').forEach((type) => {
        this.forces.push({
            type: 'border',
            source: type,
            x: 0,
            y: 0,
            $el: null,
        })
    })

    this.$el = null
    this.v = v || {
        x: 0,
        y: 0,
    }
}

Planet.counter = 0

Planet.prototype.init = function ($container) {
    this.$el = document.createElement('div')
    this.$el.className = 'planet'
    this.$el.style.backgroundImage = `url("img/p${this.type}.png")`
    this.$el.style.width = this.radius * 2 + 'px'
    this.$el.style.height = this.radius * 2 + 'px'

    this.$speed = document.createElement('div')
    this.$speed.className = 'vector speed'

    $container.appendChild(this.$el)
    this.$el.appendChild(this.$speed)
}

Planet.prototype.addMutualForces = function(planets) {
    planets.forEach((planet) => {
        if (planet === this) {
            return;
        }

        this.forces.push({
            type: 'planet',
            source: planet,
            x: 0,
            y: 0,
            $el: null,
        })
    })

    this.calcForces()
}

Planet.prototype.calcForces = function (planets) {
    // calculate border repulsions
    this.forces
        .filter((force) => force.type === 'border')
        .forEach((force) => {
            let distance

            switch (force.source) {
                case 'top':
                    force.y = REPULSION_FACTOR/this.y**2
                    break
                case 'bottom':
                    distance = this.field.height - this.y
                    force.y = - REPULSION_FACTOR / distance**2
                    break
                case 'left':
                    force.x = REPULSION_FACTOR/this.x**2
                    break
                case 'right':
                    distance = this.field.width - this.x
                    force.x = - REPULSION_FACTOR/distance**2
                    break
            }
        })

    // calculate mutual gravity
    this.forces
        .filter((force) => force.type === 'planet')
        .forEach((force) => {
            let planet = force.source
            let distance = Planet.calcDistance(this, planet)

            let Gabs = GRAVITY_CONST * this.radius * planet.radius / (distance ** 2)

            let direction = {
                x: planet.x - this.x,
                y: planet.y - this.y,
            }

            if (isNaN(direction.x)) {
                debugger;
            }

            let ratio = Math.sqrt(Gabs / distance)

            force.x = direction.x * ratio
            force.y = direction.y * ratio
        })
}

Planet.calcDistance = function (pointA, pointB) {
    let dx = pointA.x - pointB.x
    let dy = pointA.y - pointB.y

    return Math.sqrt(dx*dx + dy*dy)
}

Planet.locateRandomly = function (planets) {
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
        // x = (Math.random() * 3) * window.innerWidth
        // y = (Math.random() * 3) * window.innerHeight
        x = (0.1 + Math.random()*0.8) * window.innerWidth
        y = (0.1 + Math.random()*0.8) * window.innerHeight

        for (let j = 0; j < planets.length; j++) {
            let distance = Planet.calcDistance({ x, y }, planets[j])

            if (distance < r + planets[j].radius) {
                // debugger
                allowed = false
                break
            }
        }
    } while (!allowed)

    return new Planet(x, y, r, type, v)
}


Planet.prototype.render = function (offsetX, offsetY) {
    this.$el.style.left = this.x - offsetX + 'px'
    this.$el.style.top = this.y -offsetY + 'px'

    let alpha = Math.atan(this.v.y/this.v.x)*180/Math.PI
    if (this.v.x < 0) {
        alpha = 180 + alpha
    }

    this.$speed.style.width = Math.sqrt(this.v.x**2 + this.v.y**2) * 10 + 'px'
    this.$speed.style.transform = `rotate(${alpha}deg)`

    this.forces.forEach((force) => {
        if (!force.$el) {
            force.$el = document.createElement('div')
            force.$el.className = 'vector force'

            this.$el.appendChild(force.$el)
        }

        let alpha = Math.atan(force.y/force.x)*180/Math.PI
        if (force.x < 0) {
            alpha = 180 + alpha
        }

        force.$el.style.width = Math.sqrt(force.x**2 + force.y**2) * 10 + 'px'
        force.$el.style.transform = `rotate(${alpha}deg)`
    })


    console.log(this.v)
    console.log(alpha)
}
