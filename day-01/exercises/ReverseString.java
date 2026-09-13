public class ReverseString {

    public static String reverseString(String str) {
        String reversed = "";

        for (int i = str.length() - 1; i >= 0; i--) {
            reversed += str.charAt(i);
        }

        return reversed;
    }

    public static void main(String[] args) {
        System.out.println(reverseString("hello"));
        System.out.println(reverseString("internship"));
    }
}