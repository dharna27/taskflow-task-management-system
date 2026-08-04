package com.taskflow.service;

import com.taskflow.entity.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.taskflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.taskflow.dto.UserResponseDTO;
import com.taskflow.dto.LoginRequestDTO;
import com.taskflow.dto.LoginResponseDTO;
import com.taskflow.service.jwt.JwtService;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    public User registerUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public LoginResponseDTO loginUser(LoginRequestDTO loginRequestDTO) {

        User user = userRepository.findByEmail(loginRequestDTO.getEmail());

        if (user == null) {
            return new LoginResponseDTO("User not found", null);
        }

        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            return new LoginResponseDTO("Invalid password", null);
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponseDTO("Login Successful", token);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public User updateUser(Long id, User updatedUser) {

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser == null) {
            return null;
        }

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());

        return userRepository.save(existingUser);
    }
    public String deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            return "User not found";
        }

        userRepository.deleteById(id);

        return "User deleted successfully";
    }
    public UserResponseDTO getUserResponseById(Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}