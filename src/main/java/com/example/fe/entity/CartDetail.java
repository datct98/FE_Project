package com.example.fe.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.security.SecurityProperties;

import javax.persistence.*;

@Entity
@Table(name = "cart_detail")
@Getter
@Setter
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    private int quantity;
    @ManyToOne()
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @Override
    public String toString() {
        return "CartDetail{" +
                "id=" + id +
                ", product=" + product +
                ", quantity=" + quantity +
                '}';
    }
}
