package com.ssafy.jobtender.oauth;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final OAuthService oAuthService;

    public SecurityConfig(OAuthService oAuthService){
        this.oAuthService = oAuthService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable()
                .headers()
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(oAuthService);
    }
}
