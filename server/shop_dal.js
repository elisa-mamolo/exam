const mongoose = require('mongoose'); // We need the mongoose library

//class where i have hidden all the access to db
class Db {

    constructor() {
        //defines how question schema looks
        // This is the schema we need to store questions in MongoDB
        const schema = new mongoose.Schema({
            category: String,
            books: [{
                title: String,
                author: String,
                category: String,
                price: Number,
                user: String,
                email: String
            }]
        });
        this.shopModel = mongoose.model('shop', schema);
    }

    async getCategories() {
        try {
            return await this.shopModel.find({});
        } catch (error) {
            console.error("getCategories:", error.message);
            return {};
        }
    }

    async getCategory(id) {
        try {
            return await this.shopModel.findOne({_id: id});
        } catch (error) {
            console.error("getCategory:", error.message);
            return {};
        }
    }

    async removeCategory(id) {
        try {
            return await this.shopModel.findOne({_id: id});
            this.getCategories();
        } catch (error) {
            console.error("removeCategory:", error.message);
            return {};
        }
    }

    async createCategory(newCategory) {
        // TODO: Error handling
        let category = new this.shopModel(newCategory);
        try {
            return await category.save();
        } catch (error) {
            console.error("createCategory:", error.message);
            return {};
        }

    }


    async addBook(id, book) {
        // TODO: Error handling
        //get category by id
        const category = await this.getCategory(id);
        category.books.push(book);
        try {
            return category.save();
        } catch (error) {
            console.error("addBook:", error.message);
            return {};
        }
    }


    getBook(id, bookId){
        let category = this.getCategory(id);
        let book = category.books.find(book => book._id == bookId);
        try{
            return book;
        } catch{
            console.log("getBook", error.message);
            return {};
        }
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of questions to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 1) {
        let l = (await this.getCategories()).length;
        console.log("Category collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let category = new this.shopModel({
                    category: 'Novel',
                    books: [
                        {title: "Oliver twist", author: "Dickens", category: "Novel", price: 50, user: "admin", email: "admin@gmail.com"},
                        {title: "A christmas carol", author: "Dickens", category: "Novel", price: 55, user: "admin", email: "admin@gmail.com"},

                    ]
                });
                promises.push(category.save());
            }

            return Promise.all(promises);
        }
    }
}

// We export the object used to access the questions in the database
module.exports = mongoose => new Db(mongoose);