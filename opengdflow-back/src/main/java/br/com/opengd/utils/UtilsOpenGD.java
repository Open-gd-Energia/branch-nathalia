package br.com.opengd.utils;

public class UtilsOpenGD {
    public static String apenasNumeros(String str) {
        if (str == null) {
            return null;
        }
        return str.replaceAll("[^0-9]", "");
    }

    public static String apenasAlfanumerico(String str) {
        if (str == null) {
            return null;
        }
        return str.replaceAll("[^a-zA-Z0-9]", "");
    }
}
