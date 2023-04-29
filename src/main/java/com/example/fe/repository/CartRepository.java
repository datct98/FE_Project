package com.example.fe.repository;

import com.example.fe.entity.Cart;
import com.example.fe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query(value = "select c from Cart c where c.user.id= :userId")
    Cart findByUserId(@Param("userId")int userId);
}
