class Session {
    constructor() {
        this.schema = mdb.Schema({
            _id:{
                type:String,
                index:true
            },
            data:{
                type:Object,
                default:''
            },
            createdAt: {type: Date, expires: 60*60*24,index:true}
        }, {
            collection: 'session',
            versionKey: false
        });
        this.model = mdb.model('session', this.schema);

    }


    async add(data) {
        let alldata={
            createdAt:new Date(),
            _id:tool.getid(),
            data:data
        };
        console.log(data,'data-----end');
        return new this.model(alldata).save().then(function (result) {
            return result;

        }, function (err) {
            return err;
        })

    }

    async find() {

    }
}

module.exports = new Session();