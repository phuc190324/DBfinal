let policies = {
    "manager": {
        "admin": {
            "update": ['fullname', 'base_salary']
        },
        "manager": {
            "update": ['fullname']            
        }
    },
    "customer": {
        "admin": {
            "update": ['name', 'email', 'phone', 'address']  // Cho phép admin cập nhật tất cả thông tin customer
        },
        "customer": {
            "update": ['name', 'email', 'phone', 'address']  // Customer có thể cập nhật thông tin cá nhân
        }
    }
};

module.exports.columnFilter = function(table, role, action) {
    return policies[table][role][action];
};
