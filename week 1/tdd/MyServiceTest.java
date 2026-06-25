package testing;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class MyServiceTest {

    @Test
    void testExternalApi() {
        // Create Mock Object
        ExternalApi mockapi = Mockito.mock(ExternalApi.class);
        // Stub Method
        when(mockapi.getData()).thenReturn("MockData");
        // Use Mock Object
        MyService service = new MyService(mockapi);
        String result = service.fetchData();
        // Verify
        assertEquals("MockData", result);
    }
}