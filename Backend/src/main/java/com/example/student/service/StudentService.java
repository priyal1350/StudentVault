package com.example.student.service;

import com.example.student.entity.Student;
import com.example.student.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    // Starting number
    private static final long START_REGISTER_NUMBER = 420422205001L;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Student saveStudent(Student student) {
        // Auto-generate register number if not provided
        if (student.getRegisterNumber() == null || student.getRegisterNumber().isEmpty()) {
            long count = repository.count(); // Get number of existing students
            long nextNumber = START_REGISTER_NUMBER + count;
            student.setRegisterNumber(String.valueOf(nextNumber));
        }
        return repository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(studentDetails.getName());
            existing.setPhoneNumber(studentDetails.getPhoneNumber());
            existing.setDepartment(studentDetails.getDepartment());
            existing.setAddress(studentDetails.getAddress());
            return repository.save(existing);
        }
        return null;
    }

    public String deleteStudent(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Deleted Successfully";
        }
        return "Student Not Found";
    }
}
