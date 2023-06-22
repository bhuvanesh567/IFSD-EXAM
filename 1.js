const prompt = require("prompt-sync")();

class Student {
    constructor(name, score) {
      this.name = name;
      this.score = score;
    }
  }
  
  class Classroom {
    constructor() {
      this.students = [];
    }
  
    addStudent(student) {
      this.students.push(student);
    }
  
    getStudentWithHighestScore() {
      if (this.students.length > 0) {
        const highestScoreStudent = this.students.reduce((highest, current) => {
          return current.score > highest.score ? current : highest;
        });
        return highestScoreStudent;
      } else {
        return null;
      }
    }
  }
  
  function main() {
    const classroom = new Classroom();
  
    const n = parseInt(prompt("Enter the number of students: "));
    for (let i = 0; i < n; i++) {
      const name = prompt(`Enter the name of student ${i + 1}: `);
      const score = parseFloat(prompt(`Enter the score of ${name}: `));
  
      const student = new Student(name, score);
      classroom.addStudent(student);
    }
  
    const studentWithHighestScore = classroom.getStudentWithHighestScore();
  
    if (studentWithHighestScore) {
      console.log("Student with the highest score is:", studentWithHighestScore.name);
      console.log("Score:", studentWithHighestScore.score);
    } else {
      console.log("No students found.");
    }
  }
  
  main();
  