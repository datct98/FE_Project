package com.example.fe.controller;

import com.example.fe.entity.Cart;
import com.example.fe.repository.CartDetailRepository;
import com.example.fe.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/cart/{userId}")
    public String displayCart(@PathVariable int userId, Model model){
        Cart cart = cartRepository.findByUserId(userId);
        model.addAttribute("cartDetails", cart.getCartDetails());
        double totalPrice = cart.getCartDetails().stream()
                .map(product -> product.getQuantity() * product.getProduct().getProductPriceOut())
                .reduce(0.0, Double::sum);
        model.addAttribute("total", totalPrice);

        return "cart-list";
    }
}
