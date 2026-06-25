package week1_designpattern;

interface Vehicle {
    void drive();
}

class Car implements Vehicle {

    public void drive() {
        System.out.println("Driving Car");
    }
}
class Bike implements Vehicle {

    public void drive() {
        System.out.println("Riding Bike");
    }
}
class VehicleFactory {

    public Vehicle getVehicle(String varient) {

        if(varient.equals("Car"))
            return new Car();

        else if(varient.equals("Bike"))
            return new Bike();

        return null;
    }
}
public class factorydesihnpattren {

	    public static void main(String[] args) {

	        VehicleFactory factory = new VehicleFactory();

	        Vehicle v = factory.getVehicle("Car");
	        v.drive();

	        Vehicle v1 = factory.getVehicle("Bike");
	        v1.drive();
	    }
	}

