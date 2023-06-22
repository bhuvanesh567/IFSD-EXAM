const prompt=require("prompt-sync")();

const mongoose = require('mongoose');

// Connection URL and database name
const url = "mongodb+srv://bhuvaneshklnbsc22:budhu3456@cluster0.d1tfzrq.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection URL
const dbName = 'studentsDB';

// Connect to MongoDB
mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Define the student schema
    const studentSchema = new mongoose.Schema({
      name: String,
      age: Number,
      major: String
    });

    // Create the student model
    const Student = mongoose.model('Student', studentSchema);

    // Create a new student
    const createStudent = async (student) => {
      try {
        const createdStudent = await Student.create(student);
        console.log('Student created:', createdStudent);
      } catch (err) {
        console.error('Error creating student:', err);
      }
    };

    // Read all students
    const readStudents = async () => {
      try {
        const students = await Student.find();
        console.log('Students:', students);
      } catch (err) {
        console.error('Error reading students:', err);
      }
    };

    // Update a student by ID
    const updateStudent = async (studentId, updateData) => {
      try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true });
        if (updatedStudent) {
          console.log('Student updated successfully:', updatedStudent);
        } else {
          console.log('Student not found');
        }
      } catch (err) {
        console.error('Error updating student:', err);
      }
    };

    // Delete a student by ID
    const deleteStudent = async (studentId) => {
      try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (deletedStudent) {
          console.log('Student deleted successfully:', deletedStudent);
        } else {
          console.log('Student not found');
        }
      } catch (err) {
        console.error('Error deleting student:', err);
      }
    };

    // Example usage

    // Create a student
    const student1 = {
      name: 'John Doe',
      age: 20,
      major: 'Computer Science'
    };
    createStudent(student1);

    // Read all students
    readStudents();

    // Update a student
    const studentIdToUpdate = '<student-id>'; // Replace with the actual student ID
    const updatedData = {
      age: 21,
      major: 'Software Engineering'
    };
    updateStudent(studentIdToUpdate, updatedData);

    // Delete a student
    const studentIdToDelete = '<student-id>'; // Replace with the actual student ID
    deleteStudent(studentIdToDelete);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

