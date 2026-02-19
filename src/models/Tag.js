const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    }
});

tagSchema.pre('save', async function () {
    if (this.isModified('name') && !this.slug) {
        this.slug = this.name.toLowerCase().replace(/ +/g, '-');
    }
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
