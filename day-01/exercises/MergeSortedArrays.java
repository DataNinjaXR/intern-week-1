import java.util.Arrays;

public class MergeSortedArrays {
    public static void main(String[] args) {
        int[] first = {1, 3, 5};
        int[] second = {2, 4, 6};

        int[] merged = new int[first.length + second.length];

        int i = 0;
        int j = 0;
        int k = 0;

        while (i < first.length && j < second.length) {
            if (first[i] < second[j]) {
                merged[k++] = first[i++];
            } else {
                merged[k++] = second[j++];
            }
        }

        while (i < first.length) {
            merged[k++] = first[i++];
        }

        while (j < second.length) {
            merged[k++] = second[j++];
        }

        System.out.println(Arrays.toString(merged));
    }
}
