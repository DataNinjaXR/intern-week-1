import java.util.HashSet;
import java.util.Set;

public class CommonElements {
    public static void main(String[] args) {
        int[] first = {1, 2, 3, 4};
        int[] second = {3, 4, 5, 6};

        Set<Integer> set = new HashSet<>();

        for (int number : first) {
            set.add(number);
        }

        System.out.print("Common elements: ");

        for (int number : second) {
            if (set.contains(number)) {
                System.out.print(number + " ");
            }
        }
    }
}
