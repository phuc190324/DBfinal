let policies = {
    "manager": {
        "admin": {
            "getAll": (knex) => knex,  // Admin có thể xem tất cả các manager
            "update": (knex) => knex,  // Admin có thể cập nhật tất cả các manager
        },
        "manager": {
            "getAll": (knex, user) => knex.where({username: user.username}),  // Manager chỉ xem thông tin của chính mình
            "update": (knex, user) => knex.where({username: user.username}),  // Manager chỉ có thể cập nhật thông tin của chính mình
        }
    },
    "customer": {
        "admin": {
            "getAll": (knex) => knex,  // Admin có thể xem tất cả các customer
            "update": (knex) => knex,  // Admin có thể cập nhật tất cả các customer
        },
        "customer": {
            "getAll": (knex, user) => knex.where({username: user.username}),  // Customer chỉ có thể xem thông tin của mình
            "update": (knex, user) => knex.where({username: user.username}),  // Customer chỉ có thể cập nhật thông tin của mình
        }
    }
};

module.exports.rowFilter = function(knex, action, table, user) {
    // Kiểm tra xem có bảng và hành động tương ứng không
    if (!policies[table] || !policies[table][user.role] || !policies[table][user.role][action]) {
        throw new Error(`Action "${action}" not allowed for table "${table}" and role "${user.role}"`);
    }
    return policies[table][user.role][action](knex, user);
};
