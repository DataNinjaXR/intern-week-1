import java.util.HashSet;
import java.util.Set;

public class DuplicateNumber {
    public static void main(String[] args) {
        int[] numbers = {1, 3, 4, 2, 3};
        Set<Integer> seen = new HashSet<>();

        for (int number : numbers) {
            if (seen.contains(number)) {
                System.out.println("Duplicate number: " + number);
                break;
            }

            seen.add(number);
        }
    }
}