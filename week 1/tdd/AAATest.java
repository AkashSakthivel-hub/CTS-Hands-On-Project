package testing;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;



import org.junit.jupiter.api.Test;
import org.junit.*;
class AAATest {
	 @BeforeAll
	 static void BeforeAll() {
		 System.out.println("Before all testcase");
	 }
    @BeforeEach
    void setup() {
    	System.out.println("Before setting up");
    }
	@Test
	void testsubtract() {
//		Arrange
		AAA obj=new AAA();
		int a=5;
		int b=4;
//		Act
		int res=obj.subtract(a, b);
//		Assert
		assertEquals(1,res);
	}
	@AfterEach
	void tearDown() {
		System.out.println("After setting up");
	}
	 @AfterAll
	static  void AfterAll() {
		 System.out.println("After all testcase");
	 }

}
