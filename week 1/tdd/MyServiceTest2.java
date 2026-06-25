package testing;

import static org.mockito.Mockito.verify;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class MyServiceTest2 {
    @Test
    void testVerifyInteraction() {
        // Create Mock Object
        ExternalApi Api = Mockito.mock(ExternalApi.class);
        // Inject Mock Object
        MyService service = new MyService(Api);
        // Call Method
        service.fetchData();
        // Verify Interaction
        verify(Api).getData();
    }
}