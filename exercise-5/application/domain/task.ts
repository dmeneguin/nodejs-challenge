import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const model = mongoose.model('Task', schema);
export default model;