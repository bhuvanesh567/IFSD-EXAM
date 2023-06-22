const prompt=require("prompt-sync")();

const { MongoClient, ObjectId } = require('mongodb');

// Connection URL and database name
const url = "mongodb+srv://bhuvaneshklnbsc22:budhu3456@cluster0.d1tfzrq.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection URL
const dbName = 'studentsDB';

// Student collection name
const collectionName = 'students';

class StudentDB {
  constructor() {
    this.client = new MongoClient(url);
    this.db = null;
    this.collection = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(dbName);
      this.collection = this.db.collection(collectionName);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (err) {
      console.error('Error disconnecting from MongoDB:', err);
    }
  }

  async createStudent(student) {
    try {
      const result = await this.collection.insertOne(student);
      console.log('Student created:', result.insertedId);
    } catch (err) {
      console.error('Error creating student:', err);
    }
  }

  async readStudents() {
    try {
      const students = await this.collection.find().toArray();
      console.log('Students:');
      students.forEach(student => {
        console.log('ID:', student._id);
        console.log('Name:', student.name);
        console.log('Age:', student.age);
        console.log('Major:', student.major);
        console.log('---');
      });
    } catch (err) {
      console.error('Error reading students:', err);
    }
  }

  async updateStudent(studentId, updateData) {
    try {
      const result = await this.collection.updateOne(
        { _id: ObjectId(studentId) },
        { $set: updateData }
      );

      if (result.matchedCount > 0) {
        console.log('Student updated successfully');
      } else {
        console.log('Student not found');
      }
    } catch (err) {
      console.error('Error updating student:', err);
    }
  }

  async deleteStudent(studentId) {
    try {
      const result = await this.collection.deleteOne({ _id: ObjectId(studentId) });

      if (result.deletedCount > 0) {
        console.log('Student deleted successfully');
      } else {
        console.log('Student not found');
      }
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  }
}

async function main() {
  const studentDB = new StudentDB();
  await studentDB.connect();

  // Create a student
  const student1 = {
    name: 'Bhuvanesh',
    age: 19,
    major: 'Computer Science'
  };
  await studentDB.createStudent(student1);

  // Read all students
  await studentDB.readStudents();

  // Update a student
  const studentIdToUpdate = '<student-id>'; // Replace with the actual student ID
  const updatedData = {
    age: 21,
    major: 'Software Engineering'
  };
  await studentDB.updateStudent(studentIdToUpdate, updatedData);

  // Delete a student
  const studentIdToDelete = '<student-id>'; // Replace with the actual student ID
  await studentDB.deleteStudent(studentIdToDelete);

  await studentDB.disconnect();
}

main();
