import mongoose from 'mongoose'

const StudentCheckinSchema = new mongoose.Schema(
	{
		student_id: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true
	}
)

export default mongoose.model('StudentCheckin', StudentCheckinSchema)
