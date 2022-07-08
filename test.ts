const Achild: any[] = []

class A {
    constructor() {
        if (this.constructor !== A) {
            Achild.push(this)
        }
    }
}

class B extends A {
    constructor() {
        super()
        this.m = 1
    }
}
class C extends A {}

new A()
new B()
new C()

Achild[0].m = 2
console.log(Achild)
