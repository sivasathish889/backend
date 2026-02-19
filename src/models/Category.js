const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    slug: {
        type: String,
        unique: true
    }
});

categorySchema.pre('save', async function () {
    if (this.isModified('name') && !this.slug) {
        this.slug = this.name.toLowerCase().replace(/ +/g, '-');
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
