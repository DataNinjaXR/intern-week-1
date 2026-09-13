
    public class SecondLargest {
    public static void main(String[] args) {
        int[] numbers = {10, 25, 7, 45, 18};

        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;

        for (int number : numbers) {
            if (number > largest) {
                secondLargest = largest;
                largest = number;
            } else if (number > secondLargest && number != largest) {
                secondLargest = number;
            }
        }

        System.out.println("Second largest: " + secondLargest);
    }
}

