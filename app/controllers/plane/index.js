const des = require(path.join(webconfig.common, 'des3.js'));
const querystring = require('querystring');
class Index {
    init(ctx, next) {
        this.ctx = ctx;
        this.next = next;
        let url = 'http://uat.topls.top';
        this.plane = {
            'city': url + '/xml/TFCityList.xml',
            'company': url + '/xml/TFAirList.xml',
            'searchFlight': url + '/dfs/service/searchFlight.json',
            'ticketReservation': url + '/dfs/service/ticketReservation.json',
            'checkOrder': url + '/dfs/service/checkOrder.json',
            'paymentNotice': url + '/dfs/service/paymentNotice.json',
            'queryOrderList': url + '/dfs/service/queryOrderList.json',
            'queryOrderDetail': url + '/dfs/service/queryOrderDetail.json',
            'ticketRefund': url + '/dfs/service/ticketRefund.json',
            'querytransfer': url + '/dfs/service/querytransfer.json',
            'queryProvision': url + '/dfs/service/queryProvision.json',
            'specialOrderConfirm': url + '/dfs/service/specialOrderConfirm.json',
            'cancelOrder': url + '/dfs/service/cancelOrder.json',
            'specialOrderPayNotice': url + '/dfs/service/specialOrderPayNotice.json',
            'printTicketNotice': url + '/dfs/service/printTicketNotice.json',
            'changeTicket': url + '/dfs/service/changeTicket.json'
        };
        this.key = {
            'memchantID': '',
            'MD5_KEY': '',
            'DES_KEY': ''
        };

        let post = this.ctx.request.body;
        let str = JSON.stringify(post.data);
        let time = tool.formatDate(tool.time());
        let desdata = des.encrypt({
            alg: 'des-ede3',
            autoPad: true,
            key: this.key['MD5_KEY'],
            plaintext: str,
            iv: '',
            type:'base64'
        })
        let sign = tool.md5(this.key.memchantID + desdata + time + this.key['MD5_KEY']);
        this.senddata = {
            "memchantID": this.key['memchantID'],
            "sign": sign,
            "data": desdata,
            "timestamp": time
        };


        return true;
    }

    async searchFlight() {

      let data = await tool.curl(this.plane.searchFlight,this.senddata);
        this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }
    async ticketReservation(){
          let data = await tool.curl(this.plane.ticketReservation,this.senddata);
          this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};
    }

    async checkOrder(){
      let data = await tool.curl(this.plane.checkOrder,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }

    async paymentNotice(){
      let data = await tool.curl(this.plane.paymentNotice,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }


    async queryOrderList(){
      let data = await tool.curl(this.plane.queryOrderList,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};
    }


    async queryOrderDetail(){
      let data = await tool.curl(this.plane.queryOrderDetail,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }


    async ticketRefund(){
      let data = await tool.curl(this.plane.cketRefund,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }


    async querytransfer(){
      let data = await tool.curl(this.plane.querytransfer,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }


    async queryProvision(){
      let data = await tool.curl(this.plane.queryProvision,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }

    async specialOrderConfirm(){
      let data = await tool.curl(this.plane.specialOrderConfirm,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }

    async cancelOrder(){
      let data = await tool.curl(this.plane.cancelOrder,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }

    async specialOrderPayNotice(){
      let data = await tool.curl(this.plane.specialOrderPayNotice,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }



     async printTicketNotice(){
       let data = await tool.curl(this.plane.printTicketNotice,this.senddata);
       this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};

    }

    async changeTicket(){
      let data = await tool.curl(this.plane.changeTicket,this.senddata);
      this.ctx.body = {error_code:200,error_msg:"资源正常",data:data};
    }

}
module.exports = new Index();
