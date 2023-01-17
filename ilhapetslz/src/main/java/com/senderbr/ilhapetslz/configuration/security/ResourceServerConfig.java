package com.senderbr.ilhapetslz.configuration.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;

import java.util.Arrays;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Autowired
    private TokenStore tokenStore;

    @Autowired
    private Environment env;


    private static final String[] PUBLIC = {"/oauth/token"};

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.tokenStore(tokenStore);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
            http
                    .cors().and()
                    .authorizeRequests()
                    .anyRequest()
                    .permitAll();
        } else if (Arrays.asList(env.getActiveProfiles()).contains("dev")) {
            http
                    /*.cors().and()
                    .authorizeRequests()
                    .anyRequest()
                    .permitAll();*/

                    .cors().and().csrf().disable()
                    .authorizeRequests()
                    .antMatchers(HttpMethod.GET,"/vacina/**","/veterinario/**","/exame/**","/user/**").hasAnyRole("CLIENT","ADMIN")
                    .antMatchers("/vacina/**","/veterinario/**","/exame/**","/user/**").hasAnyRole("ADMIN")
                    .antMatchers("/blog/img").hasAnyRole("ADMIN")
                    .antMatchers(HttpMethod.GET,"/blog/**").permitAll()
                    .antMatchers("/blog/**").hasAnyRole("ADMIN")


                    .antMatchers("/procedimento/**","/pet/**","/cliente/**").authenticated()
                    .antMatchers("/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**","/user/**").permitAll()

                    .anyRequest().hasRole("ADMIN");
        }else if (Arrays.asList(env.getActiveProfiles()).contains("prod")) {
            http
                    .cors().and()
                    .authorizeRequests()
                    .antMatchers("/user/setpassword", "/user/resetpassword").permitAll()
                    .antMatchers(HttpMethod.GET, "/branch").hasAnyRole("CLIENT", "MANAGER", "ADMIN")
                    .antMatchers(HttpMethod.GET, "/warehouseSlot/client/filtered").hasAnyRole("MANAGER", "ADMIN")
                    .antMatchers("/warehouseSlot/client/**").hasAnyRole("CLIENT", "ADMIN")
                    .antMatchers(HttpMethod.GET, "/sku/**").hasAnyRole("OPERATOR", "MANAGER", "ADMIN")
                    .antMatchers("/sku/**").hasAnyRole("MANAGER", "ADMIN")
                    .antMatchers(HttpMethod.GET, "/measurement-unit/**").hasAnyRole("OPERATOR", "MANAGER", "ADMIN")
                    .antMatchers("/measurement-unit/**").hasAnyRole("MANAGER", "ADMIN")
                    .antMatchers(HttpMethod.GET, "/category/**").hasAnyRole("OPERATOR", "MANAGER", "ADMIN")
                    .antMatchers("/category/**").hasAnyRole("MANAGER", "ADMIN")
                    .antMatchers(HttpMethod.GET, "/client").hasAnyRole("OPERATOR", "MANAGER", "ADMIN")
                    .antMatchers("/client/**").hasAnyRole("MANAGER", "ADMIN")
                    .antMatchers("/user/**").hasAnyRole("MANAGER", "ADMIN")
                    .antMatchers("/roles/**").hasAnyRole("MANAGER", "ADMIN")
                    .antMatchers(HttpMethod.GET, "/transaction/**").hasAnyRole("OPERATOR", "MANAGER", "ADMIN")
                    .antMatchers(HttpMethod.POST, "/transaction/**").hasAnyRole("OPERATOR", "MANAGER", "ADMIN")
                    .antMatchers("/transaction/**").hasAnyRole("MANAGER", "ADMIN")
                    .antMatchers("/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**").permitAll()

                    .anyRequest().hasRole("ADMIN");
        }
    }

}
