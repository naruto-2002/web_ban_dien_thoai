<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>JSP Page</title>
    <script src="https://kit.fontawesome.com/62d833ae64.js" crossorigin="anonymous"></script>
    <style>
        html, body {
            margin: 0;
            padding: 0;
        }

        body {
            padding-top: 70px; /* Khoảng cách giữa header và nội dung */
        }

        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: black;
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
        }

        .header-container {
            display: flex;
            position: relative;
            align-items: center;
            width: 100%;
            max-width: 1200px;
        }

        .header-menu {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header-menu ul {
            display: inline-block;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .header-menu li {
            display: inline-block;
            padding: 23px;
        }

        .header-menu li a {
            color: white;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
        }


        .search-box {
            position: absolute;
            right: 80px;
            display: flex;
            float: left;
            align-items: center;
            justify-content: center;
        }

        .search-box input {
            border: none;
            border-bottom: 2px solid white;
            padding: 5px;
            margin-right: 10px;
            font-size: 16px;
            width: 250px;
            color: black;
        }

        .search-box button {
            display: flex;
            background-color: transparent;
            border: none;
            cursor: pointer;
            outline: none;
        }

        .search-box button i {
            font-size: 20px;
        }

        .login {
            padding: 0px 0 5px;
            position: absolute;
            right: 0;
            display: block;
            float: left;
        }

        .login a {
            display: flex;
            align-items: center;
            font-size: 16px;
            text-decoration: none;
        }

        .login a i {
            font-size: 20px;
            margin-right: 5px;
            color: white;
        }

        .cart {
            padding: 0px 0 5px;
            position: absolute;
            right: 35px;
            display: block;
            float: left;
        }

        .cart a {
            display: flex;
            align-items: center;
            font-size: 16px;
            text-decoration: none;
        }

        .cart a i {
            font-size: 20px;
            margin-right: 5px;
            color: white;
        }

        .header-container h1 {
            color: white;
            font-size: 30px;
            font-weight: 600;
        }
    </style>
</head>
<body>
<header>
    <div class="header-container">
        <h1>Admin</h1>
        <div class="header-menu">
            <ul>
                <li><a href="https://localhost:443/WebS2023_war/admin/user">Người dùng</a></li>
                <li><a href="https://localhost:443/WebS2023_war/admin/product">Sản phẩm</a></li>
                <li><a href="https://localhost:443/WebS2023_war/admin/comment">Đánh giá</a></li>
                <li><a href="https://localhost:443/WebS2023_war/admin/dashboard">Thống kê</a></li>
                <li><a href="https://localhost:443/WebS2023_war/admin/order-list">Đơn hàng</a></li>
                <li><a href="#" id="dang-xuat">Đăng xuất</a></li>
            </ul>
        </div>
        >
        <%--    </div>--%>
        <%--    <div class="search-box">--%>
        <%--      <input type="text" placeholder="Tìm kiếm...">--%>
        <%--      <button><i class="fa-solid fa-magnifying-glass"></i></button>--%>
        <%--    </div>--%>
        <%--    <div class="cart">--%>
        <%--      <a href="https://localhost:443/WebS2023_war/shopping-cart"><i class="fa-solid fa-cart-shopping"></i></a>--%>
        <%--    </div>--%>
        <%--    <div class="login">--%>
        <%--      <a href="#"><i class="fa-solid fa-user"></i> </a>--%>
        <%--    </div>--%>
    </div>
</header>
<script type="module">
    import {checkLogged} from "../../routing.js";
    checkLogged("ADMIN");
    function logOut() {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('user');
        window.location.href = `https://localhost:443/WebS2023_war/login/`;
    }
    const logout = document.getElementById('dang-xuat');
    logout.addEventListener('click', logOut);

</script>
</body>
</html>

