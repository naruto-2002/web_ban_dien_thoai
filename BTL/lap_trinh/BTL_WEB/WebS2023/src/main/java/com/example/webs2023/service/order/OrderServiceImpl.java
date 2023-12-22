package com.example.webs2023.service.order;

import com.example.webs2023.base.BaseService;
import com.example.webs2023.dto.cart.CartDetailOutput;
import com.example.webs2023.dto.order.OrderInput;
import com.example.webs2023.dto.order.OrderOutput;
import com.example.webs2023.entity.OrderEntity;
import com.example.webs2023.repository.OrderRepository;
import com.example.webs2023.service.cart.CartService;
import com.example.webs2023.service.product_in_order.ProductInOrderService;

import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

public class OrderServiceImpl extends BaseService<OrderEntity, Long, OrderInput, OrderOutput> implements OrderService {
    private final CartService cartService;
    private final ProductInOrderService productInOrderService;

    public OrderServiceImpl(OrderRepository repository, CartService cartService, ProductInOrderService productInOrderService) {
        this.cartService = cartService;
        this.productInOrderService = productInOrderService;
        this.repository = repository;
        this.mapper = new OrderMapper(OrderEntity.class, OrderInput.class, OrderOutput.class);
    }

    @Override
    public OrderOutput createNewOrder(Long userId) throws SQLException, InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        CartDetailOutput cartOutput = cartService.getLeastCart(userId);
        if (cartOutput == null) {
            return null;
        }
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setUserId(userId);
        orderEntity.setOrderDate(Timestamp.from(Calendar.getInstance().toInstant()));
        orderEntity.setStatus("PENDING");
        OrderEntity savedOrder = repository.save(orderEntity);
        cartService.deleteCart(userId);
        cartOutput.getProducts().forEach(cartRefProductOutput -> {
            try {
                productInOrderService.createProductInOrderCartRefProduct(savedOrder.getId(), cartRefProductOutput);
            } catch (SQLException | InvocationTargetException | NoSuchMethodException | InstantiationException |
                     IllegalAccessException e) {
                e.printStackTrace();
            }
        });
        return getOrderOutputFromOrderEntity(savedOrder);
    }

    @Override
    public OrderOutput getOrderOutputFromOrderEntity(OrderEntity orderEntity) throws SQLException, InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        OrderOutput orderOutput = mapper.getOutputFromEntity(orderEntity);
        orderOutput.setProducts(productInOrderService.getProductInOrderOutputListByOrderId(orderEntity.getId()));
        Long totalMoney = orderOutput.getProducts().stream().mapToLong(productInOrderOutput -> productInOrderOutput.getProductPrice() * productInOrderOutput.getProductQuantity()).sum();
        orderOutput.setTotalMoney(totalMoney);
        return orderOutput;
    }

    @Override
    public List<OrderOutput> getOrderByUserId(Long userId, String status) throws SQLException, InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        String sql;
        if (status != null) {
            sql = "WHERE user_id = " + userId + " AND status = '" + status + "' ORDER BY id DESC";
        } else {
            sql = "WHERE user_id = " + userId + " ORDER BY id DESC";
        }
        List<OrderEntity> orderEntities = repository.getAll(sql);
        return orderEntities.stream().map(orderEntity -> {
            try {
                return getOrderOutputFromOrderEntity(orderEntity);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).toList();
    }

    @Override
    public List<OrderOutput> getAllListOrder(String status) throws SQLException, InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        String sql;
        if (status != null) {
            sql = "WHERE status = '" + status + "' ORDER BY id DESC";
        } else {
            sql = "ORDER BY id DESC";
        }
        List<OrderEntity> orderEntities = repository.getAll(sql);
        List<OrderOutput> orderOutputs = orderEntities.stream().map(orderEntity -> {
            try {
                return getOrderOutputFromOrderEntity(orderEntity);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).toList();
        return orderOutputs;
    }

    @Override
    public OrderOutput cancelOrder(Long userId, Long orderId, OrderInput orderInput) throws SQLException, InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        OrderEntity orderEntity = repository.getById(orderId);
        if (!orderEntity.getUserId().equals(userId) || !orderEntity.getStatus().equals("PENDING")) {
            return getOrderOutputFromOrderEntity(orderEntity);
        }
        orderEntity.setStatus("CANCEL");
        orderEntity.setId(null);
        OrderEntity savedOrder = repository.updateById(orderId, orderEntity);
        return getOrderOutputFromOrderEntity(savedOrder);
    }

    @Override
    public OrderOutput updateOrderStatus(Long id, String status) throws SQLException, InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setStatus(status);
        OrderEntity savedOrder = repository.updateById(id, orderEntity);
        return getOrderOutputFromOrderEntity(savedOrder);
    }
}
