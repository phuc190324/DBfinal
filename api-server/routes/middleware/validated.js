let Validator = require('validatorjs');

// Cấu hình các quy tắc validation cho từng route và phương thức
let rules = {
    "/room/:id": {
        "GET": {
            id: "required|integer|min:1"
        },
        "DELETE": {
            id: "required|integer|min:1"
        },
        "PATCH": {
            id: "required|integer|min:1",
            name: "string",
            price: "integer|min:0"
        }
    },
    "/room": {
        "POST": {
            name: "required|string",
            price: "required|integer|min:0"
        }
    },
    "/manager/:username": {
        "PATCH": {
            username: "string",
            fullname: "string",
            base_salary: "integer|min:0"
        }
    },
    // Phần mới cho customer
    "/customer": {
        "POST": {
            name: "required|string",        // Kiểm tra tên khách hàng là chuỗi và bắt buộc
            email: "required|email",        // Kiểm tra email hợp lệ và bắt buộc
            phone: "required|string|min:10", // Kiểm tra số điện thoại là chuỗi và có độ dài tối thiểu là 10 ký tự
            address: "required|string"      // Kiểm tra địa chỉ là chuỗi và bắt buộc
        }
    },
    "/customer/:id": {
        "GET": {
            id: "required|integer|min:1"    // Kiểm tra id là số nguyên và lớn hơn hoặc bằng 1
        },
        "PATCH": {
            id: "required|integer|min:1",   // Kiểm tra id là số nguyên và lớn hơn hoặc bằng 1
            name: "string",                  // Kiểm tra tên là chuỗi
            email: "email",                  // Kiểm tra email hợp lệ
            phone: "string|min:10",          // Kiểm tra số điện thoại là chuỗi và có độ dài tối thiểu là 10 ký tự
            address: "string"                // Kiểm tra địa chỉ là chuỗi
        }
    },
    // Phần mới cho service (tương tự như room)
    "/service": {
        "POST": {
            name: "required|string",        // Kiểm tra tên dịch vụ là chuỗi và bắt buộc
            price: "required|integer|min:0", // Kiểm tra giá dịch vụ là số nguyên và lớn hơn hoặc bằng 0
            description: "string"            // Kiểm tra mô tả dịch vụ là chuỗi
        }
    },
    "/service/:id": {
        "GET": {
            id: "required|integer|min:1"    // Kiểm tra id là số nguyên và lớn hơn hoặc bằng 1
        },
        "PATCH": {
            id: "required|integer|min:1",   // Kiểm tra id là số nguyên và lớn hơn hoặc bằng 1
            name: "string",                  // Kiểm tra tên dịch vụ là chuỗi
            price: "integer|min:0",          // Kiểm tra giá dịch vụ là số nguyên và lớn hơn hoặc bằng 0
            description: "string"            // Kiểm tra mô tả dịch vụ là chuỗi
        },
        "DELETE": {
            id: "required|integer|min:1"    // Kiểm tra id là số nguyên và lớn hơn hoặc bằng 1
        }
    }
};

// Middleware để kiểm tra dữ liệu đầu vào
module.exports.validated = function (req, res, next) {
    let {method, path} = req.getRoute();  // Lấy phương thức và đường dẫn
    let rule = rules[path] && rules[path][method]; // Lấy quy tắc cho route và phương thức

    // Kiểm tra xem có quy tắc cho route và phương thức này hay không
    if (rule) {
        let validation = new Validator(req.params, rule); // Thực hiện validation trên params

        // Nếu validation thất bại
        if (validation.fails()) {
            return res.send({
                success: false, 
                code: 400, 
                message: "Bad request", 
                data: validation.errors // Trả về lỗi validation
            });
        }
    } else {
        // Nếu không có quy tắc validation cho route và phương thức
        return res.send({
            success: false, 
            code: 400, 
            message: "No validation rules found for this route",
        });
    }

    return next();  // Nếu validation thành công, tiếp tục xử lý
};
