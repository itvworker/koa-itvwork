class Admin {
    constructor() {
         this.schema = new mdb.Schema({
             _id:{
                 type:String,
                 unique: true,
                 index:true
             },
             username:{
                 type: String,
                 unique: true,
                 index:true
             },
             power:{
                 type:Object,
                 default:"",
             },
             pwd:{
               type:String
             },
             add_time:String

        },{


             collection:'admin',
             versionKey:false
         });

        this.model = mdb.model('admin', this.schema);
        // this.model.schema.path('username').validate(function (value) {
        //     console.log(value);
        //       return false;
        // },'请输入正确的用户名');

    }
    add(data){

        let doc=new this.model(data);
        console.log(doc);
        doc.save(function (err) {
            console.log('-----------------------');
            console.log(err);
            console.log('-----------------------end');
        })


    }
    find(){

    }



}

module.exports=new Admin();