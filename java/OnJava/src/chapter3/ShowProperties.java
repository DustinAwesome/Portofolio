package chapter3;

import java.util.Locale;

public class ShowProperties {


    private final String date = "January";
    private final String cake = "Madelaine";
    private final int value = Integer.MAX_VALUE;



    private ShowProperties() {
        System.out.println(output());
    }

    public String output() {
        return String.format("%03d %s $%,d %s %s!",
                date.length(), cake.substring(0,4).toLowerCase(),
                value, cake.substring(6,8),date);
    }

    public static void main(String[] args) {
        System.getProperties().list(System.out);
        System.out.println(System.getProperty("user.name"));
        System.out.println(System.getProperty("java.library.path"));

        double d = 341_435_936.445_667;
        System.out.println(d);

        for(int i = 0; i < 10;) {
            System.out.print("" + ++i);
        }

        int x = 10;

        String sentence = "from a to z".replace(" ", "");
        sentence.chars().mapToObj(c -> (char) c)
                .map(c -> c == 'z'?'a': (char) (c + 1))
                .forEach(System.out::print);

        new ShowProperties();

    }

}
