import mongoose, { mongo } from 'mongoose'

interface DiaryAttrs{
    header: string;
    picUrl: string;
    description: string;
}


interface DiaryModel extends mongoose.Model<DiaryDoc>{

    build(attrs: DiaryAttrs): DiaryDoc;

}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
interface DiaryDoc extends mongoose.Document {
    header :  string,
    picUrl: string,
    description: string
}



const diarySchema = new mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    picUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    
});




diarySchema.statics.build = (attrs: DiaryAttrs) => {
    return new Diary(attrs);
};


const Diary = mongoose.model<DiaryDoc, DiaryModel>('Diary', diarySchema);

export {Diary};