import mongoose, { Schema, Document } from 'mongoose';

// Định nghĩa interface cho Task
export interface ITask extends Document {
    title: string;
    description?: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema: Schema<ITask> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Vui lòng nhập tiêu đề cho công việc!'],
            trim: true,
            maxlength: [100, 'Tiêu đề không được vượt quá 100 ký tự!'],
            minlength: [3, 'Tiêu đề phải có ít nhất 3 ký tự!']
        },
        description: {
            type: String,
            trim: true,
            default: ''
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false // Loại bỏ trường __v
    }
);

const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
export default TaskModel;