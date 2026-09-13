import java.util.LinkedHashMap;
import java.util.Map;

public class FirstNonRepeating {
    public static void main(String[] args) {
        String str = "aabbcde";

        Map<Character, Integer> frequency = new LinkedHashMap<>();

        for (char ch : str.toCharArray()) {
            frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);
        }

        for (char ch : str.toCharArray()) {
            if (frequency.get(ch) == 1) {
                System.out.println("First non-repeating character: " + ch);
                break;
            }
        }
    }
}
