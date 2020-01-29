test();

class Car
 {
   constructor(doors, engine, colour) {
     this.doors = doors;
     this.engine = engine;
     this.colour = colour;
   }

   carStats() {
     return `This car has ${this.doors} doors, an ${this.engine} and comes in ${this.colour} colour!`;
   }

   static totalDoors(car1, car2) {
    const doors1 = car1.doors;
    const doors2 = car2.doors;
    return doors1 + doors2;
   }
 }

 class SUV extends Car{
   constructor(doors, engine, colour, brand, carStats) {
    super(doors, engine, colour);
    this.brand = brand;
    this.wheels = 4;
    this.ac = true;
   }

   myBrand() {
     return console.log(`This SUV is a ${this.brand}!`);

   }
 }

 const cx5 = new Car(4, 'v6', 'red');
 const cx5S = new SUV(4, 'v6', 'red', 'Honda');
 const civic = new Car(3, 'v6', 'blue');

 console.log(cx5);

 const x = Car;
 console.log(x.totalDoors(cx5, civic));


 console.log(cx5.carStats());


function test() {
  return console.log('This function is hoisted');

}
