package week1_DSA;
public class SearchDemo {
    int productId;
    String productName;
    String category;
    public SearchDemo(int productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }
    // Linear Search
    public static SearchDemo linearSearch(SearchDemo[] products, int id) {
        for (SearchDemo product : products) {
            if (product.productId == id) {
                return product;
            }
        }
        return null;
    }
    // Binary Search
    public static SearchDemo binarySearch(SearchDemo[] products, int id) {

        int low = 0;
        int high = products.length - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            if (products[mid].productId == id) {
                return products[mid];
            }
            if (products[mid].productId < id) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return null;
    }
    public static void main(String[] args) {
        SearchDemo[] products = {
            new SearchDemo(101, "Laptop", "Electronics"),
            new SearchDemo(102, "Phone", "Electronics"),
            new SearchDemo(103, "Shoes", "Fashion"),
            new SearchDemo(104, "Watch", "Accessories"),
            new SearchDemo(105, "Bag", "Fashion")
        };
        System.out.println("Linear Search Result:");
        SearchDemo result1 = linearSearch(products, 104);
        if (result1 != null)
            System.out.println(result1.productId + " " +
                               result1.productName + " " +
                               result1.category);
        else
            System.out.println("Product Not Found");
        System.out.println();
        System.out.println("Binary Search Result:");
        SearchDemo result2 = binarySearch(products, 104);
        if (result2 != null)
            System.out.println(result2.productId + " " +
                               result2.productName + " " +
                               result2.category);
        else
            System.out.println("Product Not Found");
    }
}