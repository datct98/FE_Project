package com.example.fe.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToMany(mappedBy = "cart")
    private Set<CartDetail> cartDetails;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
