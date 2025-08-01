package com.example.jiraBack.service;

import com.example.jiraBack.dto.AuthDto;
import com.example.jiraBack.dto.UserDto;
import com.example.jiraBack.entity.User;
import org.springframework.data.crossstore.ChangeSetPersister;

public interface UserService {
    UserDto getById(String id) throws ChangeSetPersister.NotFoundException;
    UserDto getUserByEmail(String email) throws ChangeSetPersister.NotFoundException;
}
