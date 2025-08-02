package com.example.jiraBack.service.impl;

import com.example.jiraBack.dto.UserDto;
import com.example.jiraBack.mapper.UserMapper;
import com.example.jiraBack.repository.UserRepository;
import com.example.jiraBack.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper mapper;

    @Override
    @Transactional
    public UserDto getById(String id) throws ChangeSetPersister.NotFoundException {
        return mapper.toDto(
                userRepository.findByUserId(Long.valueOf(id))
                        .orElseThrow(ChangeSetPersister.NotFoundException::new)
        );
    }

    @Override
    @Transactional
    public UserDto getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException("Пользователь с email " + email + " не найден"));
    }

}
