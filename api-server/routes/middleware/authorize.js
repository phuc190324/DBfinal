let table_policies = { 
    "/room": {
        "admin": {
            "GET": true,
            "POST": true,
        },
        "manager": {
            "GET": true,
            "POST": false,
        },
        "customer": {
            "GET": true,  // Customer có thể xem danh sách phòng
        },
    },
    "/room/:id": {
        "admin": {
            "GET": true,
            "DELETE": true,
            "PATCH": true,
        },
        "manager": {
            "GET": true,
            "DELETE": false,
            "PATCH": false,
        },
        "customer": {
            "GET": true,  // Customer có thể xem thông tin chi tiết phòng
        },
    },
    "/service": {
        "admin": {
            "GET": true,
            "POST": true,
        },
        "manager": {
            "GET": true,
            "POST": false,
        },
        "customer": {
            "GET": true,  // Customer có thể xem danh sách dịch vụ
        },
    },
    "/service/:id": {
        "admin": {
            "GET": true,
            "DELETE": true,
            "PATCH": true,
        },
        "manager": {
            "GET": true,
            "DELETE": false,
            "PATCH": false,
        },
        "customer": {
            "GET": true,  // Customer có thể xem thông tin chi tiết dịch vụ
        },
    },
    "/manager": {
        "admin": {
            "GET": true,
        },
        "manager": {
            "GET": true,
        },
        "customer": {
            // Customer không có quyền truy cập vào endpoint này
        }
    },
    "/manager/:username": {
        "admin": {
            "PATCH": true,
        },
        "manager": {
            "PATCH": true,
        },
        "customer": {
            // Customer không có quyền PATCH vào thông tin quản lý
        },
    },
    "/booking": {
        "customer": {
            "GET": true,  // Customer có thể xem thông tin đặt phòng của mình
            "POST": true, // Customer có thể tạo một booking mới
        },
        "admin": {
            "GET": true,
            "POST": true,
            "PATCH": true,
            "DELETE": true,
        },
        "manager": {
            "GET": true,
        },
    },
    "/booking/:id": {
        "customer": {
            "GET": true,  // Customer có thể xem chi tiết booking của mình
            "DELETE": true,  // Customer có thể xóa booking của mình
            "PATCH": true,  // Customer có thể cập nhật booking của mình
        },
        "admin": {
            "GET": true,
            "DELETE": true,
            "PATCH": true,
        },
        "manager": {
            "GET": true,
        },
    }
};

// Middleware kiểm tra quyền truy cập
module.exports.authorized = function(req, res, next) {
    const { method, path } = req.getRoute(); // Lấy phương thức và đường dẫn
    const { role } = req.user; // Lấy vai trò của người dùng từ token
    
    // Kiểm tra xem người dùng có quyền thực hiện hành động không
    if (table_policies[path] && table_policies[path][role] && table_policies[path][role][method] !== undefined) {
        if (!table_policies[path][role][method]) {
            return res.send({
                success: false, 
                code: 401, 
                message: "Unauthorized access - Insufficient privilege"
            });
        }
    } else {
        return res.send({
            success: false, 
            code: 403, 
            message: "Forbidden - No permissions for this route"
        });
    }

    return next(); // Nếu đủ quyền, tiếp tục xử lý
};
