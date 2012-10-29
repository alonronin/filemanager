var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var filemanagerSchema = new Schema({
    folder: { type: Boolean },
    parent: { type: ObjectId, default: null},
    public_id: String,
    version: Number,
    signature: String,
    width: Number,
    height: Number,
    format: String,
    resource_type: String,
    url: String,
    secure_url: String,
    eager: [Object],
    name: String,
    size: Number
});

var filemanager = module.exports = mongoose.model('filemanager', filemanagerSchema);