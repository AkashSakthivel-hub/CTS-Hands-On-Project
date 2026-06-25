package week1_designpattern;

//import Arrays.Singleton;


	class Singleton { 
		private static Singleton obj = new Singleton(); 
	
	private Singleton() {
		
	} 
	public static Singleton getInstance() {
		return obj; 
		}
	} 
	public class Singletonpattern {
		public static void main(String[] args) {
			Singleton s1 = Singleton.getInstance();
			Singleton s2 = Singleton.getInstance() ;
			System.out.println(s1 == s2); 
			} 
		}


