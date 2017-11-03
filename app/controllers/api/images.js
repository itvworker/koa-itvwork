const imgModel = require(path.join(webconfig.v1, 'images.js'));

class Images {
    constructor(ctx,next) {

    }
    async list(ctx,next){
        let post = ctx.request.body;
        ctx.body=await imgModel.find(post.data);
       // await ctx.render('user',{title:1000});
    }

    async uploads(ctx,next){
        let post = ctx.request.body;
        let arr=[];
        let type="";
        if(post['fields']){
            let a=0;
            let data= post.fields;
            delete data.token;
            let begin="";
            type=data.type;
            delete data.type;

            for(let i in data){

                if(!begin){
                    begin= i.indexOf('[type]')>=0?'type':'data';
                }
                switch (begin){
                    case 'type':

                        if( i.indexOf('type')>=0){
                            arr.push({type:data[i]})

                        }else{
                            arr[arr.length-1]['data']=data[i]
                        }

                        break;
                    case 'data':
                        if( i.indexOf('[data]')>=0){
                            arr.push({type:data[i]})

                        }else{
                            arr[arr.length-1]['data']=data[i]
                        }
                        break;
                }


            }


        }

        ctx.body=await imgModel.uploads(arr,ctx,type);

    }




}

module.exports=new Images();