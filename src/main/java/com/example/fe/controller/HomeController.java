package com.example.fe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/login")
    public String homePage(){
        return "index";
    }

    @GetMapping("/signup")
    public String registerPage(){
        return "signup";
    }
}
