package testing;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class assertionTest {

	@Test
	void testmultiple() {
		assertion A=new assertion();
		assertEquals(10,A.multiple(2, 5));
	}

}
