package week1_DSA;

public class FinancialForecast {
    // Recursive method
    public static double futureValue(double currentValue,
                                     double growthRate,
                                     int year) {
        if (year== 0) {
            return currentValue;
        }
        return futureValue(currentValue * (1 + growthRate),
                           growthRate,
                           year - 1);
    }
    public static void main(String[] args) {

        double currentValue = 10000;
        double growthRate = 0.10; // 10%
        int year = 5;
        double result = futureValue(currentValue,growthRate,year);
        System.out.println("Future Value after "
                + year + " years = " + result);
    }
}