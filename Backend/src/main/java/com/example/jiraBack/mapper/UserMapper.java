package com.example.jiraBack.mapper;

import com.example.jiraBack.dto.UserDto;
import com.example.jiraBack.entity.User;
import org.springframework.stereotype.Component;


@Component
public class UserMapper {
     public UserDto toDto(User user) {
          UserDto dto = new UserDto();
          dto.setEmail(user.getEmail());
          dto.setFirstName(user.getFirstName());
          return dto;
     }
}