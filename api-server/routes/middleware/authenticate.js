var jwt = require('jsonwebtoken');
const secret = "my-secret-key"; // TODO: Thay bằng biến môi trường

// Hàm xác thực token
function authenticated(req, res, next) {
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length);
        try {
            // Xác minh token và lấy thông tin người dùng
            const { username, role } = jwt.verify(token, secret);
            req.user = {
                username: username,
                role: role
            };
            return next(); // Tiến hành xử lý tiếp theo
        } catch (e) {
            res.send({
                success: false,
                code: 401,
                message: "Unauthorized access - Invalid token"
            });
            return next(false); // Dừng quá trình nếu token không hợp lệ
        }
    } else {
        res.send({
            success: false,
            code: 401,
            message: "Unauthorized access - No token"
        });
        return next(false); // Dừng quá trình nếu không có token
    }
}

// Hàm tạo token mới
function sign(username, role) {
    const token = jwt.sign({
        username: username,
        role: role
    }, secret, { expiresIn: '1h' });
    return token;
}

module.exports.sign = sign;
module.exports.authenticated = authenticated;
