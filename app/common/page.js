class Page{
    constructor(data){
         this.count=data.count;//总条数，
         this.num=data.num;//每一页显示多少条信息
         this.page=data.page?data.page:1;//当前页
         this.url=data.url;//url
         this.pot=data.pot?data.pot:10;//每次最多显示多少个点击点
         this.pages = Math.ceil(data.count/data.num);//总页数
         this.page_url=[];
         this.arrurl();
    }
    arrurl(){
        var page_url = []; //生成的链接数组
        if (this.pages <= 1) { //当只一页或小于一页时 还生成个屁分页，浪费
            return '';
        }
        if(this.page>this.pages) this.page=this.pages;
        //根据当前页计算前后页数
        var leftPage_num = parseInt(this.pot / 2);
        var rightPage_num = this.pot - leftPage_num;
        //左边显示数为当前页减左边该显示的数 例如总显示7页 当前页是5  左边最小为5-3  右边为5+3
        var left = this.page - leftPage_num;         
        left=Math.max(left,1);
        var right = left + this.pot - 1; //左边加显示页数减1就是右边显示数
      
        right = Math.min(right, this.pages); //右边最大不能大于总页数
        left = Math.max(right - this.pot + 1, 1); //确定右边再计算左边，必须二次计算
        
        for (let i = left; i <= right; i++) {
            page_url.push({
                page:i,
                url:this.url+'page='+i
            });
        }
        this.page_url = page_url;
    }
    html(){
        var html='<div class="page">'
        if (this.page > 1) html += '<a href="' + this.url +'page=1">上一页</a>';
        for(let i=0,len=this.page_url.length;i<len;i++){
             if(this.page_url[i]['page']==this.page){
                html+='<span class="active">'+this.page_url[i]['page']+'</span>'    
             }else{
                html+='<a class="'+(this.page_url[i]['page']==this.page?'active':'')+'"  href="'+this.page_url[i]['url']+'">'+this.page_url[i]['page']+'</a>';
             }
           
        }



        if (this.page < this.pages) html += '<a href="' + this.url + 'page='+this.pages+'">下一页</a>';
        html+='</div>';
        return html;

    //         < div class="page" >
    //    <!--<span v-if="curPage==1" class="forbid" > 上一页</span > -->
    //         <router-link v-if="curPage>1" :to="prev">上一页</router-link>
    //         <template v-for="(item,index) in page">
    //             <span v-if="item.page==curPage" class="active">{{ item.page }}</span>
    //             <router-link v-if="item.page!=curPage" :to="item.url">{{ item.page }}</router-link>
    //    </template >
    //      <!--<span v-if="countPages==curPage" class="forbid" > 下一页</span > -->
    //         <router-link v-if="curPage<countPages" :to="next">下一页</router-link>
    // </div >


    }

}


module.exports = Page;