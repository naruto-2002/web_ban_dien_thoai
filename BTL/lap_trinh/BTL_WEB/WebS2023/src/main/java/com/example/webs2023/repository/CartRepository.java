package com.example.webs2023.repository;

import com.example.webs2023.base.BaseRepository;
import com.example.webs2023.entity.CartEntity;

import java.sql.SQLException;

public class CartRepository extends BaseRepository<CartEntity, Long> {
    public CartRepository(Class<CartEntity> entityClass) throws SQLException, ClassNotFoundException {
        super(entityClass);
    }
}
