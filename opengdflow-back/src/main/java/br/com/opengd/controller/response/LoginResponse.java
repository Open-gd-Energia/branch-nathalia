package br.com.opengd.controller.response;

public record LoginResponse(String accessToken, Long expiresIn) {
}
