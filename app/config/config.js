var path = require('path');
module.exports = (root)=> {
    return {
        pc: path.join(root,'app/controllers/pc/'),//视图控制器，主要做同步网站用
        api:path.join(root,'app/controllers/api/'),//接口控制器，只负责接口，并返回json数据
        apiadmin:path.join(root,'app/controllers/apiadmin/'),
        plane:path.join(root,'app/controllers/plane/'),
        model: path.join(root,'app/model/'),//逻辑数据层，model，主要负数据增删改查
        v1:path.join(root,'app/model/v1/'),
        validate:path.join(root,'App/Validate/'),
        view:path.join(root,'app/view/'),
        source:path.join(root,'public/'),
        images:path.join(root,'public/images/'),
        common:path.join(root,'app/common/'),
        root:root,
        port: 7200,
        db:'mongodb://localhost:27017/more',
        scret:'moreapp_admin',
        rsa:path.join(root,'app/rsa/'),
        mid:path.join(root,'app/middleware/')

    }
}
