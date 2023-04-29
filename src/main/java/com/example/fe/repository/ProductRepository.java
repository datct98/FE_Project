package com.example.fe.repository;

import com.example.fe.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findProductById(Integer id);

    @Query("SELECT p FROM Product p WHERE p.name LIKE CONCAT('%', :productName, '%')")
    List<Product> getProductsByProductName(String productName);
    Page<Product> findProductByDiscountNotNull(Pageable pageable);

    Page<Product> findAll(Pageable pageable);

    /*@Query(value = "SELECT * FROM Product p ORDER BY p.Review_Product DESC LIMIT 4", nativeQuery = true)
    List<Product> findTop4ProductReview();*/

    @Query(value = "SELECT * FROM Product p ORDER BY p.Rate DESC LIMIT 4", nativeQuery = true)
    List<Product> findTop4ProductRate();

    @Query(value = "SELECT * FROM Product p ORDER BY p.Created_at DESC LIMIT 4", nativeQuery = true)
    List<Product> findTop4ProductLatestAt();

    List<Product> findProductByCategoryId(Integer categoryId);

}

