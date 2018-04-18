const TeachTagsModel = require(path.join(webconfig.v1, 'teachTags.js'));
class TeachTags {
    async addOrUpdate() {
      let post = this.ctx.request.body;
      let data={
        err_code:'201',
        err_msg:'没有提交数据'
      };

      console.log();
      if(post['data']&&post['data']['_id']){
          data=await TeachTagsModel.update({_id:post['data']["_id"]},{title:post['data']['title']});
      }
      if(post['data']&&!post['data']['_id']){
          data=await TeachTagsModel.add(post['data']);
      }

      this.ctx.body = data;
    }
    async index(){
      let post = this.ctx.request.body;
      let data = await TeachTagsModel.find(post['data']);
      this.ctx.body = data;
    }



}

module.exports = new TeachTags();
