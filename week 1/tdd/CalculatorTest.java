package testing;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class CalculatorTest {

    @Test
    void testAdd() {

        Calculator c = new Calculator();

        assertEquals(4, c.add(2, 2));

    }

}