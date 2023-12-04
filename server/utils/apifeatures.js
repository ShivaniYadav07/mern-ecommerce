class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options: "i",
            },
        }
        : {};

        console.log(keyword);
        this.query = this.queryStr.find({...keyword});
        return this;
    }
}

module.exports = ApiFeatures