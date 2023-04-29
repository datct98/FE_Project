package com.example.fe.controller;

import com.example.fe.entity.Product;
import com.example.fe.repository.ProductRepository;
import com.example.fe.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public String viewHomePage(Model model,
                               @RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "5") int size) {

        List<Product> products = productRepository.findAll();
        model.addAttribute("products", products);
        return "shop";
    }

    @GetMapping("/{id}")
    public String getDetailProduct(@PathVariable()int id, Model model){
        Product product = productRepository.findProductById(id);

        model.addAttribute("product", product);
        return "product";
    }


}
